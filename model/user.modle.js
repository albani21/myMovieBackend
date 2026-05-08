const {DataTypes} = require("sequelize");
const sequelize = require('../config/DbConfig');

const User = sequelize.define(
    "User",{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        seed:{
            type:DataTypes.CHAR,
            allowNull: false,
        }
    }
)

module.exports = User;