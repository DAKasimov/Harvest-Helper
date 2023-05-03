const Router = require('express')
const router = new Router()
const cultureController = require('../controllers/cultureController')


router.post('/', cultureController.create)
router.get('/', cultureController.getAll)

module.exports = router