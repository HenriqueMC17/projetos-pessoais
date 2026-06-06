import re
import random
from datetime import datetime

class ValidadorCPF:
    def __init__(self):
        self.historico = []

    def limpar_cpf(self, cpf):
        """Remove caracteres não numéricos do CPF"""
        return re.sub(r'[^0-9]', '', cpf)

    def validar_formato(self, cpf):
        """Valida o formato do CPF"""
        # Remove formatação
        cpf_limpo = self.limpar_cpf(cpf)
        
        # Verifica se tem 11 dígitos
        if len(cpf_limpo) != 11:
            return False, "CPF deve ter 11 dígitos"
        
        # Verifica se todos os dígitos são iguais
        if len(set(cpf_limpo)) == 1:
            return False, "CPF não pode ter todos os dígitos iguais"
        
        return True, cpf_limpo

    def calcular_digito_verificador(self, cpf_parcial, peso_inicial):
        """Calcula um dígito verificador"""
        soma = 0
        for i, digito in enumerate(cpf_parcial):
            peso = peso_inicial - i
            soma += int(digito) * peso
        
        resto = soma % 11
        if resto < 2:
            return '0'
        else:
            return str(11 - resto)

    def validar_cpf(self, cpf):
        """Valida um CPF usando o algoritmo oficial brasileiro"""
        # Valida formato
        formato_valido, resultado = self.validar_formato(cpf)
        if not formato_valido:
            return False, resultado
        
        cpf_limpo = resultado
        
        # Calcula primeiro dígito verificador
        primeiro_digito = self.calcular_digito_verificador(cpf_limpo[:9], 10)
        
        # Calcula segundo dígito verificador
        segundo_digito = self.calcular_digito_verificador(cpf_limpo[:9] + primeiro_digito, 11)
        
        # Verifica se os dígitos calculados coincidem com os fornecidos
        digitos_calculados = primeiro_digito + segundo_digito
        digitos_fornecidos = cpf_limpo[9:11]
        
        if digitos_calculados == digitos_fornecidos:
            return True, "CPF válido"
        else:
            return False, "CPF inválido - dígitos verificadores incorretos"

    def gerar_cpf_valido(self):
        """Gera um CPF válido"""
        # Gera os 9 primeiros dígitos
        cpf_parcial = ''.join([str(random.randint(0, 9)) for _ in range(9)])
        
        # Calcula primeiro dígito verificador
        primeiro_digito = self.calcular_digito_verificador(cpf_parcial, 10)
        
        # Calcula segundo dígito verificador
        segundo_digito = self.calcular_digito_verificador(cpf_parcial + primeiro_digito, 11)
        
        # Monta o CPF completo
        cpf_completo = cpf_parcial + primeiro_digito + segundo_digito
        
        # Formata o CPF
        cpf_formatado = f"{cpf_completo[:3]}.{cpf_completo[3:6]}.{cpf_completo[6:9]}-{cpf_completo[9:11]}"
        
        return cpf_completo, cpf_formatado

    def adicionar_historico(self, cpf, resultado, valido):
        """Adiciona validação ao histórico"""
        entrada = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
            'cpf': cpf,
            'resultado': resultado,
            'valido': valido
        }
        self.historico.append(entrada)

    def exibir_historico(self):
        """Exibe histórico de validações"""
        if not self.historico:
            print("\nNenhuma validação realizada ainda.")
            return

        print("\n=== HISTÓRICO DE VALIDAÇÕES ===")
        for i, entrada in enumerate(self.historico[-10:], 1):  # Últimas 10 validações
            status = "✓ VÁLIDO" if entrada['valido'] else "✗ INVÁLIDO"
            print(f"{i}. {entrada['data']} - {entrada['cpf']} - {status}")

    def limpar_historico(self):
        """Limpa o histórico de validações"""
        self.historico.clear()
        print("Histórico limpo com sucesso!")

    def executar(self):
        """Executa o programa principal"""
        print("=== VALIDADOR DE CPF ===")
        
        while True:
            print("\nEscolha uma opção:")
            print("1. Validar CPF")
            print("2. Gerar CPF válido")
            print("3. Ver histórico")
            print("4. Limpar histórico")
            print("5. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                cpf = input("\nDigite o CPF (com ou sem formatação): ").strip()
                
                if not cpf:
                    print("CPF não pode estar vazio!")
                    continue
                
                # Valida o CPF
                valido, resultado = self.validar_cpf(cpf)
                
                print(f"\n=== RESULTADO DA VALIDAÇÃO ===")
                print(f"CPF: {cpf}")
                print(f"Resultado: {resultado}")
                
                if valido:
                    # Formata o CPF para exibição
                    cpf_limpo = self.limpar_cpf(cpf)
                    cpf_formatado = f"{cpf_limpo[:3]}.{cpf_limpo[3:6]}.{cpf_limpo[6:9]}-{cpf_limpo[9:11]}"
                    print(f"CPF formatado: {cpf_formatado}")
                
                # Salva no histórico
                self.adicionar_historico(cpf, resultado, valido)
            
            elif opcao == '2':
                quantidade = 1
                try:
                    quantidade = int(input("\nQuantos CPFs gerar? (padrão: 1): ") or "1")
                    if quantidade < 1:
                        quantidade = 1
                except ValueError:
                    quantidade = 1
                
                print(f"\n=== {quantidade} CPF(S) GERADO(S) ===")
                for i in range(quantidade):
                    cpf_limpo, cpf_formatado = self.gerar_cpf_valido()
                    print(f"{i+1}. {cpf_formatado} (sem formatação: {cpf_limpo})")
            
            elif opcao == '3':
                self.exibir_historico()
            
            elif opcao == '4':
                confirmacao = input("Tem certeza que deseja limpar o histórico? (s/n): ").lower().startswith('s')
                if confirmacao:
                    self.limpar_historico()
            
            elif opcao == '5':
                print("\nObrigado por usar o Validador de CPF!")
                break
            
            else:
                print("Opção inválida!")

if __name__ == "__main__":
    validador = ValidadorCPF()
    validador.executar() 