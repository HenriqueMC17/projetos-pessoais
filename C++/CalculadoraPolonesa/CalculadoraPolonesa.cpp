#include <iostream>
#include <stack>
#include <sstream>
#include <string>
#include <vector>
#include <cstdlib>

using namespace std;

bool isNumber(const string& s) {
    char* end = nullptr;
    strtod(s.c_str(), &end);
    return end != s.c_str() && *end == '\0';
}

int main() {
    cout << "=== Calculadora Polonesa Reversa (RPN) ===\n";
    cout << "Digite a expressão em RPN (ex: 3 4 + 2 * 7 /): ";
    string linha;
    getline(cin, linha);
    istringstream iss(linha);
    stack<double> pilha;
    string token;
    while (iss >> token) {
        if (isNumber(token)) {
            pilha.push(stod(token));
        } else if (token == "+" || token == "-" || token == "*" || token == "/") {
            if (pilha.size() < 2) {
                cout << "Erro: Expressão inválida!" << endl;
                return 1;
            }
            double b = pilha.top(); pilha.pop();
            double a = pilha.top(); pilha.pop();
            if (token == "+") pilha.push(a + b);
            else if (token == "-") pilha.push(a - b);
            else if (token == "*") pilha.push(a * b);
            else if (token == "/") {
                if (b == 0) {
                    cout << "Erro: Divisão por zero!" << endl;
                    return 1;
                }
                pilha.push(a / b);
            }
        } else {
            cout << "Erro: Token desconhecido: " << token << endl;
            return 1;
        }
    }
    if (pilha.size() == 1) {
        cout << "Resultado = " << pilha.top() << endl;
    } else {
        cout << "Erro: Expressão inválida!" << endl;
    }
    return 0;
} 