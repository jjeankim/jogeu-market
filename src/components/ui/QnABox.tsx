import Button from "@/components/ui/Button";
import ModalLayout from "@/components/ui/ModalLayout";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/hooks/useToast";
import { createProductQnA, fetchProductQnAs } from "@/lib/apis/qna";
import type { ProductQnA } from "@/types/product/qna";
import { AxiosError } from "axios";

type QnABoxProps = {
  productId: number;
};

const QnABox = ({ productId }: QnABoxProps) => {
  const { showError, showSuccess } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<ProductQnA[]>([]);

  const loadList = useCallback(async () => {
    try {
      const qnas = await fetchProductQnAs(productId);
      setList(qnas);
    } catch (error) {
      showError("상품 문의를 불러오지 못했습니다.");
      console.error(error);
    }
  }, [productId, showError]);

  useEffect(() => {
    if (productId) {
      loadList();
    }
  }, [productId, loadList]);

  const handleSubmit = async () => {
    if (!question.trim()) {
      showError("문의 내용을 입력해 주세요.");
      return;
    }
    setLoading(true);
    try {
      await createProductQnA(productId, {
        question: question.trim(),
        isPublic,
      });
      showSuccess("문의가 등록되었습니다.");
      setIsOpen(false);
      setQuestion("");
      setIsPublic(true);
      await loadList();
    } catch (error) {
      showError(
        (error as AxiosError<{ message: string }>)?.response?.data?.message ||
          "문의 등록에 실패했습니다."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full my-4 px-4 md:px-0">
      <div className="flex flex-col justify-center items-center gap-4 md:gap-6 border-2 border-black rounded-2xl p-4 w-full">
        <h2 className="text-base md:text-lg font-bold mt-4 text-center">
          구매하시려는 상품에 대해 궁금한 점이 있으시면 문의해 주세요
        </h2>
        <Button
          variant="filled"
          size="lg"
          className="w-full md:w-md rounded-full mb-4"
          onClick={() => setIsOpen(true)}
        >
          문의하기
        </Button>
      </div>

      <h1 className="text-xl md:text-2xl font-bold mt-8 md:mt-10 p-2 md:p-4">상품문의</h1>
      <span className="block w-full border-b-2 border-black mt-2 md:mt-4"></span>

<<<<<<< HEAD
      <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
=======
      {/* 단건 QnA 미리보기 필요 시 위의 loadQnA와 함께 활성화 */}

      <div className="mt-6 space-y-4">
>>>>>>> 4b97fbd6b0e77f58ea4d5734a918c2a0ad6e398f
        {list.length === 0 ? (
          <div className="text-gray-500 p-4 text-center">등록된 문의가 없습니다.</div>
        ) : (
          list.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                <div className="font-medium text-sm md:text-base break-words">Q. {item.question}</div>
                <div className="text-xs text-gray-500">
                  {item.isPublic ? "공개" : "비공개"} · {item.status}
                </div>
              </div>
              {item.answer ? (
                <div className="mt-2 text-gray-700 text-sm md:text-base break-words">A. {item.answer}</div>
              ) : (
                <div className="mt-2 text-gray-400 text-sm md:text-base">답변 대기중</div>
              )}
            </div>
          ))
        )}
      </div>

      {isOpen && (
        <ModalLayout onClose={() => setIsOpen(false)}>
          <div className="space-y-6 md:space-y-10">
            <h3 className="text-base md:text-lg font-bold">상품 문의 작성</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="문의하실 내용을 입력해주세요."
              rows={5}
              className="w-full border rounded-md p-3 outline-none text-sm md:text-base"
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              공개로 등록하기
            </label>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setIsOpen(false)}>
                취소
              </Button>
              <Button
                className="flex-1"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "등록 중..." : "등록"}
              </Button>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
};

export default QnABox;
