const Sequelize = require('sequelize');

class Board extends Sequelize.Model{
    static initiate(sequelize){
        Board.init({
            BID: {
                type: Sequelize.UUID,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
            },
            title: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            writer: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            read: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            del_yn: {
                type: Sequelize.ENUM('Y','N'),
                defaultValue: 'N',
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db){
        db.Board.belongsTo(db.User,{foreignkey: 'BID', targetKey: 'UID'});
    }
};

module.exports = Board;