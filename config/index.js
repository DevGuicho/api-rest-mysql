require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  recoverySecret: process.env.RECOVERY_SECRET,
  supportEmail: process.env.SUPPORT_EMAIL,
  passwordSupportEmail: process.env.SUPPORT_EMAIL_PASSWORD
}
