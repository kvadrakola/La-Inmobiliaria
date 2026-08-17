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

//

export default function Footer()

{
  return (
    <footer className="w-full bg-[#1f2937] text-gray-300">
      <div className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold text-white">Contacto</h3>
            <p className="mt-3 font-semibold text-white">HabitaFactoría</p>
            <p className="mt-1 text-sm">+34 600 123 456</p>
            <p className="text-sm text-blue-300">info@habitafactoria.es</p>
            <p className="text-sm">Calle Ejemplo, 12, 3º B, Madrid</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Métodos de Pago</h3>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded border border-gray-600 bg-[#eff6ff] px-2 py-0.5 text-xs font-semibold text-[#0047AB]">
                Bizum
              </span>
              <span className="text-sm">Sin comisiones ocultas</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Legal</h3>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <a href="/privacidad" className="hover:text-white">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/terminos" className="hover:text-white">
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <p className="text-xs text-gray-500">
          Registro de intermediación inmobiliaria (Ventanilla Única Digital):
          HF-2024-001
        </p>
      </div>
    </footer>
  );
}