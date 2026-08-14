function Header() {
return (
    <header className= 'bg-white'> 
    <nav className="mx-auto flex h-10 max-w-5xl items-center justify-between px-5">
        {/* Logo */}
        <a href="#" className="text-xs font-bold text-blue-700">
        HabitaFactoría
        </a>

        {/* Menú */}
        <ul className="flex items-center gap-6 text-[8px] font-semibold text-gray-800">
        <li>
            <a href="#inicio" className="hover:text-blue-700">
            Inicio
            </a>
        </li>

        <li>
            <a href="#propiedades" className="hover:text-blue-700">
            Propiedades
            </a>
        </li>

        <li>
            <a href="#sobre-nosotros" className="hover:text-blue-700">
            Sobre Nosotros
            </a>
        </li>

        <li>
            <a href="#contacto" className="hover:text-blue-700">
            Contacto
            </a>
        </li>
        </ul>
    </nav>
    </header>
);
}

export default Header;
