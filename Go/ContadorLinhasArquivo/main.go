package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Uso: go run main.go arquivo.txt")
		return
	}
	arq, err := os.Open(os.Args[1])
	if err != nil {
		fmt.Println("Erro ao abrir arquivo:", err)
		return
	}
	defer arq.Close()
	cont := 0
	scanner := bufio.NewScanner(arq)
	for scanner.Scan() {
		cont++
	}
	fmt.Println("Total de linhas:", cont)
} 