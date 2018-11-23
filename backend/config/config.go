package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

func init() {
	initDBConfig()
}

func initDBConfig() {

	b, err := ioutil.ReadFile("config/dbconfig.json")
	if err != nil {
		log.Fatal(err)
	}
	err = json.Unmarshal(b, &DBConfig)
	if err != nil {
		log.Fatal(err)
	}
	url := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=%s&parseTime=True&loc=Local",
		DBConfig.User, DBConfig.Password, DBConfig.Host, DBConfig.Port, DBConfig.Database,
		DBConfig.Charset)
	DBConfig.URL = url
}
