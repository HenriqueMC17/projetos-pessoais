package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Uso: go run main.go data formato_saida")
		fmt.Println("Exemplo: go run main.go 2024-06-01 DD/MM/YYYY")
		return
	}
	entrada := os.Args[1]
	formato := os.Args[2]
	var t time.Time
	var err error
	if len(entrada) == 10 && entrada[4] == '-' {
		t, err = time.Parse("2006-01-02", entrada)
	} else if len(entrada) == 10 && entrada[2] == '/' {
		t, err = time.Parse("02/01/2006", entrada)
	} else {
		fmt.Println("Formato de data não reconhecido.")
		return
	}
	if err != nil {
		fmt.Println("Erro ao converter:", err)
		return
	}
	switch formato {
	case "YYYY-MM-DD":
		fmt.Println(t.Format("2006-01-02"))
	case "DD/MM/YYYY":
		fmt.Println(t.Format("02/01/2006"))
	default:
		fmt.Println("Formato de saída não suportado.")
	}
} 