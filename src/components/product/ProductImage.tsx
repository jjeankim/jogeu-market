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
    <div className="w-[50%] relative pr-15 flex ">
      <div className="relative overflow-hidden border-2 border-black rounded-lg aspect-square flex items-center justify-center">
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
