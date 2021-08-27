package prefectures

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/sonlh-0262/go_homework/server/shoppb"
)

type Prefecture struct {
	Data []string
}

type ShopData struct {
	Name      string `json:"name"`
	PrefName  string `json:"pref_name"`
	StoreSfid string `json:"store_sfid"`
	Mail      string `json:"mail"`
	Address   string `json:"address"`
}

type ShopsData struct {
	Data []ShopData `json:"_data"`
}

type PrefectureList struct {
	List []string `json:"pref_list"`
}

type PrefectureData struct {
	Data PrefectureList `json:"_data_other"`
}

func (p *Prefecture) RequestPrefectureAPI() *Prefecture {
	var prefectureData PrefectureData
	responseData, err := requestGetAPI("https://form.la-coco.com/api/v1/store")

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

func (p *Prefecture) RequestShopAPI(prefectureName string) []*shoppb.ShopResponse {
	responseData, err := requestGetAPI("https://form.la-coco.com/api/v1/store")

	if err != nil {
		fmt.Print(err.Error())
		return nil
	}

	var shopsData ShopsData
	var shopsResponse []*shoppb.ShopResponse

	err = json.Unmarshal(responseData, &shopsData)

	if err != nil {
		fmt.Print(err.Error())
		return nil
	}

	for _, shop := range shopsData.Data {
		if shop.PrefName == prefectureName {
			var s shoppb.ShopResponse

			s.Name = shop.Name
			s.StoreSfid = shop.StoreSfid
			s.Mail = shop.Mail
			s.Address = shop.Address
			shopsResponse = append(shopsResponse, &s)
		}
	}

	return shopsResponse
}

func requestGetAPI(url string) ([]byte, error) {
	res, err := http.Get(url)

	if err != nil {
		fmt.Print(err.Error())
		return nil, err
	}

	defer func() {
		err := res.Body.Close()

		if err != nil {
			fmt.Print(err.Error())
		}
	}()

	responseData, err := ioutil.ReadAll(res.Body)

	return responseData, err
}
