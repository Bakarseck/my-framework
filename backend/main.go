package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("sqlite3", "./chat.db")
	if err != nil {
		log.Fatal(err)
	}

	createUserTable := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE,
		firstName TEXT,
		lastName TEXT,
		age INTEGER,
		gender TEXT,
		email TEXT UNIQUE,
		password TEXT
	);`

	statement, err := db.Prepare(createUserTable)

	if err != nil {
		fmt.Println(err.Error())
		return
	}
	statement.Exec()

	createMessageTable := `CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT,
        receiver TEXT,
        content TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );`

	statement, err = db.Prepare(createMessageTable)

	if err != nil {
		fmt.Println(err.Error())
		return
	}
	statement.Exec()
}

func main() {
	fs := http.FileServer(http.Dir("../frontend"))

	http.Handle("/", fs)
	http.HandleFunc("/register", Signup)
	http.HandleFunc("/login", Signin)

	// Démarrer le serveur sur le port 8080 et vérifier les erreurs
	log.Println("Server starting on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
