import { useCartActions } from '../hooks/useCartActions';
import { UI } from '../constants/app';

function MealCard({ meal }) {
  const { addItem, removeItem, cart } = useCartActions();
  const { idMeal, strMeal, strMealThumb } = meal;
  const item = cart.items.find((i) => i.idMeal === idMeal);
  const quantity = item?.quantity ?? 0;

  return (
    <div
      className="overflow-hidden"
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-surface)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <img
        src={strMealThumb}
        alt={strMeal}
        className="h-44 w-full rounded-t-xl object-cover"
      />
      <div className="p-4">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          #{idMeal}
        </p>
        <h3
          className="line-clamp-2 text-base font-semibold"
          style={{ color: 'var(--color-text-body)' }}
        >
          {strMeal.replace(' Recipe', '')}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => removeItem(meal)}
              className="rounded-md border px-3 py-1 disabled:opacity-40"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-surface)',
                color: 'var(--color-text-body)',
              }}
              disabled={quantity === 0}
            >
              -
            </button>
            <span className="text-sm font-medium" style={{ color: 'var(--color-text-body)' }}>
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => addItem(meal)}
              className="rounded-md border px-3 py-1"
              style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-surface)',
                color: 'var(--color-text-body)',
              }}
            >
              +
            </button>
          </div>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {UI.inCartLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
