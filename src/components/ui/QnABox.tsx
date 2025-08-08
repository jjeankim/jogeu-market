import  Button  from "@/components/ui/Button";

const QnABox = () => {
  return (
    <div className="w-full my-4">
        <div className=" flex flex-col justify-center items-center gap-6 border-2 border-black rounded-full p-4 w-full ">
            <h2 className="text-lg font-bold mt-4">구매하시려는 상품에 대해 궁금한 점이 있으시면 문의해 주세요</h2>
            <Button variant = "filled" size = "lg" className="w-md rounded-full mb-4">문의하기</Button>
        </div>
        <h1 className="text-2xl font-bold mt-10 p-4">상품문의</h1>
        <span className="block w-full border-b-2 border-black mt-4"></span>


        <div>
            
        </div>
    </div>
    

);
};

export default QnABox;

