import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiChevronRight } from "react-icons/fi";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

const STATIC_LABELS: Record<string, string> = {
  login: "로그인",
  signup: "회원가입",
  my: "마이페이지",
  orders: "주문내역",
  "keep-product": "찜",
  "writable-reviews": "리뷰작성",
  coupon: "내 쿠폰함",
  setting: "개인정보수정",
  products: "상품",
  new: "상품등록",
  cart: "장바구니",
  pay: "결제",
  payComplete: "결제 완료",
};

async function fetchDynamicLabel(
  segmentName: string,
  id: string
): Promise<string> {
  try {
    switch (segmentName) {
      case "products":
        const resP = await fetch(`/api/products/${id}`);
        if (!resP.ok) throw new Error();
        const dataP = await resP.json();
        return dataP.name;

      case "orders":
        const resO = await fetch(`/api/orders/${id}`);
        if (!resO.ok) throw new Error();
        const dataO = await resO.json();
        return `Order #${dataO.id}`;

      default:
        return id;
    }
  } catch {
    return id;
  }
}

const DynamicBreadcrumb = () => {
  const router = useRouter();
  const [items, setItems] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    if (!router.isReady) return;

    const pathSegments = router.pathname.split("/").filter(Boolean);
    const asPathSegments = router.asPath.split("/").filter(Boolean);

    const crumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    async function buildBreadcrumbs() {
      for (let i = 0; i < pathSegments.length; i++) {
        const routeSeg = pathSegments[i];
        const actualSeg = asPathSegments[i];
        let label = "";

        if (routeSeg.startsWith("[")) {
          const parentSegment = i > 0 ? asPathSegments[i - 1] : "";
          label = await fetchDynamicLabel(parentSegment, actualSeg);
        } else {
          label =
            STATIC_LABELS[routeSeg] ||
            routeSeg.charAt(0).toUpperCase() + routeSeg.slice(1);
        }

        crumbs.push({
          label,
          href: "/" + asPathSegments.slice(0, i + 1).join("/"),
        });
      }
      setItems(crumbs);
    }
    buildBreadcrumbs();
  }, [router.isReady, router.pathname, router.asPath]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="breadcrumb" className="text-gray-600 flex">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <span key={idx} className="flex items-center">
            {idx !== 0 && (
              <span className="mx-2 text-gray-400">
                <FiChevronRight size={16} />
              </span>
            )}
            {isLast ? (
              <span className="font-semibold">{item.label}</span>
            ) : (
              <Link href={item.href!} className="hover:underline">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default DynamicBreadcrumb;
