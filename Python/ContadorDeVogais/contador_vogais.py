import re
import os
from collections import Counter
from datetime import datetime

class ContadorVogais:
    def __init__(self):
        self.vogais = 'aeiouáéíóúâêîôûãẽĩõũàèìòùäëïöü'
        self.consoantes = 'bcdfghjklmnpqrstvwxyzç'
        self.historico = []

    def analisar_texto(self, texto):
        """Analisa um texto e retorna estatísticas detalhadas"""
        if not texto:
            return None
        
        # Converte para minúsculas para análise
        texto_lower = texto.lower()
        
        # Conta caracteres
        total_caracteres = len(texto)
        caracteres_alfabeticos = sum(1 for c in texto_lower if c.isalpha())
        espacos = texto.count(' ')
        pontuacao = sum(1 for c in texto if c in '.,;:!?()[]{}"\'-')
        
        # Conta vogais
        vogais_encontradas = [c for c in texto_lower if c in self.vogais]
        total_vogais = len(vogais_encontradas)
        
        # Conta consoantes
        consoantes_encontradas = [c for c in texto_lower if c in self.consoantes]
        total_consoantes = len(consoantes_encontradas)
        
        # Conta por vogal individual
        contagem_vogais = Counter(vogais_encontradas)
        
        # Conta por consoante individual
        contagem_consoantes = Counter(consoantes_encontradas)
        
        # Análise de palavras
        palavras = re.findall(r'\b\w+\b', texto_lower)
        total_palavras = len(palavras)
        
        # Palavras com mais vogais
        palavras_vogais = []
        for palavra in palavras:
            vogais_palavra = sum(1 for c in palavra if c in self.vogais)
            if vogais_palavra > 0:
                palavras_vogais.append((palavra, vogais_palavra))
        
        palavras_vogais.sort(key=lambda x: x[1], reverse=True)
        
        # Calcula porcentagens
        porcentagem_vogais = (total_vogais / total_caracteres * 100) if total_caracteres > 0 else 0
        porcentagem_consoantes = (total_consoantes / total_caracteres * 100) if total_caracteres > 0 else 0
        porcentagem_alfabeticos = (caracteres_alfabeticos / total_caracteres * 100) if total_caracteres > 0 else 0
        
        return {
            'texto': texto,
            'total_caracteres': total_caracteres,
            'caracteres_alfabeticos': caracteres_alfabeticos,
            'espacos': espacos,
            'pontuacao': pontuacao,
            'total_vogais': total_vogais,
            'total_consoantes': total_consoantes,
            'total_palavras': total_palavras,
            'contagem_vogais': contagem_vogais,
            'contagem_consoantes': contagem_consoantes,
            'palavras_vogais': palavras_vogais[:10],  # Top 10
            'porcentagem_vogais': porcentagem_vogais,
            'porcentagem_consoantes': porcentagem_consoantes,
            'porcentagem_alfabeticos': porcentagem_alfabeticos
        }

    def exibir_estatisticas(self, stats):
        """Exibe as estatísticas de forma organizada"""
        if not stats:
            print("Nenhum texto para analisar!")
            return
        
        print(f"\n=== ANÁLISE DE TEXTO ===")
        print(f"Total de caracteres: {stats['total_caracteres']}")
        print(f"Caracteres alfabéticos: {stats['caracteres_alfabeticos']}")
        print(f"Espaços: {stats['espacos']}")
        print(f"Pontuação: {stats['pontuacao']}")
        print(f"Total de palavras: {stats['total_palavras']}")
        print()
        
        print("=== CONTAGEM DE VOGAIS ===")
        print(f"Total de vogais: {stats['total_vogais']} ({stats['porcentagem_vogais']:.1f}%)")
        print()
        
        if stats['contagem_vogais']:
            print("Vogais encontradas:")
            for vogal, quantidade in sorted(stats['contagem_vogais'].items()):
                print(f"  '{vogal}': {quantidade}")
        else:
            print("Nenhuma vogal encontrada!")
        
        print()
        print("=== CONTAGEM DE CONSOANTES ===")
        print(f"Total de consoantes: {stats['total_consoantes']} ({stats['porcentagem_consoantes']:.1f}%)")
        print()
        
        if stats['contagem_consoantes']:
            print("Consoantes mais frequentes:")
            for consoante, quantidade in stats['contagem_consoantes'].most_common(10):
                print(f"  '{consoante}': {quantidade}")
        
        print()
        print("=== PALAVRAS COM MAIS VOGAIS ===")
        if stats['palavras_vogais']:
            for i, (palavra, vogais) in enumerate(stats['palavras_vogais'], 1):
                print(f"{i:2d}. '{palavra}' - {vogais} vogais")
        else:
            print("Nenhuma palavra com vogais encontrada!")
        
        print()
        print("=== RESUMO ===")
        print(f"Caracteres alfabéticos: {stats['porcentagem_alfabeticos']:.1f}%")
        print(f"Vogais: {stats['porcentagem_vogais']:.1f}%")
        print(f"Consoantes: {stats['porcentagem_consoantes']:.1f}%")
        print(f"Outros caracteres: {100 - stats['porcentagem_alfabeticos']:.1f}%")

    def analisar_arquivo(self, caminho_arquivo):
        """Analisa um arquivo de texto"""
        try:
            with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
                texto = arquivo.read()
            
            print(f"✓ Arquivo carregado: {caminho_arquivo}")
            return self.analisar_texto(texto)
            
        except FileNotFoundError:
            print(f"✗ Arquivo não encontrado: {caminho_arquivo}")
            return None
        except Exception as e:
            print(f"✗ Erro ao ler arquivo: {e}")
            return None

    def criar_arquivo_exemplo(self):
        """Cria um arquivo de texto de exemplo"""
        texto_exemplo = """
O rato roeu a roupa do rei de Roma.
Esta é uma frase em português brasileiro que contém muitas vogais.
Vamos analisar quantas vogais existem neste texto de exemplo.
A língua portuguesa é rica em vogais e consoantes.
Este texto serve para demonstrar o funcionamento do contador de vogais.
        """.strip()
        
        try:
            with open('texto_exemplo.txt', 'w', encoding='utf-8') as arquivo:
                arquivo.write(texto_exemplo)
            print("✓ Arquivo de exemplo criado: texto_exemplo.txt")
            return texto_exemplo
        except Exception as e:
            print(f"✗ Erro ao criar arquivo de exemplo: {e}")
            return None

    def adicionar_historico(self, stats, fonte):
        """Adiciona análise ao histórico"""
        entrada = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
            'fonte': fonte,
            'total_caracteres': stats['total_caracteres'],
            'total_vogais': stats['total_vogais'],
            'total_palavras': stats['total_palavras']
        }
        self.historico.append(entrada)

    def exibir_historico(self):
        """Exibe histórico de análises"""
        if not self.historico:
            print("\nNenhuma análise realizada ainda.")
            return

        print("\n=== HISTÓRICO DE ANÁLISES ===")
        for i, entrada in enumerate(self.historico[-10:], 1):  # Últimas 10 análises
            print(f"{i}. {entrada['data']} - {entrada['fonte']}")
            print(f"   Caracteres: {entrada['total_caracteres']}, "
                  f"Vogais: {entrada['total_vogais']}, "
                  f"Palavras: {entrada['total_palavras']}")

    def salvar_resultados(self, stats, nome_arquivo):
        """Salva resultados em arquivo de texto"""
        try:
            nome_completo = f"{nome_arquivo}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
            
            with open(nome_completo, 'w', encoding='utf-8') as arquivo:
                arquivo.write("=== ANÁLISE DE TEXTO ===\n")
                arquivo.write(f"Data: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n")
                arquivo.write(f"Total de caracteres: {stats['total_caracteres']}\n")
                arquivo.write(f"Total de vogais: {stats['total_vogais']}\n")
                arquivo.write(f"Total de consoantes: {stats['total_consoantes']}\n")
                arquivo.write(f"Total de palavras: {stats['total_palavras']}\n\n")
                
                arquivo.write("=== CONTAGEM DE VOGAIS ===\n")
                for vogal, quantidade in sorted(stats['contagem_vogais'].items()):
                    arquivo.write(f"'{vogal}': {quantidade}\n")
                
                arquivo.write("\n=== PALAVRAS COM MAIS VOGAIS ===\n")
                for palavra, vogais in stats['palavras_vogais'][:10]:
                    arquivo.write(f"'{palavra}': {vogais} vogais\n")
            
            print(f"✓ Resultados salvos em: {nome_completo}")
        except Exception as e:
            print(f"✗ Erro ao salvar resultados: {e}")

    def executar(self):
        """Executa o programa principal"""
        print("=== CONTADOR DE VOGAIS ===")
        
        while True:
            print("\nEscolha uma opção:")
            print("1. Analisar texto digitado")
            print("2. Analisar arquivo de texto")
            print("3. Criar arquivo de exemplo")
            print("4. Ver histórico")
            print("5. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                print("\nDigite o texto para análise (pressione Enter duas vezes para finalizar):")
                linhas = []
                while True:
                    linha = input()
                    if linha == "" and linhas and linhas[-1] == "":
                        break
                    linhas.append(linha)
                
                texto = "\n".join(linhas[:-1])  # Remove a linha vazia final
                
                if texto.strip():
                    stats = self.analisar_texto(texto)
                    if stats:
                        self.exibir_estatisticas(stats)
                        self.adicionar_historico(stats, "Texto digitado")
                        
                        salvar = input("\nDeseja salvar os resultados? (s/n): ").lower().startswith('s')
                        if salvar:
                            nome = input("Nome do arquivo (sem extensão): ").strip() or "analise"
                            self.salvar_resultados(stats, nome)
                else:
                    print("Texto vazio!")
            
            elif opcao == '2':
                caminho = input("\nDigite o caminho do arquivo: ").strip()
                if caminho:
                    stats = self.analisar_arquivo(caminho)
                    if stats:
                        self.exibir_estatisticas(stats)
                        self.adicionar_historico(stats, f"Arquivo: {caminho}")
                        
                        salvar = input("\nDeseja salvar os resultados? (s/n): ").lower().startswith('s')
                        if salvar:
                            nome = input("Nome do arquivo (sem extensão): ").strip() or "analise"
                            self.salvar_resultados(stats, nome)
                else:
                    print("Caminho não pode estar vazio!")
            
            elif opcao == '3':
                texto_exemplo = self.criar_arquivo_exemplo()
                if texto_exemplo:
                    print("\nArquivo criado! Deseja analisá-lo agora? (s/n): ", end="")
                    if input().lower().startswith('s'):
                        stats = self.analisar_texto(texto_exemplo)
                        self.exibir_estatisticas(stats)
                        self.adicionar_historico(stats, "Arquivo de exemplo")
            
            elif opcao == '4':
                self.exibir_historico()
            
            elif opcao == '5':
                print("\nObrigado por usar o Contador de Vogais!")
                break
            
            else:
                print("Opção inválida!")
            
            input("\nPressione Enter para continuar...")

if __name__ == "__main__":
    contador = ContadorVogais()
    contador.executar() 