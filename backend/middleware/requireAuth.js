const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    const token = JSON.parse(localStorage.getItem('user'))
}

module.exports = requireAuth