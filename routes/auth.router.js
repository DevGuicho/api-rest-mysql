const express = require('express')
const passport = require('passport')

const AuthService = require('../services/auth.service')

const router = express.Router()
const service = new AuthService()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    const user = req.user
    const token = service.signToken(user)
    res.json({
      message: 'Login successful',
      data: { user, token }
    })
  }
)

router.post('/recovery', async (req, res, next) => {
  const { email } = req.body
  try {
    await service.sendRecovery(email)

    res.json({
      message: 'Email recovery sent'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/change-password', async (req, res, next) => {
  const { password, token } = req.body
  try {
    const user = await service.changePassword(token, password)

    res.json({
      message: 'password recovery successful',
      data: user
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
