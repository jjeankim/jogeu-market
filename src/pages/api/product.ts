import { NextApiRequest, NextApiResponse } from 'next';

const mockProducts = [
  {
    id: 1,
    name: "뷰티 마스크팩",
    productCode: "BEAUTY001",
    brandId: 1,
    price: 15000,
    stockQuantity: 100,
    detailDescription: "수분감 가득한 마스크팩",
    isSample: false,
    samplePrice: null,
    thumbnailImageUrl: "/images/noImg.png",
    brand: {
      id: 1,
      name: "beauty"
    },
    category: "beauty",
    reviewCount: 25,
    rating: 4.5,
    isNew: false
  },
  {
    id: 2,
    name: "건강한 그래놀라",
    productCode: "FOOD001",
    brandId: 2,
    price: 25000,
    stockQuantity: 50,
    detailDescription: "신선한 그래놀라",
    isSample: true,
    samplePrice: 5000,
    thumbnailImageUrl: "/images/그래놀라.png",
    brand: {
      id: 2,
      name: "food"
    },
    category: "food",
    reviewCount: 15,
    rating: 4.2,
    isNew: false
  },
  {
    id: 3,
    name: "홈데코 쿠션",
    productCode: "LIVING001",
    brandId: 3,
    price: 35000,
    stockQuantity: 30,
    detailDescription: "편안한 홈데코 쿠션",
    isSample: false,
    samplePrice: null,
    thumbnailImageUrl: "/images/noImg.png",
    brand: {
      id: 3,
      name: "living"
    },
    category: "living",
    reviewCount: 8,
    rating: 4.8,
    isNew: false
  },
  {
    id: 4,
    name: "펫 토이",
    productCode: "PET001",
    brandId: 4,
    price: 12000,
    stockQuantity: 80,
    detailDescription: "강아지가 좋아하는 토이",
    isSample: false,
    samplePrice: null,
    thumbnailImageUrl: "/images/noImg.png",
    brand: {
      id: 4,
      name: "pet"
    },
    category: "pet",
    reviewCount: 32,
    rating: 4.7,
    isNew: true
  },
  {
    id: 5,
    name: "립스틱",
    productCode: "BEAUTY002",
    brandId: 1,
    price: 28000,
    stockQuantity: 60,
    detailDescription: "오래 지속되는 립스틱",
    isSample: false,
    samplePrice: null,
    thumbnailImageUrl: "/images/립.png",
    brand: {
      id: 1,
      name: "beauty"
    },
    category: "beauty",
    reviewCount: 45,
    rating: 4.6,
    isNew: false
  },
  {
    id: 6,
    name: "쿠키 세트",
    productCode: "FOOD002",
    brandId: 2,
    price: 18000,
    stockQuantity: 40,
    detailDescription: "달콤한 쿠키 세트",
    isSample: false,
    samplePrice: null,
    thumbnailImageUrl: "/images/쿠키.png",
    brand: {
      id: 2,
      name: "food"
    },
    category: "food",
    reviewCount: 20,
    rating: 4.3,
    isNew: true
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, menu, limit } = req.query;
  
  let filteredProducts = [...mockProducts];
  
  // 카테고리 필터링
  if (category && category !== 'all' && typeof category === 'string') {
    filteredProducts = filteredProducts.filter(product => 
      product.category === category
    );
  }
  
  // 메뉴별 정렬 (BEST, NEW, PICK)
  if (menu && typeof menu === 'string') {
    switch (menu) {
      case 'best':
        // 리뷰 수와 평점 기준으로 정렬
        filteredProducts.sort((a, b) => {
          const scoreA = (a.reviewCount * a.rating);
          const scoreB = (b.reviewCount * b.rating);
          return scoreB - scoreA;
        });
        break;
      case 'new':
        // 신제품 기준으로 정렬
        filteredProducts.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case 'pick':
        // 랜덤 정렬
        filteredProducts.sort(() => Math.random() - 0.5);
        break;
      default:
        // 기본값은 BEST
        filteredProducts.sort((a, b) => {
          const scoreA = (a.reviewCount * a.rating);
          const scoreB = (b.reviewCount * b.rating);
          return scoreB - scoreA;
        });
    }
  }
  
  // 개수 제한
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit as string));
  }
  
  res.status(200).json({
    message: "상품 목록 조회 성공",
    products: filteredProducts
  });
} 