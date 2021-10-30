const boom = require('@hapi/boom')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const UsersService = require('./user.service')
const {
  jwtSecret,
  supportEmail,
  passwordSupportEmail,
  recoverySecret
} = require('../config')

class AuthService {
  constructor() {
    this.userService = new UsersService()
  }
  async getUser(email, password) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw boom.unauthorized('User or password incorrect')
    }

    if (!(await bcrypt.compare(password, user.dataValues.password))) {
      throw boom.unauthorized('User or password incorrect')
    }

    delete user.dataValues.password
    return user
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, jwtSecret)
    return token
  }

  async sendRecovery(email) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw boom.unauthorized()
    }

    const payload = {
      sub: user.id
    }

    const token = jwt.sign(payload, recoverySecret, { expiresIn: '15min' })

    await this.userService.update(user.id, { recoveryToken: token })

    const link = `http://myfrontend.com/recovery?token=${token}`

    const mail = {
      from: supportEmail, // sender address
      to: email, // list of receivers
      subject: 'Email para recuperar contraseña', // Subject line
      html: `<b>Ingresa a este link para recuperar la contraseña ${link}</b>` // html body
    }
    await this.sendMail(mail)
  }
  async sendMail(infoMail) {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: supportEmail,
        pass: passwordSupportEmail
      }
    })

    await transporter.sendMail(infoMail)
  }

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, recoverySecret)
      const user = await this.userService.findOne(payload.sub)

      if (user.recoveryToken !== token) {
        throw boom.unauthorized()
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const userUpdated = await this.userService.update(payload.sub, {
        recoverySecret: '',
        password: hashedPassword
      })
      return userUpdated
    } catch (error) {
      throw boom.unauthorized()
    }
  }
}

module.exports = AuthService
