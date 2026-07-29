/**
 * Button — Reusable atomic button component
 *
 * Atomic Design: Atom
 * Variants: primary, outline, ghost
 * Uses W3C Design Tokens via CSS variables: var(--button-bg), var(--button-text), var(--button-radius)
 */
export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary:
      'text-white hover:opacity-90 focus:ring-blue-500',
    outline:
      'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500',
    ghost:
      'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const radiusStyle = { borderRadius: 'var(--button-radius, 8px)' };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      style={{
        ...(variant === 'primary' ? { backgroundColor: 'var(--button-bg)' } : {}),
        ...radiusStyle,
      }}
      {...props}
    >
      {children}
    </button>
  );
}