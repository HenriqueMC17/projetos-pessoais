/*
 * Projeto: Controle de Motor DC com L298N
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Exemplo de controle de motor DC usando driver L298N.
 */

const int IN1 = 2;  // Entrada 1 do motor
const int IN2 = 3;  // Entrada 2 do motor
const int ENA = 9;  // Enable do motor A
const int VELOCIDADE = 200; // Velocidade do motor (0-255)
const int DELAY_MOTOR = 3000; // ms
const int DELAY_PARADO = 2000; // ms

void setup() {
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);
  Serial.begin(9600);
  Serial.println("Controle de Motor DC");
}

void loop() {
  // Motor para frente
  Serial.println("Motor para frente");
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, VELOCIDADE);
  delay(DELAY_MOTOR);

  // Motor para trás
  Serial.println("Motor para trás");
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, VELOCIDADE);
  delay(DELAY_MOTOR);

  // Motor parado
  Serial.println("Motor parado");
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  delay(DELAY_PARADO);
} 