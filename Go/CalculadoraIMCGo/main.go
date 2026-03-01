package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Uso: go run main.go peso altura")
		return
	}
	peso, _ := strconv.ParseFloat(os.Args[1], 64)
	altura, _ := strconv.ParseFloat(os.Args[2], 64)
	imc := peso / (altura * altura)
	classif := ""
	if imc < 18.5 {
		classif = "Abaixo do peso"
	} else if imc < 25 {
		classif = "Peso normal"
	} else if imc < 30 {
		classif = "Sobrepeso"
	} else {
		classif = "Obesidade"
	}
	fmt.Printf("IMC: %.2f (%s)\n", imc, classif)
} 