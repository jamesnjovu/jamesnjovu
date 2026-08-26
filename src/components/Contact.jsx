import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import Section from './Section';
import { profile } from '../content';

const MAILER_ENDPOINT = 'https://mailer.sms.probasegroup.com/api/send/email';

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(MAILER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'html',
          to: profile.email,
          subject: `Portfolio contact: ${form.subject}`,
          // Values are escaped: this string is rendered as HTML in the inbox.
          html: `
            <h1>New message from the portfolio site</h1>
            <p><strong>Name:</strong> ${escapeHtml(form.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(form.email)}</p>
            <p><strong>Subject:</strong> ${escapeHtml(form.subject)}</p>
            <p><strong>Message:</strong><br>${escapeHtml(form.message).replace(/\n/g, '<br>')}</p>
          `,
          sender: form.name,
        }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      setStatus('success');
      setFeedback("Thanks — your message is on its way. I'll reply soon.");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setFeedback(
        `That didn't send. Please email me directly at ${profile.email} and I'll pick it up there.`
      );
    }
  };

  const sending = status === 'sending';

  const details = [
    { icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: FaPhoneAlt, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: profile.location },
  ];

  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch">
      <p className="reveal max-w-prose text-ink-muted">
        Open to senior engineering roles, consulting on Elixir/Phoenix systems, and collaboration on
        open source.
      </p>

      <ul className="reveal mt-8 space-y-3">
        {details.map((detail) => (
          <li key={detail.label} className="flex items-center gap-3 text-sm">
            <detail.icon size={13} className="text-ink-subtle" aria-hidden="true" />
            <span className="sr-only">{detail.label}:</span>
            {detail.href ? (
              <a href={detail.href} className="link-accent">
                {detail.value}
              </a>
            ) : (
              <span className="text-ink-muted">{detail.value}</span>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="reveal mt-10 space-y-4" noValidate={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="field"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="field-label">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            className="field"
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="field-label">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="field resize-y"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending && <FaSpinner className="animate-spin" size={13} aria-hidden="true" />}
            {sending ? 'Sending…' : 'Send message'}
          </button>

          {/* Status is announced to screen readers, and never colour-only. */}
          <p
            role="status"
            aria-live="polite"
            className={`flex items-start gap-2 text-sm ${
              status === 'error' ? 'text-[#d1343f]' : 'text-ink-muted'
            }`}
          >
            {status === 'success' && <FaCheckCircle className="mt-1 shrink-0" size={12} aria-hidden="true" />}
            {status === 'error' && <FaExclamationTriangle className="mt-1 shrink-0" size={12} aria-hidden="true" />}
            {feedback}
          </p>
        </div>
      </form>
    </Section>
  );
};

export default Contact;
