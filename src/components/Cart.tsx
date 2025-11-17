import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 bg-white">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-3xl font-sans font-bold text-brand-text-primary mb-2">Your cart is empty</h2>
          <p className="text-brand-text-secondary mb-6 text-lg">Add some delicious items to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-brand-text-primary text-white px-8 py-3 rounded-xl hover:bg-brand-text-primary/90 transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-brand-primary">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-200 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-4xl font-sans font-bold text-brand-text-primary">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-brand-text-primary hover:text-brand-text-primary/80 transition-colors duration-200 font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border-2 border-brand-primary/30">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b-2 border-brand-primary/20' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-sans font-bold text-brand-text-primary mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-sm text-brand-text-secondary mb-1 font-medium">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-sm text-brand-text-secondary mb-1 font-medium">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-lg font-bold text-brand-text-secondary">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-3 bg-brand-primary rounded-xl p-1 border-2 border-brand-text-primary">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-brand-primary-dark rounded-lg transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-brand-text-primary font-bold" />
                  </button>
                  <span className="font-bold text-brand-text-primary min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-brand-primary-dark rounded-lg transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-brand-text-primary font-bold" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-brand-text-secondary">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-brand-text-primary hover:bg-brand-primary rounded-full transition-all duration-200"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-primary rounded-2xl shadow-lg p-6 border-2 border-brand-text-primary">
        <div className="flex items-center justify-between text-3xl font-sans font-bold mb-6">
          <span className="text-brand-text-secondary">Total:</span>
          <span className="text-brand-text-primary">₱{parseFloat(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-brand-text-primary text-white py-4 rounded-xl hover:bg-brand-text-primary/90 transition-all duration-200 transform hover:scale-[1.02] font-bold text-lg shadow-lg hover:shadow-xl"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;