import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_AUTH_URI!, {})

const Auth = sequelize.define('Auth', {
    NICKNAME: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    LOWERCASENICKNAME: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    HASH: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    IP: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    TOTPTOKEN: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
    },
    REGDATE: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    UUID: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    PREMIUMUUID: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
    },
    LOGINIP: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    LOGINDATE: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    ISSUEDTIME: {
        type: DataTypes.BIGINT,
        allowNull: false,
    }
}, {
    tableName: 'AUTH',
    timestamps: false,
    schema: 'limboauth', // limboauth şemasında olduğundan emin olalım
});

export default Auth;