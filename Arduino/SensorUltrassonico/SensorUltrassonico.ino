/*
 * Projeto: Sensor Ultrassônico HC-SR04
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Mede distância usando sensor ultrassônico HC-SR04 e exibe no Serial Monitor.
 */

const int TRIG_PIN = 9;
const int ECHO_PIN = 10;
const int DELAY_MEDIDA = 500; // ms

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  long duracao;
  float distancia;

  // Envia pulso para o trigger
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Mede o tempo do eco
  duracao = pulseIn(ECHO_PIN, HIGH);
  // Calcula a distância em cm (velocidade do som: 0.034 cm/us)
  distancia = duracao * 0.034 / 2;

  Serial.print("Distância: ");
  Serial.print(distancia);
  Serial.println(" cm");
  delay(DELAY_MEDIDA);
} 