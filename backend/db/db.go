package db

import (
	"go-react/backend/config"
	"go-react/backend/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql" //mysql driver
)

//DB gorm db
var DB *gorm.DB

//InitDB init db
func InitDB() error {
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err == nil {
		DB = db
		db.AutoMigrate(&models.User{}, &models.Post{}, &models.Comment{}, &models.Tag{}, &models.PostTag{})
	}
	return err
}

//ReleaseDB 释放DB
func ReleaseDB() {
	DB.Close()
}
