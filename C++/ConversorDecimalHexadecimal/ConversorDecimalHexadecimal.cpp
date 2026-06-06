#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << "=== Conversor Decimal -> Hexadecimal ===\n";
    cout << "Digite um número decimal: ";
    int n;
    cin >> n;
    cout << "Hexadecimal: 0x" << hex << uppercase << n << endl;
    return 0;
} 