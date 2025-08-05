import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // 여기만 쓰면 됩니다.
import ProductImage from "@/components/product/ProductImage";
import TabContents from "@/components/ui/TabContents";
import { useToast } from "@/hooks/useToast";
import axiosInstance from "@/lib/axiosInstance";
import DetailForm from "@/components/DetailForm";
import { formatPriceInfo } from "@/components/product/PriceDisplay";
import { Product } from "@/lib/apis/product";
import axios from "axios";
import { ProductDetail } from "@/types/product/detail";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [wish, setWish] = useState(false);
  const [wishId, setWishId] = useState<number | null>(null);
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

  if (!product) return <div>로딩 중...</div>;

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
    } catch (error: any) {
      if (error.response?.status === 409) {
        showError("이미 위시리스트에 추가된 상품입니다.");
      } else if (error.response?.status === 401) {
        showError("유효하지 않은 사용자입니다.");
      } else {
        showError("서버 오류가 발생했습니다.");
        console.error(error);
      }
    }
  };

  const quantityInc = () => setQuantity((prev) => prev + 1);
  const quantityDec = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const totalPrice = (product.price * quantity).toLocaleString("ko-KR", {
    style: "currency",
    currency: "KRW",
  });

  return (
    <>
      <div className="flex w-full pt-10">
        <ProductImage
          imgUrl={product.thumbnailImageUrl || "/images/noImg.png"}
          name={product.name}
        />
        <DetailForm
          product={product}
          wish={wish}
          handleWishClick={handleWishClick}
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
        tabs={["상품 상세", "상품 후기"]}
        content={[
          <div key="0" className="flex pt-4 pb-10 justify-center">
            {product.detailDescription}
          </div>,
          <div key="1" className="flex pt-4 pb-10 justify-center">
            작성된 제품 후기가 없습니다.
          </div>,
        ]}
      />
    </>
  );
}
