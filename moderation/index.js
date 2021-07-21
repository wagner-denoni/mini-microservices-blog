const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const event = req.body;

  switch(event.type) {
    case 'CommentCreated':
      const comment = event.data;

      const status = (comment.content.includes('orange')) ? 'rejected' : 'approved';
      
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          id: comment.id,
          postId: comment.postId,
          status
        }
      });

      break;
  }

  res.send({status: 'OK'});
});

app.listen(4003, () => console.log('Moderation service listening on port 4003'));