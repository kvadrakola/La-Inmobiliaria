export const getColombianMeals = async () => {
  const res = await fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?a=Colombia'
  );

  if (!res.ok) {
    throw new Error(`Error fetching meals: ${res.status}`);
  }

  const data = await res.json();
  return data.meals ?? [];
};
