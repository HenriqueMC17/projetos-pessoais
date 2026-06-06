/*
 * Projeto: Controle de Relé com Botão
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Liga/desliga um relé usando um botão com debounce.
 */

const int RELE_PIN = 8;
const int BOTAO_PIN = 7;
bool estadoRele = false;
bool ultimoEstadoBotao = HIGH;
const int DEBOUNCE_DELAY = 200; // ms

void setup() {
  pinMode(RELE_PIN, OUTPUT);
  pinMode(BOTAO_PIN, INPUT_PULLUP);
  digitalWrite(RELE_PIN, LOW);
}

void loop() {
  bool estadoBotao = digitalRead(BOTAO_PIN);
  if (estadoBotao == LOW && ultimoEstadoBotao == HIGH) {
    estadoRele = !estadoRele;
    digitalWrite(RELE_PIN, estadoRele ? HIGH : LOW);
    delay(DEBOUNCE_DELAY); // debounce
  }
  ultimoEstadoBotao = estadoBotao;
} 