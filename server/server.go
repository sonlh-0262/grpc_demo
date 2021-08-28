package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/sonlh-0262/go_homework/server/shoppb"
	"github.com/sonlh-0262/go_homework/server/shops"
	"google.golang.org/grpc"
)

type server struct {
	Prefecture *shops.Prefecture
	Shop       *shops.Shop
	Calendar   *shops.Calendar
}

func (s *server) PrefectureList(ctx context.Context, req *shoppb.PrefecturesRequest) (*shoppb.PrefecturesResponse, error) {
	prefecture := s.Prefecture.RequestPrefectureAPI()

	return &shoppb.PrefecturesResponse{Name: prefecture.Data}, nil
}

func (s *server) ShopsByPrefectureList(ctx context.Context, req *shoppb.ShopsByPrefectureRequest) (*shoppb.ShopsByPrefectureResponse, error) {
	shops := s.Shop.RequestShopAPI(req.Id)

	return &shoppb.ShopsByPrefectureResponse{Shops: shops}, nil
}

func (s *server) CalendarsList(ctx context.Context, req *shoppb.CalendarsRequest) (*shoppb.CalendarsResponse, error) {
	calendars := s.Calendar.RequestCalendarAPI(req.StoreSfid, req.StartTime)

	return &shoppb.CalendarsResponse{Dates: calendars}, nil
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
