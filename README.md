# HabitaFactoría

Portal de alquiler de vivienda para estudiantes en España. La app es un **híbrido**: inicio y búsqueda son páginas React clásicas; detalle, about y contacto se montan como **Semantic Scene Graph**. En el grafo, React describe *qué es* cada nodo (`data-*`), no solo cómo se ve. El diseño visual se generó en Penpot a partir de ese grafo y los tokens W3C del proyecto.

> **Documentación completa del equipo (Notion):**  
> [HabitaFactoría — Documentación del equipo](https://app.notion.com/p/3ae3c8c1bca880f2ba3eefa5eb26bafb)

Ahí está el material didáctico íntegro: mini-repaso de React con nuestro código, arquitectura archivo por archivo, cumplimiento normativo, tokens/Penpot y la guía de presentación.

---

## Stack

- **React 19** + **Vite**, con **React Compiler** (`babel-plugin-react-compiler`)
- **React Router 7** — rutas definidas en [`src/App.jsx`](src/App.jsx)
- **Tailwind CSS 4** — layout y chrome; tokens W3C vía CSS variables
- **Style Dictionary** — tokens W3C (`trust` / `vibrant`) → `src/styles/tokens.css`
- **Lucide React** — iconos de navegación
- **Axios** — menú del mini-app Restaurante (TheMealDB)

## Diseño

Diseño generado en Penpot (páginas `home-page-001`, `search-page-001`, `detail-page-001`) con el set de tokens `HabitaFactoria/Trust`:

**[Abrir el archivo en Penpot](https://design.penpot.app/#/view?file-id=8694f143-a620-8054-8008-6790ee178f11&page-id=2be68822-842f-8175-8008-677e92a06f90&section=interactions&index=0&share-id=2be68822-842f-8175-8008-6796bd4d3f53)**

| Inicio (`/`) | Búsqueda (`/buscar`) | Detalle (`/propiedad/:id`) |
| :---: | :---: | :---: |
| ![Inicio](src/img/designPenpotAppMainPage.png) | ![Búsqueda](src/img/designPenpotAppSearchPage.png) | ![Detalle](src/img/designPenpotAppOneHousePage.png) |

## Inicio rápido

```bash
npm install
npm run dev
```

Regenerar tokens de diseño:

```bash
npm run build:tokens          # tema Trust
npm run build:tokens:vibrant  # tema Vibrant
```

## Rutas

Montadas en [`src/App.jsx`](src/App.jsx). Toda la app va envuelta en [`SemanticActionRouter`](src/semantic-graph/SemanticActionRouter.jsx), que resuelve clics con `data-action-intent`.

| Ruta | Página montada |
| --- | --- |
| `/` | `Home` — historia, equipo, vitrina |
| `/buscar` | `Properties` — listado completo |
| `/properties` | Alias de `/buscar` |
| `/propiedad/:propertyId` | `DetailSceneGraph` — ficha (`listing-N` o `property-00N`) |
| `/contacto` | `ContactSceneGraph` |
| `/about` | `AboutSceneGraph` |
| `/restaurante` | Mini-app de menú colombiano |

`HomeSceneGraph` y `SearchSceneGraph` existen en `src/semantic-graph/pages/` (versión Zero-Geometry de inicio y búsqueda) pero **no están conectadas** al router.

## Estructura

```
src/
├── App.jsx                     # rutas montadas
├── pages/
│   ├── Home.jsx                # /  (HEADER / MAIN / FOOTER)
│   ├── Properties.jsx          # /buscar y /properties
│   └── RestaurantePage.jsx     # /restaurante
├── data/
│   └── mockData.js             # 12 anuncios mock + fetchProperties
├── components/
│   ├── layout/Header.jsx       # chrome de navegación
│   ├── layout/Footer.jsx       # footer de Home y Properties
│   ├── properties/             # PropertyList
│   ├── agents/                 # AgentCard / AgentList
│   └── ui/                     # Button, Card
├── restaurante/                # cart, API meals, estilos propios
├── styles/                     # tokens, header, team, detail, about
├── theme/                      # theme-trust.json / theme-vibrant.json
└── semantic-graph/
    ├── domainTypes.js          # formas de datos (JSDoc)
    ├── fixtures.js             # agencia, agentes, 3 propiedades semánticas
    ├── propertyCatalog.js      # fixtures + anuncios mock, lookup por id
    ├── manifest.js             # índice del grafo (nodos + relaciones)
    ├── SemanticActionRouter.jsx
    ├── nodes/                  # Property, Agency, Search, Contact, SiteChrome
    └── pages/                  # Detail / Contact / About (montadas)
                                # Home / Search (sin montar)
```

Datos de anuncios de inicio y búsqueda: [`src/data/mockData.js`](src/data/mockData.js). `propertyCatalog` los adapta al shape semántico para la ficha. `fixtures.js` cubre agencia, equipo y tres listings del grafo.

Cada página montada cumple **HEADER / MAIN / FOOTER**. Inicio y búsqueda usan `Header` + `Footer`; las escenas semánticas usan `SiteHeader` + `SiteFooter` (el header es el mismo componente).

## Contexto español

Los requisitos de transparencia del mercado español viven como **dato** (detalle en Notion):

- **Bizum** como señal de confianza
- etiqueta **«Gastos Incluidos»**
- registros / licencia bajo **RD 1312/2024** (Ventanilla Única Digital) y DIA donde aplica

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo Vite |
| `npm run build` | Build de producción |
| `npm run lint` | ESLint |
| `npm run preview` | Vista previa del build |
| `npm run build:tokens` | Tokens Trust → `src/styles/tokens.css` |
| `npm run build:tokens:vibrant` | Tokens Vibrant → `src/styles/tokens.css` |

## Licencia

Proyecto académico — Inmobiliaria Factoría F5.
