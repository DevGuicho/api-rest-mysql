const boom = require('@hapi/boom')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { jwtSecret } = require('../../../config')
const UsersService = require('../../../services/user.service')

const JwtStrategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
  },
  async (payload, done) => {
    const service = new UsersService()

    const user = await service.findOne(payload.sub)

    if (!user) {
      return done(boom.unauthorized(), false)
    }

    delete user.dataValues.password
    return done(null, user)
  }
)

module.exports = JwtStrategy
