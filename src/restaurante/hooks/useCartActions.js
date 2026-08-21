import { useCallback } from 'react';
import { useCart, useCartDispatch } from '../context/CartContext';
import { UI } from '../constants/app';

export const useCartActions = () => {
  const cart = useCart();
  const dispatch = useCartDispatch();

  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const addItem = useCallback(
    (meal) => {
      dispatch({ type: 'ADD_ITEM', payload: meal });
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (meal) => {
      dispatch({ type: 'REMOVE_ITEM', payload: meal });
    },
    [dispatch],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, [dispatch]);

  return {
    cart,
    totalItems,
    addItem,
    removeItem,
    clearCart,
  };
};
