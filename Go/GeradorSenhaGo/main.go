package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"os"
	"strconv"
)

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"

func gerarSenha(tam int) string {
	senha := make([]byte, tam)
	for i := 0; i < tam; i++ {
		n, _ := rand.Int(rand.Reader, big.NewInt(int64(len(chars))))
		senha[i] = chars[n.Int64()]
	}
	return string(senha)
}

func main() {
	tam, qtd := 8, 1
	if len(os.Args) > 1 {
		t, err := strconv.Atoi(os.Args[1])
		if err == nil && t > 0 {
			tam = t
		}
	}
	if len(os.Args) > 2 {
		q, err := strconv.Atoi(os.Args[2])
		if err == nil && q > 0 {
			qtd = q
		}
	}
	for i := 0; i < qtd; i++ {
		fmt.Println(gerarSenha(tam))
	}
} 