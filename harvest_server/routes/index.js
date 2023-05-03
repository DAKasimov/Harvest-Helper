const Router = require('express')
const router = new Router()
const cityRouter = require('./cityRouter')
const cultureRouter = require('./cultureRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/culture', cultureRouter)
router.use('/type', typeRouter)
router.use('/city', cityRouter)

module.exports = router