const { Strategy } = require('passport-local')

const AuthService = require('../../../services/auth.service')

const LocalStrategy = new Strategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    const service = new AuthService()
    try {
      const user = await service.getUser(email, password)
      done(null, user)
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = LocalStrategy
