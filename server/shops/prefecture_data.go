package shops

import (
	"encoding/json"
	"fmt"
)

type Prefecture struct {
	Data []string
}

type PrefectureList struct {
	List []string `json:"pref_list"`
}

type PrefectureData struct {
	Data PrefectureList `json:"_data_other"`
}

func (p *Prefecture) RequestPrefectureAPI() *Prefecture {
	var prefectureData PrefectureData
	responseData, err := RequestGetAPI("https://form.la-coco.com/api/v1/store")

	if err != nil {
		fmt.Print(err.Error())
		return nil
	}

	err = json.Unmarshal(responseData, &prefectureData)

	if err != nil {
		fmt.Print(err.Error())
		return nil
	}

	var prefectures Prefecture

	for _, pre := range prefectureData.Data.List {
		prefectures.Data = append(prefectures.Data, pre)
	}

	return &prefectures
}
