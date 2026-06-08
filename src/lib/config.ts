export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '49DEINEHANDYNUMMER'
export const WA_MESSAGE = encodeURIComponent(
  'Hey Aldin, ich brauche Hilfe mit meinem Lebenslauf!'
)
export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`

export const SITE_NAME = 'Aldin B.'
export const SITE_TAGLINE = 'Bewerbungsservice'
export const SITE_DESCRIPTION =
  'Professionelle Lebenslaeufe und Bewerbungsanschreiben fuer Azubis, Studierende und Berufseinsteiger. 100% Erfolgsquote.'
