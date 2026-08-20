/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Capture-phase click delegation for semantic action intents. Maps
 * data-action-intent values to client-side routes without adding wrapper
 * DOM nodes or altering zero-geometry node markup.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NAVIGATION_INTENTS = new Set(['navigate-home', 'navigate-search', 'navigate-about', 'navigate-contact', 'expand-detail']);

function resolveNavigationTarget(intent, element) {
  switch (intent) {
    case 'navigate-home':
      return '/';
    case 'navigate-search':
      return '/buscar';
    case 'navigate-about':
      return '/about';
    case 'navigate-contact':
      return '/contacto';
    case 'expand-detail': {
      const propertyId = element.getAttribute('data-ref');
      return propertyId ? `/propiedad/${propertyId}` : null;
    }
    default:
      return null;
  }
}

export function SemanticActionRouter({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(event) {
      const actionElement = event.target.closest('[data-action-intent]');
      if (actionElement) {
        const intent = actionElement.getAttribute('data-action-intent');
        if (NAVIGATION_INTENTS.has(intent)) {
          const target = resolveNavigationTarget(intent, actionElement);
          if (target) {
            event.preventDefault();
            navigate(target);
          }
        } else if (actionElement.tagName === 'A') {
          event.preventDefault();
        }
        return;
      }

      const homeAnchor = event.target.closest('a[href="/"]');
      if (homeAnchor) {
        event.preventDefault();
        navigate('/');
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [navigate]);

  return children;
}
