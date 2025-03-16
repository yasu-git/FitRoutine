export class User {
  constructor({ id = null, username = '', email = '', tel = '', password = '' }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.tel = tel;
    this.password = password; // ✅ パスワードを保存
  }

  toJSON(includePassword = false) {
    const userData = {
      id: this.id,
      username: this.username,
      email: this.email,
      tel: this.tel,
    };

    // ✅ パスワードを含める場合のみ追加
    if (includePassword) {
      userData.password = this.password;
    }

    return userData;
  }
}
