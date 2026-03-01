/*
 * Projeto: Controle de LED RGB
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Exemplo de controle de LED RGB com Arduino, alternando entre várias cores.
 */

const int RED_PIN = 9;    // Pino do LED vermelho
const int GREEN_PIN = 10; // Pino do LED verde
const int BLUE_PIN = 11;  // Pino do LED azul

// Array de cores (R, G, B)
const int colors[][3] = {
  {255, 0, 0},    // Vermelho
  {0, 255, 0},    // Verde
  {0, 0, 255},    // Azul
  {255, 255, 0},  // Amarelo
  {255, 0, 255},  // Magenta
  {0, 255, 255},  // Ciano
  {255, 255, 255},// Branco
  {0, 0, 0}       // Apagado
};
const char* colorNames[] = {
  "Vermelho", "Verde", "Azul", "Amarelo", "Magenta", "Ciano", "Branco", "Apagado"
};
const int NUM_COLORS = 8;
const int DELAY_TIME = 1000; // ms

void setup() {
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);
  Serial.begin(9600);
  Serial.println("Controle de LED RGB");
}

void loop() {
  for (int i = 0; i < NUM_COLORS; i++) {
    setColor(colors[i][0], colors[i][1], colors[i][2]);
    Serial.println(colorNames[i]);
    delay(DELAY_TIME);
  }
}

// Define a cor do LED RGB
void setColor(int red, int green, int blue) {
  analogWrite(RED_PIN, red);
  analogWrite(GREEN_PIN, green);
  analogWrite(BLUE_PIN, blue);
} 