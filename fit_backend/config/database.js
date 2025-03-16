const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mariadb',
		logging: false,
	}
);

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('MariaDBへの接続に成功しました。');
	} catch (error) {
		console.error('MariaDB接続エラー:', error);
		process.exit(1);
	}
};

module.exports = { sequelize, connectDB };
