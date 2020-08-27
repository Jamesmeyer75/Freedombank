"use strict";
var sequelize = require("./index");
var Account = require("./account");

module.exports = (sequelize, DataTypes) => {
    var Transaction = sequelize.define("Transactions", {
        transaction_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        account_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        transaction_type: {
            type: DataTypes.STRING,
        },
        comment: {
            type: DataTypes.TEXT
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2)
        },

    }, {
        underscore: true
    });
    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Account, {
            as: "usertrans",
            foreignKey: "account_id"
        });
    }
    return Transaction;
}