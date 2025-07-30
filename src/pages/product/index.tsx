import Pagination from "@/components/Pagination";
import CustomInput from "@/components/ui/CustomInput";

const ProductList = () => {
  return (
    <>
      {/* SearchBar 추후 추가 */}
      <div>상품목록</div>
      <div>
        <span>검색결과 섬머리 영역 총 몇 건</span>
        <div>
          <span>목록 정렬 필터</span>
          <ul>
            <li>최신 순</li>
          </ul>
        </div>
      </div>
      {/* 상품 목록 카드 영역*/}
      <ul>
        <li>
          <a href="">
            <div>
              <img src="" alt="상품 대표썸네일" />
            </div>
            <div>
              <p>상품명</p>
              <span>가격</span>
              <div>
                <div>리뷰별아이콘</div>
                <span>리뷰평점</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
      {/* 페이지네이션 */}
    </>
  );
};

export default ProductList;
