const {Culture} = require('../models/models')
const ApiError = require('../error/ApiError')
class CultureController{

    async create(req, res, next){
        try{
            const {name, description, optimal_landing_time, optimal_landing_temperature, landing_tips, typeId} = req.body

            const culture = await Culture.create({name, description, optimal_landing_time, optimal_landing_temperature, landing_tips, typeId})

            return res.json(culture)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res){
        const {typeId} = req.query
        let cultures
        if (!typeId){
            cultures = await Culture.findAll()
        }
        if (typeId){
            cultures = await Culture.findAll({where: {typeId}})
        }
        return res.json(cultures)

    }
}

module.exports = new CultureController()