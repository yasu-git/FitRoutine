const User = require('../models/User');

// 新規ユーザー作成
exports.createUser = async (userData) => {
	return await User.create(userData);
};

// ユーザー全取得
exports.getAllUsers = async () => {
	return await User.findAll();
};

// IDでユーザー取得
exports.getUserById = async (id) => {
	return await User.findByPk(id);
};

// ユーザー更新
exports.updateUser = async (id, updateData) => {
	const user = await User.findByPk(id);
	if (!user) throw new Error('ユーザーが見つかりません');
	return await user.update(updateData);
};

// ユーザー削除
exports.deleteUser = async (id) => {
	const user = await User.findByPk(id);
	if (!user) throw new Error('ユーザーが見つかりません');
	return await user.destroy();
};
