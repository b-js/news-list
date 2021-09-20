/* eslint-disable */
const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const axios = require('axios');


const port = process.env.PORT || 5000;
const app = express();
app.use(history());
app.use(serveStatic(`${__dirname}/dist/spa`));
app.get('/api/', async (req, res, next) => {
    const url = req.query.url;
    const data = await axios({url})
    res.send(data.data)
});
app.listen(port);
