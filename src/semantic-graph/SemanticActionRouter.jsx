/**
 * SEMANTIC SCENE GRAPH — ZERO GEOMETRY
 *
 * Capture-phase click delegation for semantic action intents. Maps
 * data-action-intent values to client-side routes without adding wrapper
 * DOM nodes or altering zero-geometry node markup.
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_INTENTS, NAVIGATION_ROUTES, ROUTES } from '../navigation/routes.js';

function resolveNavigationTarget(intent, element) {
  if (intent === 'expand-detail') {
    const propertyId = element.getAttribute('data-ref');
    return propertyId ? ROUTES.propertyDetail(propertyId) : null;
  }

  return NAVIGATION_ROUTES[intent] ?? null;
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

      const homeAnchor = event.target.closest(`a[href="${ROUTES.home}"]`);
      if (homeAnchor) {
        event.preventDefault();
        navigate(ROUTES.home);
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [navigate]);

  return children;
}
