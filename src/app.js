const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const consign = require('consign');
const morgan = require('morgan');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

consign({
        cwd: 'src',
        verbose: false,
        locale: 'pt-br'
    })
    .then('controllers')
    .then('routes')
    .into(app);

app.use(errors());

module.exports = app;