package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) < 4 {
		fmt.Println("Uso: go run main.go valor origem destino")
		fmt.Println("Exemplo: go run main.go 100 C F")
		return
	}
	valor, _ := strconv.ParseFloat(os.Args[1], 64)
	origem := os.Args[2]
	destino := os.Args[3]
	var res float64
	switch origem + ":" + destino {
	case "C:F":
		res = valor*9/5 + 32
	case "C:K":
		res = valor + 273.15
	case "F:C":
		res = (valor - 32) * 5 / 9
	case "K:C":
		res = valor - 273.15
	default:
		fmt.Println("Conversão não suportada.")
		return
	}
	fmt.Printf("%.2f %s = %.2f %s\n", valor, origem, res, destino)
} 