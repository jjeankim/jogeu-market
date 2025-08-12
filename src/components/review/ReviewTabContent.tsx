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
    <div className="flex flex-col space-y-3 pt-4 pb-10 justify-center">
      <div className="flex flex-col ">
        <div className="flex justify-start space-x-3 ">
          <span className="text-md font-semibold">상품후기</span>
          <span className="text-md text-gray-500">
            {reviewStats?.total ?? 0}
          </span>
        </div>
        <div className="w-full border-2 rounded-md p-10 grid grid-cols-2 gap-3 justify-items-center">
          {/* 별점 */}
          <div className="w-full border-r-2 border-black flex flex-col space-y-3 justify-center items-center text-xl ">
            <span className="font-bold text-2xl">
              {(reviewStats?.average ?? 0).toFixed(1)}
            </span>
            <div className="flex">
              <StarRating rating={reviewStats?.average ?? 0} />
            </div>
          </div>
          {/* 분포도 */}
          <div className="w-2/3 pl-15 bg-orange">
            <ul>
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
                    className="flex items-center space-x-3 w-full"
                  >
                    <span className="w-9 text-center">{rating}점</span>
                    <div
                      className="flex w-[90%] h-4 bg-gray-200 rounded-full overflow-hidden items-center"
                      role="progressbar"
                      aria-valuenow={percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className="pl-3 bg-[#b29977] h-4 rounded-full text-xs text-white text-center whitespace-nowrap"
                        style={{ width: `${percent}%` }}
                      >
                        {percent.toFixed(0)}%
                      </div>
                    </div>
                    <span className="w-10 text-right">{count}개</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* 후기 리스트 */}
      <div className="flex flex-col ">
        <div className="flex justify-between">
          <div className="flex border-b-2 w-full p-3">
            {/* <input
              type="checkbox"
              //   checked={checked}
              //   onChange={onCheck}
              className="mr-4 w-5 h-5 align-middle"
            /> */}

            {/* <span className="text-gray-600">포토 후기만 모아보기</span> */}
          </div>
          {/* sort */}
          <span className="w-20 border-b-2 flex items-center justify-center"></span>
        </div>
        {reviews.length === 0 ? (
          <div className="flex items-center justify-center p-15">
            <h1>작성된 제품 후기가 없습니다.</h1>
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
