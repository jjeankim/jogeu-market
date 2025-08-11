import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import SEO from "@/components/SEO";

type Category = {
  id: number;
  name: string;
};

type FormValues = {
  category: number;
  brand: string;
  isSample: boolean;
  samplePrice?: number;
  productName: string;
  productPrice: number;
  quantity: number;
  images: FileList;
  thumbnail: FileList;
  detailImages: FileList;
};

const ProductRegistration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const isSample = watch("isSample");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories([
      { id: 1, name: "뷰티" },
      { id: 2, name: "리빙" },
      { id: 3, name: "식품" },
      { id: 4, name: "애완" },
    ]);
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log(data);

    const formData = new FormData();
    formData.append("category", String(data.category));
    formData.append("brand", String(data.brand));
    formData.append("isSample", String(data.isSample));
    if (data.samplePrice)
      formData.append("samplePrice", String(data.samplePrice));
    formData.append("productName", String(data.productName));
    formData.append("productPrice", String(data.productPrice));
    formData.append("quantity", String(data.quantity));

    formData.append("thumbnail", data.thumbnail[0]);

    Array.from(data.images).forEach((file) => formData.append("images", file));

    Array.from(data.detailImages).forEach((file) =>
      formData.append("detailImages", file)
    );
  };

  return (
    <>
      <SEO title="상품 등록" />
      <div className="">
        <h1 className="text-4xl font-bold text-center border-b-2 border-gray-200 py-4 mb-3">
          상품 등록
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto h-screen space-y-4"
        >
          {/* 카테고리 선택 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              카테고리
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full border p-2 rounded"
            >
              <option value="">선택</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 mt-1">카테고리를 선택하세요.</p>
            )}
          </div>

          {/* 브랜드 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              브랜드
            </label>
            <input
              {...register("brand", { required: true })}
              className="w-full border p-2 rounded"
              type="text"
            />
            {errors.brand && (
              <p className="text-red-400 mt-1">브랜드를 작성하세요.</p>
            )}
          </div>

          {/* 샘플여부 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              <span className="mr-4">샘플 여부</span>
              <input
                type="checkbox"
                {...register("isSample")}
                className="mr-4 w-6 h-6 align-middle"
              />
            </label>
          </div>

          {/* 샘플 가격 */}
          {isSample && (
            <div>
              <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
                샘플 가격
              </label>
              <input
                type="number"
                {...register("samplePrice", { min: 0, valueAsNumber: true })}
                className="w-full border p-2 rounded"
              />
              {errors.samplePrice && (
                <p className="text-red-400 mt-1">샘플 가격을 작성하세요.</p>
              )}
            </div>
          )}

          {/* 상품명 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              상품명
            </label>
            <input
              type="text"
              {...register("productName", { required: true })}
              className="w-full border p-2 rounded"
            />
            {errors.productName && (
              <p className="text-red-400 mt-1">제품 명을 작성하세요.</p>
            )}
          </div>

          {/* 상품 가격 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              상품가격
            </label>
            <div className="relative">
              <input
                type="number"
                {...register("productPrice", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="w-full border p-2 rounded"
              />
              <span className="absolute right-3 top-1/2 text-lg -translate-y-1/2 text-gray-500 t">
                원
              </span>
            </div>
            {errors.productPrice && (
              <p className="text-red-400 mt-1">제품 가격을 작성하세요.</p>
            )}
          </div>

          {/* 수량 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              수량
            </label>
            <input
              type="number"
              {...register("quantity", { required: true, valueAsNumber: true })}
              className="w-full border p-2 rounded"
            />
            {errors.quantity && (
              <p className="text-red-400 mt-1">상품 수량을 작성하세요.</p>
            )}
          </div>

          {/* 썸네일 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              썸네일 이미지
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("thumbnail", { required: true })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* 기타 이미지 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              기타 이미지
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images", { required: true })}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* 상세 이미지 */}
          <div>
            <label className="py-2 border-b-2 border-gray-200 block text-2xl ">
              기타 이미지
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("detailImages", { required: true })}
              className="w-full border p-2 rounded"
            />
          </div>

          <Button type="submit">등록하기</Button>
        </form>
      </div>
    </>
  );
};

export default ProductRegistration;
