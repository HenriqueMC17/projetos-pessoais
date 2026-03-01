package main

import (
	"fmt"
	"github.com/google/uuid"
	"os"
	"strconv"
)

func main() {
	qtd := 1
	if len(os.Args) > 1 {
		n, err := strconv.Atoi(os.Args[1])
		if err == nil && n > 0 {
			qtd = n
		}
	}
	for i := 0; i < qtd; i++ {
		fmt.Println(uuid.New())
	}
} 