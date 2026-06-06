package main

import (
	"fmt"
	"os"
	"regexp"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("Uso: go run main.go email@exemplo.com")
		return
	}
	email := os.Args[1]
	regex := regexp.MustCompile(`^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$`)
	if regex.MatchString(email) {
		fmt.Println("E-mail válido!")
	} else {
		fmt.Println("E-mail inválido!")
	}
} 