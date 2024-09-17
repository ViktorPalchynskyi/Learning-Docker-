const express = require('express');
const axios = require('axios');
const { port, host, db, apiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');

const app = express();

app.get('/test', (req, res) => {
    res.send('Our auth server is working correctly');
});

app.get('/api/currentUser', (req, res) => {
    res.json({
        id: '123',
        email: 'test@test.com',
    });
});

app.get('/testwithapidata', async (req, res) => {
    const { data: test } = await axios.get(`${apiUrl}/testapidata`);

    res.json({
        testapidata: test.testwithapi,
        num: test.number,
    });
});

const startServer = () => {
    app.listen(port, async () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`Our host is ${host}`);
        console.log(`Database url ${db}`);
    });
};

connectDb()
    .on('error', console.log)
    .on('disconnected', connectDb)
    .once('open', startServer);
