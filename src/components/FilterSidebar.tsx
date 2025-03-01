interface FilterSidebarProps {
  filters: {
    category: string;
    priceRange: string;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="abstract">Abstract</option>
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={filters.priceRange}
            onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
          >
            <option value="all">All Prices</option>
            <option value="0-100">Under $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500+">$500+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sort By</label>
          <select 
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}; 