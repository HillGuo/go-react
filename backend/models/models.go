package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

//Page table pages
type Page struct {
	gorm.Model
	Title       string //title
	Body        string //body
	View        int    //view count
	IsPublished bool   //published or not
}

//Tag tags
type Tag struct {
	gorm.Model
	Name string // tag name
}

//Post 文章表
type Post struct {
	gorm.Model
	Title       string //title
	Body        string //body
	View        int    //view count
	IsPublished bool   //
	Good        int
}

//PostTag 文章Tag
type PostTag struct {
	gorm.Model
	PostId uint // post id
	TagId  uint // tag id
}

//User ...
type User struct {
	gorm.Model
	Email         string    `gorm:"unique_index;default:null"` //邮箱
	Phone         string    `gorm:"unique_index;default:null"` //手机
	Password      string    `gorm:"default:null"`              //密码
	VerifyState   string    `gorm:"default:'0'"`               //邮箱验证状态
	SecretKey     string    `gorm:"default:null"`              //密钥
	OutTime       time.Time `gorm:"default:'0'"`               //过期时间
	GithubLoginID string    `gorm:"unique_index'default:null"` //github id
	GithubURL     string    //github 地址
	IsAdmin       bool      //是否是管理员
	AvatarURL     string    //头像地址
	NickName      string    //昵称
	LockState     bool      `gorm:"default:'0'"` //锁定
}

//Comment 评论表
type Comment struct {
	gorm.Model
	UserID       uint   // 用户ID
	Content      string //内容
	PostID       uint   //文章ID
	ParentUserID uint   //被评论的ID
}

//Subscribe 订阅表
type Subscribe struct {
	gorm.Model
	Email          string    `gorm:"unique_index"` //邮箱
	VerifyState    bool      `gorm:"default:'0'"`  //验证状态
	SubscribeState bool      `gorm:"default:'1'"`  //订阅状态
	OutTime        time.Time //过期时间
	SecretKey      string    //密钥
	Signature      string    //签名
}

//
