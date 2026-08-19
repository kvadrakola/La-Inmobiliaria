import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  university: '',
  moveInDate: '',
  stayDuration: '',
  budget: '',
  roomType: '',
  services: [],
  message: '',
  contactPreference: 'email',
  privacy: false,
};

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setSubmitted(false);
  }

  function toggleService(service) {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8" data-node-id="contact-form-001" data-node-type="contact-request" data-semantic-role="entity">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Nombre y apellidos *
          <input className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="name" value={form.name} onChange={updateField} required autoComplete="name" />
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Correo electrónico *
          <input className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" type="email" name="email" value={form.email} onChange={updateField} required autoComplete="email" />
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Teléfono o WhatsApp
          <input className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" type="tel" name="phone" value={form.phone} onChange={updateField} autoComplete="tel" />
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Universidad o centro de estudios
          <input className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="university" value={form.university} onChange={updateField} />
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Fecha prevista de entrada
          <input className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" type="date" name="moveInDate" value={form.moveInDate} onChange={updateField} />
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Duración de la estancia
          <select className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="stayDuration" value={form.stayDuration} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option value="semester">Un semestre</option>
            <option value="academic-year">Curso académico</option>
            <option value="long-term">Más de un año</option>
            <option value="flexible">Todavía no lo sé</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Presupuesto mensual aproximado
          <select className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="budget" value={form.budget} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option value="under-450">Hasta 450 €</option>
            <option value="450-600">450 € - 600 €</option>
            <option value="over-600">Más de 600 €</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-gray-800">
          Tipo de habitación preferida
          <select className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="roomType" value={form.roomType} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option value="private">Individual</option>
            <option value="private-bathroom">Individual con baño privado</option>
            <option value="shared-bathroom">Individual con baño compartido</option>
          </select>
        </label>
      </div>

      <label className="block space-y-2 text-sm font-medium text-gray-800">
        Cuéntanos qué necesitas
        <textarea className="block w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" name="message" value={form.message} onChange={updateField} rows="5" placeholder="Escribe aquí tu consulta..." />
      </label>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-gray-800">¿Cómo prefieres que te contactemos?</legend>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="contactPreference" value="email" checked={form.contactPreference === 'email'} onChange={updateField} /> Email</label>
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="contactPreference" value="phone" checked={form.contactPreference === 'phone'} onChange={updateField} /> Teléfono</label>
          <label className="flex items-center gap-2 text-sm text-gray-700"><input type="radio" name="contactPreference" value="whatsapp" checked={form.contactPreference === 'whatsapp'} onChange={updateField} /> WhatsApp</label>
        </div>
      </fieldset>

      <label className="flex items-start gap-2 text-sm text-gray-700">
        <input type="checkbox" name="privacy" checked={form.privacy} onChange={updateField} required />
        He leído y acepto la política de privacidad *
      </label>

      <button className="w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 sm:w-auto" type="submit">Enviar consulta</button>
      {submitted && <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800" role="status">Gracias. Hemos recibido tu consulta y te responderemos pronto.</p>}
    </form>
  );
}