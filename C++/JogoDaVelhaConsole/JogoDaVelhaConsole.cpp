#include <iostream>
#include <vector>
using namespace std;

void exibirTabuleiro(const vector<vector<char>>& tab) {
    cout << "\n";
    for (int i = 0; i < 3; ++i) {
        for (int j = 0; j < 3; ++j) {
            cout << " " << (tab[i][j] == ' ' ? '_' : tab[i][j]);
        }
        cout << endl;
    }
}

bool venceu(const vector<vector<char>>& tab, char jogador) {
    for (int i = 0; i < 3; ++i)
        if (tab[i][0] == jogador && tab[i][1] == jogador && tab[i][2] == jogador) return true;
    for (int j = 0; j < 3; ++j)
        if (tab[0][j] == jogador && tab[1][j] == jogador && tab[2][j] == jogador) return true;
    if (tab[0][0] == jogador && tab[1][1] == jogador && tab[2][2] == jogador) return true;
    if (tab[0][2] == jogador && tab[1][1] == jogador && tab[2][0] == jogador) return true;
    return false;
}

bool empate(const vector<vector<char>>& tab) {
    for (int i = 0; i < 3; ++i)
        for (int j = 0; j < 3; ++j)
            if (tab[i][j] == ' ') return false;
    return true;
}

int main() {
    vector<vector<char>> tab(3, vector<char>(3, ' '));
    char jogador = 'X';
    cout << "=== Jogo da Velha ===\n";
    while (true) {
        exibirTabuleiro(tab);
        int l, c;
        cout << "Jogador " << jogador << ", informe linha e coluna (1-3): ";
        cin >> l >> c;
        if (l < 1 || l > 3 || c < 1 || c > 3 || tab[l-1][c-1] != ' ') {
            cout << "Posição inválida! Tente novamente.\n";
            continue;
        }
        tab[l-1][c-1] = jogador;
        if (venceu(tab, jogador)) {
            exibirTabuleiro(tab);
            cout << "Jogador " << jogador << " venceu!\n";
            break;
        }
        if (empate(tab)) {
            exibirTabuleiro(tab);
            cout << "Empate!\n";
            break;
        }
        jogador = (jogador == 'X') ? 'O' : 'X';
    }
    return 0;
} 