const express = require('express')
const passport = require('passport')
const OrdersService = require('../services/order.service')

const router = express.Router()
const service = new OrdersService()

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const orders = await service.findByUser(req.user.id)
    res.json({
      message: 'Orders listed',
      data: orders
    })
  }
)

module.exports = router
