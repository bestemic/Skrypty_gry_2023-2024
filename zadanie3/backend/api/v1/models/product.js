module.exports = (sequelize, Sequelize) => {
    return sequelize.define("product", {
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            }
        },
        {
            tableName: 'products',
            timestamps: false
        });
};