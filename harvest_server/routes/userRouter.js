const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/:id',authMiddleware, userController.getOneUser)
router.patch('/premium', authMiddleware, userController.setPremium)
router.post('/message',authMiddleware, userController.sendMessage)

module.exports = router