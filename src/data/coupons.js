// Central list of valid coupon codes for NovaCart.
// type: 'percent' | 'flat'
export const coupons = [
  { code: 'NOVA10', type: 'percent', value: 10, minOrder: 500, description: 'Get 10% off on your order' },
  { code: 'NOVA20', type: 'percent', value: 20, minOrder: 2000, description: '20% off on orders above ₹2,000' },
  { code: 'FLAT150', type: 'flat', value: 150, minOrder: 1500, description: 'Flat ₹150 off on orders above ₹1,500' },
  { code: 'FLAT300', type: 'flat', value: 300, minOrder: 3500, description: 'Flat ₹300 off on orders above ₹3,500' },
  { code: 'WELCOME50', type: 'flat', value: 50, minOrder: 300, description: 'New here? Flat ₹50 off' },
  { code: 'BIGBILLION', type: 'percent', value: 15, minOrder: 5000, description: '15% off on big-cart orders above ₹5,000' },
];

export function validateCoupon(code, subtotal) {
  const coupon = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) return { valid: false, message: 'Invalid coupon code' };
  if (subtotal < coupon.minOrder) {
    return { valid: false, message: `Add items worth ₹${coupon.minOrder.toLocaleString('en-IN')} or more to use this coupon` };
  }
  const discount = coupon.type === 'percent' ? Math.round(subtotal * (coupon.value / 100)) : coupon.value;
  return { valid: true, coupon, discount };
}
