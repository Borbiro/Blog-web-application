import express from "express";
import bodyParser from "body-parser";
import data from './data/blog_posts.json' assert {type: 'json'};

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
  res.render("create_post.ejs")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})