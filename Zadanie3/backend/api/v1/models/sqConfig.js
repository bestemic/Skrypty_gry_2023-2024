const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.category = require("./category.js")(sequelize, Sequelize);
db.product = require("./product.js")(sequelize, Sequelize);

db.category.hasMany(db.product, { onDelete: 'CASCADE' });
db.product.belongsTo(db.category);

db.sequelize.sync({force: false})
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    })

module.exports = db;