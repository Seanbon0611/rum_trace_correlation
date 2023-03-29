package main

import (
	"encoding/json"
	"net/http"

	httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

type Data struct {
	Message string `json:"message"`
}

func main() {
	tracer.Start(
		tracer.WithEnv("sandbox"),
		tracer.WithService("test_service"),
		tracer.WithServiceVersion("0.0.1"),
		tracer.WithDebugMode(true),
	)
	defer tracer.Stop()
	mux := httptrace.NewServeMux()
	mux.HandleFunc("/", getMessage)
	http.ListenAndServe(":8080", mux)
}

func getMessage(w http.ResponseWriter, r *http.Request) {
	message := Data{Message: "Hello, World!!!!!!"}

	json.NewEncoder(w).Encode(message)
}
