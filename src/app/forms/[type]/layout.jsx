import { redirect } from 'next/navigation';

const ALLOWED_PRONTO_FORM_TYPES = new Set(['vendor', 'influencer', 'sponsor', 'inquiry']);

export default async function ProntoFormLayout({ children, params }) {
  const { type } = await params;

  if (!ALLOWED_PRONTO_FORM_TYPES.has(type)) {
    redirect('/connect');
  }

  return children;
}
