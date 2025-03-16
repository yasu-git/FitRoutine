export async function fetchAPI(url, method = 'GET', data = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API エラーが発生しました');
  }

  return response.json(); // ✅ APIからのレスポンスを返す
}
