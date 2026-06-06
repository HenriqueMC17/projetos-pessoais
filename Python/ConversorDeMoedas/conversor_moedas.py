"""
Conversor de Moedas
Autor: Seu Nome
Data: 2024
Descrição: Conversor de moedas CLI com histórico e taxas online (API) ou fallback local.
"""

import requests
import json
from datetime import datetime

class ConversorMoedas:
    def __init__(self):
        # Dicionário de moedas suportadas
        self.moedas = {
            '1': {'nome': 'Real (BRL)', 'codigo': 'BRL'},
            '2': {'nome': 'Dólar (USD)', 'codigo': 'USD'},
            '3': {'nome': 'Euro (EUR)', 'codigo': 'EUR'},
            '4': {'nome': 'Libra (GBP)', 'codigo': 'GBP'},
            '5': {'nome': 'Iene (JPY)', 'codigo': 'JPY'},
            '6': {'nome': 'Franco Suíço (CHF)', 'codigo': 'CHF'},
            '7': {'nome': 'Dólar Canadense (CAD)', 'codigo': 'CAD'},
            '8': {'nome': 'Peso Argentino (ARS)', 'codigo': 'ARS'}
        }
        self.historico = []

    def obter_taxa_cambio(self, moeda_origem, moeda_destino):
        """Obtém a taxa de câmbio atual da API ou retorna taxa fixa como fallback."""
        try:
            url = f"https://api.exchangerate-api.com/v4/latest/{moeda_origem}"
            response = requests.get(url, timeout=5)
            response.raise_for_status()
            dados = response.json()
            return dados['rates'].get(moeda_destino, 1)
        except Exception as e:
            print(f"[Aviso] Não foi possível acessar a API. Usando taxas fixas. ({e})")
            taxas_fixas = {
                'USD': {'BRL': 5.0, 'EUR': 0.85, 'GBP': 0.73, 'JPY': 110.0},
                'BRL': {'USD': 0.2, 'EUR': 0.17, 'GBP': 0.15, 'JPY': 22.0},
                'EUR': {'USD': 1.18, 'BRL': 5.88, 'GBP': 0.86, 'JPY': 129.0},
                'GBP': {'USD': 1.37, 'BRL': 6.85, 'EUR': 1.16, 'JPY': 150.0}
            }
            return taxas_fixas.get(moeda_origem, {}).get(moeda_destino, 1)

    def converter_moeda(self, valor, moeda_origem, moeda_destino):
        """Converte um valor de uma moeda para outra."""
        taxa = self.obter_taxa_cambio(moeda_origem, moeda_destino)
        if taxa:
            resultado = valor * taxa
            self.adicionar_historico(valor, moeda_origem, resultado, moeda_destino, taxa)
            return resultado
        return None

    def adicionar_historico(self, valor_origem, moeda_origem, valor_destino, moeda_destino, taxa):
        """Adiciona conversão ao histórico."""
        conversao = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
            'valor_origem': valor_origem,
            'moeda_origem': moeda_origem,
            'valor_destino': valor_destino,
            'moeda_destino': moeda_destino,
            'taxa': taxa
        }
        self.historico.append(conversao)

    def exibir_moedas(self):
        """Exibe lista de moedas disponíveis."""
        print("\n=== MOEDAS DISPONÍVEIS ===")
        for codigo, info in self.moedas.items():
            print(f"{codigo}. {info['nome']}")

    def exibir_historico(self):
        """Exibe histórico de conversões."""
        if not self.historico:
            print("\nNenhuma conversão realizada ainda.")
            return
        print("\n=== HISTÓRICO DE CONVERSÕES ===")
        for i, conversao in enumerate(self.historico[-5:], 1):  # Últimas 5 conversões
            print(f"{i}. {conversao['data']} - {conversao['valor_origem']} {conversao['moeda_origem']} = "
                  f"{conversao['valor_destino']:.2f} {conversao['moeda_destino']} (Taxa: {conversao['taxa']:.4f})")

    def executar(self):
        """Executa o programa principal."""
        print("\n=== CONVERSOR DE MOEDAS ===")
        while True:
            print("\nEscolha uma opção:")
            print("1. Fazer conversão")
            print("2. Ver histórico")
            print("3. Sair")
            opcao = input("\nOpção: ").strip()
            if opcao == '1':
                self.exibir_moedas()
                # Seleção da moeda de origem
                while True:
                    origem = input("\nEscolha a moeda de origem (1-8): ").strip()
                    if origem in self.moedas:
                        break
                    print("Opção inválida! Escolha de 1 a 8.")
                # Seleção da moeda de destino
                while True:
                    destino = input("Escolha a moeda de destino (1-8): ").strip()
                    if destino in self.moedas and destino != origem:
                        break
                    print("Opção inválida! Escolha de 1 a 8 e diferente da origem.")
                # Entrada do valor
                while True:
                    try:
                        valor = float(input("Digite o valor a ser convertido: ").replace(",", "."))
                        if valor > 0:
                            break
                        print("O valor deve ser maior que zero!")
                    except ValueError:
                        print("Digite um número válido!")
                # Conversão
                moeda_origem = self.moedas[origem]['codigo']
                moeda_destino = self.moedas[destino]['codigo']
                resultado = self.converter_moeda(valor, moeda_origem, moeda_destino)
                if resultado:
                    print(f"\n=== RESULTADO ===")
                    print(f"{valor:.2f} {moeda_origem} = {resultado:.2f} {moeda_destino}")
                else:
                    print("\nErro na conversão. Verifique sua conexão com a internet ou tente novamente.")
            elif opcao == '2':
                self.exibir_historico()
            elif opcao == '3':
                print("\nObrigado por usar o Conversor de Moedas! Até logo.")
                break
            else:
                print("Opção inválida! Tente novamente.")

if __name__ == "__main__":
    conversor = ConversorMoedas()
    conversor.executar() 