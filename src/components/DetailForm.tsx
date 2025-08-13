import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductImage from "@/components/product/ProductImage";
import TabContents from "@/components/ui/TabContents";
import { useToast } from "@/hooks/useToast";
import axiosInstance from "@/lib/axiosInstance";
import { formatPriceInfo } from "@/components/product/PriceDisplay";
import { AxiosError } from "axios";
import type { ProductDetail } from "@/types/product/detail";
import DetailInfo from "@/components/product/DetailInfo";
import QnABox from "@/components/ui/QnABox";
import { getAllReviews, ReviewItem } from "@/lib/apis/review";
import { getReviewStats, ReviewStats } from "@/lib/apis/review";
import ReviewTabContent from "./review/ReviewTabContent";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id !== "string") return;
        const res = await axiosInstance.get(`/api/product/${id}`);
        setProduct(res.data.products);
      } catch (error) {
        showError("상품 정보를 불러오지 못했습니다.");
        console.error(error);
      }
    };

    if (id) fetchProduct();
  }, [id, showError]);

  useEffect(() => {
    if (!product?.id) return;

    // 리뷰 데이터
    getAllReviews(product.id, { page: 1, limit: 10 }).then((res) => {
      if (res?.data) {
        setReviews(res.data);
      }
    });

    // 리뷰 통계 가져오기
    getReviewStats(product.id).then((stats) => {
      if (stats) setReviewStats(stats);
    });
  }, [product?.id]);

  if (!product) {
    return <div>로딩 중...</div>;
  }

  const { formattedOrigin, formattedSale, discountRate, isDiscounted } =
    formatPriceInfo({
      originPrice: product.price,
      price: product.price,
    });

  const handleWishClick = async () => {
    try {
      if (!wish) {
        const res = await axiosInstance.post("/api/wishlist", {
          productId: product.id,
        });
        showSuccess(res.data.message);
        setWish(true);
        setWishId(res.data.wishlist.id);
      } else {
        if (!wishId) {
          showError("삭제할 위시리스트 상품을 찾을 수 없습니다.");
          return;
        }
        const res = await axiosInstance.delete(`/api/wishlist/${wishId}`);
        showSuccess(res.data.message);
        setWish(false);
        setWishId(null);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 409) {
        showError("이미 위시리스트에 추가된 상품입니다.");
      } else if (axiosError.response?.status === 401) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  const handleShareClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      showSuccess("상품 URL이 클립보드에 복사되었습니다.");
    } catch (error) {
      showError("상품 URL 복사에 실패했습니다.");
      console.error(error);
    }
  };
  const quantityInc = () => setQuantity((prev) => prev + 1);
  const quantityDec = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const totalPrice = (product.price * quantity).toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });

  // 장바구니
  const handleCartClick = async () => {
    try {
      const res = await axiosInstance.post("/api/cart", {
        productId: product.id,
        quantity: quantity,
      });
      showSuccess(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 401) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
      }
    }
  };

  const handleOrderClick = () => {
    const orderData = {
      items: [
        {
          product,
          quantity,
        },
      ],
      totalPrice: product.price * quantity,
      shippingFee: product.price * quantity > 10000 ? 0 : 3000,
    };
    if (typeof window !== "undefined") {
      sessionStorage.setItem("orderData", JSON.stringify(orderData));
    }
    router.push("/order");
  };

  console.log("====thumbnail", product?.thumbnailImageUrl);

  return (
    <>
      {!product ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <div className="flex w-full pt-10 mb-20 ">
            <ProductImage
              imgUrl={product?.thumbnailImageUrl || "/images/noImg.png"}
              fill
              name={product.name}
            />
            <DetailInfo
              product={product}
              brand={product.brand}
              wish={wish}
              handleWishClick={handleWishClick}
              handleShareClick={handleShareClick}
              handleCartClick={handleCartClick}
              handleOrderClick={handleOrderClick}
              quantity={quantity}
              quantityInc={quantityInc}
              quantityDec={quantityDec}
              formattedOrigin={formattedOrigin}
              formattedSale={formattedSale}
              discountRate={discountRate}
              isDiscounted={isDiscounted}
              totalPrice={totalPrice}
            />
          </div>
          <TabContents
            tabs={["상품 정보", "상품 후기", "상품 문의"]}
            content={[
              <div key="info" className="flex pt-4 pb-10 justify-center ">
                {product.detailDescription}
              </div>,
              <ReviewTabContent
                key="review"
                reviews={reviews}
                reviewStats={reviewStats}
                productId={product.id}
              />,

              <div key="qna" className="flex pt-4 pb-10 justify-center">
                <QnABox productId={product.id} />
              </div>,
            ]}
          />
        </>
      )}
    </>
  );
}
