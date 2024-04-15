import { Sequelize } from "sequelize";

const db = new Sequelize('auth-db', 'mek', 'mek',{
    host: "localhost",
    dialect: "mysql"
})

export default db