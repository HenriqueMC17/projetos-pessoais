import time
import threading
import os
from datetime import datetime, timedelta

class Cronometro:
    def __init__(self):
        self.tempo_inicial = 0
        self.tempo_atual = 0
        self.tempo_pausado = 0
        self.executando = False
        self.pausado = False
        self.modo_timer = False
        self.tempo_limite = 0
        self.historico = []
        self.thread = None

    def limpar_tela(self):
        """Limpa a tela do terminal"""
        os.system('cls' if os.name == 'nt' else 'clear')

    def formatar_tempo(self, segundos):
        """Formata segundos em HH:MM:SS"""
        if segundos < 0:
            segundos = 0
        
        horas = int(segundos // 3600)
        minutos = int((segundos % 3600) // 60)
        segs = int(segundos % 60)
        
        return f"{horas:02d}:{minutos:02d}:{segs:02d}"

    def parsear_tempo(self, entrada):
        """Converte entrada de tempo em segundos"""
        try:
            if ':' in entrada:
                # Formato HH:MM:SS ou MM:SS
                partes = entrada.split(':')
                if len(partes) == 2:
                    # MM:SS
                    minutos, segundos = map(int, partes)
                    return minutos * 60 + segundos
                elif len(partes) == 3:
                    # HH:MM:SS
                    horas, minutos, segundos = map(int, partes)
                    return horas * 3600 + minutos * 60 + segundos
            else:
                # Apenas segundos
                return int(entrada)
        except:
            return None

    def iniciar_cronometro(self):
        """Inicia o cronômetro"""
        if not self.executando:
            self.tempo_inicial = time.time() - self.tempo_pausado
            self.executando = True
            self.pausado = False
            self.thread = threading.Thread(target=self.executar_cronometro)
            self.thread.daemon = True
            self.thread.start()

    def pausar_cronometro(self):
        """Pausa o cronômetro"""
        if self.executando and not self.pausado:
            self.pausado = True
            self.tempo_pausado = self.tempo_atual

    def retomar_cronometro(self):
        """Retoma o cronômetro"""
        if self.executando and self.pausado:
            self.pausado = False
            self.tempo_inicial = time.time() - self.tempo_pausado

    def parar_cronometro(self):
        """Para o cronômetro"""
        self.executando = False
        self.pausado = False
        if self.thread:
            self.thread.join(timeout=0.1)

    def resetar_cronometro(self):
        """Reseta o cronômetro"""
        self.parar_cronometro()
        self.tempo_atual = 0
        self.tempo_pausado = 0
        self.tempo_inicial = 0

    def executar_cronometro(self):
        """Executa o loop principal do cronômetro"""
        while self.executando:
            if not self.pausado:
                if self.modo_timer:
                    # Modo timer (contagem regressiva)
                    self.tempo_atual = self.tempo_limite - (time.time() - self.tempo_inicial)
                    if self.tempo_atual <= 0:
                        self.tempo_atual = 0
                        self.executando = False
                        print("\n🔔 TEMPO ESGOTADO! 🔔")
                        break
                else:
                    # Modo cronômetro (contagem crescente)
                    self.tempo_atual = time.time() - self.tempo_inicial
            
            time.sleep(0.1)

    def salvar_tempo(self):
        """Salva o tempo atual no histórico"""
        if self.tempo_atual > 0:
            entrada = {
                'data': datetime.now().strftime('%d/%m/%Y %H:%M:%S'),
                'tempo': self.tempo_atual,
                'tempo_formatado': self.formatar_tempo(self.tempo_atual),
                'modo': 'Timer' if self.modo_timer else 'Cronômetro'
            }
            self.historico.append(entrada)
            print(f"✓ Tempo salvo: {entrada['tempo_formatado']}")

    def exibir_historico(self):
        """Exibe o histórico de tempos"""
        if not self.historico:
            print("\nNenhum tempo salvo ainda.")
            return

        print("\n=== HISTÓRICO DE TEMPOS ===")
        for i, entrada in enumerate(self.historico[-10:], 1):  # Últimos 10 tempos
            print(f"{i}. {entrada['data']} - {entrada['tempo_formatado']} ({entrada['modo']})")

    def configurar_timer(self):
        """Configura o timer com tempo desejado"""
        print("\n=== CONFIGURAR TIMER ===")
        print("Formatos aceitos:")
        print("  - Segundos: 120")
        print("  - Minutos:Segundos: 2:30")
        print("  - Horas:Minutos:Segundos: 1:30:45")
        
        while True:
            entrada = input("\nDigite o tempo desejado: ").strip()
            tempo_segundos = self.parsear_tempo(entrada)
            
            if tempo_segundos is not None and tempo_segundos > 0:
                self.tempo_limite = tempo_segundos
                self.modo_timer = True
                print(f"✓ Timer configurado para: {self.formatar_tempo(tempo_segundos)}")
                break
            else:
                print("Tempo inválido! Tente novamente.")

    def exibir_interface(self):
        """Exibe a interface do cronômetro"""
        self.limpar_tela()
        
        print("=== CRONÔMETRO ===")
        print(f"Modo: {'Timer' if self.modo_timer else 'Cronômetro'}")
        
        if self.modo_timer:
            print(f"Tempo limite: {self.formatar_tempo(self.tempo_limite)}")
        
        print()
        print("=" * 30)
        print(f"  {self.formatar_tempo(self.tempo_atual)}")
        print("=" * 30)
        print()
        
        # Status
        if self.executando:
            if self.pausado:
                print("Status: PAUSADO")
            else:
                print("Status: EXECUTANDO")
        else:
            print("Status: PARADO")
        
        print()
        print("Controles:")
        if not self.executando:
            print("  [1] Iniciar")
        else:
            if self.pausado:
                print("  [1] Retomar")
            else:
                print("  [1] Pausar")
        
        print("  [2] Parar")
        print("  [3] Resetar")
        print("  [4] Salvar tempo")
        print("  [5] Ver histórico")
        print("  [6] Sair")

    def executar(self):
        """Executa o programa principal"""
        print("=== CRONÔMETRO ===")
        
        # Escolha do modo
        print("\nEscolha o modo:")
        print("1. Cronômetro (contagem crescente)")
        print("2. Timer (contagem regressiva)")
        
        while True:
            modo = input("\nModo (1-2): ").strip()
            if modo == '1':
                self.modo_timer = False
                break
            elif modo == '2':
                self.configurar_timer()
                break
            else:
                print("Opção inválida!")
        
        # Loop principal
        while True:
            self.exibir_interface()
            
            if self.executando:
                # Atualiza a tela a cada segundo
                time.sleep(1)
                continue
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                if not self.executando:
                    self.iniciar_cronometro()
                elif self.pausado:
                    self.retomar_cronometro()
                else:
                    self.pausar_cronometro()
            
            elif opcao == '2':
                self.parar_cronometro()
            
            elif opcao == '3':
                self.resetar_cronometro()
            
            elif opcao == '4':
                self.salvar_tempo()
                input("\nPressione Enter para continuar...")
            
            elif opcao == '5':
                self.exibir_historico()
                input("\nPressione Enter para continuar...")
            
            elif opcao == '6':
                self.parar_cronometro()
                print("\nObrigado por usar o Cronômetro!")
                break
            
            else:
                print("Opção inválida!")
                time.sleep(1)

if __name__ == "__main__":
    cronometro = Cronometro()
    cronometro.executar() 