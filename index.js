import express from "express";
import bodyParser from "body-parser";
import data from './data/blog_posts.json' assert {type: 'json'};
import { createBlogPost } from "./functions.js";
import fs from "fs";

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"))

app.get('/', (req, res) => {
    res.render("index.ejs", {data: data})
})

app.post('/post', (req, res) => {
  var postNumber = req.body["post-number"]
  res.render("post.ejs", {data: data[postNumber]})
})

app.get('/create', (req, res) => {
  var data = req.body
  res.render("create_post.ejs")
})

app.post('/submit', (req, res) => {
  data.push(createBlogPost(req.body, data))
  fs.writeFileSync('./data/blog_posts.json', JSON.stringify(data), 'utf-8')
  res.render("completed.ejs")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})