// створюєм api. Встановлюєм це npm install -g nodemon і запускаєм по команді nodemon app.
// app це назва, може бути любою

const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json())

// браузер блокує запит до сервера  а команда npm install cors і ці 2 строки знизу вирішують цю проблему
const cors = require('cors');
app.use(cors());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(2000, () => {
      console.log("app lisening on port 2000");
    });
    db = getDb();
  }
});

// вертає дані з mongodb 
app.get("/books", (req, res) => {
  let books = [];

  db.collection("books")
    .find()
    .sort({ author: 1 })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "could not fetch the documents" });
    });
});
// вертає книжку одну по id
app.get("/books/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)){
        db.collection("books")
        .findOne({ _id: new ObjectId(req.params.id) })
        .then((doc) => {
          res.status(200).json(doc);
        })
        .catch(err => {
          res.status(500).json({ error: "could not fetch the document" });
        });
    } else{
        res.status(500).json({ error: "Not a valid id" });
    }
});


// обробка пост запросів. Добавляєм нову книжку в базу даних через postman вибрати body, raw, json
app.post('/books', (req, res) => {
    const book = req.body
    db.collection('books')
    // .insertOne(book) метод що вставляє
    .insertOne(book)
    // Якщо успішно то, відправляє відповідь зі статусом 201 (Created) і об'єктом JSON, який містить результат вставки
    .then(result => {
        res.status(201).json(result)
    })
    // Якщо виникає помилка при вставці документа, відправляє відповідь зі статусом 500 (Internal Server Error) і об'єктом JSON, який містить повідомлення про помилку.
    .catch(err =>{
        res.status(500).json( {err: 'Could not create a new document'})
    })
})

// Видаляєм  книжку з бази даних 
app.delete('/books/:id', (req, res) =>{
    if (ObjectId.isValid(req.params.id)){
        db.collection("books")
        .deleteOne({ _id: new ObjectId(req.params.id) })
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(500).json({ error: "could not delete the document" });
        });
    } else{
        res.status(500).json({ error: "Not a valid id" });
    }
})
// Виправляємо якісь дані в книжці в самій базі даних через postman вибрати body, raw, json
app.patch('/books/:id', (req, res) =>{
    const updates = req.body

    if (ObjectId.isValid(req.params.id)){
        db.collection("books")
        .updateOne({ _id: new ObjectId(req.params.id)}, {$set: updates})
        .then((result) => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.status(500).json({ error: "could not update the document" });
        });
    } else{
        res.status(500).json({ error: "Not a valid id" });
    }
})