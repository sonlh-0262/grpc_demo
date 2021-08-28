package shops

import (
	"encoding/json"
	"fmt"

	"github.com/sonlh-0262/go_homework/server/shoppb"
)

type Shop struct {
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

func (s *Shop) RequestShopAPI(prefectureName string) []*shoppb.ShopResponse {
	responseData, err := RequestGetAPI("https://form.la-coco.com/api/v1/store")

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
