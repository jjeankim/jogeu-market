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
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const { showSuccess, showError } = useToast();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (typeof id !== "string") return;
        const res = await axiosInstance.get(`/api/product/${id}`);
        setProduct(res.data.products);
      } catch (error) {
        showError("상품 정보를 불러오지 못했습니다.");
        console.error("Product fetch error:", error);
      }
    };

    if (id) fetchProduct();
  }, [id, showError]);

  useEffect(() => {
    if (!product?.id) return;

    const fetchReviewData = async () => {
      setIsLoadingReviews(true);
      setReviewError(null);

      try {
        // 리뷰 데이터와 통계를 병렬로 가져오기
        const [reviewsResponse, statsResponse] = await Promise.allSettled([
          getAllReviews(product.id, { page: 1, limit: 10 }),
          getReviewStats(product.id),
        ]);

        // 리뷰 데이터 처리
        if (
          reviewsResponse.status === "fulfilled" &&
          reviewsResponse.value?.data
        ) {
          setReviews(reviewsResponse.value.data);
        } else {
          console.error("리뷰 데이터 로드 실패:", reviewsResponse);
          setReviews([]);
        }

        // 리뷰 통계 처리
        if (statsResponse.status === "fulfilled" && statsResponse.value) {
          setReviewStats(statsResponse.value);
        } else {
          console.error("리뷰 통계 로드 실패:", statsResponse);
          setReviewStats({
            total: 0,
            average: 0,
            distribution: [1, 2, 3, 4, 5].map((star) => ({ star, count: 0 })),
          });
        }
      } catch (error) {
        console.error("리뷰 데이터 로드 중 오류:", error);
        setReviewError("리뷰 정보를 불러오는 중 오류가 발생했습니다.");
        setReviews([]);
        setReviewStats({
          total: 0,
          average: 0,
          distribution: [1, 2, 3, 4, 5].map((star) => ({ star, count: 0 })),
        });
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviewData();
  }, [product?.id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
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
    try {
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
    } catch (error) {
      console.error("주문 처리 중 오류:", error);
      showError("주문 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="flex w-full pt-10 mb-20">
        <ProductImage
          imgUrl={product?.thumbnailImageUrl || "/images/noImg.png"}
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
          <div key="info" className="flex pt-4 pb-10 justify-center">
            {product.detailDescription || (
              <div className="text-center py-10 text-gray-500">
                상품 상세 정보가 없습니다.
              </div>
            )}
          </div>,

          <div key="review">
            {reviewError ? (
              <div className="flex items-center justify-center p-10">
                <div className="text-center">
                  <div className="text-red-500 text-4xl mb-4">⚠️</div>
                  <p className="text-red-600 mb-2">{reviewError}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    다시 시도
                  </button>
                </div>
              </div>
            ) : (
              <ReviewTabContent
                reviews={reviews}
                reviewStats={reviewStats}
                productId={product.id}
                isLoading={isLoadingReviews}
              />
            )}
          </div>,

          <div key="qna" className="flex pt-4 pb-10 justify-center">
            <QnABox productId={product.id} />
          </div>,
        ]}
      />
    </>
  );
}
