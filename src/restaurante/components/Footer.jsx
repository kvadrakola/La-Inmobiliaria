export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full site-footer"
      style={{
        backgroundColor: 'var(--footer-bg, #1f2937)',
        color: 'var(--footer-text, #d1d5db)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">RestauranteApp</h3>
            <p className="text-sm leading-relaxed">
              Cocina colombiana tradicional con los sabores auténticos de Colombia.
              Calidad, sabor y tradición en cada plato.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 +34 600 123 456</li>
              <li>✉️ info@restauranteapp.com</li>
              <li>📍 Calle Ejemplo, 12, Madrid</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Horario</h3>
            <ul className="space-y-2 text-sm">
              <li>Lunes a Viernes: 12:00 - 23:00</li>
              <li>Sábados: 13:00 - 00:00</li>
              <li>Domingos: 13:00 - 22:00</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:underline">Política de Privacidad</a></li>
              <li><a href="/terms" className="hover:underline">Términos y Condiciones</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs opacity-60">
          &copy; {currentYear} RestauranteApp. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
