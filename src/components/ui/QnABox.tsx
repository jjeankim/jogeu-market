import Button from "@/components/ui/Button";
import ModalLayout from "@/components/ui/ModalLayout";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { createProductQnA, fetchProductQnAs } from "@/lib/apis/qna";
import type { ProductQnA } from "@/types/product/qna";

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

  const loadList = async () => {
    try {
      const qnas = await fetchProductQnAs(productId);
      setList(qnas);
    } catch (error) {
      showError("상품 문의를 불러오지 못했습니다.")
      console.error(error);
    }
  };



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
      await createProductQnA(productId, { question: question.trim(), isPublic });
      showSuccess("문의가 등록되었습니다.");
      setIsOpen(false);
      setQuestion("");
      setIsPublic(true);
      await loadList();
    } catch (e: any) {
      showError(e?.response?.data?.message || "문의 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full my-4">
      <div className=" flex flex-col justify-center items-center gap-6 border-2 border-black rounded-full p-4 w-full ">
        <h2 className="text-lg font-bold mt-4">
          구매하시려는 상품에 대해 궁금한 점이 있으시면 문의해 주세요
        </h2>
        <Button
          variant="filled"
          size="lg"
          className="w-md rounded-full mb-4"
          onClick={() => setIsOpen(true)}
        >
          문의하기
        </Button>
      </div>

      <h1 className="text-2xl font-bold mt-10 p-4">상품문의</h1>
      <span className="block w-full border-b-2 border-black mt-4"></span>

      {/* 단건 QnA 미리보기 필요 시 위의 loadQnA와 함께 활성화 */}



      <div className="mt-6 space-y-4">
        {list.length === 0 ? (
          <div className="text-gray-500 p-4">등록된 문의가 없습니다.</div>
        ) : (
          list.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="font-medium">Q. {item.question}</div>
                <div className="text-xs text-gray-500">
                  {item.isPublic ? "공개" : "비공개"} · {item.status}
                </div>
              </div>
              {item.answer ? (
                <div className="mt-2 text-gray-700">A. {item.answer}</div>
              ) : (
                <div className="mt-2 text-gray-400">답변 대기중</div>
              )}
            </div>
          ))
        )}
      </div>

      {isOpen && (
        <ModalLayout onClose={() => setIsOpen(false)}>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">상품 문의 작성</h3>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="문의하실 내용을 입력해주세요."
              rows={5}
              className="w-full border rounded-lg p-3 outline-none"
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

