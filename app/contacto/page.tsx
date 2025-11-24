'use client'

import { useState } from 'react'
import Seccion from "../(componentes)/ui/Seccion";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    website: '' // honeypot
  })
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('ok')
      setForm({ name:'', company:'', email:'', phone:'', service:'', message:'', website:'' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <Seccion titulo="Contacto" subtitulo="NOTA: Agregar direccion,forma de contacto (mail telefono whatsapp), agregar industria (incluye otras), y volumen (1-100kg,100-1000kg,1000+kg)">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Info directa */}
        <div className="rounded-2xl p-6 ring-1 ring-foreground/10 space-y-3">
          <div>
            <div className="text-sm text-foreground/70">Email general</div>
            <div className="font-medium">contacto@recibasicos.com</div>
          </div>
          <div>
            <div className="text-sm text-zinc-600">Teléfono</div>
            <div className="font-medium">+52 (444) 829 2422</div>
          </div>
          <div className="pt-2">
            <Link href="/" className="underline underline-offset-4">Volver al Home</Link>
          </div>
        </div>

        {/* Formulario */}
        <div className="rounded-2xl p-6 ring-1 ring-foreground/10">
          <form onSubmit={onSubmit} className="grid gap-4">
            <input
              className="w-full border rounded-xl p-3"
              placeholder="Nombre completo"
              value={form.name}
              onChange={e=>setForm({...form, name: e.target.value})}
              required
            />
            <input
              className="w-full border rounded-xl p-3"
              placeholder="Empresa u organización (opcional)"
              value={form.company}
              onChange={e=>setForm({...form, company: e.target.value})}
            />
            <input
              className="w-full border rounded-xl p-3"
              placeholder="Correo electrónico"
              type="email"
              value={form.email}
              onChange={e=>setForm({...form, email: e.target.value})}
              required
            />
            <input
              className="w-full border rounded-xl p-3"
              placeholder="Teléfono (opcional)"
              value={form.phone}
              onChange={e=>setForm({...form, phone: e.target.value})}
            />
            <select
              className="w-full border rounded-xl p-3"
              value={form.service}
              onChange={e=>setForm({...form, service: e.target.value})}
            >
              <option value="">Seleccione un servicio</option>
              <option value="recibasicos">Solicita una recolección</option>
              <option value="ewr">Más información</option>
              <option value="other">Otro</option>
            </select>
            <textarea
              className="w-full border rounded-xl p-3 min-h-[140px]"
              placeholder="Mensaje o consulta"
              value={form.message}
              onChange={e=>setForm({...form, message: e.target.value})}
              required
            />

            {/* Honeypot */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              style={{ display: "none" }}
              tabIndex={-1}
              value={form.website}
              onChange={e=>setForm({...form, website: e.target.value})}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-5 py-3 rounded-xl border font-medium"
            >
              {status === 'sending' ? 'Enviando…' : 'Enviar'}
            </button>

            {status === 'ok' && <p className="text-green-600">¡Gracias! Te contactaremos pronto.</p>}
            {status === 'error' && <p className="text-red-600">Hubo un error. Intenta de nuevo.</p>}
          </form>
        </div>

        {/* Mapa */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden ring-1 ring-foreground/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3880.3237148335484!2d-100.88085848895486!3d22.0732802797664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842aa50060ad87ff%3A0xbaab4d0cea4484df!2sRecib%C3%A1sicos%20SA%20de%20CV!5e1!3m2!1sen!2smx!4v1764013510685!5m2!1sen!2smx"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Seccion>
  )
}
