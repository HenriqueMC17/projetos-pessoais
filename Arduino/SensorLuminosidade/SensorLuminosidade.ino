/*
 * Projeto: Sensor de Luminosidade com LDR
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Leitura de luminosidade com LDR e indicação por LED.
 */

const int LDR_PIN = A0;    // Pino analógico do LDR
const int LED_PIN = 13;    // LED indicador
const int LUMINOSIDADE_LIMITE = 300; // Valor limite para ambiente escuro

void setup() {
  pinMode(LDR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Sensor de Luminosidade");
}

void loop() {
  int luminosidade = analogRead(LDR_PIN);
  Serial.print("Luminosidade: ");
  Serial.println(luminosidade);

  if (luminosidade < LUMINOSIDADE_LIMITE) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Ambiente escuro - LED ligado");
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println("Ambiente claro - LED desligado");
  }

  delay(1000);
} 