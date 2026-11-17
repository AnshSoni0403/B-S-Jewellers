import type { Store } from './types'
import { models } from './images'

/**
 * PLACEHOLDER store data — replace addresses, phone numbers and hours with
 * the real showroom details before going live.
 */
export const stores: Store[] = [
  {
    id: 'main',
    name: { gu: 'મુખ્ય શોરૂમ', en: 'Main Showroom' },
    address: { gu: 'માણેક ચોક, ઓલ્ડ સિટી', en: 'Manek Chowk, Old City' },
    city: { gu: 'અમદાવાદ, ગુજરાત ૩૮૦૦૦૧', en: 'Ahmedabad, Gujarat 380001' },
    phone: '+91 98765 43210',
    hours: { gu: 'સોમ – શનિ: સવારે ૧૦:૩૦ – રાત્રે ૮:૩૦', en: 'Mon – Sat: 10:30 AM – 8:30 PM' },
    mapQuery: 'Manek Chowk, Ahmedabad, Gujarat',
    image: models.navyBride2,
  },
  {
    id: 'branch',
    name: { gu: 'બ્રાઇડલ લાઉન્જ', en: 'Bridal Lounge' },
    address: { gu: 'સી.જી. રોડ, નવરંગપુરા', en: 'C.G. Road, Navrangpura' },
    city: { gu: 'અમદાવાદ, ગુજરાત ૩૮૦૦૦૯', en: 'Ahmedabad, Gujarat 380009' },
    phone: '+91 98765 43211',
    hours: { gu: 'દરરોજ: સવારે ૧૧:૦૦ – રાત્રે ૯:૦૦', en: 'Daily: 11:00 AM – 9:00 PM' },
    mapQuery: 'C.G. Road, Navrangpura, Ahmedabad',
    image: models.redLehenga,
  },
]
