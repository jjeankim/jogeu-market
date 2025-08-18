import Image from "next/image";

export default function ProductImage({
  imgUrl,
  name,
}: {
  thumbnailImageUrl?: string;
  imgUrl?: string;
  name: string;
}) {
  const getImageUrl = () => {
    if (!imgUrl) return "/images/noImg.png";

    return imgUrl;
  };

  return (
    <div className="w-full md:w-[50%] relative md:pr-15 flex justify-center md:justify-start">
      <div className="relative overflow-hidden shadow-[5px_10px_20px_rgba(0,0,0,0.1)] rounded-2xl aspect-square flex items-center justify-center w-full max-w-md md:max-w-none">
        <Image
          src={getImageUrl()}
          width={300}
          height={300}
          className="w-[80%]"
          alt={name}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transform: "scale(0.8)",
          }}
        />
      </div>
    </div>
  );
}
