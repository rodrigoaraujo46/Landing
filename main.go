package main

import (
	"log"
	"net/http"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("static")))

	err := http.ListenAndServe("192.168.1.165:8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
