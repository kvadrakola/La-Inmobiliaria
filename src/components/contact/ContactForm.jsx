import React, { useState } from 'react';
import Button from '../ui/Button.jsx';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    motivo: '',
    tipologia: '',
    zona: '',
    presupuesto: '',
    superficie: '',
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    privacidad: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.motivo) newErrors.motivo = 'Selecciona un motivo';
    if (!formData.nombre.trim()) newErrors.nombre = 'Nombre obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'Email obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'Teléfono obligatorio';
    if (!formData.privacidad) newErrors.privacidad = 'Debes aceptar la política de privacidad';

    if (['comprar', 'alquilar'].includes(formData.motivo)) {
      if (!formData.presupuesto) newErrors.presupuesto = 'Presupuesto obligatorio';
    }
    if (formData.motivo === 'vender') {
      if (!formData.zona) newErrors.zona = 'Zona obligatoria';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Datos del formulario:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-2xl border p-8 text-center shadow-sm"
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          borderColor: 'var(--color-border)',
          boxShadow: 'var(--shadow-soft)',
        }}
      >
        <h2 className="mb-3 text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
          ¡Gracias por contactarnos!
        </h2>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
          Hemos recibido tu solicitud. Nos pondremos en contacto contigo en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border p-6 shadow-sm sm:p-8"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--shadow-soft-sm)',
      }}
    >
      <div>
        <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--color-text-body)' }}>
          Envíanos tu consulta
        </h2>

        <label className="mb-3 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
          ¿Qué necesitas?
        </label>
        <div className="grid gap-2 sm:grid-cols-2">
          {['comprar', 'vender', 'alquilar', 'tasacion', 'otro'].map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors"
              style={{
                borderColor: formData.motivo === option ? 'var(--color-primary)' : 'var(--color-border)',
                backgroundColor: formData.motivo === option ? '#eef4ff' : 'var(--color-bg-surface)',
                color: 'var(--color-text-body)',
              }}
            >
              <input
                type="radio"
                name="motivo"
                value={option}
                checked={formData.motivo === option}
                onChange={handleChange}
                className="accent-blue-600"
              />
              <span>
                {option === 'comprar' && 'Quiero comprar'}
                {option === 'vender' && 'Quiero vender'}
                {option === 'alquilar' && 'Quiero alquilar'}
                {option === 'tasacion' && 'Tasación gratuita'}
                {option === 'otro' && 'Otra consulta'}
              </span>
            </label>
          ))}
        </div>
        {errors.motivo && (
          <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
            {errors.motivo}
          </span>
        )}
      </div>

      {formData.motivo === 'comprar' && (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Presupuesto máximo (€)
            </label>
            <input
              type="number"
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleChange}
              placeholder="Ej: 300000"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{
                borderColor: errors.presupuesto ? '#fca5a5' : 'var(--color-border)',
                backgroundColor: '#fff',
                color: 'var(--color-text-body)',
              }}
            />
            {errors.presupuesto && (
              <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
                {errors.presupuesto}
              </span>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Zona deseada
            </label>
            <input
              type="text"
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              placeholder="Ej: Centro, Chamberí..."
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{ borderColor: 'var(--color-border)', backgroundColor: '#fff' }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Tipología
            </label>
            <select
              name="tipologia"
              value={formData.tipologia}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{ borderColor: 'var(--color-border)', backgroundColor: '#fff' }}
            >
              <option value="">Selecciona...</option>
              <option value="piso">Piso</option>
              <option value="casa">Casa/Chalet</option>
              <option value="atico">Ático</option>
              <option value="estudio">Estudio</option>
            </select>
          </div>
        </div>
      )}

      {formData.motivo === 'vender' && (
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Zona del inmueble
            </label>
            <input
              type="text"
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              placeholder="Ej: Salamanca, Retiro..."
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{
                borderColor: errors.zona ? '#fca5a5' : 'var(--color-border)',
                backgroundColor: '#fff',
              }}
            />
            {errors.zona && (
              <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
                {errors.zona}
              </span>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Superficie aproximada (m²)
            </label>
            <input
              type="number"
              name="superficie"
              value={formData.superficie}
              onChange={handleChange}
              placeholder="Ej: 90"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{ borderColor: 'var(--color-border)', backgroundColor: '#fff' }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Tipología
            </label>
            <select
              name="tipologia"
              value={formData.tipologia}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{ borderColor: 'var(--color-border)', backgroundColor: '#fff' }}
            >
              <option value="">Selecciona...</option>
              <option value="piso">Piso</option>
              <option value="casa">Casa/Chalet</option>
              <option value="atico">Ático</option>
              <option value="local">Local</option>
            </select>
          </div>
        </div>
      )}

      {formData.motivo === 'alquilar' && (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Alquiler máximo mensual (€)
            </label>
            <input
              type="number"
              name="presupuesto"
              value={formData.presupuesto}
              onChange={handleChange}
              placeholder="Ej: 1200"
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{
                borderColor: errors.presupuesto ? '#fca5a5' : 'var(--color-border)',
                backgroundColor: '#fff',
              }}
            />
            {errors.presupuesto && (
              <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
                {errors.presupuesto}
              </span>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
              Zona deseada
            </label>
            <input
              type="text"
              name="zona"
              value={formData.zona}
              onChange={handleChange}
              placeholder="Ej: Malasaña, Lavapiés..."
              className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              style={{ borderColor: 'var(--color-border)', backgroundColor: '#fff' }}
            />
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
            Nombre completo *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            style={{
              borderColor: errors.nombre ? '#fca5a5' : 'var(--color-border)',
              backgroundColor: '#fff',
            }}
          />
          {errors.nombre && (
            <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
              {errors.nombre}
            </span>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            style={{
              borderColor: errors.email ? '#fca5a5' : 'var(--color-border)',
              backgroundColor: '#fff',
            }}
          />
          {errors.email && (
            <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
              {errors.email}
            </span>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="600 123 456"
            className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            style={{
              borderColor: errors.telefono ? '#fca5a5' : 'var(--color-border)',
              backgroundColor: '#fff',
            }}
          />
          {errors.telefono && (
            <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
              {errors.telefono}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold" style={{ color: 'var(--color-text-body)' }}>
          Mensaje (opcional)
        </label>
        <textarea
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Cuéntanos más detalles..."
          rows="4"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          style={{ borderColor: 'var(--color-border)', backgroundColor: '#fff', resize: 'vertical' }}
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
          <input
            type="checkbox"
            name="privacidad"
            checked={formData.privacidad}
            onChange={handleChange}
            className="mt-1 accent-blue-600"
          />
          <span>He leído y acepto la política de privacidad *</span>
        </label>
        {errors.privacidad && (
          <span className="mt-2 block text-sm font-medium" style={{ color: '#dc2626' }}>
            {errors.privacidad}
          </span>
        )}
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full justify-center sm:w-auto">
          Enviar solicitud
        </Button>
      </div>
    </form>
  );
}