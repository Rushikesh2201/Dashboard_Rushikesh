
//table structure 

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users",{
        
        first_name : {
           type : DataTypes.STRING,
           required : true,           
        },

        last_name : {
            type : DataTypes.STRING,
            required : true,
        },

        phone_number : {
            type : DataTypes.STRING,
            required : true,
            unique : 'tt_unique_constraint',
        },

        email : {
            type : DataTypes.STRING,
            required : true,
            unique : 'tt_unique_constraint',
        },

        password : {
            type : DataTypes.STRING,
            required : true,
            unique : 'tt_unique_constraint',
        },
    })
    return Users;
}   