import ListCard from "@/components/ui/ListCard";
import { Product } from "@/lib/apis/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-15 pb-12 ">
      {products.map((product) => (
        <li key={product.id}>
          <ListCard product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductGrid;
