// src/stores/userStore.js
import { defineStore } from 'pinia';
import { User } from '@/models/User';
import { getUsers, createUser, updateUser, deleteUser } from '@/api/userService';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [], // ユーザーリスト
    selectedUser: new User({}), // 現在選択されているユーザー
  }),

  actions: {
    // ユーザー一覧を取得
    async fetchUsers() {
      const usersData = await getUsers();
      this.users = usersData.map(user => new User(user));
    },

    // ユーザーを追加
    async addUser(userData) {
      const newUser = await createUser(userData);
      this.users.push(new User(newUser));
    },

    // ユーザーを更新
    async editUser(id, userData) {
      const updatedUser = await updateUser(id, userData);
      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) this.users[index] = new User(updatedUser);
    },

    // ユーザーを削除
    async removeUser(id) {
      await deleteUser(id);
      this.users = this.users.filter(user => user.id !== id);
    },

    // ユーザーを選択
    selectUser(user) {
      this.selectedUser = new User(user);
    },

    // ユーザーフォームをリセット
    resetSelectedUser() {
      this.selectedUser = new User({});
    }
  },
});
