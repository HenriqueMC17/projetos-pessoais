/*
 * Projeto: Alarme de Movimento com Sensor PIR
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Alarme de movimento usando sensor PIR, buzzer e LED.
 */

const int PIR_PIN = 2;     // Pino digital do sensor PIR
const int BUZZER_PIN = 8;  // Pino do buzzer
const int LED_PIN = 13;    // LED indicador
const int ALARME_TEMPO = 2000; // ms
const int DELAY_LOOP = 100; // ms

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Alarme de movimento ativado!");
}

void loop() {
  if (digitalRead(PIR_PIN) == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    tone(BUZZER_PIN, 1000); // frequência do alarme
    Serial.println("Movimento detectado! ALARME!");
    delay(ALARME_TEMPO);
  } else {
    digitalWrite(LED_PIN, LOW);
    noTone(BUZZER_PIN);
  }
  delay(DELAY_LOOP);
} 