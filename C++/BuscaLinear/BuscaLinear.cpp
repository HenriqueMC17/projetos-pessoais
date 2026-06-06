#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "=== Busca Linear ===\n";
    cout << "Tamanho do vetor: ";
    int n;
    cin >> n;
    vector<int> v(n);
    cout << "Digite os elementos: ";
    for (int i = 0; i < n; ++i) cin >> v[i];
    cout << "Valor a buscar: ";
    int x;
    cin >> x;
    int idx = -1;
    for (int i = 0; i < n; ++i)
        if (v[i] == x) { idx = i; break; }
    if (idx != -1)
        cout << "Encontrado no índice " << idx << endl;
    else
        cout << "Não encontrado." << endl;
    return 0;
} 