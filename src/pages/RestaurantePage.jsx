import { SiteHeader, SiteFooter } from '../semantic-graph/nodes/SiteChrome.jsx';
import { CartProvider } from '../restaurante/context/CartContext';
import { useColombianMeals } from '../restaurante/hooks/useColombianMeals';
import { useCartActions } from '../restaurante/hooks/useCartActions';
import { submitOrder, getAxiosErrorMessage } from '../restaurante/api/restaurantApi';
import { UI } from '../restaurante/constants/app';
import MealCard from '../restaurante/components/MealCard';
import Cart from '../restaurante/components/Cart';
import AppErrorBoundary from '../restaurante/components/AppErrorBoundary';

function RestaurantContent() {
  const { meals, loading, error } = useColombianMeals('Colombia');

  if (loading) {
    return (
      <main className="page-container">
        <p className="section-subtitle">Cargando platos de Colombia...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="card p-6">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="page-container">
        <header className="mb-10">
          <h1 className="section-title">Platos típicos de Colombia</h1>
          <p className="section-subtitle mt-2">Recetas colombianas obtenidas desde TheMealDB.</p>
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
      <SiteHeader />
      <RestaurantPageInner />
      <SiteFooter />
    </CartProvider>
  );
}