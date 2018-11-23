package services

import (
	"errors"
	"fmt"
	"time"

	"github.com/jinzhu/gorm"

	"go-react/backend/db"
	"go-react/backend/models"
)

//GetUserByName ...
func GetUserByName(name string) (*models.User, error) {
	var user models.User
	err := db.DB.First(&user, "email = ?", name).Error
	return &user, err
}

//GetArticleList ...
func GetArticleList(currentClass, currentTag string, current, pageSize int) ([]models.Post, error) {
	var posts []models.Post
	if currentClass == "" && currentTag == "" {
		err := db.DB.Offset((current - 1) * pageSize).Limit(pageSize).Find(&posts).Error
		return posts, err
	} else if currentTag != "" {
		db.DB.Raw("select posts.*,post_tags.tag_id,tags.name "+
			"from posts join post_tags on posts.id=post_tags.post_id join tags on tags.id = post_tags.tag_id "+
			"where tags.name=? limit ? offset ?", currentTag, pageSize, (current-1)*pageSize).Scan(&posts)

		return posts, nil
	} else {
		return nil, nil
	}
	return nil, nil
}

func GetAllTags() ([]models.Tag, error) {
	tags := []models.Tag{}
	err := db.DB.Find(&tags).Error
	if err != nil && !db.DB.RecordNotFound() {
		return nil, err
	}
	return tags, nil
}

//GetTags ...
func GetTags(postID uint) ([]models.Tag, error) {
	var postTags []models.PostTag
	if postID == 0 {
		return nil, errors.New("post ID not existed")
	}
	err := db.DB.Where("post_id=?", postID).Find(&postTags).Error
	if err != nil {
		fmt.Println(err)
		return nil, errors.New("post ID not existed")
	}
	var tags = make([]models.Tag, 0, len(postTags))
	for _, postTag := range postTags {
		var tag models.Tag
		err := db.DB.Where("id=?", postTag.TagId).Find(&tag).Error
		if err != nil && !db.DB.RecordNotFound() {
			fmt.Println(err)
			return nil, errors.New("tag ID not existed")
		}
		if !db.DB.RecordNotFound() {
			tags = append(tags, tag)
		}

	}
	return tags, nil
}
func GetTotalArticleItems(currentClass, currentTag string) (int, error) {
	count := 0
	if currentClass == "" && currentTag == "" {
		err := db.DB.Model(&models.Post{}).Count(&count).Error
		if err == gorm.ErrRecordNotFound {
			return count, nil
		}
		return count, err
	} else if currentClass != "" && currentTag != "" {
		return count, nil
	} else if currentTag != "" {
		db.DB.Raw("select count(*) from posts join post_tags on "+
			"posts.id=post_tags.post_id join tags on tags.id = post_tags.tag_id "+
			"where tags.name = ?", currentTag).Row().Scan(&count)
		return count, nil
	} else {
		return count, nil
	}
}

//SaveLoginInfo ...
func SaveLoginInfo(githubID, avatarURL, email, login string) (models.User, error) {
	user := models.User{}
	if db.DB.Where("github_login_id = ?", githubID).First(&user).RecordNotFound() {
		user.GithubLoginID = githubID
		user.NickName = login
		user.AvatarURL = avatarURL
		user.Email = email
		user.IsAdmin = false
		user.OutTime = time.Now()
		db.DB.Create(&user)
	} else {
		db.DB.Save(&user)
	}
	return user, nil
}
