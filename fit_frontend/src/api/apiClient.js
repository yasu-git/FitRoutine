export async function fetchAPI(url, method = 'GET', data = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  console.log('✅ 送信データ:', options.body); // ✅ 送信データを確認

  try {
    const response = await fetch(url, options);

    // ✅ レスポンスの `Content-Type` を確認
    const contentType = response.headers.get('content-type');

    // ✅ JSON レスポンスかどうかをチェック
    const responseData = contentType && contentType.includes('application/json')
      ? await response.json() // ✅ JSON をパース
      : await response.text(); // ✅ テキストレスポンスを取得

    if (!response.ok) {
      throw new Error(responseData?.message || 'API エラーが発生しました');
    }

    return responseData; // ✅ API からのレスポンスを返す
  } catch (error) {
    console.error('❌ API リクエストエラー:', error.message);
    throw new Error(`リクエストに失敗しました: ${error.message}`);
  }
}
