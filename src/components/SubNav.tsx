import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-16 z-40 bg-white border-b-2 border-brand-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-10 w-24 bg-brand-primary rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg ${
                  selectedCategory === 'all'
                    ? 'bg-brand-text-primary text-white border-2 border-brand-text-primary'
                    : 'bg-white text-brand-text-secondary border-2 border-brand-primary hover:bg-brand-primary hover:border-brand-text-primary hover:text-brand-text-primary'
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg ${
                    selectedCategory === c.id
                      ? 'bg-brand-text-primary text-white border-2 border-brand-text-primary'
                      : 'bg-white text-brand-text-secondary border-2 border-brand-primary hover:bg-brand-primary hover:border-brand-text-primary hover:text-brand-text-primary'
                  }`}
                >
                  <span className="text-lg">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;


