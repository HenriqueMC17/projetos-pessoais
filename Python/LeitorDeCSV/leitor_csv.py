import csv
import os
import pandas as pd
from datetime import datetime

class LeitorCSV:
    def __init__(self):
        self.dados = None
        self.arquivo_atual = None
        self.df = None

    def carregar_arquivo(self, caminho_arquivo):
        """Carrega um arquivo CSV"""
        try:
            # Tenta detectar o delimitador
            with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
                primeira_linha = arquivo.readline()
                arquivo.seek(0)
                
                # Detecta delimitador
                delimitador = self.detectar_delimitador(primeira_linha)
                
                # Lê o arquivo CSV
                leitor = csv.reader(arquivo, delimiter=delimitador)
                linhas = list(leitor)
                
                if not linhas:
                    print("Arquivo vazio!")
                    return False
                
                # Separa cabeçalho e dados
                cabecalho = linhas[0]
                dados = linhas[1:]
                
                # Cria DataFrame do pandas
                self.df = pd.DataFrame(dados, columns=cabecalho)
                self.arquivo_atual = caminho_arquivo
                
                print(f"✓ Arquivo carregado com sucesso!")
                print(f"   Linhas: {len(self.df)}")
                print(f"   Colunas: {len(self.df.columns)}")
                print(f"   Delimitador: '{delimitador}'")
                
                return True
                
        except FileNotFoundError:
            print(f"✗ Arquivo não encontrado: {caminho_arquivo}")
            return False
        except Exception as e:
            print(f"✗ Erro ao carregar arquivo: {e}")
            return False

    def detectar_delimitador(self, linha):
        """Detecta o delimitador usado no arquivo"""
        delimitadores = [',', ';', '\t', '|']
        contadores = {}
        
        for delimitador in delimitadores:
            contadores[delimitador] = linha.count(delimitador)
        
        # Retorna o delimitador mais frequente
        return max(contadores, key=contadores.get)

    def visualizar_dados(self, linhas=10):
        """Visualiza os dados em formato tabular"""
        if self.df is None:
            print("Nenhum arquivo carregado!")
            return
        
        print(f"\n=== VISUALIZAÇÃO DOS DADOS (primeiras {linhas} linhas) ===")
        print(f"Arquivo: {self.arquivo_atual}")
        print(f"Total de linhas: {len(self.df)}")
        print(f"Total de colunas: {len(self.df.columns)}")
        print()
        
        # Mostra cabeçalho
        print("Colunas:", " | ".join(self.df.columns))
        print("-" * 80)
        
        # Mostra dados
        for i, (_, linha) in enumerate(self.df.head(linhas).iterrows()):
            print(f"{i+1:3d} | {' | '.join(str(valor) for valor in linha)}")
        
        if len(self.df) > linhas:
            print(f"... e mais {len(self.df) - linhas} linhas")

    def estatisticas_basicas(self):
        """Mostra estatísticas básicas dos dados"""
        if self.df is None:
            print("Nenhum arquivo carregado!")
            return
        
        print(f"\n=== ESTATÍSTICAS BÁSICAS ===")
        print(f"Arquivo: {self.arquivo_atual}")
        print(f"Linhas: {len(self.df)}")
        print(f"Colunas: {len(self.df.columns)}")
        print()
        
        print("INFORMAÇÕES POR COLUNA:")
        print("-" * 60)
        
        for coluna in self.df.columns:
            print(f"\nColuna: {coluna}")
            
            # Conta valores não nulos
            nao_nulos = self.df[coluna].notna().sum()
            nulos = self.df[coluna].isna().sum()
            
            print(f"  Valores não nulos: {nao_nulos}")
            print(f"  Valores nulos: {nulos}")
            
            # Tenta converter para numérico para estatísticas
            try:
                valores_numericos = pd.to_numeric(self.df[coluna], errors='coerce')
                valores_validos = valores_numericos.dropna()
                
                if len(valores_validos) > 0:
                    print(f"  Mínimo: {valores_validos.min()}")
                    print(f"  Máximo: {valores_validos.max()}")
                    print(f"  Média: {valores_validos.mean():.2f}")
                    print(f"  Mediana: {valores_validos.median():.2f}")
            except:
                pass
            
            # Valores únicos (limitado a 10)
            valores_unicos = self.df[coluna].dropna().unique()
            if len(valores_unicos) <= 10:
                print(f"  Valores únicos: {list(valores_unicos)}")
            else:
                print(f"  Valores únicos: {len(valores_unicos)} (muitos para mostrar)")

    def filtrar_dados(self):
        """Filtra dados por coluna e valor"""
        if self.df is None:
            print("Nenhum arquivo carregado!")
            return
        
        print(f"\n=== FILTRAR DADOS ===")
        print("Colunas disponíveis:")
        for i, coluna in enumerate(self.df.columns, 1):
            print(f"  {i}. {coluna}")
        
        try:
            escolha = int(input("\nEscolha a coluna para filtrar: ")) - 1
            if 0 <= escolha < len(self.df.columns):
                coluna = self.df.columns[escolha]
                valor = input(f"Digite o valor para filtrar em '{coluna}': ").strip()
                
                if valor:
                    # Aplica filtro
                    dados_filtrados = self.df[self.df[coluna].astype(str).str.contains(valor, case=False, na=False)]
                    
                    print(f"\n=== RESULTADOS DO FILTRO ===")
                    print(f"Filtro: {coluna} contém '{valor}'")
                    print(f"Resultados encontrados: {len(dados_filtrados)}")
                    
                    if len(dados_filtrados) > 0:
                        print("\nPrimeiros resultados:")
                        for i, (_, linha) in enumerate(dados_filtrados.head(5).iterrows()):
                            print(f"{i+1}. {' | '.join(str(valor) for valor in linha)}")
                        
                        if len(dados_filtrados) > 5:
                            print(f"... e mais {len(dados_filtrados) - 5} resultados")
                        
                        # Opção para exportar
                        exportar = input("\nDeseja exportar os resultados filtrados? (s/n): ").lower().startswith('s')
                        if exportar:
                            self.exportar_dados(dados_filtrados, f"filtrado_{coluna}_{valor}")
                    else:
                        print("Nenhum resultado encontrado.")
                else:
                    print("Valor de filtro não pode estar vazio!")
            else:
                print("Opção inválida!")
        except ValueError:
            print("Digite um número válido!")

    def exportar_dados(self, dados, nome_arquivo):
        """Exporta dados para um novo arquivo CSV"""
        try:
            nome_completo = f"{nome_arquivo}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
            dados.to_csv(nome_completo, index=False, encoding='utf-8')
            print(f"✓ Dados exportados para: {nome_completo}")
        except Exception as e:
            print(f"✗ Erro ao exportar dados: {e}")

    def criar_arquivo_exemplo(self):
        """Cria um arquivo CSV de exemplo"""
        dados_exemplo = [
            ['Nome', 'Idade', 'Cidade', 'Profissao', 'Salario'],
            ['João Silva', '25', 'São Paulo', 'Desenvolvedor', '5000'],
            ['Maria Santos', '30', 'Rio de Janeiro', 'Designer', '4500'],
            ['Pedro Costa', '28', 'Belo Horizonte', 'Analista', '6000'],
            ['Ana Oliveira', '35', 'Salvador', 'Gerente', '8000'],
            ['Carlos Lima', '27', 'Fortaleza', 'Programador', '5500'],
            ['Lucia Ferreira', '32', 'Recife', 'Arquiteta', '7000'],
            ['Roberto Alves', '29', 'Brasília', 'Consultor', '6500'],
            ['Fernanda Rocha', '31', 'Curitiba', 'Advogada', '7500'],
            ['Marcos Pereira', '26', 'Porto Alegre', 'Engenheiro', '6000'],
            ['Juliana Martins', '33', 'Manaus', 'Médica', '12000']
        ]
        
        try:
            with open('dados_exemplo.csv', 'w', newline='', encoding='utf-8') as arquivo:
                writer = csv.writer(arquivo)
                writer.writerows(dados_exemplo)
            print("✓ Arquivo de exemplo criado: dados_exemplo.csv")
        except Exception as e:
            print(f"✗ Erro ao criar arquivo de exemplo: {e}")

    def executar(self):
        """Executa o programa principal"""
        print("=== LEITOR DE CSV ===")
        
        while True:
            print("\nEscolha uma opção:")
            print("1. Carregar arquivo CSV")
            print("2. Visualizar dados")
            print("3. Estatísticas básicas")
            print("4. Filtrar dados")
            print("5. Criar arquivo de exemplo")
            print("6. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                caminho = input("Digite o caminho do arquivo CSV: ").strip()
                if caminho:
                    self.carregar_arquivo(caminho)
                else:
                    print("Caminho não pode estar vazio!")
            
            elif opcao == '2':
                if self.df is not None:
                    try:
                        linhas = int(input("Quantas linhas mostrar? (padrão: 10): ") or "10")
                        self.visualizar_dados(linhas)
                    except ValueError:
                        self.visualizar_dados()
                else:
                    print("Nenhum arquivo carregado!")
            
            elif opcao == '3':
                self.estatisticas_basicas()
            
            elif opcao == '4':
                self.filtrar_dados()
            
            elif opcao == '5':
                self.criar_arquivo_exemplo()
            
            elif opcao == '6':
                print("\nObrigado por usar o Leitor de CSV!")
                break
            
            else:
                print("Opção inválida!")
            
            input("\nPressione Enter para continuar...")

if __name__ == "__main__":
    leitor = LeitorCSV()
    leitor.executar() 