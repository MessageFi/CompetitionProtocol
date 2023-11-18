package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type ApplyInfo struct {
	GroupID        uint
	CaptainAddress string //队长钱包地址
	CaptainEmail   string //队长邮箱地址
	Track          uint   //赛道
	NumberOfPeople uint   //团队人数
	GitHub         string //GitHub username
	ProjectName    string //参赛项目名称
}

func main() {
	//r := gin.Default()
	//r.GET("/apply", func(c *gin.Context) {
	//	c.JSON(200, gin.H{})
	//})
	//	连接数据库
	dsn := "root:fyh0812@tcp(127.0.0.1:3306)/CompetitionProtocol?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	//defer db.Close()
	//	建表
	db.AutoMigrate(&ApplyInfo{})

	//	数据行
	a1 := ApplyInfo{1, "0xaaaaaaaaa", "123@qq.com", 1, 5, "dankfang", "protocol"}
	db.Create(&a1)
}
