const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, City} = require('../models/models')
const nodemailer = require('nodemailer')

const generateJWT = (id, firstname, lastname, city, email, role) =>{
    return jwt.sign(
        {id, firstname, lastname, city, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    }
})


class UserController{
    async registration(req, res, next){
        const {firstname, lastname, email, city, password, role} = req.body
        if (!firstname || !lastname || !city || !email || !password){
            return next(ApiError.badRequest('Некорректное name или lastname или city или email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name: firstname, lastname, city, email, role, password: hashPassword})
        const token = generateJWT(user.id, user.name, user.lastname, user.city, user.email, user.role)

        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJWT(user.id, user.name, user.lastname, user.city, user.email, user.role)
        return res.json({token})
    }

    async getOneUser(req, res, next) {
        const {id} = req.user;

        const user = await User.findOne(
            {
                where: {id},
            },
        )
        return res.json(user)
    }

    async check(req, res, next){
        const user = await User.findOne({where: {id: req.user.id}})

        const token = generateJWT(user.id, user.name, user.lastname, user.city, user.email, user.role)
        return res.json({token})
    }

    async setPremium(req, res) {
        const {id} = req.user;

        const user = await User.update({
            role: 'PREMIUM'
        }, {
            where: {
                id
            }
        })

        const token = generateJWT(user.id, user.name, user.lastname, user.city, user.email, user.role)
        return res.json({token})
    }

    async sendMessage(address, message){
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: 'Письмо на node js',
            text: 'sdkvnsknvksndk'
        }
         return transporter.sendMail(mailOptions)
    }

}

module.exports = new UserController()