import ListCard from "@/components/ui/ListCard";
import Link from "next/link";

interface Product {
  id: number | string;
  brand: string;
  name: string;
  price: number;
  review: number;
  imgUrl: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-15">
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/product/${product.id}`} className="group">
            <ListCard product={product} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductGrid;
