/*
 * Projeto: Controle de Display de 7 Segmentos
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Exemplo de controle de display de 7 segmentos com Arduino, exibindo números de 0 a 9.
 */

const int SEGMENTS[7] = {2, 3, 4, 5, 6, 7, 8}; // a, b, c, d, e, f, g

// Tabela de segmentos para cada número (0-9)
const bool DIGITS[10][7] = {
  {1,1,1,1,1,1,0}, // 0
  {0,1,1,0,0,0,0}, // 1
  {1,1,0,1,1,0,1}, // 2
  {1,1,1,1,0,0,1}, // 3
  {0,1,1,0,0,1,1}, // 4
  {1,0,1,1,0,1,1}, // 5
  {1,0,1,1,1,1,1}, // 6
  {1,1,1,0,0,0,0}, // 7
  {1,1,1,1,1,1,1}, // 8
  {1,1,1,1,0,1,1}  // 9
};

const int DELAY_TIME = 1000; // ms

void setup() {
  for (int i = 0; i < 7; i++) {
    pinMode(SEGMENTS[i], OUTPUT);
  }
}

void loop() {
  // Contagem de 0 a 9
  for (int i = 0; i <= 9; i++) {
    showDigit(i);
    delay(DELAY_TIME);
  }
}

// Exibe o número no display
void showDigit(int digit) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(SEGMENTS[i], DIGITS[digit][i] ? HIGH : LOW);
  }
} 