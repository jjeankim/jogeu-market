import Pagination from "@/components/Pagination";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationBar = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) => {
  return (
    <div className="flex justify-center my-6">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default PaginationBar;
