import random
import os
from datetime import datetime

class JogoForca:
    def __init__(self):
        self.palavras = {
            'animais': [
                {'palavra': 'ELEFANTE', 'dica': 'Animal grande com tromba'},
                {'palavra': 'GIRAFA', 'dica': 'Animal com pescoço longo'},
                {'palavra': 'LEAO', 'dica': 'Rei da selva'},
                {'palavra': 'MACACO', 'dica': 'Primata que vive em árvores'},
                {'palavra': 'TIGRE', 'dica': 'Felino com listras'},
                {'palavra': 'URSO', 'dica': 'Animal grande e peludo'},
                {'palavra': 'ZEBRA', 'dica': 'Animal com listras pretas e brancas'},
                {'palavra': 'RINOCERONTE', 'dica': 'Animal com chifre no nariz'}
            ],
            'frutas': [
                {'palavra': 'BANANA', 'dica': 'Fruta amarela e alongada'},
                {'palavra': 'LARANJA', 'dica': 'Fruta cítrica laranja'},
                {'palavra': 'MACA', 'dica': 'Fruta que mantém o médico longe'},
                {'palavra': 'MORANGO', 'dica': 'Fruta vermelha e pequena'},
                {'palavra': 'UVA', 'dica': 'Fruta que cresce em cachos'},
                {'palavra': 'ABACAXI', 'dica': 'Fruta tropical com coroa'},
                {'palavra': 'MELANCIA', 'dica': 'Fruta grande e verde por fora'},
                {'palavra': 'MANGA', 'dica': 'Fruta tropical amarela'}
            ],
            'paises': [
                {'palavra': 'BRASIL', 'dica': 'País do futebol e carnaval'},
                {'palavra': 'PORTUGAL', 'dica': 'País que colonizou o Brasil'},
                {'palavra': 'ESPANHA', 'dica': 'País da península ibérica'},
                {'palavra': 'FRANCA', 'dica': 'País da torre Eiffel'},
                {'palavra': 'ITALIA', 'dica': 'País em formato de bota'},
                {'palavra': 'ALEMANHA', 'dica': 'País da Oktoberfest'},
                {'palavra': 'JAPAO', 'dica': 'País do sol nascente'},
                {'palavra': 'CHINA', 'dica': 'País mais populoso do mundo'}
            ],
            'cores': [
                {'palavra': 'AZUL', 'dica': 'Cor do céu'},
                {'palavra': 'VERMELHO', 'dica': 'Cor do sangue'},
                {'palavra': 'VERDE', 'dica': 'Cor da natureza'},
                {'palavra': 'AMARELO', 'dica': 'Cor do sol'},
                {'palavra': 'ROXO', 'dica': 'Cor da realeza'},
                {'palavra': 'LARANJA', 'dica': 'Cor da fruta com mesmo nome'},
                {'palavra': 'ROSA', 'dica': 'Cor romântica'},
                {'palavra': 'PRETO', 'dica': 'Cor da noite'}
            ]
        }
        self.historico = []
        self.pontuacao = 0

    def limpar_tela(self):
        """Limpa a tela do terminal"""
        os.system('cls' if os.name == 'nt' else 'clear')

    def desenhar_forca(self, tentativas_restantes):
        """Desenha a forca baseada no número de tentativas restantes"""
        forca = [
            "  +---+",
            "  |   |",
            "  O   |",
            " /|\\  |",
            " / \\  |",
            "      |",
            "======="
        ]
        
        if tentativas_restantes >= 6:
            forca[2] = "      |"  # Sem cabeça
        if tentativas_restantes >= 5:
            forca[3] = "      |"  # Sem braços
        if tentativas_restantes >= 4:
            forca[3] = "  |   |"  # Braço esquerdo
        if tentativas_restantes >= 3:
            forca[3] = " /|   |"  # Braços
        if tentativas_restantes >= 2:
            forca[4] = "      |"  # Sem pernas
        if tentativas_restantes >= 1:
            forca[4] = " /    |"  # Perna esquerda
        
        return "\n".join(forca)

    def mostrar_palavra_oculta(self, palavra, letras_descobertas):
        """Mostra a palavra com letras ocultas"""
        resultado = ""
        for letra in palavra:
            if letra in letras_descobertas:
                resultado += letra + " "
            else:
                resultado += "_ "
        return resultado.strip()

    def jogar_partida(self, categoria):
        """Executa uma partida do jogo"""
        # Seleciona palavra aleatória
        palavra_info = random.choice(self.palavras[categoria])
        palavra = palavra_info['palavra']
        dica = palavra_info['dica']
        
        letras_descobertas = set()
        letras_tentadas = set()
        tentativas_restantes = 6
        acertos = 0
        
        print(f"\n=== NOVA PARTIDA ===")
        print(f"Categoria: {categoria.upper()}")
        print(f"Dica: {dica}")
        
        while tentativas_restantes > 0:
            self.limpar_tela()
            
            # Desenha a forca
            print(self.desenhar_forca(tentativas_restantes))
            print()
            
            # Mostra informações do jogo
            palavra_oculta = self.mostrar_palavra_oculta(palavra, letras_descobertas)
            print(f"Palavra: {palavra_oculta}")
            print(f"Tentativas restantes: {tentativas_restantes}")
            print(f"Letras tentadas: {' '.join(sorted(letras_tentadas))}")
            print()
            
            # Verifica se ganhou
            if set(palavra) <= letras_descobertas:
                print("🎉 PARABÉNS! Você venceu! 🎉")
                self.pontuacao += 10
                return True, tentativas_restantes
            
            # Entrada do jogador
            entrada = input("Digite uma letra ou a palavra completa: ").strip().upper()
            
            if len(entrada) == 1:  # Uma letra
                if entrada in letras_tentadas:
                    print("Você já tentou essa letra!")
                    continue
                
                letras_tentadas.add(entrada)
                
                if entrada in palavra:
                    letras_descobertas.add(entrada)
                    acertos += palavra.count(entrada)
                    print(f"✓ A letra '{entrada}' está na palavra!")
                else:
                    tentativas_restantes -= 1
                    print(f"✗ A letra '{entrada}' não está na palavra!")
            
            elif len(entrada) > 1:  # Palavra completa
                if entrada == palavra:
                    print("🎉 PARABÉNS! Você venceu! 🎉")
                    self.pontuacao += 10
                    return True, tentativas_restantes
                else:
                    tentativas_restantes -= 1
                    print(f"✗ Palavra incorreta! A palavra era: {palavra}")
            
            input("\nPressione Enter para continuar...")
        
        # Perdeu
        print(f"\n💀 GAME OVER! A palavra era: {palavra}")
        return False, 0

    def adicionar_historico(self, categoria, palavra, venceu, tentativas_restantes):
        """Adiciona partida ao histórico"""
        entrada = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
            'categoria': categoria,
            'palavra': palavra,
            'venceu': venceu,
            'tentativas_restantes': tentativas_restantes
        }
        self.historico.append(entrada)

    def exibir_historico(self):
        """Exibe histórico de partidas"""
        if not self.historico:
            print("\nNenhuma partida jogada ainda.")
            return

        print("\n=== HISTÓRICO DE PARTIDAS ===")
        vitorias = sum(1 for p in self.historico if p['venceu'])
        total = len(self.historico)
        
        print(f"Total de partidas: {total}")
        print(f"Vitórias: {vitorias}")
        print(f"Derrotas: {total - vitorias}")
        print(f"Taxa de vitória: {(vitorias/total)*100:.1f}%")
        print(f"Pontuação total: {self.pontuacao}")
        print()
        
        for i, partida in enumerate(self.historico[-10:], 1):  # Últimas 10 partidas
            resultado = "✓ VITÓRIA" if partida['venceu'] else "✗ DERROTA"
            print(f"{i}. {partida['data']} - {partida['categoria'].upper()} - "
                  f"{partida['palavra']} - {resultado}")

    def executar(self):
        """Executa o programa principal"""
        print("=== JOGO DA FORCA ===")
        
        while True:
            print(f"\nPontuação atual: {self.pontuacao}")
            print("\nEscolha uma opção:")
            print("1. Jogar")
            print("2. Ver histórico")
            print("3. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                # Seleção de categoria
                print("\nEscolha uma categoria:")
                categorias = list(self.palavras.keys())
                for i, categoria in enumerate(categorias, 1):
                    print(f"{i}. {categoria.title()}")
                
                while True:
                    try:
                        escolha = int(input("\nCategoria (1-4): ")) - 1
                        if 0 <= escolha < len(categorias):
                            categoria = categorias[escolha]
                            break
                        print("Opção inválida!")
                    except ValueError:
                        print("Digite um número válido!")
                
                # Joga a partida
                venceu, tentativas = self.jogar_partida(categoria)
                
                # Adiciona ao histórico
                palavra_info = random.choice(self.palavras[categoria])
                self.adicionar_historico(categoria, palavra_info['palavra'], venceu, tentativas)
                
                input("\nPressione Enter para continuar...")
            
            elif opcao == '2':
                self.exibir_historico()
                input("\nPressione Enter para continuar...")
            
            elif opcao == '3':
                print(f"\nObrigado por jogar! Pontuação final: {self.pontuacao}")
                break
            
            else:
                print("Opção inválida!")

if __name__ == "__main__":
    jogo = JogoForca()
    jogo.executar() 