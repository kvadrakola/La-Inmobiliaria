/**
 * RestaurantePage — Restaurant menu + cart page
 *
 * Adapted to La-Inmobiliaria stack:
 * - React 19
 * - Tailwind v4
 * - react-router-dom
 * - Shared header/footer from La-Inmobiliaria
 */

import { useState, useEffect, useCallback } from 'react';
import { CartProvider, useCart } from '../restaurante/context/CartContext';
import { useColombianMeals } from '../restaurante/hooks/useColombianMeals';
import { useCartActions } from '../restaurante/hooks/useCartActions';
import { submitOrder, getAxiosErrorMessage } from '../restaurante/api/restaurantApi';
import { UI } from '../restaurante/constants/app';
import MealCard from '../restaurante/components/MealCard';
import AppErrorBoundary from '../restaurante/components/AppErrorBoundary';

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
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-gray-500">{UI.cartEmptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900" style={{ fontSize: '20px' }}>
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
                <p className="text-sm font-medium text-gray-900">{item.strMeal.replace(' Recipe', '')}</p>
                <p className="text-xs text-gray-500">Cant: {item.quantity}</p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item)}
                className="text-sm text-gray-500 hover:text-red-600"
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
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#0047ab] px-4 py-2 text-white hover:bg-[#003b8e]"
          >
            {UI.confirmOrderLabel} ({totalItems})
          </button>
        </div>
      </div>
    </div>
  );
}

function RestaurantContent() {
  const { meals, loading, error } = useColombianMeals('Colombia');

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-gray-500">{UI.loadingMessage}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">{UI.pageTitle}</h1>
          <p className="mt-2 text-gray-500">{UI.pageDescription}</p>
        </header>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </section>
      </main>
      <Cart />
    </>
  );
}

function RestaurantPageInner() {
  return (
    <AppErrorBoundary>
      <RestaurantContent />
    </AppErrorBoundary>
  );
}

export default function RestaurantePage() {
  return (
    <CartProvider>
      <RestaurantPageInner />
    </CartProvider>
  );
}
