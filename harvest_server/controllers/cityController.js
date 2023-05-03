const uuid = require('uuid')
const path = require('path')
const {City} = require('../models/models')
const ApiError = require('../error/ApiError')

class CityController{
    async create(req, res, next){
        try{
            const {name, userId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const city = await City.create({name, userId, img: fileName})

            return res.json(city)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {

        const cities = await City.findAndCountAll()

        return res.json(cities)
    }
    async getOne(req, res){
        const {id} = req.params
        const city = await City.findOne(
            {
                where: {id},
            },
        )
        return res.json(city)
    }
}

module.exports = new CityController()