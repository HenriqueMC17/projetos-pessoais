import re
from datetime import datetime

class ConversorBinario:
    def __init__(self):
        self.historico = []

    def validar_binario(self, numero):
        """Valida se a entrada é um número binário válido"""
        if not numero:
            return False
        return re.match(r'^[01]+$', numero) is not None

    def validar_decimal(self, numero):
        """Valida se a entrada é um número decimal válido"""
        try:
            valor = int(numero)
            return valor >= 0
        except ValueError:
            return False

    def validar_hexadecimal(self, numero):
        """Valida se a entrada é um número hexadecimal válido"""
        if not numero:
            return False
        return re.match(r'^[0-9A-Fa-f]+$', numero) is not None

    def validar_octal(self, numero):
        """Valida se a entrada é um número octal válido"""
        if not numero:
            return False
        return re.match(r'^[0-7]+$', numero) is not None

    def decimal_para_binario(self, decimal, mostrar_processo=True):
        """Converte decimal para binário"""
        if not self.validar_decimal(decimal):
            return None, "Número decimal inválido"
        
        numero = int(decimal)
        if numero == 0:
            return "0", []
        
        binario = ""
        passos = []
        numero_original = numero
        
        if mostrar_processo:
            print(f"\n=== CONVERSÃO DECIMAL → BINÁRIO ===")
            print(f"Número decimal: {numero}")
            print("\nProcesso de divisão por 2:")
        
        while numero > 0:
            resto = numero % 2
            quociente = numero // 2
            
            if mostrar_processo:
                print(f"{numero} ÷ 2 = {quociente} (resto {resto})")
            
            passos.append((numero, quociente, resto))
            binario = str(resto) + binario
            numero = quociente
        
        if mostrar_processo:
            print(f"\nLendo os restos de baixo para cima:")
            for i, (dividendo, quociente, resto) in enumerate(passos):
                print(f"Passo {i+1}: {dividendo} ÷ 2 = {quociente} (resto {resto})")
            
            print(f"\nResultado: {binario}")
        
        return binario, passos

    def binario_para_decimal(self, binario, mostrar_processo=True):
        """Converte binário para decimal"""
        if not self.validar_binario(binario):
            return None, "Número binário inválido"
        
        decimal = 0
        passos = []
        
        if mostrar_processo:
            print(f"\n=== CONVERSÃO BINÁRIO → DECIMAL ===")
            print(f"Número binário: {binario}")
            print("\nProcesso de multiplicação por potências de 2:")
        
        for i, bit in enumerate(reversed(binario)):
            valor = int(bit) * (2 ** i)
            decimal += valor
            
            if mostrar_processo:
                print(f"Bit {bit} na posição {i}: {bit} × 2^{i} = {bit} × {2**i} = {valor}")
            
            passos.append((bit, i, 2**i, valor))
        
        if mostrar_processo:
            print(f"\nSoma total: {decimal}")
        
        return decimal, passos

    def decimal_para_hexadecimal(self, decimal, mostrar_processo=True):
        """Converte decimal para hexadecimal"""
        if not self.validar_decimal(decimal):
            return None, "Número decimal inválido"
        
        numero = int(decimal)
        if numero == 0:
            return "0", []
        
        hex_chars = "0123456789ABCDEF"
        hexadecimal = ""
        passos = []
        
        if mostrar_processo:
            print(f"\n=== CONVERSÃO DECIMAL → HEXADECIMAL ===")
            print(f"Número decimal: {numero}")
            print("\nProcesso de divisão por 16:")
        
        while numero > 0:
            resto = numero % 16
            quociente = numero // 16
            
            if mostrar_processo:
                print(f"{numero} ÷ 16 = {quociente} (resto {resto} = '{hex_chars[resto]}')")
            
            passos.append((numero, quociente, resto, hex_chars[resto]))
            hexadecimal = hex_chars[resto] + hexadecimal
            numero = quociente
        
        if mostrar_processo:
            print(f"\nResultado: {hexadecimal}")
        
        return hexadecimal, passos

    def decimal_para_octal(self, decimal, mostrar_processo=True):
        """Converte decimal para octal"""
        if not self.validar_decimal(decimal):
            return None, "Número decimal inválido"
        
        numero = int(decimal)
        if numero == 0:
            return "0", []
        
        octal = ""
        passos = []
        
        if mostrar_processo:
            print(f"\n=== CONVERSÃO DECIMAL → OCTAL ===")
            print(f"Número decimal: {numero}")
            print("\nProcesso de divisão por 8:")
        
        while numero > 0:
            resto = numero % 8
            quociente = numero // 8
            
            if mostrar_processo:
                print(f"{numero} ÷ 8 = {quociente} (resto {resto})")
            
            passos.append((numero, quociente, resto))
            octal = str(resto) + octal
            numero = quociente
        
        if mostrar_processo:
            print(f"\nResultado: {octal}")
        
        return octal, passos

    def hexadecimal_para_decimal(self, hexadecimal, mostrar_processo=True):
        """Converte hexadecimal para decimal"""
        if not self.validar_hexadecimal(hexadecimal):
            return None, "Número hexadecimal inválido"
        
        decimal = 0
        passos = []
        hex_chars = "0123456789ABCDEF"
        
        if mostrar_processo:
            print(f"\n=== CONVERSÃO HEXADECIMAL → DECIMAL ===")
            print(f"Número hexadecimal: {hexadecimal.upper()}")
            print("\nProcesso de multiplicação por potências de 16:")
        
        for i, digito in enumerate(reversed(hexadecimal.upper())):
            valor_digito = hex_chars.index(digito)
            valor = valor_digito * (16 ** i)
            decimal += valor
            
            if mostrar_processo:
                print(f"Dígito '{digito}' na posição {i}: {valor_digito} × 16^{i} = {valor_digito} × {16**i} = {valor}")
            
            passos.append((digito, valor_digito, i, 16**i, valor))
        
        if mostrar_processo:
            print(f"\nSoma total: {decimal}")
        
        return decimal, passos

    def octal_para_decimal(self, octal, mostrar_processo=True):
        """Converte octal para decimal"""
        if not self.validar_octal(octal):
            return None, "Número octal inválido"
        
        decimal = 0
        passos = []
        
        if mostrar_processo:
            print(f"\n=== CONVERSÃO OCTAL → DECIMAL ===")
            print(f"Número octal: {octal}")
            print("\nProcesso de multiplicação por potências de 8:")
        
        for i, digito in enumerate(reversed(octal)):
            valor = int(digito) * (8 ** i)
            decimal += valor
            
            if mostrar_processo:
                print(f"Dígito {digito} na posição {i}: {digito} × 8^{i} = {digito} × {8**i} = {valor}")
            
            passos.append((digito, i, 8**i, valor))
        
        if mostrar_processo:
            print(f"\nSoma total: {decimal}")
        
        return decimal, passos

    def converter_todos(self, decimal):
        """Converte um número decimal para todas as bases"""
        if not self.validar_decimal(decimal):
            print("Número decimal inválido!")
            return
        
        numero = int(decimal)
        
        print(f"\n=== CONVERSÕES DO NÚMERO {numero} ===")
        
        # Decimal para binário
        binario, _ = self.decimal_para_binario(numero, mostrar_processo=False)
        print(f"Binário: {binario}")
        
        # Decimal para hexadecimal
        hexadecimal, _ = self.decimal_para_hexadecimal(numero, mostrar_processo=False)
        print(f"Hexadecimal: {hexadecimal}")
        
        # Decimal para octal
        octal, _ = self.decimal_para_octal(numero, mostrar_processo=False)
        print(f"Octal: {octal}")
        
        # Verificações
        print(f"\nVerificações:")
        print(f"Binário → Decimal: {self.binario_para_decimal(binario, mostrar_processo=False)[0]}")
        print(f"Hexadecimal → Decimal: {self.hexadecimal_para_decimal(hexadecimal, mostrar_processo=False)[0]}")
        print(f"Octal → Decimal: {self.octal_para_decimal(octal, mostrar_processo=False)[0]}")

    def adicionar_historico(self, entrada, saida, tipo_conversao):
        """Adiciona conversão ao histórico"""
        entrada_historico = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
            'entrada': entrada,
            'saida': saida,
            'tipo': tipo_conversao
        }
        self.historico.append(entrada_historico)

    def exibir_historico(self):
        """Exibe histórico de conversões"""
        if not self.historico:
            print("\nNenhuma conversão realizada ainda.")
            return

        print("\n=== HISTÓRICO DE CONVERSÕES ===")
        for i, entrada in enumerate(self.historico[-10:], 1):  # Últimas 10 conversões
            print(f"{i}. {entrada['data']} - {entrada['tipo']}")
            print(f"   {entrada['entrada']} → {entrada['saida']}")

    def executar(self):
        """Executa o programa principal"""
        print("=== CONVERSOR BINÁRIO-DECIMAL ===")
        
        while True:
            print("\nEscolha uma conversão:")
            print("1. Decimal → Binário")
            print("2. Binário → Decimal")
            print("3. Decimal → Hexadecimal")
            print("4. Decimal → Octal")
            print("5. Hexadecimal → Decimal")
            print("6. Octal → Decimal")
            print("7. Converter para todas as bases")
            print("8. Ver histórico")
            print("9. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                entrada = input("Digite o número decimal: ").strip()
                resultado, _ = self.decimal_para_binario(entrada)
                if resultado is not None:
                    self.adicionar_historico(entrada, resultado, "Decimal → Binário")
            
            elif opcao == '2':
                entrada = input("Digite o número binário: ").strip()
                resultado, _ = self.binario_para_decimal(entrada)
                if resultado is not None:
                    self.adicionar_historico(entrada, str(resultado), "Binário → Decimal")
            
            elif opcao == '3':
                entrada = input("Digite o número decimal: ").strip()
                resultado, _ = self.decimal_para_hexadecimal(entrada)
                if resultado is not None:
                    self.adicionar_historico(entrada, resultado, "Decimal → Hexadecimal")
            
            elif opcao == '4':
                entrada = input("Digite o número decimal: ").strip()
                resultado, _ = self.decimal_para_octal(entrada)
                if resultado is not None:
                    self.adicionar_historico(entrada, resultado, "Decimal → Octal")
            
            elif opcao == '5':
                entrada = input("Digite o número hexadecimal: ").strip()
                resultado, _ = self.hexadecimal_para_decimal(entrada)
                if resultado is not None:
                    self.adicionar_historico(entrada, str(resultado), "Hexadecimal → Decimal")
            
            elif opcao == '6':
                entrada = input("Digite o número octal: ").strip()
                resultado, _ = self.octal_para_decimal(entrada)
                if resultado is not None:
                    self.adicionar_historico(entrada, str(resultado), "Octal → Decimal")
            
            elif opcao == '7':
                entrada = input("Digite o número decimal: ").strip()
                self.converter_todos(entrada)
            
            elif opcao == '8':
                self.exibir_historico()
            
            elif opcao == '9':
                print("\nObrigado por usar o Conversor Binário-Decimal!")
                break
            
            else:
                print("Opção inválida!")
            
            input("\nPressione Enter para continuar...")

if __name__ == "__main__":
    conversor = ConversorBinario()
    conversor.executar() 