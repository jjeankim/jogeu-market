// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import BrandSlide from "@/components/ui/BrandSlide";

// // interface Brand {
// //   id: number | string;
// //   name: string;
// //   imgUrl: string;
// // }

// // interface BrandSliderProps {
// //   brandList: Brand[];
// //   slidesPerView?: number;
// // }

// // const BrandSlider = ({ brandList, slidesPerView = 4 }: BrandSliderProps) => {
// //   return (
// //     <div className="flex items-center justify-center mt-10">
// //       <BrandSlide BrandList={brandList} slidesPerView={slidesPerView} />
// //     </div>
// //   );
// // };

// // export default BrandSlider;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import BrandSlide from "@/components/ui/BrandSlide";
// import { Brand, axiosBrands } from "@/lib/apis/brand";

// interface BrandSliderProps {
//   category: string;
//   subCategory: string;
//   slidesPerView?: number;
// }

// const BrandSlider = ({
//   category,
//   subCategory,
//   slidesPerView = 4,
// }: BrandSliderProps) => {
//   const [brandList, setBrandList] = useState<Brand[]>([]);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const params: Record<string, string> = {
//           categorySlug: category,
//         };

//         if (subCategory && subCategory !== "all") {
//           params.subCategoryPrefix = subCategory;
//         }

//         const res = await axios.get("/api/brand", { params });
//         setBrandList(res.data.brands);
//       } catch (error) {
//         console.error("브랜드 불러오기 실패", error);
//       }
//     };

//     fetchBrands();
//   }, [category, subCategory]);

//   return (
//     <div className="flex items-center justify-center mt-10">
//       <BrandSlide BrandList={brandList} slidesPerView={slidesPerView} />
//     </div>
//   );
// };

// export default BrandSlider;

import { useEffect, useState } from "react";
import BrandSlide from "@/components/ui/BrandSlide";
import { Brand, axiosBrands } from "@/lib/apis/brand";

interface BrandSliderProps {
  category: string;
  subCategory: string;
  slidesPerView?: number;
}

const BrandSlider = ({
  category,
  subCategory,
  slidesPerView = 4,
}: BrandSliderProps) => {
  const [brandList, setBrandList] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brands = await axiosBrands(
          category,
          subCategory === "all" ? undefined : subCategory
        );
        setBrandList(brands);
      } catch (error) {
        console.error("브랜드 불러오기 실패", error);
      }
    };

    fetchBrands();
  }, [category, subCategory]);

  return (
    <div className="flex items-center justify-center mt-10">
      <BrandSlide BrandList={brandList} slidesPerView={slidesPerView} />
    </div>
  );
};

export default BrandSlider;
