/*
 * Projeto: Sensor de Chuva
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Detecta chuva usando sensor de chuva (analógico) e LED indicador.
 */

const int SENSOR_PIN = A0; // Pino analógico do sensor
const int LED_PIN = 13;    // LED indicador
const int CHUVA_LIMITE = 500; // Valor limite para detectar chuva

void setup() {
  pinMode(SENSOR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int valor = analogRead(SENSOR_PIN);
  Serial.print("Valor do sensor: ");
  Serial.println(valor);
  if (valor < CHUVA_LIMITE) { // ajuste o valor conforme o sensor
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Chuva detectada!");
  } else {
    digitalWrite(LED_PIN, LOW);
    Serial.println("Sem chuva.");
  }
  delay(1000);
} 