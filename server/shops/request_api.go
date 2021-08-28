package shops

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

// type RequestApi struct {
// }

func RequestGetAPI(url string) ([]byte, error) {
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
