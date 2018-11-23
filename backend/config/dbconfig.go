package config

type dbConfig struct {
	Dialect      string
	Database     string
	User         string
	Password     string
	Charset      string
	Host         string
	Port         int
	SQLLog       bool
	MaxIdelConns int
	MaxOpenConns int
	URL          string
}

//DBConfig ...
var DBConfig dbConfig
