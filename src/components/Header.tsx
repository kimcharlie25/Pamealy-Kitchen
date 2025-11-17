import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-brand-primary shadow-lg border-b-2 border-brand-primary-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-brand-text-primary hover:text-brand-text-primary/80 transition-colors duration-200"
          >
            {loading ? (
              <div className="w-10 h-10 bg-brand-primary-dark rounded-full animate-pulse" />
            ) : (
              <img 
                src={siteSettings?.site_logo || "/logo.jpg"} 
                alt={siteSettings?.site_name || "Ramen Yard"}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-text-primary shadow-md"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <h1 className="text-2xl font-sans font-bold text-brand-text-primary">
              {loading ? (
                <div className="w-24 h-6 bg-brand-primary-dark rounded animate-pulse" />
              ) : (
                siteSettings?.site_name || "Ramen Yard"
              )}
            </h1>
          </button>

          <div className="flex items-center space-x-2">
            <button 
              onClick={onCartClick}
              className="relative p-3 text-brand-text-primary hover:bg-brand-primary-dark rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-text-primary text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce-gentle shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;