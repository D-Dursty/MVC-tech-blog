const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: {
            model: 'user',
            key: 'id'
        }
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'blog',
            key: 'id'
        }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    date:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,                 
        allowNull: false,
    }
},{
    sequelize, 
    freezeTableName: true, 
    underscored: true, 
    modelName: 'comment'
});

module.exports=Comment