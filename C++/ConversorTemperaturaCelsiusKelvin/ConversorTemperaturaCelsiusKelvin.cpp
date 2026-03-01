#include <iostream>
using namespace std;

int main() {
    cout << "=== Conversor Celsius <-> Kelvin ===\n";
    cout << "1. Celsius para Kelvin\n2. Kelvin para Celsius\nEscolha: ";
    int op;
    cin >> op;
    double valor;
    if (op == 1) {
        cout << "Digite a temperatura em Celsius: ";
        cin >> valor;
        cout << valor << " °C = " << (valor + 273.15) << " K\n";
    } else if (op == 2) {
        cout << "Digite a temperatura em Kelvin: ";
        cin >> valor;
        cout << valor << " K = " << (valor - 273.15) << " °C\n";
    } else {
        cout << "Opção inválida!\n";
    }
    return 0;
} 