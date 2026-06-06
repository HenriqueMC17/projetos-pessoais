/*
 * Projeto: Relógio Digital com LCD 16x2
 * Autor: Henrique Monteiro Cardoso
 * Data: 2024-06-07
 * Descrição: Exemplo de relógio digital usando display LCD 16x2 e biblioteca TimeLib.
 */

#include <LiquidCrystal.h>
#include <TimeLib.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.print("Relogio Digital");
  delay(2000);
  // Define hora inicial (ajuste conforme necessário)
  setTime(12, 0, 0, 1, 1, 2024);
}

void loop() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Hora: ");
  lcd.print(hour());
  lcd.print(":");
  if (minute() < 10) lcd.print("0");
  lcd.print(minute());
  lcd.print(":");
  if (second() < 10) lcd.print("0");
  lcd.print(second());

  lcd.setCursor(0, 1);
  lcd.print("Data: ");
  lcd.print(day());
  lcd.print("/");
  lcd.print(month());
  lcd.print("/");
  lcd.print(year());

  delay(1000); // Atualiza a cada segundo
} 