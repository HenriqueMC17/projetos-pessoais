package main

import (
	"fmt"
	"os"
	"strconv"
)

var taxas = map[string]float64{
	"BRL": 1,
	"USD": 5.2,
	"EUR": 5.7,
}

func main() {
	de, para, valor := "BRL", "USD", 1.0
	if len(os.Args) > 1 {
		de = os.Args[1]
	}
	if len(os.Args) > 2 {
		para = os.Args[2]
	}
	if len(os.Args) > 3 {
		v, err := strconv.ParseFloat(os.Args[3], 64)
		if err == nil {
			valor = v
		}
	}
	if taxas[de] == 0 || taxas[para] == 0 {
		fmt.Println("Moeda não suportada. Use BRL, USD ou EUR.")
		return
	}
	emBRL := valor * taxas[de]
	convertido := emBRL / taxas[para]
	fmt.Printf("%.2f %s = %.2f %s\n", valor, de, convertido, para)
} 