const SubTitle = ({ title }: { title: string }) => {
  // return <h3 className="text-3xl font-bold inline-block mb-10">{title}</h3>;
  return (
    <h3
      className="
        text-xl sm:text-2xl md:text-3xl lg:text-4xl 
        font-bold inline-block 
        mb-4 sm:mb-6 md:mb-10
      "
    >
      {title}
    </h3>
  );
};

export default SubTitle;
