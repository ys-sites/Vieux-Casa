import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, GlassWater, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface ReservationFormProps {
  lang: 'fr' | 'en';
}

export default function ReservationForm({ lang }: ReservationFormProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const raw = new FormData(form);
    const body: Record<string, string> = {};
    raw.forEach((v, k) => { body[k] = v as string; });

    try {
      const res = await fetch('https://formsubmit.co/ajax/cloud@ysdev.ca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(body),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok && json.success !== 'false') {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-sand/80 backdrop-blur-md p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-mediterranean/5 max-w-2xl mx-auto text-center">
        <CheckCircle size={56} className="text-gold mx-auto mb-6" />
        <h3 className="font-serif text-3xl text-mediterranean mb-3">
          {lang === 'fr' ? 'Demande envoyée !' : 'Request Sent!'}
        </h3>
        <p className="text-mediterranean/60 mb-8">
          {lang === 'fr'
            ? 'Nous vous contacterons très prochainement pour confirmer votre réservation.'
            : "We'll be in touch shortly to confirm your reservation."}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="py-3 px-8 rounded-xl font-bold tracking-widest uppercase bg-gold text-mediterranean hover:bg-gold-light transition-all"
        >
          {lang === 'fr' ? 'Nouvelle demande' : 'New Request'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-sand/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-mediterranean/5 max-w-2xl mx-auto text-center relative z-10">

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-left">
          <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 text-sm font-semibold">
              {lang === 'fr' ? 'Erreur d\'envoi' : 'Submission failed'}
            </p>
            <p className="text-red-600 text-sm mt-1">
              {lang === 'fr'
                ? 'Appelez-nous directement : '
                : 'Please call us directly: '}
              <a href="tel:+14503943333" className="font-bold underline">+1 (450) 394-3333</a>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="_subject" value="New Event Reservation Inquiry" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="language" value={lang} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <User size={14} />
              {lang === 'fr' ? 'Nom complet' : 'Full Name'}
            </label>
            <input
              type="text" required name="name"
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow placeholder:text-mediterranean/30"
              placeholder={lang === 'fr' ? 'Jean-Paul' : 'John Doe'}
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <Phone size={14} />
              {lang === 'fr' ? 'Téléphone' : 'Phone Number'}
            </label>
            <input
              type="tel" required name="phone"
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow placeholder:text-mediterranean/30"
              placeholder="(514) 123-4567"
            />
          </div>

          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <Mail size={14} />
              {lang === 'fr' ? 'Courriel' : 'Email Address'}
            </label>
            <input
              type="email" required name="email"
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow placeholder:text-mediterranean/30"
              placeholder={lang === 'fr' ? 'jean@exemple.com' : 'john@example.com'}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <Calendar size={14} />
              {lang === 'fr' ? 'Date' : 'Date'}
            </label>
            <input
              type="date" required min={minDate} name="date"
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow"
            />
            <p className="text-[10px] text-mediterranean/50 mt-1">
              {lang === 'fr' ? 'Réservations à partir de demain' : 'Reservations starting tomorrow'}
            </p>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <Clock size={14} />
              {lang === 'fr' ? 'Heure' : 'Time'}
            </label>
            <select
              required name="time" defaultValue=""
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow appearance-none"
            >
              <option value="" disabled>-- : --</option>
              {['11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
                '16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30'].map(t => {
                const [h, m] = t.split(':').map(Number);
                const suffix = h >= 12 ? 'PM' : 'AM';
                const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
                return <option key={t} value={t}>{`${t} (${h12}:${m === 0 ? '00' : m} ${suffix})`}</option>;
              })}
            </select>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <Users size={14} />
              {lang === 'fr' ? 'Invités' : 'Guests'}
            </label>
            <input
              type="number" required min={40} max={500} name="guests" defaultValue={40}
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow"
            />
            <p className="text-[10px] text-mediterranean/50 mt-1">
              {lang === 'fr' ? 'De 40 à 500 personnes' : 'From 40 to 500 people'}
            </p>
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <GlassWater size={14} />
              {lang === 'fr' ? "Type d'événement" : 'Event Type'}
            </label>
            <select
              required name="eventType" defaultValue=""
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow appearance-none"
            >
              <option value="" disabled>{lang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
              <option value="birthday">{lang === 'fr' ? 'Anniversaire' : 'Birthday'}</option>
              <option value="corporate">{lang === 'fr' ? 'Événement corporatif' : 'Corporate Event'}</option>
              <option value="wedding">{lang === 'fr' ? 'Mariage / Fiançailles' : 'Wedding / Engagement'}</option>
              <option value="other">{lang === 'fr' ? 'Autre' : 'Other'}</option>
            </select>
          </div>

          {/* Special Requests */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-mediterranean/60 flex items-center gap-2">
              <MessageSquare size={14} />
              {lang === 'fr' ? 'Demandes spéciales' : 'Special Requests'}
            </label>
            <textarea
              name="requests" rows={2}
              className="w-full bg-sand-dark border-none rounded-xl px-4 py-3 text-mediterranean focus:ring-2 focus:ring-gold transition-shadow placeholder:text-mediterranean/30 resize-none"
              placeholder={lang === 'fr' ? 'Décrivez votre événement, besoins particuliers…' : 'Describe your event, any special requirements…'}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 px-8 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 shadow-xl bg-gold text-mediterranean hover:bg-gold-light hover:-translate-y-1 hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-3"
        >
          {status === 'loading' ? (
            <>
              <Loader size={18} className="animate-spin" />
              {lang === 'fr' ? 'Envoi en cours…' : 'Sending…'}
            </>
          ) : (
            lang === 'fr' ? 'Envoyer la demande' : 'Send Inquiry'
          )}
        </button>
      </form>
    </div>
  );
}
