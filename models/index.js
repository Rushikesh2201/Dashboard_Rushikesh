//***MySQL DB connection Using sequelize***//

const {Sequelize, DataTypes} = require('sequelize');
                               //dbname      uname     password
const sequelize = new Sequelize("dashboard", "root", "mynewpassword", {
    host : 'localhost',
    dialect : 'mysql',
});

sequelize.authenticate( )
.then(() => {
    console.log('DB Connected')
})
.catch(err => {
    console.log(err);
})

const db= {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;


//***Syncing the database***/
db.sequelize.sync({force : false, match: /dashboard$/})
.then(() => {
    console.log('Re-sync');
})
.catch(err => {
    console.log(err);
})

// declare the table users
db.users = require('./user')(sequelize,DataTypes);



module.exports = db;