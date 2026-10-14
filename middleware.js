export const config = {
  matcher: '/',// 保護したいURL（admin.html）
};

export default function middleware(request) {
  // ブラウザのポップアップに入力してほしいIDとパスワードを指定します
  const expectedUser = 'tipple';
  const expectedPass = '2025';

  const basicAuth = request.headers.get('authorization');
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === expectedUser && pwd === expectedPass) {
      // 認証成功：ページを表示
      return new Response(null, { headers: { 'x-middleware-next': '1' } });
    }
  }

  // 認証失敗、または未入力：ポップアップを表示
  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
