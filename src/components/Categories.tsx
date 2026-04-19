type CategoriesProps = {
  categories: string[];
  selectedCategories: string[];
  onCategoryClick: (category: string) => void;
};

const Categories = ({ categories, selectedCategories, onCategoryClick }: CategoriesProps) => {
  return (
    <aside className="w-72 hidden lg:block text-gray-100 p-6 sticky h-fit rounded-lg top-8 border border-gray-700">
      <div className="text-lg text-gray-100">
        <h3 className="font-semibold">Category Available</h3>
        <div className="space-y-4 space-x-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`border rounded-lg px-2 py-1 ${
                selectedCategories.includes(category)
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "text-gray-400 border-gray-700"
              }`}
              type="button"
              onClick={() => onCategoryClick(category)}
            >
              <p>#{category}</p>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Categories;
