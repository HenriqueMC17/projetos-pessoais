#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    cout << "=== Contador de Palavras em Arquivo ===\n";
    cout << "Informe o caminho do arquivo: ";
    string caminho;
    cin >> caminho;
    ifstream arq(caminho);
    if (!arq) {
        cout << "Arquivo não encontrado!" << endl;
        return 1;
    }
    int cont = 0;
    string linha, palavra;
    while (getline(arq, linha)) {
        istringstream iss(linha);
        while (iss >> palavra) cont++;
    }
    cout << "Total de palavras: " << cont << endl;
    return 0;
} 