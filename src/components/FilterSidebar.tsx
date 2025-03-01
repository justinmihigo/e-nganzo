import React from 'react';

interface FilterSidebarProps {
  filters: {
    category: string;
    supportRange: string;
    description: string;
    sortBy: string;
  };
  onFilterChange: (filters: FilterSidebarProps['filters']) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="space-y-6">
      {/* Filter controls */}
      <div>
        <h3 className="text-lg font-medium mb-2">Category</h3>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="all">All Categories</option>
          <option value="abstract">Abstract</option>
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Support Range</h3>
        <select
          value={filters.supportRange}
          onChange={(e) => onFilterChange({ ...filters, supportRange: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="all">All Ranges</option>
          <option value="0-100">$0 - $100</option>
          <option value="101-500">$101 - $500</option>
          <option value="501+">$501+</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}; 