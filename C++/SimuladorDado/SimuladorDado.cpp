#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main() {
    srand((unsigned)time(0));
    cout << "=== Simulador de Dado ===\n";
    cout << "Quantos lançamentos? ";
    int n;
    cin >> n;
    int freq[7] = {0};
    for (int i = 0; i < n; ++i) {
        int r = rand() % 6 + 1;
        cout << r << " ";
        freq[r]++;
    }
    cout << "\nFrequência dos resultados:\n";
    for (int i = 1; i <= 6; ++i)
        cout << i << ": " << freq[i] << endl;
    return 0;
} 