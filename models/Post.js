const { Model, DataTypes, NOW} = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Post extends Model {}

Post.init({
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull:false
    },                
    created: {
        type: DataTypes.DATE,                 
      get() {
            return moment(this.getDataValue('created')).format('DD/MM/YYYY h:mm:ss');
        }
    },
    updated: {
        type: DataTypes.DATE,
        get() {
            return moment(this.getDataValue('updated')).format('DD/MM/YYYY h:mm:ss');
        }
    }
},{
    sequelize
});

module.exports=Post