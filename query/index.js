const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (event) => {
  switch(event.type) {
    case 'PostCreated':
      posts[event.data.id] = {...event.data, comments: []};

      break;
    case 'CommentCreated':
      if (posts[event.data.postId]) {
        posts[event.data.postId].comments.push(event.data);
      };

      break;
    case 'CommentUpdated':
      if (posts[event.data.postId]) {
        const commentIndex = posts[event.data.postId].comments.findIndex(comment => comment.id === event.data.id);
        if (commentIndex !== -1) {
          posts[event.data.postId].comments[commentIndex] = event.data;
        };
      };

      break;
  }
}

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/events', (req, res) => {
  const event = req.body;

  handleEvent(event);

  res.json({status: 'OK'});
});

app.listen(4002, async () => {
  try {
    console.log('Query service listening on port 4002');
  
    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
      console.log('Processing event: ', event.type);

      handleEvent(event);
    }
  } catch (err) {
    console.log(err.message)
  }  
});