import { NextResponse } from 'next/server';
import { Post } from '@/types/post';

const posts: Post[] = [
    {
        id: '1',
        title: 'Giới thiệu về Next.js: Framework React hiện đại',
        slug: 'gioi-thieu-ve-nextjs',
        excerpt: 'Next.js là một framework React mạnh mẽ cho phép xây dựng ứng dụng web hiện đại với nhiều tính năng như SSR, SSG, routing tích hợp và nhiều hơn nữa.',
        content: `
      # Giới thiệu về Next.js
      
      Next.js là một framework phổ biến cho React, được phát triển bởi Vercel. Nó cung cấp nhiều tính năng hữu ích như:
      
      ## Server-side Rendering (SSR)
      
      Next.js cho phép render các trang React từ phía server, giúp cải thiện SEO và tăng tốc độ tải trang ban đầu.
      
      ## Static Site Generation (SSG)
      
      Bạn có thể pre-render các trang tại thời điểm build, giúp trang web có tốc độ tải nhanh như chớp và dễ dàng host trên CDN.
      
      ## File-system Based Routing
      
      Next.js sử dụng hệ thống routing dựa trên cấu trúc thư mục, giúp việc tạo và quản lý các routes trở nên trực quan và dễ dàng hơn.
      
      ## API Routes
      
      Next.js cho phép bạn tạo API endpoints ngay trong ứng dụng của mình, giúp đơn giản hóa việc phát triển full-stack.
    `,
        featuredImage: '/nextjs.png',
        date: '28 tháng 4, 2025',
        readTime: '5 phút',
        author: {
            name: 'Nguyễn Văn A',
            avatar: '/ava1.png'
        },
        category: 'Web Development',
        tags: ['Next.js', 'React', 'Frontend']
    },
    {
        id: '2',
        title: 'Sử dụng Tailwind CSS trong Next.js',
        slug: 'su-dung-tailwind-css-trong-nextjs',
        excerpt: 'Tìm hiểu cách tích hợp và sử dụng Tailwind CSS để thiết kế giao diện nhanh chóng và hiệu quả trong dự án Next.js.',
        content: `
      # Sử dụng Tailwind CSS trong Next.js
      
      Tailwind CSS là một framework CSS tiện ích giúp bạn xây dựng giao diện nhanh chóng và linh hoạt.
      
      ## Cài đặt Tailwind CSS trong Next.js
      
      Việc tích hợp Tailwind vào Next.js rất đơn giản. Bạn chỉ cần cài đặt một vài package và thực hiện một số cấu hình cơ bản.
      
      ## Sử dụng các utility classes
      
      Tailwind cung cấp rất nhiều utility classes mà bạn có thể sử dụng trực tiếp trong JSX/TSX để tạo giao diện mà không cần viết CSS riêng.
      
      ## Tùy chỉnh theme
      
      Bạn có thể dễ dàng tùy chỉnh theme của Tailwind thông qua file cấu hình để phù hợp với thiết kế riêng của dự án.
    `,
        featuredImage: '/nextjs.png',
        date: '25 tháng 4, 2025',
        readTime: '7 phút',
        author: {
            name: 'Nguyễn Văn A',
            avatar: '/ava1.png'
        },
        category: 'CSS',
        tags: ['Next.js', 'Tailwind CSS', 'CSS']
    },
    {
        id: '3',
        title: 'Server Components trong Next.js 13+',
        slug: 'server-components-trong-nextjs-13',
        excerpt: 'Khám phá React Server Components trong Next.js 13 và cách chúng cải thiện hiệu suất ứng dụng của bạn.',
        content: `
      # Server Components trong Next.js 13+
      
      React Server Components là một tính năng mới và thú vị được giới thiệu trong Next.js từ phiên bản 13.
      
      ## Server Components vs Client Components
      
      Hiểu sự khác biệt giữa Server Components và Client Components và khi nào nên sử dụng mỗi loại.
      
      ## Lợi ích của Server Components
      
      Server Components giúp giảm kích thước JavaScript được gửi đến client, cải thiện hiệu suất và trải nghiệm người dùng.
      
      ## Patterns phổ biến
      
      Tìm hiểu các patterns phổ biến khi làm việc với Server Components trong Next.js.
    `,
        featuredImage: '/nextjs.png',
        date: '20 tháng 4, 2025',
        readTime: '8 phút',
        author: {
            name: 'Trần Văn B',
            avatar: '/ava1.png'
        },
        category: 'React',
        tags: ['Next.js', 'React', 'Server Components']
    },
    {
        id: '4',
        title: 'Xây dựng API Routes trong Next.js',
        slug: 'xay-dung-api-routes-trong-nextjs',
        excerpt: 'Hướng dẫn chi tiết về cách tạo và sử dụng API Routes trong Next.js để xây dựng ứng dụng full-stack.',
        content: `
      # Xây dựng API Routes trong Next.js
      
      Next.js cho phép bạn tạo API endpoints trong cùng một dự án, giúp việc phát triển full-stack trở nên đơn giản hơn.
      
      ## Tạo API Routes cơ bản
      
      Tìm hiểu cách tạo các API endpoints đơn giản trong Next.js.
      
      ## Xử lý HTTP methods
      
      Cách xử lý các HTTP methods khác nhau như GET, POST, PUT và DELETE trong API Routes.
      
      ## Middleware và xác thực
      
      Tìm hiểu cách thêm middleware và xác thực cho API Routes của bạn để đảm bảo tính bảo mật.
    `,
        featuredImage: '/nextjs.png',
        date: '15 tháng 4, 2025',
        readTime: '6 phút',
        author: {
            name: 'Lê Văn C',
            avatar: '/ava1.png'
        },
        category: 'Backend',
        tags: ['Next.js', 'API', 'Backend']
    },
    {
        id: '5',
        title: 'Triển khai Next.js lên Vercel',
        slug: 'trien-khai-nextjs-len-vercel',
        excerpt: 'Hướng dẫn từng bước để triển khai ứng dụng Next.js của bạn lên nền tảng Vercel một cách nhanh chóng và hiệu quả.',
        content: `
      # Triển khai Next.js lên Vercel
      
      Vercel là nền tảng triển khai được tối ưu hóa cho Next.js, giúp bạn dễ dàng đưa ứng dụng lên production.
      
      ## Tạo tài khoản Vercel
      
      Các bước để tạo tài khoản Vercel và kết nối với repository của bạn.
      
      ## Cấu hình triển khai
      
      Tùy chỉnh cấu hình triển khai để phù hợp với nhu cầu của dự án.
      
      ## Domain và môi trường
      
      Cách cấu hình domain tùy chỉnh và thiết lập các biến môi trường cho ứng dụng của bạn.
    `,
        featuredImage: '/nextjs.png',
        date: '10 tháng 4, 2025',
        readTime: '5 phút',
        author: {
            name: 'Phạm Văn D',
            avatar: '/ava1.png'
        },
        category: 'Deployment',
        tags: ['Next.js', 'Vercel', 'Deployment']
    },
    {
        id: '6',
        title: 'Tối ưu hóa SEO cho ứng dụng Next.js',
        slug: 'toi-uu-hoa-seo-cho-ung-dung-nextjs',
        excerpt: 'Các chiến lược và kỹ thuật tối ưu hóa SEO hiệu quả cho ứng dụng Next.js để tăng thứ hạng tìm kiếm.',
        content: `
      # Tối ưu hóa SEO cho ứng dụng Next.js
      
      Next.js cung cấp nhiều tính năng giúp bạn tối ưu hóa SEO cho ứng dụng web của mình.
      
      ## Metadata và Head tags
      
      Cách sử dụng Head component và metadata để cải thiện SEO.
      
      ## Dynamic OG Images
      
      Tạo hình ảnh OG động để cải thiện chia sẻ trên mạng xã hội.
      
      ## Sitemap và robots.txt
      
      Cách tạo sitemap và robots.txt tự động cho ứng dụng Next.js của bạn.
    `,
        featuredImage: '/nextjs.png',
        date: '5 tháng 4, 2025',
        readTime: '9 phút',
        author: {
            name: 'Hoàng Văn E',
            avatar: '/ava1.png'
        },
        category: 'SEO',
        tags: ['Next.js', 'SEO', 'Marketing']
    },
    {
        id: '7',
        title: 'Sử dụng Image Optimization trong Next.js',
        slug: 'su-dung-image-optimization-trong-nextjs',
        excerpt: 'Tìm hiểu cách sử dụng Image component trong Next.js để tối ưu hóa hình ảnh, giúp cải thiện hiệu suất website.',
        content: `
      # Sử dụng Image Optimization trong Next.js
      
      Next.js cung cấp component \`next/image\` giúp tự động tối ưu hóa hình ảnh.
      
      ## Ưu điểm của next/image
      
      - Tự động resize
      - Tối ưu định dạng ảnh
      - Lazy loading
      
      ## Cách sử dụng
      
      Sử dụng \`<Image>\` từ \`next/image\` để thay thế cho thẻ \`<img>\`.
      
      ## Tùy chỉnh cấu hình
      
      Tùy chỉnh domain, chất lượng ảnh, loader riêng trong \`next.config.js\`.
    `,
        featuredImage: '/nextjs.png',
        date: '2 tháng 4, 2025',
        readTime: '6 phút',
        author: {
            name: 'Nguyễn Thị F',
            avatar: '/ava1.png'
        },
        category: 'Performance',
        tags: ['Next.js', 'Image', 'Performance']
    },
    {
        id: '8',
        title: 'Tạo sitemap.xml tự động với Next.js',
        slug: 'tao-sitemap-voi-nextjs',
        excerpt: 'Hướng dẫn tạo sitemap.xml tự động để cải thiện SEO cho trang web Next.js của bạn.',
        content: `
      # Tạo sitemap.xml tự động với Next.js
      
      Sitemap giúp công cụ tìm kiếm hiểu được cấu trúc website.
      
      ## Tạo API Route tạo sitemap
      
      Viết file API để sinh sitemap từ danh sách bài viết.
      
      ## Cấu hình robots.txt
      
      Cho phép crawler truy cập sitemap tại đường dẫn cố định.
      
      ## Cập nhật sitemap khi build
      
      Kết hợp với getStaticProps để sitemap luôn cập nhật.
    `,
        featuredImage: '/nextjs.png',
        date: '30 tháng 3, 2025',
        readTime: '5 phút',
        author: {
            name: 'Lê Văn G',
            avatar: '/ava1.png'
        },
        category: 'SEO',
        tags: ['Next.js', 'Sitemap', 'SEO']
    },
    {
        id: '9',
        title: 'Giới thiệu Middleware trong Next.js',
        slug: 'gioi-thieu-middleware-trong-nextjs',
        excerpt: 'Middleware là tính năng mạnh mẽ giúp xử lý request trước khi đến route chính trong Next.js.',
        content: `
      # Giới thiệu Middleware trong Next.js
      
      Middleware cho phép bạn xử lý logic ở tầng request.
      
      ## Ứng dụng Middleware
      
      - Redirect, Rewrite
      - Xác thực
      - A/B Testing
      
      ## Cách tạo middleware
      
      Tạo file \`middleware.ts\` tại gốc dự án.
      
      ## Cấu trúc và điều kiện
      
      Xác định matcher để chọn route áp dụng Middleware.
    `,
        featuredImage: '/nextjs.png',
        date: '28 tháng 3, 2025',
        readTime: '7 phút',
        author: {
            name: 'Phạm Thị H',
            avatar: '/ava1.png'
        },
        category: 'Advanced',
        tags: ['Next.js', 'Middleware', 'Routing']
    },
    {
        id: '10',
        title: 'Tích hợp Google Analytics trong Next.js',
        slug: 'tich-hop-google-analytics-trong-nextjs',
        excerpt: 'Cách đơn giản để tích hợp Google Analytics theo dõi hành vi người dùng trong Next.js.',
        content: `
      # Tích hợp Google Analytics trong Next.js
      
      Google Analytics giúp bạn theo dõi lưu lượng truy cập website.
      
      ## Tạo tài khoản GA
      
      Đăng ký tài khoản và lấy Tracking ID.
      
      ## Chèn mã GA
      
      Sử dụng \`next/head\` để nhúng script vào toàn bộ trang.
      
      ## Theo dõi sự kiện
      
      Gửi event từ các tương tác người dùng.
    `,
        featuredImage: '/nextjs.png',
        date: '25 tháng 3, 2025',
        readTime: '4 phút',
        author: {
            name: 'Trần Văn I',
            avatar: '/ava1.png'
        },
        category: 'Analytics',
        tags: ['Next.js', 'Google Analytics', 'Tracking']
    },
    {
        id: '11',
        title: 'Tạo trang 404 tuỳ chỉnh với Next.js',
        slug: 'tao-trang-404-tuy-chinh-voi-nextjs',
        excerpt: 'Hướng dẫn tạo giao diện trang 404 tuỳ chỉnh để tăng trải nghiệm người dùng trong ứng dụng Next.js.',
        content: `
      # Tạo trang 404 tuỳ chỉnh với Next.js
      
      Tạo file \`404.tsx\` trong thư mục \`pages\`.
      
      ## Thiết kế ấn tượng
      
      Trang 404 nên thân thiện, có liên kết quay về trang chủ.
      
      ## Gợi ý nội dung liên quan
      
      Hiển thị các bài viết phổ biến, bài viết mới.
      
      ## Responsive và UX
      
      Đảm bảo trang 404 cũng responsive và đẹp trên mọi thiết bị.
    `,
        featuredImage: '/nextjs.png',
        date: '20 tháng 3, 2025',
        readTime: '5 phút',
        author: {
            name: 'Nguyễn Văn J',
            avatar: '/ava1.png'
        },
        category: 'UX/UI',
        tags: ['Next.js', '404 Page', 'UX']
    },
    {
        id: '12',
        title: 'Quản lý trạng thái với Zustand trong Next.js',
        slug: 'quan-ly-trang-thai-voi-zustand-trong-nextjs',
        excerpt: 'Zustand là thư viện nhẹ để quản lý state hiệu quả trong dự án Next.js.',
        content: `
      # Quản lý trạng thái với Zustand trong Next.js
      
      Zustand là một thư viện state quản lý đơn giản, không cần boilerplate.
      
      ## Cài đặt
      
      \`npm install zustand\`
      
      ## Tạo store
      
      Khởi tạo store với \`create\` từ Zustand.
      
      ## Sử dụng trong component
      
      Gọi hook từ store và dùng như hook thông thường.
    `,
        featuredImage: '/nextjs.png',
        date: '18 tháng 3, 2025',
        readTime: '6 phút',
        author: {
            name: 'Lê Thị K',
            avatar: '/ava1.png'
        },
        category: 'State Management',
        tags: ['Next.js', 'Zustand', 'React']
    },
    {
        id: '13',
        title: 'So sánh SSG, SSR và ISR trong Next.js',
        slug: 'so-sanh-ssg-ssr-isr-trong-nextjs',
        excerpt: 'Tìm hiểu sự khác biệt giữa các phương pháp rendering của Next.js và khi nào nên dùng mỗi loại.',
        content: `
      # So sánh SSG, SSR và ISR trong Next.js
      
      ## Static Site Generation (SSG)
      Tạo HTML tại build time.
      
      ## Server-side Rendering (SSR)
      Tạo HTML mỗi lần request.
      
      ## Incremental Static Regeneration (ISR)
      Kết hợp điểm mạnh của cả SSG và SSR.
      
      ## Khi nào nên dùng?
      - Blog: SSG/ISR
      - Dashboard: SSR
    `,
        featuredImage: '/nextjs.png',
        date: '15 tháng 3, 2025',
        readTime: '8 phút',
        author: {
            name: 'Trịnh Văn L',
            avatar: '/ava1.png'
        },
        category: 'Performance',
        tags: ['Next.js', 'SSR', 'SSG', 'ISR']
    },
    {
        id: '14',
        title: 'Tích hợp FontAwesome trong Next.js',
        slug: 'tich-hop-fontawesome-trong-nextjs',
        excerpt: 'Hướng dẫn chi tiết cách dùng FontAwesome trong dự án Next.js với cách tối ưu hiệu suất.',
        content: `
      # Tích hợp FontAwesome trong Next.js
      
      ## Cài đặt thư viện
      
      \`npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons\`
      
      ## Dùng trong component
      
      Import icon và dùng như React Component.
      
      ## Tối ưu hóa
      
      Chỉ import icon cần thiết để giảm bundle size.
    `,
        featuredImage: '/nextjs.png',
        date: '10 tháng 3, 2025',
        readTime: '5 phút',
        author: {
            name: 'Đỗ Văn M',
            avatar: '/ava1.png'
        },
        category: 'UI',
        tags: ['Next.js', 'FontAwesome', 'Icons']
    },
    {
        id: '15',
        title: 'Sử dụng môi trường .env trong Next.js',
        slug: 'su-dung-env-trong-nextjs',
        excerpt: 'Biến môi trường giúp bảo mật thông tin nhạy cảm và cấu hình ứng dụng linh hoạt hơn trong Next.js.',
        content: `
      # Sử dụng môi trường .env trong Next.js
      
      ## Tạo file .env.local
      
      Lưu các biến môi trường riêng tư như API_KEY.
      
      ## Truy cập biến trong code
      
      Dùng \`process.env.NEXT_PUBLIC_...\` trong client.
      
      ## Lưu ý
      
      Chỉ biến bắt đầu với NEXT_PUBLIC mới truy cập được ở client.
    `,
        featuredImage: '/nextjs.png',
        date: '5 tháng 3, 2025',
        readTime: '4 phút',
        author: {
            name: 'Phan Thị N',
            avatar: '/ava1.png'
        },
        category: 'Config',
        tags: ['Next.js', '.env', 'Environment']
    },
    {
        id: '16',
        title: 'Tối ưu Lighthouse với Next.js',
        slug: 'toi-uu-lighthouse-voi-nextjs',
        excerpt: 'Hướng dẫn cải thiện điểm số Lighthouse của bạn bằng những kỹ thuật tối ưu trong Next.js.',
        content: `
      # Tối ưu Lighthouse với Next.js
      
      ## Cải thiện Performance
      
      - Tối ưu ảnh với next/image
      - Lazy loading
      
      ## SEO và Best Practices
      
      - Metadata đầy đủ
      - Heading rõ ràng
      
      ## Accessibility
      
      Kiểm tra color contrast, dùng semantic HTML.
    `,
        featuredImage: '/nextjs.png',
        date: '1 tháng 3, 2025',
        readTime: '7 phút',
        author: {
            name: 'Ngô Văn O',
            avatar: '/ava1.png'
        },
        category: 'Performance',
        tags: ['Next.js', 'Lighthouse', 'Web Vitals']
    }


];

export async function GET() {
    return NextResponse.json(posts);
}