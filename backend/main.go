// web主程序入口
package main

import (
	"log"

	"go-react/backend/db"
	"go-react/backend/route"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func main() {

	if err := db.InitDB(); err != nil {
		log.Fatal(err)
	}
	defer db.ReleaseDB()

	server := gin.Default()
	store := cookie.NewStore([]byte("secret"))
	server.Use(sessions.Sessions("mysession", store))
	server.Static("/static", "../build/static")
	server.LoadHTMLFiles("../build/index.html", "./templates/loginSuccess.html")
	route.RegisterRoutes(server)
	server.Run("0.0.0.0:8888")
}
