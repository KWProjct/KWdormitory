const Sequelize = require('sequelize');

class User extends Sequelize.Model{
    static initiate(sequelize){
        User.init({
            UID: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV4,
              primaryKey: true,
              allowNull: false,
            },
            ID: {
              type: Sequelize.STRING(15),
              allowNull: false,
              unique: true,
            },
            PW: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: false,
            },
            ADD1: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: false,
            },
            ADD2: {
                type: Sequelize.STRING(100),
                allowNull: false,
                unique: false,
            },
            PHONE: {
              type: Sequelize.STRING(50),
              allowNull: false,
            },
            ROOMNO:{
              type: Sequelize.INTEGER,
              allowNull: false,
              unique: true,
            },
            
          }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
          });
        }
      
        static associate(db) {
          db.User.hasMany(db.Board);
        }
};

module.exports = User;