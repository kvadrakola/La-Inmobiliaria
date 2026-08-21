import MealCard from './MealCard';
import Cart from './Cart';
import { useColombianMeals } from '../hooks/useColombianMeals';

function PageHeader() {
  return (
    <header className="mb-10">
      <h1 className="section-title">Platos típicos de Colombia</h1>
      <p className="section-subtitle mt-2">Recetas colombianas obtenidas desde TheMealDB.</p>
    </header>
  );
}

function MealGrid({ meals }) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </section>
  );
}

function ColombianMeals() {
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
        <PageHeader />
        <MealGrid meals={meals} />
      </main>
      <Cart />
    </>
  );
}

export default ColombianMeals;
