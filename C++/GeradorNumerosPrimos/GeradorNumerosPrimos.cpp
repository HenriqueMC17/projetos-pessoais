#include <iostream>
#include <vector>
using namespace std;

bool ehPrimo(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; ++i)
        if (n % i == 0) return false;
    return true;
}

int main() {
    cout << "=== Gerador de Números Primos ===\n";
    cout << "Gerar primos até: ";
    int limite;
    cin >> limite;
    vector<int> primos;
    for (int i = 2; i <= limite; ++i)
        if (ehPrimo(i)) primos.push_back(i);
    cout << "Primos encontrados: ";
    for (int p : primos) cout << p << " ";
    cout << endl;
    return 0;
} 