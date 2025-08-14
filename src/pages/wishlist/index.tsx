import { useState, useEffect } from "react";
import MyPageLayoutWithWelcome from "@/components/my/MyPageLayoutWithWelcome";
import ProductCardWithHeart from "@/components/my/ProductCardWithHeart";
import Pagination from "@/components/Pagination";
import Button from "@/components/ui/Button";
import { WishlistItem } from "@/lib/apis/wishlist";
import { axiosWishlist } from "../../lib/apis/wishlist";
import SEO from "@/components/SEO";
import Spinner from "@/components/ui/Spinner";

const PAGE_SIZE = 8;

const Index = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const handleRemoveFromWishlist = (wishlistId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
  };

  useEffect(() => {
    setLoading(true);

    axiosWishlist(currentPage, PAGE_SIZE)
      .then((data) => {
        if (data) {
          setWishlist(data.wishlist || []);
          setTotalPages(data.totalPages || 1);
        } else {
          setWishlist([]);
          setTotalPages(1);
        }
      })
      .catch((err) => {
        console.error(err);
        setWishlist([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <>
      <SEO title="위시리스트" />
      <MyPageLayoutWithWelcome>
        <div className="grid gap-14">
          <h2 className="text-4xl font-bold border-b-2 pb-3.5 mb-4">
            위시 리스트
          </h2>

          {loading ? (
            <Spinner />
          ) : wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
              {/* <Image
              src=""
              alt="빈 위시리스트"
              className="w-48 mb-6 opacity-70"
            /> */}
              <h3 className="text-2xl font-semibold mb-2">
                아직 찜한 상품이 없어요!
              </h3>
              <p className="mb-4 max-w-sm">
                마음에 드는 상품을 찾아 하트 ♥️ 버튼을 눌러보세요. <br />
                나만의 취향을 쉽게 저장하고 관리할 수 있어요.
              </p>

              <Button
                variant="filled"
                color="gold"
                size="md"
                onClick={() => (window.location.href = "/product")}
              >
                상품 보러 가기
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 overflow-hidden">
                {wishlist.map((item) => (
                  <ProductCardWithHeart
                    key={item.id}
                    productId={item.id}
                    product={{
                      name: item.product.name,
                      price: item.product.price,
                      imgUrl:
                        item.product.thumbnailImageUrl || "/images/sample.png",
                      shippingFee: 3000,
                    }}
                    onRemove={handleRemoveFromWishlist}
                  />
                ))}
              </div>
              <div className="mx-auto">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </>
          )}
        </div>
      </MyPageLayoutWithWelcome>
    </>
  );
};

export default Index;
