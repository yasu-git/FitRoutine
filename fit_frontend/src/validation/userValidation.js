import { required, email, numeric, minLength, helpers } from '@vuelidate/validators';

// パスワードのルール（少なくとも1つの数字、大文字を含む）
const passwordRules = {
  required: helpers.withMessage('パスワードは必須です.', required),
  minLength: helpers.withMessage('パスワードは8文字以上で入力してください。', minLength(8)),
  containsNumber: helpers.withMessage('パスワードには少なくとも1つの数字が必要です。',
    helpers.regex(/.*\d.*/)), // ✅ 1つ以上の数字を含む
  containsUppercase: helpers.withMessage('パスワードには少なくとも1つの大文字が必要です。',
    helpers.regex(/.*[A-Z].*/)), // ✅ 1つ以上の大文字を含む
};

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
  password: passwordRules, // ✅ パスワードのバリデーションを追加
};
