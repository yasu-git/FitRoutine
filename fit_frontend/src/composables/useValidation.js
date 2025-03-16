// src/composables/useValidation.js
import { ref, nextTick } from 'vue';
import { useVuelidate } from '@vuelidate/core';

/**
 * 汎用バリデーション & フォーカス管理用 composable
 *
 * @param {Object} formData - バリデーション対象のデータ（ユーザー入力など）
 * @param {Object} rules - バリデーションルール
 * @returns {Object} バリデーションの状態 (`$v`)、入力フィールドの ref、エラーハンドリング関数
 */
export function useValidation(formData, rules) {
  // 各入力フィールドの ref（バリデーションエラー時にフォーカスを当てるために使用）
  const inputRefs = {};

  // フォームの項目に対して ref を作成
  Object.keys(formData).forEach((key) => {
    inputRefs[key] = ref(null);
  });

  // useVuelidate を適用し、バリデーション管理オブジェクト `$v` を作成
  const $v = useVuelidate(rules, formData);

  /**
   * バリデーションエラー時に最初のエラーの入力フィールドにフォーカスを当てる
   */
  async function handleValidationErrors() {
    await nextTick(); // UI が更新されてから処理を実行

    for (const key of Object.keys(formData)) {
      if ($v.value[key]?.$error && inputRefs[key]?.value) {
        inputRefs[key].value.focus();
        break;
      }
    }
  }

  return {
    $v, // バリデーションの状態
    inputRefs, // 入力フィールドの ref
    handleValidationErrors, // バリデーションエラー時のフォーカス処理関数
  };
}
