import random
import string
from datetime import datetime

class GeradorSenha:
    def __init__(self):
        self.historico = []
        self.caracteres = {
            'maiusculas': string.ascii_uppercase,
            'minusculas': string.ascii_lowercase,
            'numeros': string.digits,
            'simbolos': '!@#$%^&*()_+-=[]{}|;:,.<>?'
        }

    def gerar_senha(self, comprimento, usar_maiusculas=True, usar_minusculas=True, 
                    usar_numeros=True, usar_simbolos=False):
        """Gera uma senha aleatória com os critérios especificados"""
        # Constrói o conjunto de caracteres disponíveis
        chars_disponiveis = ""
        if usar_maiusculas:
            chars_disponiveis += self.caracteres['maiusculas']
        if usar_minusculas:
            chars_disponiveis += self.caracteres['minusculas']
        if usar_numeros:
            chars_disponiveis += self.caracteres['numeros']
        if usar_simbolos:
            chars_disponiveis += self.caracteres['simbolos']
        
        # Garante que pelo menos um caractere de cada tipo selecionado seja incluído
        senha = ""
        if usar_maiusculas:
            senha += random.choice(self.caracteres['maiusculas'])
        if usar_minusculas:
            senha += random.choice(self.caracteres['minusculas'])
        if usar_numeros:
            senha += random.choice(self.caracteres['numeros'])
        if usar_simbolos:
            senha += random.choice(self.caracteres['simbolos'])
        
        # Completa o resto da senha com caracteres aleatórios
        chars_restantes = comprimento - len(senha)
        if chars_restantes > 0:
            senha += ''.join(random.choice(chars_disponiveis) for _ in range(chars_restantes))
        
        # Embaralha a senha para não ter padrão previsível
        senha_lista = list(senha)
        random.shuffle(senha_lista)
        return ''.join(senha_lista)

    def avaliar_forca(self, senha):
        """Avalia a força da senha"""
        pontos = 0
        
        # Comprimento
        if len(senha) >= 8:
            pontos += 1
        if len(senha) >= 12:
            pontos += 1
        if len(senha) >= 16:
            pontos += 1
        
        # Tipos de caracteres
        if any(c.isupper() for c in senha):
            pontos += 1
        if any(c.islower() for c in senha):
            pontos += 1
        if any(c.isdigit() for c in senha):
            pontos += 1
        if any(c in self.caracteres['simbolos'] for c in senha):
            pontos += 1
        
        # Avaliação da força
        if pontos <= 3:
            return "Fraca"
        elif pontos <= 5:
            return "Média"
        elif pontos <= 7:
            return "Forte"
        else:
            return "Muito Forte"

    def adicionar_historico(self, senha, comprimento, forca):
        """Adiciona senha ao histórico"""
        entrada = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
            'senha': senha,
            'comprimento': comprimento,
            'forca': forca
        }
        self.historico.append(entrada)

    def exibir_historico(self):
        """Exibe histórico de senhas geradas"""
        if not self.historico:
            print("\nNenhuma senha gerada ainda.")
            return

        print("\n=== HISTÓRICO DE SENHAS ===")
        for i, entrada in enumerate(self.historico[-10:], 1):  # Últimas 10 senhas
            print(f"{i}. {entrada['data']} - {entrada['senha']} "
                  f"(Comprimento: {entrada['comprimento']}, Força: {entrada['forca']})")

    def limpar_historico(self):
        """Limpa o histórico de senhas"""
        self.historico.clear()
        print("Histórico limpo com sucesso!")

    def executar(self):
        """Executa o programa principal"""
        print("=== GERADOR DE SENHA ===")
        
        while True:
            print("\nEscolha uma opção:")
            print("1. Gerar nova senha")
            print("2. Gerar múltiplas senhas")
            print("3. Ver histórico")
            print("4. Limpar histórico")
            print("5. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                # Configuração da senha
                while True:
                    try:
                        comprimento = int(input("\nDigite o comprimento da senha (mínimo 4): "))
                        if comprimento >= 4:
                            break
                        print("O comprimento deve ser pelo menos 4!")
                    except ValueError:
                        print("Digite um número válido!")
                
                # Opções de caracteres
                print("\nSelecione os tipos de caracteres:")
                usar_maiusculas = input("Incluir letras maiúsculas? (s/n): ").lower().startswith('s')
                usar_minusculas = input("Incluir letras minúsculas? (s/n): ").lower().startswith('s')
                usar_numeros = input("Incluir números? (s/n): ").lower().startswith('s')
                usar_simbolos = input("Incluir símbolos? (s/n): ").lower().startswith('s')
                
                # Verifica se pelo menos um tipo foi selecionado
                if not any([usar_maiusculas, usar_minusculas, usar_numeros, usar_simbolos]):
                    print("Você deve selecionar pelo menos um tipo de caractere!")
                    continue
                
                # Gera a senha
                senha = self.gerar_senha(comprimento, usar_maiusculas, usar_minusculas, 
                                       usar_numeros, usar_simbolos)
                forca = self.avaliar_forca(senha)
                
                print(f"\n=== SENHA GERADA ===")
                print(f"Senha: {senha}")
                print(f"Comprimento: {len(senha)}")
                print(f"Força: {forca}")
                
                # Salva no histórico
                salvar = input("\nDeseja salvar no histórico? (s/n): ").lower().startswith('s')
                if salvar:
                    self.adicionar_historico(senha, len(senha), forca)
                    print("Senha salva no histórico!")
            
            elif opcao == '2':
                # Gera múltiplas senhas
                try:
                    quantidade = int(input("\nQuantas senhas gerar? "))
                    comprimento = int(input("Comprimento das senhas: "))
                    
                    print(f"\n=== {quantidade} SENHAS GERADAS ===")
                    for i in range(quantidade):
                        senha = self.gerar_senha(comprimento, True, True, True, True)
                        forca = self.avaliar_forca(senha)
                        print(f"{i+1}. {senha} (Força: {forca})")
                
                except ValueError:
                    print("Digite números válidos!")
            
            elif opcao == '3':
                self.exibir_historico()
            
            elif opcao == '4':
                confirmacao = input("Tem certeza que deseja limpar o histórico? (s/n): ").lower().startswith('s')
                if confirmacao:
                    self.limpar_historico()
            
            elif opcao == '5':
                print("\nObrigado por usar o Gerador de Senha!")
                break
            
            else:
                print("Opção inválida!")

if __name__ == "__main__":
    gerador = GeradorSenha()
    gerador.executar() 