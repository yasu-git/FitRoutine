import { fetchAPI } from './apiClient';

const BASE_URL = import.meta.env.VITE_API_BASE_URL + '/users';

// ユーザー一覧取得
export const getUsers = async () => {
  return await fetchAPI(`${BASE_URL}`, 'GET');
};

// ユーザー作成
export const createUser = async (user) => {
  return await fetchAPI(`${BASE_URL}`, 'POST', user);
};

// ユーザー更新
export const updateUser = async (id, user) => {
  return await fetchAPI(`${BASE_URL}/${id}`, 'PUT', user);
};

// ユーザー削除
export const deleteUser = async (id) => {
  return await fetchAPI(`${BASE_URL}/${id}`, 'DELETE');
};
