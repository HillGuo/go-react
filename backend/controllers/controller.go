package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strconv"
	"strings"

	"go-react/backend/services"

	"github.com/gin-gonic/gin"
)

func Home(c *gin.Context) {
	cookie, err := c.Cookie("cookie-name")
	if err != nil {
		log.Println(err)
	}

	log.Println(cookie)

	code := c.Query("code")
	if code != "" {
		Login(c)
	} else {
		c.HTML(http.StatusOK, "index.html", nil)
	}

}

func Start(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "Content-Type")
	c.Header("content-type", "application/json")
	c.JSON(http.StatusOK, gin.H{"message": "<pre><code class='go'>var gopher = 'h2san';</code></pre>", "code": 0})
}

func Tags(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "Content-Type")
	c.Header("content-type", "application/json")
	tags, err := services.GetAllTags()
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"code": 1, "msg": err.Error(), "data": ""})
		return
	}
	tagNames := []string{}
	for _, tag := range tags {
		tagNames = append(tagNames, tag.Name)
	}
	data := gin.H{
		"tags": tagNames}
	c.JSON(http.StatusOK, gin.H{"code": 0, "msg": "ok", "data": data})
}
func ArticleList(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "Content-Type")
	c.Header("content-type", "application/json")
	class := c.PostForm("class")
	tag := c.PostForm("tag")
	current, err := strconv.Atoi(c.PostForm("current"))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"code": 1, "msg": err.Error(), "data": ""})
		return
	}
	pageSize, err := strconv.Atoi(c.PostForm("pageSize"))
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"code": 1, "msg": err.Error(), "data": ""})
		return
	}
	fmt.Println(class, tag, current, pageSize)
	posts, err := services.GetArticleList(class, tag, current, pageSize)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"code": 1, "msg": err.Error(), "data": ""})
		return
	}
	totalItems, err := services.GetTotalArticleItems(class, tag)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"code": 1, "msg": err.Error(), "data": ""})
		return
	}
	articleList := make([]gin.H, 0, len(posts))
	for _, post := range posts {
		tags, err := services.GetTags(post.ID)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{"code": 1, "msg": err.Error(), "data": ""})
			return
		}
		var tagNames = make([]string, 0, len(tags))
		for _, tag := range tags {
			tagNames = append(tagNames, tag.Name)
		}
		desclen := len(post.Body)
		desc := post.Body
		if desclen > 100 {
			desclen = 100
			desc = string([]byte(post.Body)[0:desclen-1]) + "..."
		}
		p := gin.H{
			"title": post.Title,
			"tags":  tagNames,
			"desc":  desc,
			"eye":   post.View,
			"good":  post.Good}
		articleList = append(articleList, p)
	}
	data := gin.H{
		"total":       totalItems,
		"current":     current,
		"pageSize":    pageSize,
		"articleList": articleList}
	c.JSON(http.StatusOK, gin.H{"code": 0, "msg": "ok", "data": data})
}
func Blog(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.Header("Access-Control-Allow-Headers", "Content-Type")
	c.Header("content-type", "application/json")
	f, err := os.Open("data/blog.md")
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"message": "error", "code": -1})
		return
	}
	b, err := ioutil.ReadAll(f)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"message": "error", "code": -1})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": string(b), "code": 0})
}

//User /user/:name
func User(c *gin.Context) {
	name := c.Param("name")
	if name != "" {
		user, err := services.GetUserByName(name)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{"message": "error", "code": 1})
		} else {
			c.String(http.StatusOK, "%v", user)
		}
	} else {
		c.JSON(http.StatusOK, gin.H{"message": "error", "code": 1})
	}

}

func Login(c *gin.Context) {
	code := c.Query("code")
	resurl := "https://github.com/login/oauth/access_token"

	data := url.Values{}
	data["client_id"] = []string{"d21f89d63e0cc1368a0a"}
	data["client_secret"] = []string{"caecd4421e365c6535117ab8f7cd8de1afbe1931"}
	data["code"] = []string{code}

	//body:=strings.NewReader("client_id=&=&code"))
	res, err := http.PostForm(resurl, data)
	if err != nil {
		return
	}
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Println(err.Error())
	}
	bodystr := string(body)
	s := strings.Split(bodystr, "=")
	s2 := strings.Split(s[1], "&")
	accessToken := s2[0]
	accessURL := "https://api.github.com/user?access_token="
	accessURL = accessURL + accessToken
	resp, err := http.Get(accessURL)
	if err != nil {
		log.Println(err.Error())
	}
	defer resp.Body.Close()
	body2, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Println(err.Error())
	}
	//log.Println(string(body2))
	resdata := gin.H{}
	json.Unmarshal(body2, &resdata)
	log.Println(resdata["avatar_url"])

	githubID, login, avatarURL, email := 0.0, "", "", ""
	i := resdata["id"]
	if i != nil {
		githubID = i.(float64)
	}
	i = resdata["login"]
	if i != nil {
		login = i.(string)
	}
	i = resdata["avatar_url"]
	if i != nil {
		avatarURL = i.(string)
	}
	i = resdata["email"]
	if i != nil {
		email = i.(string)
	}
	user, _ := services.SaveLoginInfo(strconv.Itoa(int(githubID)), avatarURL, email, login)

	userInfo := gin.H{
		"isAdmin":    user.IsAdmin,
		"avatar_url": user.AvatarURL,
		"email":      user.Email,
		"name":       user.NickName,
	}

	cookie := &http.Cookie{
		Name:   "cookie-name",
		Value:  userInfo["name"].(string),
		Path:   "/",
		MaxAge: 100000,
	}
	http.SetCookie(c.Writer, cookie)
	c.Header("Set-Cookie", cookie.String())

	log.Println(user)
	//c.JSON(http.StatusOK, resdata)
	//c.SetCookie()
	c.HTML(http.StatusOK, "index.html", nil)

}
