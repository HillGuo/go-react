package route

import (
	"go-react/backend/controllers"

	"github.com/gin-gonic/gin"
)

//RegisterRoutes 给routeG 添加路由
func RegisterRoutes(server *gin.Engine) {
	server.GET("/", controllers.Home)
	server.GET("/start", controllers.Start)
	server.GET("/blog", controllers.Blog)
	server.GET("/user/:name", controllers.User)
	server.POST("/articleList", controllers.ArticleList)
	server.GET("/tags", controllers.Tags)
	server.GET("/callback", controllers.Login)
}
