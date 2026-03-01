/*
 * Projeto: Sensor de Temperatura LM35
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Leitura de temperatura com LM35 e indicação por LED.
 */

const int SENSOR_PIN = A0;    // Pino analógico do LM35
const int LED_PIN = 13;       // LED indicador
const float TEMP_LIMITE = 30.0; // Temperatura limite em °C

void setup() {
  pinMode(SENSOR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Sensor de Temperatura LM35");
}

void loop() {
  int valor = analogRead(SENSOR_PIN);
  // Conversão para Celsius: (valor * 5.0 / 1024.0) * 100.0
  float temperatura = (valor * 5.0 / 1024.0) * 100.0;

  Serial.print("Temperatura: ");
  Serial.print(temperatura);
  Serial.println(" °C");

  if (temperatura > TEMP_LIMITE) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Temperatura alta!");
  } else {
    digitalWrite(LED_PIN, LOW);
  }

  delay(2000);
} 