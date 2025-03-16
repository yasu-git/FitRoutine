const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ユーザー作成
router.post('/', async (req, res) => {
	try {
		const user = await userController.createUser(req.body);
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// ユーザー一覧取得
router.get('/', async (req, res) => {
	try {
		const users = await userController.getAllUsers();
		res.json(users);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// 特定ユーザー取得
router.get('/:id', async (req, res) => {
	try {
		const user = await userController.getUserById(req.params.id);
		if (!user) return res.status(404).json({ error: 'ユーザーが見つかりません' });
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// ユーザー更新
router.put('/:id', async (req, res) => {
	try {
		const user = await userController.updateUser(req.params.id, req.body);
		res.json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// ユーザー削除
router.delete('/:id', async (req, res) => {
	try {
		await userController.deleteUser(req.params.id);
		res.status(204).end();
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
