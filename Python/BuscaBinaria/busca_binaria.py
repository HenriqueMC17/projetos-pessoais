import random
import time
from datetime import datetime

class BuscaBinaria:
    def __init__(self):
        self.array = []
        self.historico = []

    def gerar_array_aleatorio(self, tamanho, min_valor=1, max_valor=100):
        """Gera um array aleatório ordenado"""
        self.array = sorted(random.sample(range(min_valor, max_valor + 1), tamanho))
        return self.array

    def inserir_array_manual(self):
        """Permite inserir array manualmente"""
        print("\nDigite os números separados por espaço:")
        entrada = input("Array: ").strip()
        
        try:
            numeros = [int(x) for x in entrada.split()]
            self.array = sorted(numeros)
            print(f"✓ Array ordenado: {self.array}")
            return True
        except ValueError:
            print("✗ Entrada inválida! Digite apenas números separados por espaço.")
            return False

    def busca_binaria_iterativa(self, valor, mostrar_passos=True):
        """Implementação iterativa da busca binária"""
        esquerda = 0
        direita = len(self.array) - 1
        passos = 0
        
        if mostrar_passos:
            print(f"\n=== BUSCA BINÁRIA ITERATIVA ===")
            print(f"Procurando: {valor}")
            print(f"Array: {self.array}")
            print()
        
        while esquerda <= direita:
            passos += 1
            meio = (esquerda + direita) // 2
            
            if mostrar_passos:
                self.mostrar_passo_busca(esquerda, meio, direita, passos)
            
            if self.array[meio] == valor:
                if mostrar_passos:
                    print(f"✓ Encontrado na posição {meio} em {passos} passos!")
                return meio, passos
            elif self.array[meio] < valor:
                esquerda = meio + 1
            else:
                direita = meio - 1
        
        if mostrar_passos:
            print(f"✗ Valor {valor} não encontrado em {passos} passos!")
        return -1, passos

    def busca_binaria_recursiva(self, valor, esquerda=0, direita=None, passos=0, mostrar_passos=True):
        """Implementação recursiva da busca binária"""
        if direita is None:
            direita = len(self.array) - 1
            if mostrar_passos:
                print(f"\n=== BUSCA BINÁRIA RECURSIVA ===")
                print(f"Procurando: {valor}")
                print(f"Array: {self.array}")
                print()
        
        if esquerda > direita:
            if mostrar_passos:
                print(f"✗ Valor {valor} não encontrado em {passos} passos!")
            return -1, passos
        
        passos += 1
        meio = (esquerda + direita) // 2
        
        if mostrar_passos:
            self.mostrar_passo_busca(esquerda, meio, direita, passos)
        
        if self.array[meio] == valor:
            if mostrar_passos:
                print(f"✓ Encontrado na posição {meio} em {passos} passos!")
            return meio, passos
        elif self.array[meio] < valor:
            return self.busca_binaria_recursiva(valor, meio + 1, direita, passos, mostrar_passos)
        else:
            return self.busca_binaria_recursiva(valor, esquerda, meio - 1, passos, mostrar_passos)

    def busca_linear(self, valor, mostrar_passos=True):
        """Implementação da busca linear para comparação"""
        passos = 0
        
        if mostrar_passos:
            print(f"\n=== BUSCA LINEAR ===")
            print(f"Procurando: {valor}")
            print(f"Array: {self.array}")
            print()
        
        for i, elemento in enumerate(self.array):
            passos += 1
            
            if mostrar_passos:
                print(f"Passo {passos}: Verificando posição {i} = {elemento}")
            
            if elemento == valor:
                if mostrar_passos:
                    print(f"✓ Encontrado na posição {i} em {passos} passos!")
                return i, passos
        
        if mostrar_passos:
            print(f"✗ Valor {valor} não encontrado em {passos} passos!")
        return -1, passos

    def mostrar_passo_busca(self, esquerda, meio, direita, passo):
        """Mostra visualmente um passo da busca binária"""
        print(f"Passo {passo}:")
        print(f"  Esquerda: {esquerda} ({self.array[esquerda] if esquerda < len(self.array) else 'N/A'})")
        print(f"  Meio: {meio} ({self.array[meio]})")
        print(f"  Direita: {direita} ({self.array[direita] if direita < len(self.array) else 'N/A'})")
        
        # Visualização do array
        array_viz = []
        for i in range(len(self.array)):
            if i == esquerda:
                array_viz.append(f"[{self.array[i]}")
            elif i == meio:
                array_viz.append(f"*{self.array[i]}*")
            elif i == direita:
                array_viz.append(f"{self.array[i]}]")
            else:
                array_viz.append(str(self.array[i]))
        
        print(f"  Array: {' '.join(array_viz)}")
        print()

    def ordenar_por_insercao(self, array):
        """Ordena array usando insertion sort"""
        arr = array.copy()
        passos = 0
        
        for i in range(1, len(arr)):
            chave = arr[i]
            j = i - 1
            
            while j >= 0 and arr[j] > chave:
                arr[j + 1] = arr[j]
                j -= 1
                passos += 1
            
            arr[j + 1] = chave
            passos += 1
        
        return arr, passos

    def ordenar_por_selecao(self, array):
        """Ordena array usando selection sort"""
        arr = array.copy()
        passos = 0
        
        for i in range(len(arr)):
            min_idx = i
            for j in range(i + 1, len(arr)):
                if arr[j] < arr[min_idx]:
                    min_idx = j
                passos += 1
            
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
            passos += 1
        
        return arr, passos

    def comparar_algoritmos(self, valor):
        """Compara diferentes algoritmos de busca"""
        if not self.array:
            print("Array vazio! Gere ou insira um array primeiro.")
            return
        
        print(f"\n=== COMPARAÇÃO DE ALGORITMOS ===")
        print(f"Array: {self.array}")
        print(f"Procurando: {valor}")
        print()
        
        # Busca binária iterativa
        inicio = time.time()
        pos_bin_iter, passos_bin_iter = self.busca_binaria_iterativa(valor, mostrar_passos=False)
        tempo_bin_iter = time.time() - inicio
        
        # Busca binária recursiva
        inicio = time.time()
        pos_bin_rec, passos_bin_rec = self.busca_binaria_recursiva(valor, mostrar_passos=False)
        tempo_bin_rec = time.time() - inicio
        
        # Busca linear
        inicio = time.time()
        pos_linear, passos_linear = self.busca_linear(valor, mostrar_passos=False)
        tempo_linear = time.time() - inicio
        
        # Resultados
        print("RESULTADOS:")
        print(f"{'Algoritmo':<20} {'Posição':<10} {'Passos':<10} {'Tempo (ms)':<12}")
        print("-" * 55)
        print(f"{'Binária Iterativa':<20} {pos_bin_iter:<10} {passos_bin_iter:<10} {tempo_bin_iter*1000:<12.3f}")
        print(f"{'Binária Recursiva':<20} {pos_bin_rec:<10} {passos_bin_rec:<10} {tempo_bin_rec*1000:<12.3f}")
        print(f"{'Linear':<20} {pos_linear:<10} {passos_linear:<10} {tempo_linear*1000:<12.3f}")
        
        # Adiciona ao histórico
        self.adicionar_historico(valor, pos_bin_iter, passos_bin_iter, passos_linear)

    def adicionar_historico(self, valor, posicao, passos_binaria, passos_linear):
        """Adiciona busca ao histórico"""
        entrada = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
            'valor': valor,
            'posicao': posicao,
            'passos_binaria': passos_binaria,
            'passos_linear': passos_linear,
            'tamanho_array': len(self.array)
        }
        self.historico.append(entrada)

    def exibir_historico(self):
        """Exibe histórico de buscas"""
        if not self.historico:
            print("\nNenhuma busca realizada ainda.")
            return

        print("\n=== HISTÓRICO DE BUSCAS ===")
        for i, entrada in enumerate(self.historico[-10:], 1):  # Últimas 10 buscas
            resultado = f"posição {entrada['posicao']}" if entrada['posicao'] != -1 else "não encontrado"
            print(f"{i}. {entrada['data']} - Valor {entrada['valor']} ({resultado})")
            print(f"   Array: {entrada['tamanho_array']} elementos, "
                  f"Binária: {entrada['passos_binaria']} passos, "
                  f"Linear: {entrada['passos_linear']} passos")

    def executar(self):
        """Executa o programa principal"""
        print("=== BUSCA BINÁRIA ===")
        
        while True:
            print(f"\nArray atual: {self.array if self.array else 'Vazio'}")
            print("\nEscolha uma opção:")
            print("1. Gerar array aleatório")
            print("2. Inserir array manualmente")
            print("3. Busca binária iterativa")
            print("4. Busca binária recursiva")
            print("5. Busca linear")
            print("6. Comparar algoritmos")
            print("7. Ver histórico")
            print("8. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                try:
                    tamanho = int(input("Tamanho do array: "))
                    if tamanho > 0:
                        self.gerar_array_aleatorio(tamanho)
                        print(f"✓ Array gerado: {self.array}")
                    else:
                        print("Tamanho deve ser maior que zero!")
                except ValueError:
                    print("Digite um número válido!")
            
            elif opcao == '2':
                self.inserir_array_manual()
            
            elif opcao in ['3', '4', '5']:
                if not self.array:
                    print("Array vazio! Gere ou insira um array primeiro.")
                    continue
                
                try:
                    valor = int(input("Digite o valor a buscar: "))
                    
                    if opcao == '3':
                        self.busca_binaria_iterativa(valor)
                    elif opcao == '4':
                        self.busca_binaria_recursiva(valor)
                    elif opcao == '5':
                        self.busca_linear(valor)
                    
                    input("\nPressione Enter para continuar...")
                except ValueError:
                    print("Digite um número válido!")
            
            elif opcao == '6':
                if not self.array:
                    print("Array vazio! Gere ou insira um array primeiro.")
                    continue
                
                try:
                    valor = int(input("Digite o valor a buscar: "))
                    self.comparar_algoritmos(valor)
                    input("\nPressione Enter para continuar...")
                except ValueError:
                    print("Digite um número válido!")
            
            elif opcao == '7':
                self.exibir_historico()
                input("\nPressione Enter para continuar...")
            
            elif opcao == '8':
                print("\nObrigado por usar a Busca Binária!")
                break
            
            else:
                print("Opção inválida!")

if __name__ == "__main__":
    busca = BuscaBinaria()
    busca.executar() 