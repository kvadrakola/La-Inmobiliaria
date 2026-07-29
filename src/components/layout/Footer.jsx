/**
 * Footer — Site footer with Spanish real-estate compliance
 *
 * Required elements (per CLAUDE.md & RD 1312/2024):
 * - Bizum integration
 * - "Gastos Incluidos" labels
 * - License ID (RD 1312/2024)
 *
 * Atomic Design: Layout organism
 * Uses W3C Design Tokens via CSS variables: var(--footer-bg), var(--footer-text)
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: 'var(--footer-bg)',
        color: 'var(--footer-text)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">HabitaFactoría</h3>
            <p className="text-sm leading-relaxed">
              Agencia inmobiliaria especializada en alquiler de habitaciones para estudiantes.
              Profesionalidad, confianza y transparencia.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>📞 +34 600 123 456</li>
              <li>✉️ info@habitafactoria.es</li>
              <li>📍 Calle Ejemplo, 12, Madrid</li>
            </ul>
          </div>

          {/* Payment & Legal */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Pago</h3>
            <ul className="space-y-2 text-sm">
              {/* Bizum — standard Spanish mobile payment */}
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center rounded bg-blue-500 px-2 py-0.5 text-xs font-bold text-white">
                  Bizum
                </span>
                <span>Pago rápido y seguro</span>
              </li>
              {/* Gastos Incluidos — mandatory label */}
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                  Gastos Incluidos
                </span>
                <span>Sin comisiones ocultas</span>
              </li>
            </ul>
          </div>

          {/* Legal / License */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              {/* RD 1312/2024 — mandatory real-estate license ID */}
              <li>
                <span className="block text-xs opacity-70">Licencia Inmobiliaria</span>
                <span className="font-mono text-xs">RD 1312/2024 · Nº COL · HF-2024-001</span>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs opacity-60">
          &copy; {currentYear} HabitaFactoría. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}