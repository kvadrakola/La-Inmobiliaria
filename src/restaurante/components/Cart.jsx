import { useCallback } from 'react';
import { useCartActions } from '../hooks/useCartActions';
import { submitOrder, getAxiosErrorMessage } from '../api/restaurantApi';
import { UI } from '../constants/app';

function Cart() {
  const { cart, totalItems, clearCart, removeItem } = useCartActions();

  const handleConfirm = useCallback(async () => {
    const payload = {
      items: cart.items.map((item) => ({
        idMeal: item.idMeal,
        name: item.strMeal,
        quantity: item.quantity,
      })),
      totalItems,
    };

    try {
      await submitOrder(payload);
      clearCart();
      alert(UI.orderSentMessage);
    } catch (error) {
      alert(UI.orderErrorPrefix + getAxiosErrorMessage(error));
    }
  }, [cart.items, totalItems, clearCart]);

  if (totalItems === 0) {
    return (
      <div className="page-container">
        <div className="card p-6 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {UI.cartEmptyMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="section-title" style={{ fontSize: '20px' }}>
            {UI.confirmOrderLabel}
          </h2>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700"
          >
            {UI.clearCartLabel}
          </button>
        </div>
        <ul className="mt-4 divide-y divide-gray-100">
          {cart.items.map((item) => (
            <li key={item.idMeal} className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-body)' }}>
                  {item.strMeal.replace(' Recipe', '')}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Cant: {item.quantity}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="text-sm hover:text-red-600"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {UI.removeLabel}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={handleConfirm}
            className="btn btn-primary w-full px-4 py-2"
          >
            {UI.confirmOrderLabel} ({totalItems})
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
