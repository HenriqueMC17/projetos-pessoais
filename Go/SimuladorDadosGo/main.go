package main

import (
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())
	n := 1
	if len(os.Args) > 1 {
		nn, err := strconv.Atoi(os.Args[1])
		if err == nil && nn > 0 {
			n = nn
		}
	}
	freq := make([]int, 7)
	for i := 0; i < n; i++ {
		r := rand.Intn(6) + 1
		fmt.Print(r, " ")
		freq[r]++
	}
	fmt.Println("\nFrequência:")
	for i := 1; i <= 6; i++ {
		fmt.Printf("%d: %d\n", i, freq[i])
	}
} 