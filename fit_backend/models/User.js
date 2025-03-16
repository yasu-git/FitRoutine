const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
	id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
	username: { type: DataTypes.STRING, allowNull: false, unique: true },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	tel: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },

	// ✅ `createdAt` `updatedAt` を明示的に設定
	createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
	updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
	tableName: 'Users',
	timestamps: true
});

// ✅ `beforeCreate` でパスワードがある場合のみハッシュ化
User.beforeCreate(async (user) => {
	if (user.password) {
		try {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
		} catch (error) {
			console.error('❌ パスワードのハッシュ化に失敗:', error);
			throw error;
		}
	}
});

// ✅ `beforeUpdate` で `password` が変更された場合のみハッシュ化
User.beforeUpdate(async (user) => {
	if (user.changed('password') && user.password) {
		try {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
		} catch (error) {
			console.error('❌ パスワードのハッシュ化に失敗:', error);
			throw error;
		}
	}
});

// ✅ パスワード検証メソッド (`compare` で直接検証)
User.prototype.verifyPassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		console.error('❌ パスワード検証エラー:', error);
		return false;
	}
};

module.exports = User;
