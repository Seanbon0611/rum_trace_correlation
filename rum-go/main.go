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
		// tracer.WithDebugMode(true),
	)
	defer tracer.Stop()
	mux := httptrace.NewServeMux()
	mux.HandleFunc("/", getMessage)
	http.ListenAndServe(":8080", mux)
}

func getMessage(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	sessionId := r.Header.Get("x-session-id")
	if span, ok := tracer.SpanFromContext(ctx); ok {
		span.SetTag("session_id", sessionId)
	}
	message := Data{Message: "Hello, World!!!!!!"}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, x-datadog-origin, x-datadog-sampling-priority, x-datadog-parent-id, x-datadog-trace-id, x-session-id")

	json.NewEncoder(w).Encode(message)
}
