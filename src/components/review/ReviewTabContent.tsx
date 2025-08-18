import React from "react";
import { ReviewItem } from "@/lib/apis/review";
import { ReviewStats } from "@/lib/apis/review";
import StarRating from "../my/review/StarRating";
import ReviewCardWithStars from "../my/review/ReviewCardWithStars";

interface ReviewTabContentProps {
  reviews: ReviewItem[];
  reviewStats: ReviewStats | null;
  productId: number;
  isLoading?: boolean;
}

export default function ReviewTabContent({
  reviews,
  reviewStats,
  productId,
  isLoading = false,
}: ReviewTabContentProps) {
  // 로딩 상태 처리
  if (isLoading || reviewStats === null) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-500">리뷰를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 안전한 기본값 설정
  const safeReviewStats = {
    total: reviewStats?.total ?? 0,
    average: reviewStats?.average ?? 0,
    distribution: reviewStats?.distribution ?? [],
  };

  return (

    <div className="flex flex-col space-y-3 pt-4 pb-10 justify-center">
      <div className="flex flex-col">
        <div className="flex justify-start space-x-3">
          <span className="text-base md:text-md font-semibold">상품후기</span>
          <span className="text-base md:text-md text-gray-500">{safeReviewStats.total}</span>
        </div>

        <div className="w-full border-2 rounded-md p-10 grid grid-cols-2 gap-3 justify-items-center">
          {/* 별점 */}
          <div className="w-full border-r-2 border-gray-300 flex flex-col space-y-3 justify-center items-center text-xl">
            <span className="font-bold text-2xl">
              {safeReviewStats.average.toFixed(1)}
            </span>
            <div className="flex">
              <StarRating rating={safeReviewStats.average} />
            </div>
          </div>

          {/* 분포도 */}
          <div className="w-2/3 pl-4">
            <ul className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const distItem = safeReviewStats.distribution.find(
                  (d) => d.star === rating
                );
                const count = distItem?.count ?? 0;
                const total = safeReviewStats.total;
                const percent = total > 0 ? (count / total) * 100 : 0;

                return (
                  <li
                    key={rating}
                    className="flex items-center space-x-3 w-full"
                  >
                    <span className="w-9 text-center text-sm">{rating}점</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden relative">
                      <div
                        className="bg-[var(--color-logo)] h-full rounded-full flex items-center justify-end pr-1 transition-all duration-300"
                        style={{ width: `${Math.max(percent, 0)}%` }}
                      >
                        {percent > 10 && (
                          <span className="text-xs text-white font-medium">
                            {percent.toFixed(0)}%
                          </span>
                        )}
                      </div>
                      {percent <= 10 && percent > 0 && (
                        <span
                          className="absolute right-0 top-0 h-full flex items-center pr-1 text-xs text-gray-600"
                          style={{ right: `-${30}px` }}
                        >
                          {percent.toFixed(0)}%
                        </span>
                      )}
                    </div>
                    <span className="w-10 text-right text-sm">{count}개</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>


      {/* 후기 리스트 */}
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex border-b-2 w-full p-3">
            {/* 필터 옵션들은 필요에 따라 추가 */}
          </div>
          <span className="w-20 border-b-2 flex items-center justify-center"></span>
        </div>

        {/* 리뷰 목록 또는 빈 상태 */}
        {!reviews || reviews.length === 0 ? (
          <div className="flex items-center justify-center p-15 min-h-[200px]">
            <div className="text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h1 className="text-lg font-medium text-gray-600 mb-2">
                작성된 제품 후기가 없습니다.
              </h1>
              <p className="text-sm text-gray-500">
                첫 번째 리뷰를 작성해보세요!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => {
              try {
                return (
                  <ReviewCardWithStars
                    key={review.id}
                    review={review}
                    productId={productId}
                  />
                );
              } catch (error) {
                console.error(`리뷰 렌더링 오류 (ID: ${review.id}):`, error);
                return (
                  <div
                    key={review.id}
                    className="p-4 border rounded-lg bg-red-50"
                  >
                    <p className="text-red-600 text-sm">
                      리뷰를 표시하는 중 오류가 발생했습니다.
                    </p>
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}
