// src/components/product/ReviewTabContent.tsx
import React from "react";
import { ReviewItem } from "@/lib/apis/review";
import { ReviewStats } from "@/lib/apis/review";
import StarRating from "../my/review/StarRating";
import ReviewCardWithStars from "../my/review/ReviewCardWithStars";

interface ReviewTabContentProps {
  reviews: ReviewItem[];
  reviewStats: ReviewStats | null;
  productId: number;
}

export default function ReviewTabContent({
  reviews,
  reviewStats,
  productId,
}: ReviewTabContentProps) {
  return (
    <div className="flex flex-col space-y-3 pt-4 pb-10 justify-center px-4 md:px-0">
      <div className="flex flex-col">
        <div className="flex justify-start space-x-3 mb-4">
          <span className="text-base md:text-md font-semibold">상품후기</span>
          <span className="text-base md:text-md text-gray-500">
            {reviewStats?.total ?? 0}
          </span>
        </div>
        
        <div className="w-full border-2 rounded-md p-4 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-3 justify-items-center">
            <div className="w-full md:border-r-2 md:border-black flex flex-col space-y-3 justify-center items-center text-lg md:text-xl pb-4 md:pb-0">
              <span className="font-bold text-xl md:text-2xl">
                {(reviewStats?.average ?? 0).toFixed(1)}
              </span>
              <div className="flex">
                <StarRating rating={reviewStats?.average ?? 0} />
              </div>
            </div>
            
            <div className="w-full md:w-2/3 md:pl-15">
              <ul className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const distItem = reviewStats?.distribution.find(
                    (d) => d.star === rating
                  );
                  const count = distItem?.count ?? 0;
                  const total = reviewStats?.total ?? 1;
                  const percent = total > 0 ? (count / total) * 100 : 0;

                  return (
                    <li
                      key={rating}
                      className="flex items-center space-x-2 md:space-x-3 w-full text-sm md:text-base"
                    >
                      <span className="w-8 md:w-9 text-center">{rating}점</span>
                      <div
                        className="flex flex-1 h-3 md:h-4 bg-gray-200 rounded-full overflow-hidden items-center"
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="pl-2 md:pl-3 bg-[#b29977] h-3 md:h-4 rounded-full text-xs text-white text-center whitespace-nowrap"
                          style={{ width: `${percent}%` }}
                        >
                          {percent.toFixed(0)}%
                        </div>
                      </div>
                      <span className="w-8 md:w-10 text-right">{count}개</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex border-b-2 w-full p-3">
          </div>
          <span className="w-20 border-b-2 flex items-center justify-center"></span>
        </div>
        {reviews.length === 0 ? (
          <div className="flex items-center justify-center p-8 md:p-15">
            <h1 className="text-base md:text-lg">작성된 제품 후기가 없습니다.</h1>
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCardWithStars
              key={review.id}
              review={review}
              productId={productId}
            />
          ))
        )}
      </div>
    </div>
  );
}
