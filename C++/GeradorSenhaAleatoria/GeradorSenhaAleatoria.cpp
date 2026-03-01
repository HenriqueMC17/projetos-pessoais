#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

string gerarSenha(int tamanho) {
    string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    string senha;
    for (int i = 0; i < tamanho; ++i) {
        senha += chars[rand() % chars.size()];
    }
    return senha;
}

int main() {
    srand((unsigned)time(0));
    cout << "=== Gerador de Senha Aleatória ===\n";
    cout << "Tamanho da senha: ";
    int tam;
    cin >> tam;
    cout << "Quantidade de senhas: ";
    int qtd;
    cin >> qtd;
    for (int i = 0; i < qtd; ++i) {
        cout << "Senha " << (i+1) << ": " << gerarSenha(tam) << endl;
    }
    return 0;
} 