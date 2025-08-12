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
    <div className="w-[50%] relative pr-15">
      <div className="relative overflow-hidden border-2 border-black rounded-lg aspect-square">
        <Image
          src={getImageUrl()}
          width={300}
          height={300}
          className="w-full object-cover"
          alt={name}
        />
      </div>
    </div>
  );
}
