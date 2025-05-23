import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Danh sách các trang không cần authentication
const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/comingsoon',
  '/not-found',
];

// Danh sách các trang đã hoàn thành và không cần chuyển hướng đến Coming Soon
const COMPLETED_ROUTES = [
  '/',                // Trang chủ
  '/about',           // Giới thiệu
  '/contact',         // Liên hệ
  '/blogs',           // Trang danh sách blogs
  '/blogs/*',         // Tất cả các trang chi tiết blog
  '/dashboard',       // Dashboard
  '/login',           // Trang đăng nhập
  '/register',        // Trang đăng ký
];

// Danh sách các đường dẫn tĩnh cần bỏ qua
const STATIC_PATHS = [
  '/_next',
  '/favicon.ico',
  '/images',
  '/api',
  '/fonts',
];

// Danh sách các trang cần authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
];

// Danh sách các trang đã được tạo trong app nhưng chưa hoàn thành
const EXISTING_UNFINISHED_ROUTES = [
  '/profile',
  '/settings',
  '/author',
  '/categories',
  '/tags',
  '/admin',
  '/notifications',
  '/privacy-policy',
  // Thêm các trang khác ở đây
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kiểm tra xem có phải là đường dẫn tĩnh không
  if (STATIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Bỏ qua các đường dẫn hệ thống
  if (pathname === '/comingsoon' || pathname === '/not-found') {
    return NextResponse.next();
  }

  // Kiểm tra authentication cho các trang được bảo vệ
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname === route || pathname.startsWith(route + '/')
  );

  if (isProtectedRoute) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Nếu đã đăng nhập và truy cập trang login, chuyển hướng về dashboard
  if (pathname === '/login') {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  // Kiểm tra xem đường dẫn có trong danh sách trang đã hoàn thành không
  const isCompletedRoute = COMPLETED_ROUTES.some(route => {
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return pathname === baseRoute || pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });

  if (isCompletedRoute || PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Kiểm tra xem đường dẫn có phải là trang đã tạo nhưng chưa hoàn thành
  const isExistingButUnfinished = EXISTING_UNFINISHED_ROUTES.some(route => {
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return pathname === baseRoute || pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });

  const url = request.nextUrl.clone();

  if (isExistingButUnfinished) {
    // Nếu là trang đã tạo nhưng chưa hoàn thành -> Coming Soon
    url.pathname = '/comingsoon';
    url.searchParams.set('from', pathname);
    return NextResponse.rewrite(url);
  } else {
    // Nếu không phải trang đã tạo -> Not Found
    url.pathname = '/not-found';
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};