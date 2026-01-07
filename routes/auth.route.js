const express = require('express');
const Router = express.Router();
const { googleAuth } = require('../controllers/auth.Controller');

Router.get("/google", googleAuth);

module.exports = Router;