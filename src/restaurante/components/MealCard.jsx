import { useCartActions } from '../hooks/useCartActions';
import { UI } from '../constants/app';

function MealCard({ meal }) {
  const { addItem, removeItem, cart } = useCartActions();
  const { idMeal, strMeal, strMealThumb } = meal;
  const item = cart.items.find((i) => i.idMeal === idMeal);
  const quantity = item?.quantity ?? 0;

  return (
    <div className="card overflow-hidden">
      <img
        src={strMealThumb}
        alt={strMeal}
        className="h-44 w-full rounded-t-xl object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-500">#{idMeal}</p>
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
          {strMeal.replace(' Recipe', '')}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => removeItem(meal)}
              className="btn btn-secondary px-3 py-1 disabled:opacity-40"
              disabled={quantity === 0}
            >
              -
            </button>
            <span className="text-sm font-medium text-gray-900">{quantity}</span>
            <button
              type="button"
              onClick={() => addItem(meal)}
              className="btn btn-secondary px-3 py-1"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">{UI.inCartLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
