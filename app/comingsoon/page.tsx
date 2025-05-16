import { Metadata } from "next";
import ComingSoon from "@/components/layout/CommingSoon";

export const metadata: Metadata = {
  title: "Sắp ra mắt - Trang đang được xây dựng",
  description:
    "Trang web của chúng tôi đang được xây dựng và sẽ sớm ra mắt. Đăng ký để nhận thông báo khi trang hoàn thành.",
};

export default function ComingSoonPage() {
  return <ComingSoon />;
}
