import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductImage from "@/components/product/ProductImage";
import TabContents from "@/components/ui/TabContents";
import { useToast } from "@/hooks/useToast";
import axiosInstance from "@/lib/axiosInstance";
import { formatPriceInfo } from "@/components/product/PriceDisplay";
import axios, { AxiosError } from "axios";
import type { ProductDetail } from "@/types/product/detail";
import DetailInfo from "@/components/product/DetailInfo";
import QnABox from "@/components/ui/QnABox";

// 추가 - 나중에 컴포넌트 갈라 낼것들 (rs)
import Image from "next/image";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FiThumbsUp } from "react-icons/fi";

//  컴포넌트 호출
import ReviewCardWithStars from "./my/review/ReviewCardWithStars";
import { getAllReviews, ReviewItem } from "@/lib/apis/review";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [quantity, setQuantity] = useState(1);
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
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.id) {
      if (!product) return <div>로딩 중...</div>;
      getAllReviews(product.id, { page: 1, limit: 10 }).then((res) => {
        if (res?.data) {
          setReviews(res.data);
        }
      });
    }
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

  return (
    <>
      {!product ? (
        <div>로딩 중...</div>
      ) : (
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
              <div key="info" className="flex pt-4 pb-10 justify-center ">
                {product.detailDescription}
              </div>,
              <div
                key="review"
                className="flex flex-col space-y-3 pt-4 pb-10 justify-center"
              >
                <div className="flex flex-col ">
                  {/* <h1>작성된 제품 후기가 없습니다.</h1> */}
                  {/* 상품 후기 rating 평균 section */}
                  <div className="flex justify-start space-x-3 ">
                    <span className="text-md font-semibold">상품후기</span>
                    <span className="text-md text-gray-500">752</span>
                  </div>
                  <div className=" w-full border-2 rounded-md  p-10 grid grid-cols-2 gap-3justify-items-center">
                    {/* 별점  */}
                    <div className=" w-full border-r-2 border-black flex flex-col space-y-3 justify-center items-center text-xl ">
                      <span className="font-bold text-2xl">4.9</span>
                      <div className="flex">
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                        <FaRegStar />
                      </div>
                    </div>
                    {/* 분포도 */}
                    <div className="w-1/2 ">
                      <ul>
                        <li className="flex items-center space-x-3">
                          <span className="align-super  w-9 text-center">
                            5점
                          </span>
                          {/* Progress */}
                          <div
                            className="flex w-[90%] h-4 bg-gray-200 rounded-full overflow-hidden items-center "
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="flex flex-col justify-center rounded-full overflow-hidden bg-[#b29977] text-xs text-white text-center whitespace-nowrap transition duration-500"
                              style={{ width: `25%` }}
                            >
                              25%
                            </div>
                          </div>
                          {/* End Progress */}
                        </li>
                        <li className="flex items-center space-x-3">
                          <span className="align-super  w-9 text-center">
                            5점
                          </span>
                          {/* Progress */}
                          <div
                            className="flex w-[90%] h-4 bg-gray-200 rounded-full overflow-hidden items-center "
                            role="progressbar"
                            aria-valuenow={25}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="flex flex-col justify-center rounded-full overflow-hidden bg-[#b29977] text-xs text-white text-center whitespace-nowrap transition duration-500"
                              style={{ width: `25%` }}
                            >
                              25%
                            </div>
                          </div>
                          {/* End Progress */}
                        </li>
                        <li className="flex items-center space-x-3">
                          <span className="align-super  w-9 text-center">
                            5점
                          </span>
                          {/* Progress */}
                          <div
                            className="flex w-[90%] h-4 bg-gray-200 rounded-full overflow-hidden items-center "
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="flex flex-col justify-center rounded-full overflow-hidden bg-[#b29977] text-xs text-white text-center whitespace-nowrap transition duration-500"
                              style={{ width: `25%` }}
                            >
                              25%
                            </div>
                          </div>
                          {/* End Progress */}
                        </li>
                        <li className="flex items-center space-x-3">
                          <span className="align-super  w-9 text-center">
                            5점
                          </span>
                          {/* Progress */}
                          <div
                            className="flex w-[90%] h-4 bg-gray-200 rounded-full overflow-hidden items-center "
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="flex flex-col justify-center rounded-full overflow-hidden bg-[#b29977] text-xs text-white text-center whitespace-nowrap transition duration-500"
                              style={{ width: `25%` }}
                            >
                              25%
                            </div>
                          </div>
                          {/* End Progress */}
                        </li>
                        <li className="flex items-center space-x-3">
                          <span className="align-super  w-9 text-center">
                            5점
                          </span>
                          {/* Progress */}
                          <div
                            className="flex w-[90%] h-4 bg-gray-200 rounded-full overflow-hidden items-center "
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <div
                              className="flex flex-col justify-center rounded-full overflow-hidden bg-[#b29977] text-xs text-white text-center whitespace-nowrap transition duration-500"
                              style={{ width: `25%` }}
                            >
                              25%
                            </div>
                          </div>
                          {/* End Progress */}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 상품후기 list */}
                <div className="flex flex-col ">
                  <div className="flex justify-between">
                    {/* checkbox */}
                    <div className="flex border-b-2 w-full p-3">
                      <input
                        type="checkbox"
                        // checked={checked}
                        // onChange={onCheck}
                        className="mr-4 w-5 h-5 align-middle"
                      />
                      <span className="text-gray-600">
                        포토 후기만 모아보기
                      </span>
                    </div>
                    {/* sort */}

                    <span className="w-20 border-b-2 flex items-center justify-center">
                      정렬자리
                    </span>
                  </div>
                  {/* 상품후기 card - min-h-200px */}
                  {/* list 자리  */}
                  {reviews.length === 0 ? (
                    <h1>작성된 제품 후기가 없습니다.</h1>
                  ) : (
                    reviews.map((review) => (
                      <ReviewCardWithStars key={review.id} review={review} />
                    ))
                  )}
                </div>
              </div>,
              <div key="qna" className="flex pt-4 pb-10 justify-center">
                상품 문의 내용 연결
              </div>,
            ]}
          />
        </>
      )}
    </>
  );
}
