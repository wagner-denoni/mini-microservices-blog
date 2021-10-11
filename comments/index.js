const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];
  const comment = {
    id: commentId,
    postId: postId,
    content,
    status: 'pending'
  };

  comments.push(comment);
  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: comment
  }).catch(err => console.log(err.message));

  res.status(201).json(comments);
});

app.post('/events', async (req, res) => {
  const event = req.body;

  console.log('Received event ', event);

  switch(event.type) {
    case 'CommentModerated':
      const {id, postId, status} = event.data;

      const comments = commentsByPostId[postId];
      console.log(commentsByPostId, postId, id);
      if (comments) {
        const commentIndex = comments.findIndex(comment => comment.id === id);
        console.log(commentIndex)
        if (commentIndex !== -1) {
          comments[commentIndex].status = status;

          await axios.post('http://event-bus-clusterip-srv:4005/events', {
            type: 'CommentUpdated',
            data: comments[commentIndex]
          });
        } 
      }
      break;
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("Comments service listening on port 4001");
});
