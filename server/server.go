package main

import (
	"context"
	"fmt"
	"log"
	"net"

	prefecture "github.com/sonlh-0262/go_homework/server/prefectures"
	"github.com/sonlh-0262/go_homework/server/shoppb"
	"google.golang.org/grpc"
)

type server struct {
	Prefecture *prefecture.Prefecture
}

func (s *server) PrefectureList(ctx context.Context, req *shoppb.PrefecturesRequest) (*shoppb.PrefecturesResponse, error) {
	prefecture := s.Prefecture.RequestPrefectureAPI()

	return &shoppb.PrefecturesResponse{Name: prefecture.Data}, nil
}

var (
	port int = 8080
)

func main() {
	addr := fmt.Sprintf("0.0.0.0:%d", port)
	lis, err := net.Listen("tcp", addr)

	if err != nil {
		log.Fatalf("Error while listening: %v", err)
	}

	s := grpc.NewServer()
	shoppb.RegisterShopServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("Error while serving: %v", err)
	}
}
