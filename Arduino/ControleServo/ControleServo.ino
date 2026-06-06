/*
 * Projeto: Controle de Servo Motor
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Exemplo de controle de servo motor com Arduino, movimentando de 0 a 180 graus e voltando.
 */

#include <Servo.h>

Servo servo;
const int SERVO_PIN = 9;
const int DELAY_POS = 15; // ms entre posições
const int DELAY_CICLO = 1000; // ms entre ciclos

void setup() {
  servo.attach(SERVO_PIN);
  Serial.begin(9600);
  Serial.println("Controle de Servo Motor");
}

void loop() {
  // Movimento de 0 a 180 graus
  for (int pos = 0; pos <= 180; pos++) {
    servo.write(pos);
    Serial.print("Posição: ");
    Serial.println(pos);
    delay(DELAY_POS);
  }
  // Movimento de 180 a 0 graus
  for (int pos = 180; pos >= 0; pos--) {
    servo.write(pos);
    Serial.print("Posição: ");
    Serial.println(pos);
    delay(DELAY_POS);
  }
  delay(DELAY_CICLO);
} 