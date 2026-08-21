# HabitaFactoría

Aplicación web de HabitaFactoría, una inmobiliaria ficticia orientada al alquiler de habitaciones y pisos compartidos para estudiantes en España. El proyecto combina un portal inmobiliario con una experiencia de restaurante de demostración accesible desde la navegación principal.

El frontend está construido con React y Vite. La parte inmobiliaria activa usa un **Semantic Scene Graph** con filosofía **Zero-Geometry**: los componentes describen qué representa cada elemento mediante atributos `data-*`, mientras que la geometría y la presentación viven en CSS/Tailwind.

> **Documentación completa del equipo (Notion):** [HabitaFactoría — Documentación del equipo](https://app.notion.com/p/3ae3c8c1bca880f2ba3eefa5eb26bafb)

## Estado del proyecto

El repositorio contiene un prototipo funcional de frontend, con navegación, vistas responsive, datos de prueba y estados de carga/error. No existe todavía un backend inmobiliario conectado: las propiedades y los datos de agencia proceden de fixtures locales. El pedido del restaurante se simula si no se configura una API propia.

## Funcionalidades

### Portal inmobiliario

- Página de inicio con presentación de la agencia, misión, historia, equipo y vitrina de propiedades.
- Navegación responsive con menú móvil y agrupación visual de los servicios principales.
- Listado de propiedades con estados de carga, error y vacío.
- Fichas de detalle con dirección, precio, gastos incluidos, comodidades, agente asignado, certificado energético y acciones de contacto/visita.
- Catálogo unificado que acepta identificadores semánticos (`property-001`, `listing-1`) y antiguos identificadores numéricos.
- Página «Sobre Nosotros» con la historia de la agencia y cinco perfiles del equipo.
- Formulario de contacto con datos de búsqueda, preferencia de contacto, aceptación de privacidad y confirmación local del envío.
- Señales de transparencia representadas como datos semánticos: Bizum, gastos incluidos, registro profesional, registros autonómicos, CEE, DIA y distribución de honorarios.

### Restaurante

- Ruta `/restaurante` con platos colombianos obtenidos desde TheMealDB.
- Tarjetas de platos con imagen, nombre e identificador.
- Carrito en memoria con incremento, decremento, eliminación y vaciado.
- Confirmación de pedido con estado simulado por defecto o envío `POST` a una API configurada.
- Mensajes de carga, error y recuperación mediante `AppErrorBoundary`.

## Stack tecnológico

- **React 19** y `react-dom`.
- **Vite 8** como servidor y bundler.
- **React Router 7** para el enrutado del cliente.
- **Tailwind CSS 4** mediante `@tailwindcss/vite`.
- **React Compiler** mediante `reactCompilerPreset` y `babel-plugin-react-compiler`.
- **Lucide React** para iconos de navegación.
- **Axios** para TheMealDB y el endpoint opcional de pedidos.
- **Style Dictionary** y tokens W3C personalizados para los temas visuales.
- **ESLint 10** con reglas de React Hooks y React Refresh.

## Instalación y puesta en marcha

### Requisitos previos

El proyecto necesita **Node.js** y **npm**. npm se instala automáticamente junto con Node.js, por lo que no es necesario instalarlo por separado.

Comprueba que ambos comandos están disponibles:

```bash
node --version
npm --version
```

Si alguno no está disponible, instala la versión LTS de Node.js desde [nodejs.org](https://nodejs.org/). Después, cierra y vuelve a abrir la terminal para que Windows actualice el `PATH`.

### Clonar e instalar

```bash
git clone <URL_DEL_REPOSITORIO>
cd la-inmobiliaria
npm install
```

### Servidor de desarrollo

```bash
npm run dev
```

Vite mostrará la URL local, normalmente `http://localhost:5173`.

### Build de producción

```bash
npm run build
npm run preview
```

La build se genera en `dist/`.

## Rutas

| Ruta | Vista | Estado |
| --- | --- | --- |
| `/` | Inicio semántico: agencia, equipo y propiedades destacadas | Activa |
| `/buscar` | Resultados de búsqueda con criterios y tres fixtures inmobiliarios | Activa |
| `/properties` | Alias del listado de propiedades clásico | Activa |
| `/propiedad/:propertyId` | Ficha completa; admite ids semánticos y ids de listings | Activa |
| `/about` | Historia de la agencia y equipo | Activa |
| `/contacto` | Formulario de contacto | Activa |
| `/restaurante` | Menú colombiano y carrito de pedidos | Activa |

El `SemanticActionRouter` traduce los intents `data-action-intent` a rutas. Acciones como «Ver Propiedades» pueden ser botones semánticos sin acoplar la navegación al marcado visual.

## Arquitectura

```text
src/
├── App.jsx                         # BrowserRouter y tabla de rutas
├── main.jsx                        # Punto de entrada y hojas globales
├── components/                     # Componentes clásicos reutilizables
│   ├── agents/                     # Tarjetas y listas de agentes
│   ├── layout/                     # Header y Footer
│   ├── properties/                 # PropertyList
│   └── ui/                         # Button y Card
├── data/mockData.js                # Datos mock de la implementación clásica
├── pages/                          # Home, Properties y RestaurantePage
├── restaurante/                    # API, carrito, hooks, componentes y estilos
├── semantic-graph/                 # Capa semántica activa del portal
│   ├── domainTypes.js              # Contratos JSDoc y vocabularios cerrados
│   ├── fixtures.js                 # Agencia, equipo, propiedades y criterios
│   ├── manifest.js                  # Índice de nodos y relaciones
│   ├── propertyCatalog.js           # Lookup y adaptación de listings clásicos
│   ├── SemanticActionRouter.jsx     # Delegación de navegación por intents
│   ├── nodes/                       # Agencia, propiedades, búsqueda y chrome
│   └── pages/                       # Home, búsqueda, detalle, about y contacto
├── styles/                         # CSS global, tokens, equipo y detalle
└── theme/                          # Fuentes JSON de Trust y Vibrant
```

### Semantic Scene Graph

La capa `src/semantic-graph` mantiene una representación semántica de los contenidos inmobiliarios:

- `fixtures.js` contiene la agencia, cinco agentes, tres propiedades, navegación, pagos, documentos y criterios de búsqueda.
- `domainTypes.js` documenta con JSDoc `Property`, `Agency`, `Agent`, direcciones, precios, comodidades y compliance.
- `PropertyListing` se renderiza en tres profundidades: `teaser` en inicio, `summary` en resultados y `complete` en detalle.
- `manifest.js` indexa nodos y relaciones `data-ref`/`data-rel`.
- `propertyCatalog.js` adapta los doce listings de `mockData.js` al contrato semántico.
- Los atributos `data-record-status="fixture"` y `data-verification-status="unverified"` indican que la información legal es demostrativa y no una certificación real.

## Datos y APIs

### Propiedades

El portal no consume todavía un backend inmobiliario:

- `src/semantic-graph/fixtures.js`: tres propiedades ricas (`property-001` a `property-003`).
- `src/data/mockData.js`: doce listings clásicos recuperados por `fetchProperties()` como una `Promise` simulada.

`propertyCatalog.js` unifica ambas fuentes para las fichas de detalle. Las imágenes de los tres primeros listings usan URLs de Unsplash y las demás se sirven desde `public/img`.

### TheMealDB

El menú se consulta en:

```text
GET https://www.themealdb.com/api/json/v1/1/filter.php?a=Colombia
```

La implementación activa usa `restaurantApi.js` y Axios. `theMealDb.js` conserva una implementación alternativa basada en `fetch`.

### Pedidos

Sin configuración adicional, `submitOrder()` espera 400 ms y devuelve un pedido simulado en consola. Para usar un backend real, crea `.env.local` con:

```env
VITE_ORDERS_API_URL=https://tu-api.example/orders
```

La aplicación enviará un `POST` JSON con esta forma:

```json
{
  "items": [
    { "idMeal": "12345", "name": "Nombre del plato", "quantity": 1 }
  ],
  "totalItems": 1
}
```

## Diseño y tokens

El diseño de referencia se realizó en Penpot con las escenas `home-page-001`, `search-page-001` y `detail-page-001` y el set `HabitaFactoría/Trust`.

**[Abrir el archivo en Penpot](https://design.penpot.app/#/view?file-id=8694f143-a620-8054-8008-6790ee178f11&page-id=2be68822-842f-8175-8008-677e92a06f90&section=interactions&index=0&share-id=2be68822-842f-817f-8008-6796bd4d3f53)**

## Capturas de la aplicación

Estas capturas corresponden al frontend ejecutándose en local y muestran el estado actual de las vistas principales:

| Inicio | Propiedades | Ficha de propiedad | Restaurante |
| :---: | :---: | :---: | :---: |
| ![Inicio de HabitaFactoría](src/img/screenshots/home.png) | ![Listado de propiedades](src/img/screenshots/properties.png) | ![Detalle de propiedad](src/img/screenshots/property-detail.png) | ![Restaurante](src/img/screenshots/restaurant.png) |

| Sobre Nosotros | Contacto |
| :---: | :---: |
| ![Página Sobre Nosotros](src/img/screenshots/about.png) | ![Página de contacto](src/img/screenshots/contact.png) |

Los tokens fuente están en `src/theme/` y el resultado generado en `src/styles/tokens.css`:

```bash
npm run build:tokens
npm run build:tokens:vibrant
```

Ambos comandos sobrescriben `src/styles/tokens.css`. El tema `Trust` es el estado versionado por defecto.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo Vite |
| `npm run build` | Genera la build de producción en `dist/` |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |
| `npm run preview` | Sirve localmente la build generada |
| `npm run build:tokens` | Genera tokens CSS desde `theme-trust.json` |
| `npm run build:tokens:vibrant` | Genera tokens CSS desde `theme-vibrant.json` |

## Calidad y colaboración

Antes de abrir una pull request:

```bash
npm run lint
npm run build
```

La guía de proyecto está en [`IDEA.md`](IDEA.md) y en [`.clinerules/Regla de la inmobiliaria.md`](.clinerules/Regla%20de%20la%20inmobiliaria.md). Se recomienda usar `camelCase` para variables y funciones, `PascalCase` para componentes y commits según [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).

## Equipo

| Nombre | Rol |
| --- | --- |
| Jesús González Gómez | Product Owner — define la visión del producto y prioriza el backlog |
| María José Rodríguez Ramos | Desarrolladora — construye componentes y funcionalidades del frontend |
| Jose Loero Nielez | Scrum Master — facilita los procesos ágiles y elimina impedimentos |
| Moisés García Sanz | Desarrollador — implementa características y optimiza el rendimiento |
| Konstantin Mlechka | Desarrollador — contribuye al código base y la arquitectura del proyecto |

## Limitaciones conocidas

- Los datos inmobiliarios son fixtures/mocks; no hay persistencia ni autenticación.
- El formulario de contacto solo muestra una confirmación local; no realiza una petición.
- «Solicitar visita», «Contactar con agente» y la descarga del DIA son acciones semánticas de demostración.
- Los registros, licencias, precios y textos legales están marcados como no verificados y no deben interpretarse como asesoramiento jurídico.
- La ruta `/restaurante` depende de la disponibilidad de TheMealDB.
- No hay una suite de tests automatizados configurada; la comprobación disponible actualmente es lint y build.

## Licencia

Proyecto académico ficticio — Inmobiliaria Factoría F5. No destinado a operaciones inmobiliarias reales.
