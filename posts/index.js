const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id,
        title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: posts[id]
    }).catch(err => console.log(err.message));

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    const event = req.body;

    console.log('Received event ', event);

    res.send({});
});

app.listen(4000, () => {
    console.log('Posts service listening on port 4000');
})