export class User {
  constructor({ id = null, username = '', email = '', tel = '', password = '' }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.tel = tel;
    this.password = password; // ✅ パスワードを追加
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      tel: this.tel,
      // password は `toJSON()` で返さない（セキュリティ対策）
    };
  }
}
