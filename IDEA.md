# Reglas de Proyecto - Inmobiliaria Estudiantil (React + Vite + Tailwind)

## Contexto del Proyecto
Desarrollo de la plataforma web de alquiler de pisos compartidos para estudiantes. El proyecto requiere alta calidad de código, estructura limpia, diseño en Tailwind CSS, enrutamiento con React Router DOM y un control de versiones estricto.

---

## 1. Reglas Generales de Código y Nomenclatura
- **Nomenclatura (OBLIGATORIO camelCase):**
  - Variables, funciones, hooks, handlers y propiedades (`props`) DEBEN usar `camelCase` (ej. `getApartments`, `isMenuOpen`, `handleFilterChange`).
  - Nombres de componentes React y archivos de componentes en `PascalCase` (ej. `Header.jsx`, `Navbar.jsx`, `ApartmentCard.jsx`).
  - Constantes globales/mágicas en `UPPER_SNAKE_CASE` (ej. `API_BASE_URL`).
- **Principios Clean Code:**
  - Componentes pequeños, modulares y con una única responsabilidad.
  - Evitar lógica pesada en el JSX; extraer subcomponentes o helper functions.
  - Usar desestructuración de props.
  - Eliminar código muerto, `console.log` innecesarios y comentarios obsoletos antes de finalizar.

---

## 2. Convención de Git: Branches y Commits
Sigue estrictamente la especificación de **Conventional Commits** y **Conventional Branches**.

### Ramas (`Conventional Branches`)
- `feat/nombre-funcionalidad` (ej. `feat/header-nav`, `feat/restaurant-menu`)
- `fix/descripcion-error` (ej. `fix/nav-responsive-bug`)
- `refactor/nombre-modulo` (ej. `refactor/apartment-card`)
- `style/nombre-vista` (ej. `style/footer-layout`)

### Commits (`Conventional Commits`)
Formato: `<tipo>(<alcance opcional>): <descripción corta en presente/infinitivo>`
- `feat: agregar componente Navbar con React Router Link`
- `style: ajustar estilos responsivos del Header`
- `fix: corregir enlace roto en la navegación`
- `refactor: modularizar componentes del Header`
- `docs: actualizar README con instrucciones de Vercel`

---

## 3. Estructura de Carpetas Recomendada (`src/`)
Mantener una organización limpia y predecible:

```text
src/
├── assets/         # Imágenes, logos, fuentes
├── components/     # Componentes reutilizables UI
│   ├── layout/     # Header, Footer, Navbar
│   └── common/     # Botones, Tarjetas, Modales
├── pages/          # Páginas principales (rutas)
│   ├── Home.jsx
│   ├── Agents.jsx
│   ├── History.jsx
│   ├── Showcase.jsx
│   └── RestaurantMenu.jsx
├── services/       # Llamadas API (ej. TheMealDB)
├── routes/         # Configuración de React Router
└── styles/         # Estilos globales / Tailwind
