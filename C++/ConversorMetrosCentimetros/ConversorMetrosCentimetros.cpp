#include <iostream>
using namespace std;

int main() {
    cout << "=== Conversor Metros <-> Centímetros ===\n";
    cout << "1. Metros para centímetros\n2. Centímetros para metros\nEscolha: ";
    int op;
    cin >> op;
    double valor;
    if (op == 1) {
        cout << "Digite o valor em metros: ";
        cin >> valor;
        cout << valor << " m = " << (valor * 100) << " cm\n";
    } else if (op == 2) {
        cout << "Digite o valor em centímetros: ";
        cin >> valor;
        cout << valor << " cm = " << (valor / 100) << " m\n";
    } else {
        cout << "Opção inválida!\n";
    }
    return 0;
} 