const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, },
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "NORMAL"}
})

const City = sequelize.define('city',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    img: {type: DataTypes.STRING, allowNull: false}
})

const Culture = sequelize.define('culture',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    optimal_landing_time: {type: DataTypes.STRING},
    optimal_landing_temperature: {type: DataTypes.STRING},
    landing_tips: {type: DataTypes.STRING},
})

const Type = sequelize.define('type',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const CityCulture = sequelize.define('city_culture',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const UserCity = sequelize.define('user_city',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.belongsToMany(City, {through: UserCity})
City.belongsToMany(User, {through: UserCity})

Type.hasMany(Culture)
Culture.belongsTo(Type)

City.belongsToMany(Culture, {through: CityCulture})
Culture.belongsToMany(City, {through: CityCulture})

module.exports = {
    User,
    City,
    Culture,
    Type,
    CityCulture,
    UserCity
}