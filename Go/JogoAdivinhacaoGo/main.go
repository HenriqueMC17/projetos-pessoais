package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	num := rand.Intn(100) + 1
	leitor := bufio.NewReader(os.Stdin)
	fmt.Println("=== Jogo de Adivinhação ===")
	for {
		fmt.Print("Adivinhe o número (1-100): ")
		entrada, _ := leitor.ReadString('\n')
		entrada = strings.TrimSpace(entrada)
		palpite, err := strconv.Atoi(entrada)
		if err != nil {
			fmt.Println("Digite um número válido!")
			continue
		}
		if palpite < num {
			fmt.Println("Maior!")
		} else if palpite > num {
			fmt.Println("Menor!")
		} else {
			fmt.Println("Parabéns! Você acertou!")
			break
		}
	}
} 