
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MainSwiper from "./MainSwiper";
import ListCard from './ui/ListCard';
import { fetchProducts, Product } from '@/lib/apis/product';

const MainForm = () => {
  const router = useRouter();
  const { menu, category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTitle = () => {
    switch (menu) {
      case "brand":
        return "BRAND";
      case "pick":
        return "PICK";
      case "new":
        return "NEW";
      default:
        return "BEST";
    }
  };

  const handleCategoryClick = (selectedCategory: string) => {
    router.push({
      pathname: router.pathname,
      query: { 
        ...router.query,
        category: selectedCategory 
      }
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await fetchProducts(category as string);
        setProducts(productData);
      } catch (error) {
        console.error('상품 데이터 로딩 실패:', error);
        setError('상품을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  // ListCard에 맞는 형식으로 데이터 변환
  const transformProductForListCard = (product: Product) => ({
    id: product.id,
    brand: product.brand?.name || '브랜드명 없음',
    name: product.name,
    price: product.price,
    review: 0, // 리뷰 데이터가 없으므로 기본값
    imgUrl: product.thumbnailImageUrl || '/images/noImg.png',
  });

  return (
    <>
    <main className=" mt-5 flex flex-col">
    <MainSwiper />
 
    {/* 필터와 제품 리스트를 가로로 배치 */}
    <div className='flex flex-row gap-10'>
      {/* 필터 */}
      <div className='ml-10 w-[10rem]'>
      <h2 className='text-2xl font-bold mb-5'>{getTitle()}</h2>
        <nav className='flex flex-col gap-5 place-items-start'>
        <button onClick={() => handleCategoryClick('beauty')} className='hover:text-yellow-500 transition-colors'>beauty</button>
        <button onClick={() => handleCategoryClick('food')} className='hover:text-yellow-500 transition-colors'>food</button>
        <button onClick={() => handleCategoryClick('living')} className='hover:text-yellow-500 transition-colors'>living</button>
        <button onClick={() => handleCategoryClick('pet')} className='hover:text-yellow-500 transition-colors'>pet</button>
        </nav>
      </div>

      {/* 상품 리스트 */}
      <div className='flex-1 px-8'>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">상품을 불러오는 중...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">등록된 상품이 없습니다.</div>
          </div>
        ) : (
          <div className='grid grid-cols-[repeat(auto-fit,_minmax(15rem,_1fr))] gap-6'>
            {products.map((product) => (
              <div key={product.id} className="">
                <ListCard product={transformProductForListCard(product)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </main>

    </>
  );
};

export default MainForm;
