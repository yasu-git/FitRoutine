import { required, email, numeric, minLength, helpers } from '@vuelidate/validators';

export const userRules = {
	name: {
		required: helpers.withMessage('名前は必須です.', required) // 必須入力
	},
	email: {
		required: helpers.withMessage('emailは必須です.', required), // 必須入力
		email: helpers.withMessage('正しいメールアドレスを入力してください。', email), // メールアドレス形式のチェック
	},
	tel: {
		required: helpers.withMessage('電話番号は必須です.', required), // 必須入力
		minLength: helpers.withMessage('電話番号は10桁以上で入力してください。', minLength(10)), // 最低10桁必要
		numeric: helpers.withMessage('数字のみ入力してください.', numeric), // 数値のみ許可
	},
};