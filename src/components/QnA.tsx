import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";

const QnATest = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    const userMessage = { role: "user" as const, text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AZURE_CQA_ENDPOINT}language/:query-knowledgebases?projectName=${process.env.NEXT_PUBLIC_AZURE_CQA_PROJECT_NAME}&api-version=${process.env.NEXT_PUBLIC_AZURE_CQA_API_VERSION}&deploymentName=${process.env.NEXT_PUBLIC_AZURE_CQA_DEPLOYMENT_NAME}`,
        {
          question: userMessage.text,
          top: 1,
        },
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.NEXT_PUBLIC_AZURE_CQA_KEY!,
            "Content-Type": "application/json",
          },
        }
      );

      const result =
        res.data.answers?.[0]?.answer || "답변을 찾을 수 없습니다.";
      const botMessage = { role: "bot" as const, text: result };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "오류가 발생했습니다." },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "안녕하세요! 무엇을 도와드릴까요?\n배송, 주문, 취소, 교환 등에 대해 자유롭게 질문해보세요.",
        },
      ]);
    }
  }, [isOpen, messages.length]);


  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-logo text-white text-2xl shadow-lg flex items-center justify-center hover:bg-logo hover:opacity-35 z-50"
        aria-label="QnA 열기"
      >
        ?
      </button>

   
      <div
        className={`fixed bottom-24 right-6 w-[384px] h-[500px] min-h-[300px] max-h-[80vh] bg-white rounded-xl shadow-xl transition-all duration-300 z-40 flex flex-col ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
    
        <div className="p-4 border-b bg-logo text-white rounded-t-xl flex justify-between items-center">
          <h2 className="text-lg font-semibold">무엇을 도와드릴까요?</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-xl"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Message List */}
        <div ref={chatRef} className="p-4 overflow-y-auto flex-1 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-xs text-sm ${
                  msg.role === "user"
                    ? "bg-logo/30  text-gray-800 "
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm">답변을 작성 중입니다...</div>
          )}
        </div>

        {/* Input */}
        <div className="p-4  flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="답변하거나 자유롭게 질문하세요"
            className="flex-1 border border-logo rounded-[10px] px-4 py-2 text-sm outline-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-black/60 text-white px-4 py-2 rounded-[10px] text-sm hover:bg-black/30"
            disabled={loading}
          >
            전송
          </button>
        </div>
      </div>
    </>
  );
};

export default QnATest;
