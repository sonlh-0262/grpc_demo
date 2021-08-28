package shops

import (
	"encoding/json"
	"fmt"
	"reflect"

	"github.com/sonlh-0262/go_homework/server/shoppb"
)

type Calendar struct {
}

// ReservationTime is format time response
type ReservationTime struct {
	Hour10 int `json:"10:00"`
	Hour11 int `json:"11:00"`
	Hour12 int `json:"12:00"`
	Hour13 int `json:"13:00"`
	Hour14 int `json:"14:00"`
	Hour15 int `json:"15:00"`
	Hour16 int `json:"16:00"`
	Hour17 int `json:"17:00"`
	Hour18 int `json:"18:00"`
	Hour19 int `json:"19:00"`
	Hour20 int `json:"20:00"`
}

// WorkDay is format WorkDay response
type WorkDay struct {
	Year                int             `json:"year"`
	Month               int             `json:"month"`
	Day                 int             `json:"mday"`
	HolidayFlag         int             `json:"holiday_flag"`
	Weekday             int             `json:"weekday"`
	JWeekday            string          `json:"j_weekday"`
	ReservationTimeData ReservationTime `json:"reservation_time"`
}

// CalendarData is format response from api schedule
type CalendarData struct {
	Data     []WorkDay `json:"_data"`
	DataSize int       `json:"_data_size"`
}

func (c *Calendar) RequestCalendarAPI(storeId string, dateStart string) []*shoppb.DateData {
	url := fmt.Sprintf("https://form.la-coco.com/api/v1/schedule/%s/%s", storeId, dateStart)
	responseData, err := RequestGetAPI(url)

	if err != nil {
		fmt.Print(err.Error())
		return nil
	}

	var calendarResponse []*shoppb.DateData
	var calendarData CalendarData

	err = json.Unmarshal(responseData, &calendarData)

	if err != nil {
		fmt.Print(err.Error())
		return nil
	}

	for _, workDay := range calendarData.Data {
		var d shoppb.DateData

		d.Year = int32(workDay.Year)
		d.Month = int32(workDay.Month)
		d.Mday = int32(workDay.Day)
		d.Weekday = int32(workDay.Weekday)
		d.JWeekday = workDay.JWeekday

		var reservationTime map[string]int32

		reservationTimeValues := reflect.ValueOf(workDay.ReservationTimeData)
		reservationTimeFields := reservationTimeValues.Type()

		reservationTime = make(map[string]int32, reservationTimeFields.NumField())

		for i := 0; i < reservationTimeValues.NumField(); i++ {
			reservationTime[reservationTimeFields.Field(i).Name] = int32(reservationTimeValues.Field(i).Int())
		}

		d.ReservationTime = reservationTime

		calendarResponse = append(calendarResponse, &d)
	}

	return calendarResponse
}
