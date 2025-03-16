<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">名前</label>
      <input id="username" type="text" v-model="selectedUser.username" required />
    </div>

    <div>
      <label for="email">メール</label>
      <input id="email" type="text" v-model="selectedUser.email" required />
    </div>

    <div>
      <label for="tel">電話番号</label>
      <input id="tel" type="text" v-model="selectedUser.tel" required />
    </div>

    <div>
      <label for="password">パスワード</label>
      <input id="password" type="password" v-model="selectedUser.password" :placeholder="selectedUser.id ? '変更する場合のみ入力' : 'パスワードを入力'" />
    </div>

    <button type="submit">{{ selectedUser.id ? '更新' : '追加' }}</button>
  </form>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';

// Pinia ストアを使用
const userStore = useUserStore();
const { selectedUser, addUser, editUser, resetSelectedUser } = userStore;

// フォーム送信処理
const submitForm = () => {
  if (selectedUser.id) {
    editUser(selectedUser.id, selectedUser);
  } else {
    addUser(selectedUser);
  }
  resetSelectedUser();
};
</script>
