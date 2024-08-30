import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MYSQL_LUCPKERMS_URI!, {
    logging: false
})

const LuckPermsUserPermissions = sequelize.define('LuckPermsUserPermissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    uuid: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    permission: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    value: {
        type: DataTypes.TINYINT,
        allowNull: false,
    },
    server: {
        type: DataTypes.STRING(36),
        allowNull: false,
    },
    world: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    expiry: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    contexts: {
        type: DataTypes.STRING(200),
        allowNull: false,
    }
}, {
    tableName: 'luckperms_user_permissions',
    timestamps: false,  // Eğer createdAt ve updatedAt sütunları yoksa
});

export default LuckPermsUserPermissions;