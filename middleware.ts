import { NextRequest, NextResponse } from 'next/server';

// Danh sách các trang đã hoàn thành và không cần chuyển hướng đến Coming Soon
const COMPLETED_ROUTES = [
  '/',                // Trang chủ
  '/about',           // Giới thiệu (nếu có)
  '/contact',         // Liên hệ (nếu có)
  '/blogs',           // Trang danh sách blogs
  '/blogs/*',         // Tất cả các trang chi tiết blog (kể cả slug)
  // Thêm các routes đã hoàn thành tại đây
];

// Danh sách các đường dẫn tĩnh cần bỏ qua (không chuyển hướng)
const STATIC_PATHS = [
  '/_next',
  '/favicon.ico',
  '/images',
  '/api',
  '/fonts',
];

// Danh sách các trang đã được tạo trong app nhưng chưa hoàn thành
// Đây là danh sách thủ công
const EXISTING_UNFINISHED_ROUTES = [
  '/dashboard',
  '/login',
  '/register',
  '/author',
  // Thêm các trang khác ở đây
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kiểm tra xem có phải là đường dẫn tĩnh không
  if (STATIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Bỏ qua các đường dẫn hệ thống
  if (pathname === '/comingsoon' || pathname === '/not-found') {
    return NextResponse.next();
  }

  // Kiểm tra xem đường dẫn có trong danh sách trang đã hoàn thành không
  const isCompletedRoute = COMPLETED_ROUTES.some(route => {
    // Kiểm tra chính xác đường dẫn hoặc là đường dẫn con (sử dụng với các slug)
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return pathname === baseRoute || pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });

  if (isCompletedRoute) {
    // Nếu là trang đã hoàn thành, cho phép truy cập bình thường
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