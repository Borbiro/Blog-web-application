import express from "express";
import bodyParser from "body-parser";
import data from './data/blog_posts.json' assert {type: 'json'};
import { createBlogPost, changeBlogPost, deleteBlogPost } from "./functions.js";
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
  res.render("post.ejs", {
    data: data[postNumber],
    postNumber: postNumber
  })
})

app.get('/create', (req, res) => {
  var data = req.body
  res.render("create_post.ejs")
})

app.post('/submit', (req, res) => {
  data.push(createBlogPost(req.body))
  fs.writeFileSync('./data/blog_posts.json', JSON.stringify(data), 'utf-8')
  res.render("completed.ejs")
})

app.post('/change', (req, res) => {
  var postNumber = req.body["post-number"]
  res.render("change.ejs", {
    data: data[postNumber],
    postNumber: postNumber})
})

app.post("/changePost", (req, res) => {
  var changedData = {
    body: req.body.body,
    title: req.body.title,
    subtitle: req.body.subtitle,
    image_url: req.body.imgLink
  }
  fs.writeFileSync('./data/blog_posts.json', JSON.stringify(changeBlogPost(changedData, req.body["post-number"], data)), 'utf-8')
  res.render("completed.ejs")
})

app.post('/delete', (req, res) => {
  fs.writeFileSync('./data/blog_posts.json', JSON.stringify(deleteBlogPost(req.body["post-number"], data)), 'utf-8')
  res.render("completed.ejs")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})