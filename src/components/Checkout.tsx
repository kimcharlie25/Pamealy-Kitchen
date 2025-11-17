import React, { useState } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { CartItem, PaymentMethod, ServiceType } from '../types';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

interface CheckoutProps {
  cartItems: CartItem[];
  totalPrice: number;
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, totalPrice, onBack }) => {
  const { paymentMethods } = usePaymentMethods();
  const [step, setStep] = useState<'details' | 'payment'>('details');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('pickup');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pickupTime, setPickupTime] = useState('5-10');
  const [customTime, setCustomTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gcash');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Set default payment method when payment methods are loaded
  React.useEffect(() => {
    if (paymentMethods.length > 0 && !paymentMethod) {
      setPaymentMethod(paymentMethods[0].id as PaymentMethod);
    }
  }, [paymentMethods, paymentMethod]);

  const selectedPaymentMethod = paymentMethods.find(method => method.id === paymentMethod);

  const handleProceedToPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const timeInfo = serviceType === 'pickup' 
      ? (pickupTime === 'custom' ? customTime : `${pickupTime} minutes`)
      : '';
    
    const orderDetails = `
🛒 Pamealy Kitchen ORDER

👤 Customer: ${customerName}
📞 Contact: ${contactNumber}
📍 Service: ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
${serviceType === 'delivery' ? `🏠 Address: ${address}${landmark ? `\n🗺️ Landmark: ${landmark}` : ''}` : ''}
${serviceType === 'pickup' ? `⏰ Pickup Time: ${timeInfo}` : ''}


📋 ORDER DETAILS:
${cartItems.map(item => {
  let itemDetails = `• ${item.name}`;
  if (item.selectedVariation) {
    itemDetails += ` (${item.selectedVariation.name})`;
  }
  if (item.selectedAddOns && item.selectedAddOns.length > 0) {
    itemDetails += ` + ${item.selectedAddOns.map(addOn => 
      addOn.quantity && addOn.quantity > 1 
        ? `${addOn.name} x${addOn.quantity}`
        : addOn.name
    ).join(', ')}`;
  }
  itemDetails += ` x${item.quantity} - ₱${item.totalPrice * item.quantity}`;
  return itemDetails;
}).join('\n')}

💰 TOTAL: ₱${totalPrice}
${serviceType === 'delivery' ? `🛵 DELIVERY FEE:` : ''}

💳 Payment: ${selectedPaymentMethod?.name || paymentMethod}
📸 Payment Screenshot: Please attach your payment receipt screenshot

${notes ? `📝 Notes: ${notes}` : ''}

Please confirm this order to proceed. Thank you for choosing Pamealy Kitchen!
    `.trim();

    const encodedMessage = encodeURIComponent(orderDetails);
    const messengerUrl = `https://m.me/pamealykitchen?text=${encodedMessage}`;
    
    window.open(messengerUrl, '_blank');
    
  };

  const isDetailsValid = customerName && contactNumber && 
    (serviceType !== 'delivery' || address) && 
    (serviceType !== 'pickup' || (pickupTime !== 'custom' || customTime));

  if (step === 'details') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8 pb-4 border-b-2 border-brand-primary">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-200 font-semibold"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-4xl font-sans font-bold text-brand-text-primary ml-8">Order Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-primary/30 p-6">
            <h2 className="text-3xl font-sans font-bold text-brand-text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b-2 border-brand-primary/20">
                  <div>
                    <h4 className="font-bold text-brand-text-primary">{item.name}</h4>
                    {item.selectedVariation && (
                      <p className="text-sm text-brand-text-secondary font-medium">Size: {item.selectedVariation.name}</p>
                    )}
                    {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                      <p className="text-sm text-brand-text-secondary font-medium">
                        Add-ons: {item.selectedAddOns.map(addOn => addOn.name).join(', ')}
                      </p>
                    )}
                    <p className="text-sm text-brand-text-secondary font-medium">₱{item.totalPrice} x {item.quantity}</p>
                  </div>
                  <span className="font-bold text-brand-text-secondary text-lg">₱{item.totalPrice * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t-2 border-brand-primary pt-4">
              <div className="flex items-center justify-between text-3xl font-sans font-bold">
                <span className="text-brand-text-secondary">Total:</span>
                <span className="text-brand-text-primary">₱{totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-primary/30 p-6">
            <h2 className="text-3xl font-sans font-bold text-brand-text-primary mb-6">Customer Information</h2>
            
            <form className="space-y-6">
              {/* Customer Information */}
              <div>
                <label className="block text-sm font-bold text-brand-text-secondary mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-brand-primary rounded-xl focus:ring-2 focus:ring-brand-text-primary focus:border-brand-text-primary transition-all duration-200 font-medium"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-text-secondary mb-2">Contact Number *</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-brand-primary rounded-xl focus:ring-2 focus:ring-brand-text-primary focus:border-brand-text-primary transition-all duration-200 font-medium"
                  placeholder="09XX XXX XXXX"
                  required
                />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-bold text-brand-text-secondary mb-3">Service Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'pickup', label: 'Pickup', icon: '🚶' },
                    { value: 'delivery', label: 'Delivery', icon: '🛵' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setServiceType(option.value as ServiceType)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-md hover:shadow-lg ${
                        serviceType === option.value
                          ? 'border-brand-text-primary bg-brand-text-primary text-white'
                          : 'border-brand-primary bg-white text-brand-text-secondary hover:bg-brand-primary hover:border-brand-text-primary hover:text-brand-text-primary'
                      }`}
                    >
                      <div className="text-2xl mb-1">{option.icon}</div>
                      <div className="text-sm font-bold">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup Time Selection */}
              {serviceType === 'pickup' && (
                <div>
                  <label className="block text-sm font-bold text-brand-text-secondary mb-3">Pickup Time *</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: '5-10', label: '5-10 minutes' },
                        { value: '15-20', label: '15-20 minutes' },
                        { value: '25-30', label: '25-30 minutes' },
                        { value: 'custom', label: 'Custom Time' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setPickupTime(option.value)}
                          className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-bold shadow-md hover:shadow-lg ${
                            pickupTime === option.value
                              ? 'border-brand-text-primary bg-brand-text-primary text-white'
                              : 'border-brand-primary bg-white text-brand-text-secondary hover:bg-brand-primary hover:border-brand-text-primary hover:text-brand-text-primary'
                          }`}
                        >
                          <Clock className="h-4 w-4 mx-auto mb-1" />
                          {option.label}
                        </button>
                      ))}
                    </div>
                    
                    {pickupTime === 'custom' && (
                      <input
                        type="text"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-brand-primary rounded-xl focus:ring-2 focus:ring-brand-text-primary focus:border-brand-text-primary transition-all duration-200 font-medium"
                        placeholder="e.g., 45 minutes, 1 hour, 2:30 PM"
                        required
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              {serviceType === 'delivery' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-brand-text-secondary mb-2">Delivery Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-brand-primary rounded-xl focus:ring-2 focus:ring-brand-text-primary focus:border-brand-text-primary transition-all duration-200 font-medium"
                      placeholder="Enter your complete delivery address"
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-brand-text-secondary mb-2">Landmark</label>
                    <input
                      type="text"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-brand-primary rounded-xl focus:ring-2 focus:ring-brand-text-primary focus:border-brand-text-primary transition-all duration-200 font-medium"
                      placeholder="e.g., Near McDonald's, Beside 7-Eleven, In front of school"
                    />
                  </div>
                </>
              )}

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-bold text-brand-text-secondary mb-2">Special Instructions</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-brand-primary rounded-xl focus:ring-2 focus:ring-brand-text-primary focus:border-brand-text-primary transition-all duration-200 font-medium"
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={!isDetailsValid}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform shadow-lg hover:shadow-xl ${
                  isDetailsValid
                    ? 'bg-brand-text-primary text-white hover:bg-brand-text-primary/90 hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Payment Step
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white">
      <div className="flex items-center mb-8 pb-4 border-b-2 border-brand-primary">
        <button
          onClick={() => setStep('details')}
          className="flex items-center space-x-2 text-brand-text-secondary hover:text-brand-text-primary transition-colors duration-200 font-semibold"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Details</span>
        </button>
        <h1 className="text-4xl font-sans font-bold text-brand-text-primary ml-8">Payment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Method Selection */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-primary/30 p-6">
          <h2 className="text-3xl font-sans font-bold text-brand-text-primary mb-6">Choose Payment Method</h2>
          
          <div className="grid grid-cols-1 gap-4 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center space-x-3 shadow-md hover:shadow-lg font-bold ${
                  paymentMethod === method.id
                    ? 'border-brand-text-primary bg-brand-text-primary text-white'
                    : 'border-brand-primary bg-white text-brand-text-secondary hover:bg-brand-primary hover:border-brand-text-primary hover:text-brand-text-primary'
                }`}
              >
                <span className="text-2xl">💳</span>
                <span className="font-bold">{method.name}</span>
              </button>
            ))}
          </div>

          {/* Payment Details with QR Code */}
          {selectedPaymentMethod && (
            <div className="bg-brand-primary rounded-xl p-6 mb-6 border-2 border-brand-text-primary">
              <h3 className="font-bold text-brand-text-primary mb-4 text-lg">Payment Details</h3>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm text-brand-text-secondary mb-1 font-medium">{selectedPaymentMethod.name}</p>
                  <p className="font-mono text-brand-text-secondary font-bold text-lg">{selectedPaymentMethod.account_number}</p>
                  <p className="text-sm text-brand-text-secondary mb-3 font-medium">Account Name: {selectedPaymentMethod.account_name}</p>
                  <p className="text-xl font-bold text-brand-text-primary">Amount: ₱{totalPrice}</p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src={selectedPaymentMethod.qr_code_url} 
                    alt={`${selectedPaymentMethod.name} QR Code`}
                    className="w-32 h-32 rounded-xl border-2 border-brand-text-primary shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                    }}
                  />
                  <p className="text-xs text-brand-text-secondary text-center mt-2 font-medium">Scan to pay</p>
                </div>
              </div>
            </div>
          )}

          {/* Reference Number */}
          <div className="bg-brand-primary/50 border-2 border-brand-text-primary rounded-xl p-4">
            <h4 className="font-bold text-brand-text-primary mb-2">📸 Payment Proof Required</h4>
            <p className="text-sm text-brand-text-secondary font-medium">
              After making your payment, please take a screenshot of your payment receipt and attach it when you send your order via Messenger. This helps us verify and process your order quickly.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-brand-primary/30 p-6">
          <h2 className="text-3xl font-sans font-bold text-brand-text-primary mb-6">Final Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="bg-brand-primary rounded-xl p-4 border-2 border-brand-text-primary">
              <h4 className="font-bold text-brand-text-primary mb-3 text-lg">Customer Details</h4>
              <p className="text-sm text-brand-text-secondary font-medium mb-1">Name: {customerName}</p>
              <p className="text-sm text-brand-text-secondary font-medium mb-1">Contact: {contactNumber}</p>
              <p className="text-sm text-brand-text-secondary font-medium mb-1">Service: {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>
              {serviceType === 'delivery' && (
                <>
                  <p className="text-sm text-brand-text-secondary font-medium mb-1">Address: {address}</p>
                  {landmark && <p className="text-sm text-brand-text-secondary font-medium">Landmark: {landmark}</p>}
                </>
              )}
              {serviceType === 'pickup' && (
                <p className="text-sm text-brand-text-secondary font-medium">
                  Pickup Time: {pickupTime === 'custom' ? customTime : `${pickupTime} minutes`}
                </p>
              )}
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b-2 border-brand-primary/20">
                <div>
                  <h4 className="font-bold text-brand-text-primary">{item.name}</h4>
                  {item.selectedVariation && (
                    <p className="text-sm text-brand-text-secondary font-medium">Size: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-sm text-brand-text-secondary font-medium">
                      Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                  <p className="text-sm text-brand-text-secondary font-medium">₱{item.totalPrice} x {item.quantity}</p>
                </div>
                <span className="font-bold text-brand-text-secondary text-lg">₱{item.totalPrice * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t-2 border-brand-primary pt-4 mb-6">
            <div className="flex items-center justify-between text-3xl font-sans font-bold">
              <span className="text-brand-text-secondary">Total:</span>
              <span className="text-brand-text-primary">₱{totalPrice}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 transform bg-brand-text-primary text-white hover:bg-brand-text-primary/90 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Place Order via Messenger
          </button>
          
          <p className="text-xs text-brand-text-secondary/70 text-center mt-3 font-medium">
            You'll be redirected to Facebook Messenger to confirm your order. Don't forget to attach your payment screenshot!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;