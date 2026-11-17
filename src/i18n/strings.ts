import type { L } from '@/data/types'

/**
 * UI dictionary. Gujarati (gu) is the default language; English (en) is the
 * alternate. Add a key here and use it with t('key') — TypeScript will flag typos.
 */
export const strings = {
  // brand
  'brand.name': { gu: 'ભરતકુમાર એન્ડ સન્સ', en: 'Bharatkumar & Sons' },
  'brand.suffix': { gu: 'જ્વેલર્સ', en: 'Jewellers' },

  // common
  'common.home': { gu: 'હોમ', en: 'Home' },
  'common.menu': { gu: 'મેનુ', en: 'Menu' },
  'common.close': { gu: 'બંધ કરો', en: 'Close' },
  'common.search': { gu: 'શોધો', en: 'Search' },
  'common.bag': { gu: 'બેગ', en: 'Bag' },
  'common.wishlist': { gu: 'ઇચ્છા યાદી', en: 'Wishlist' },
  'common.viewAll': { gu: 'બધું જુઓ', en: 'View all' },
  'common.explore': { gu: 'જુઓ', en: 'Explore' },
  'common.designs': { gu: 'ડિઝાઇન', en: 'designs' },
  'common.prev': { gu: 'પાછળ', en: 'Previous' },
  'common.next': { gu: 'આગળ', en: 'Next' },

  // nav
  'nav.about': { gu: 'અમારા વિશે', en: 'About Us' },
  'nav.stores': { gu: 'સ્ટોર શોધો', en: 'Store Locator' },
  'nav.featured': { gu: 'ખાસ સંગ્રહ', en: 'Featured' },

  // language toggle
  'lang.label': { gu: 'ભાષા બદલો', en: 'Change language' },

  // search
  'search.placeholder': { gu: 'હાર, બંગડી, પાયલ શોધો…', en: 'Search necklaces, bangles, payal…' },
  'search.popular': { gu: 'લોકપ્રિય શોધ', en: 'Popular searches' },
  'search.title': { gu: 'શોધ પરિણામ', en: 'Search results' },
  'search.for': { gu: 'માટેનાં પરિણામ', en: 'Results for' },
  'search.none': { gu: 'કંઈ મળ્યું નહીં. બીજો શબ્દ અજમાવો.', en: 'Nothing found. Try another word.' },

  // rates
  'rates.title': { gu: 'આજનો ભાવ', en: "Today's Rate" },
  'rates.gold24': { gu: 'સોનું ૨૪ કે.', en: 'Gold 24K' },
  'rates.gold22': { gu: 'સોનું ૨૨ કે.', en: 'Gold 22K' },
  'rates.gold18': { gu: 'સોનું ૧૮ કે.', en: 'Gold 18K' },
  'rates.silver': { gu: 'ચાંદી', en: 'Silver' },
  'rates.perGram': { gu: '/ગ્રામ', en: '/g' },
  'rates.updated': { gu: 'અપડેટ', en: 'Updated' },

  // hero
  'hero.eyebrow': { gu: 'BIS હોલમાર્ક • શુદ્ધતાની ખાતરી', en: 'BIS Hallmarked • Purity Assured' },
  'hero.title1': { gu: 'પરંપરાની ચમક,', en: 'Heritage that shines,' },
  'hero.title2': { gu: 'દરેક પેઢી માટે', en: 'for every generation' },
  'hero.sub': {
    gu: 'હાથથી ઘડાયેલા સોના અને ચાંદીના આભૂષણો — લગ્ન, તહેવાર અને રોજિંદા દરેક પ્રસંગ માટે.',
    en: 'Handcrafted gold and silver jewellery for weddings, festivals and every day in between.',
  },
  'hero.cta1': { gu: 'દુલ્હન સંગ્રહ જુઓ', en: 'Explore Bridal' },
  'hero.cta2': { gu: 'સોનાના આભૂષણો', en: 'Shop Gold' },
  'hero.seal': { gu: 'હોલમાર્ક', en: 'Hallmark' },
  'hero.caption': { gu: 'કુંદન દુલ્હન સેટ', en: 'Kundan Bridal Set' },

  // home sections
  'home.cat.eyebrow': { gu: 'સંગ્રહ', en: 'Collections' },
  'home.cat.title': { gu: 'તમારી પસંદ પ્રમાણે ખરીદી કરો', en: 'Shop by collection' },
  'home.popular.eyebrow': { gu: 'શ્રેણીઓ', en: 'Categories' },
  'home.popular.title': { gu: 'લોકપ્રિય શ્રેણીઓ', en: 'Popular categories' },
  'home.bridal.eyebrow': { gu: 'દુલ્હન સંગ્રહ', en: 'The Bridal Edit' },
  'home.bridal.title': { gu: 'જીવનના સૌથી ખાસ દિવસ માટે', en: 'For the most special day of your life' },
  'home.bridal.body': {
    gu: 'મહેંદીથી ફેરા સુધી — દરેક વિધિ માટે ખાસ ઘડાયેલા હાર સેટ, ચૂડા અને માંગ ટીકા.',
    en: 'From mehndi to pheras — haar sets, choodas and maang tikkas crafted for every ritual.',
  },
  'home.bridal.cta': { gu: 'દુલ્હન સેટ જુઓ', en: 'View bridal sets' },
  'home.festive.eyebrow': { gu: 'તહેવારોની ઉજવણી', en: 'Festive Celebrations' },
  'home.festive.title': { gu: 'દરેક તહેવાર, એક નવી ચમક', en: 'Every festival, a new sparkle' },
  'home.best.eyebrow': { gu: 'સૌથી વધુ પસંદ', en: 'Most Loved' },
  'home.best.title': { gu: 'અમારા બેસ્ટસેલર', en: 'Our bestsellers' },
  'home.new.eyebrow': { gu: 'હમણાં જ આવ્યું', en: 'Just In' },
  'home.new.title': { gu: 'નવા આગમન', en: 'New arrivals' },
  'home.silver.eyebrow': { gu: 'ચાંદી', en: 'Silver' },
  'home.silver.title': { gu: 'રોજની ચમક, ચાંદીની સાથે', en: 'Everyday shine, in silver' },
  'home.silver.body': {
    gu: 'પાયલ, વીંછિયા, પૂજાની ચાંદી અને ભેટ — ૯૨.૫ સ્ટર્લિંગ શુદ્ધતામાં.',
    en: 'Payal, toe rings, pooja silver and gifts — in 92.5 sterling purity.',
  },
  'home.silver.cta': { gu: 'ચાંદીનો સંગ્રહ', en: 'Shop silver' },
  'home.heritage.eyebrow': { gu: 'અમારી વાર્તા', en: 'Our Story' },
  'home.heritage.title': { gu: 'વિશ્વાસની પરંપરા, પેઢી દર પેઢી', en: 'A legacy of trust, generation after generation' },
  'home.heritage.body': {
    gu: 'ભરતકુમાર એન્ડ સન્સમાં દરેક આભૂષણ શુદ્ધતા, ઝીણી કારીગરી અને પરિવારોના વિશ્વાસ સાથે ઘડાય છે. અમારા માટે દરેક ગ્રાહક પરિવારનો સભ્ય છે.',
    en: 'At Bharatkumar & Sons every piece is shaped by purity, fine craftsmanship and the trust of families. To us, every customer is family.',
  },
  'home.heritage.cta': { gu: 'અમારી વાર્તા વાંચો', en: 'Read our story' },
  // PLACEHOLDER stats — replace with real numbers
  'stat.years': { gu: 'વર્ષનો વારસો', en: 'Years of legacy' },
  'stat.families': { gu: 'ખુશ પરિવારો', en: 'Happy families' },
  'stat.designs': { gu: 'ડિઝાઇન', en: 'Designs' },

  // trust
  'trust.hallmark': { gu: 'BIS હોલમાર્ક સોનું', en: 'BIS Hallmarked Gold' },
  'trust.hallmark.d': { gu: 'દરેક આભૂષણ પર HUID', en: 'HUID on every piece' },
  'trust.exchange': { gu: 'આજીવન એક્સચેન્જ', en: 'Lifetime Exchange' },
  'trust.exchange.d': { gu: 'જૂના સોનાનો સાચો ભાવ', en: 'Fair value for old gold' },
  'trust.certified': { gu: 'પ્રમાણિત શુદ્ધતા', en: 'Certified Purity' },
  'trust.certified.d': { gu: 'કેરેટ મીટરથી ચકાસણી', en: 'Karat-meter tested' },
  'trust.care': { gu: 'મફત સફાઈ અને સંભાળ', en: 'Free Cleaning & Care' },
  'trust.care.d': { gu: 'દરેક સ્ટોર પર', en: 'At every store' },

  // visit
  'visit.eyebrow': { gu: 'સ્ટોર મુલાકાત', en: 'Visit Us' },
  'visit.title': { gu: 'સ્ટોર પર પધારો', en: 'Come, visit our showroom' },
  'visit.body': {
    gu: 'આભૂષણો જાતે પહેરીને જુઓ — અમારા નિષ્ણાતો તમારી મદદ માટે હંમેશા તૈયાર છે.',
    en: 'Try pieces in person — our experts are always happy to help.',
  },
  'visit.cta': { gu: 'નજીકનો સ્ટોર શોધો', en: 'Find a store' },

  // product
  'badge.new': { gu: 'નવું', en: 'New' },
  'badge.bestseller': { gu: 'બેસ્ટસેલર', en: 'Bestseller' },
  'badge.handcrafted': { gu: 'હસ્તકલા', en: 'Handcrafted' },
  'product.addToCart': { gu: 'બેગમાં ઉમેરો', en: 'Add to bag' },
  'product.added': { gu: 'બેગમાં ઉમેરાયું ✓', en: 'Added to bag ✓' },
  'product.wishlist': { gu: 'ઇચ્છા યાદીમાં ઉમેરો', en: 'Add to wishlist' },
  'product.wishlisted': { gu: 'ઇચ્છા યાદીમાં છે', en: 'In your wishlist' },
  'product.weight': { gu: 'વજન', en: 'Weight' },
  'product.purity': { gu: 'શુદ્ધતા', en: 'Purity' },
  'product.metal': { gu: 'ધાતુ', en: 'Metal' },
  'product.size': { gu: 'માપ પસંદ કરો', en: 'Select size' },
  'product.sizeShort': { gu: 'માપ', en: 'Size' },
  'product.sizeRequired': { gu: 'કૃપા કરીને માપ પસંદ કરો', en: 'Please select a size' },
  'product.sizeGuide': { gu: 'માપ માર્ગદર્શિકા', en: 'Size guide' },
  'product.priceBreakup': { gu: 'ભાવની વિગત', en: 'Price breakup' },
  'product.metalValue': { gu: 'ધાતુની કિંમત', en: 'Metal value' },
  'product.making': { gu: 'ઘડામણ', en: 'Making charges' },
  'product.stones': { gu: 'નંગ / કુંદન', en: 'Stones / Kundan' },
  'product.gst': { gu: 'GST (૩%)', en: 'GST (3%)' },
  'product.total': { gu: 'કુલ', en: 'Total' },
  'product.details': { gu: 'આભૂષણની વિગત', en: 'Product details' },
  'product.care': { gu: 'સંભાળ અને ખાતરી', en: 'Care & assurance' },
  'product.careText': {
    gu: 'પરફ્યુમ અને પાણીથી દૂર રાખો. નરમ કપડાથી સાફ કરો અને અલગ ડબ્બામાં રાખો. દરેક સ્ટોર પર મફત સફાઈ ઉપલબ્ધ છે.',
    en: 'Keep away from perfume and water. Wipe with a soft cloth and store separately. Free cleaning at every store.',
  },
  'product.related': { gu: 'તમને આ પણ ગમશે', en: 'You may also like' },
  'product.inclTax': { gu: 'બધા કર સહિત • આજના ભાવ મુજબ', en: "Incl. of all taxes • As per today's rate" },
  'product.tryStore': { gu: 'સ્ટોરમાં પહેરીને જુઓ', en: 'Try it at the store' },
  'product.code': { gu: 'ડિઝાઇન કોડ', en: 'Design code' },
  'product.reviews': { gu: 'સમીક્ષા', en: 'reviews' },
  'product.occasion': { gu: 'પ્રસંગ', en: 'Occasion' },
  'product.notFound': { gu: 'આ આભૂષણ ઉપલબ્ધ નથી', en: 'This design is not available' },
  'metal.gold': { gu: 'સોનું', en: 'Gold' },
  'metal.silver': { gu: 'ચાંદી', en: 'Silver' },

  // collection
  'col.filters': { gu: 'ફિલ્ટર', en: 'Filters' },
  'col.sort': { gu: 'ક્રમ', en: 'Sort by' },
  'sort.featured': { gu: 'ખાસ', en: 'Featured' },
  'sort.priceLow': { gu: 'કિંમત: ઓછીથી વધુ', en: 'Price: Low to High' },
  'sort.priceHigh': { gu: 'કિંમત: વધુથી ઓછી', en: 'Price: High to Low' },
  'sort.new': { gu: 'નવું પહેલાં', en: 'Newest first' },
  'filter.type': { gu: 'પ્રકાર', en: 'Type' },
  'filter.purity': { gu: 'શુદ્ધતા', en: 'Purity' },
  'filter.price': { gu: 'કિંમત', en: 'Price' },
  'filter.occasion': { gu: 'પ્રસંગ', en: 'Occasion' },
  'filter.clear': { gu: 'બધું સાફ કરો', en: 'Clear all' },
  'filter.show': { gu: 'પરિણામ જુઓ', en: 'Show results' },
  'col.loadMore': { gu: 'વધુ ડિઝાઇન જુઓ', en: 'Load more designs' },
  'col.showing': { gu: 'બતાવી રહ્યા છીએ', en: 'Showing' },
  'col.of': { gu: 'માંથી', en: 'of' },
  'col.empty': { gu: 'આ ફિલ્ટર માટે કોઈ ડિઝાઇન મળી નહીં.', en: 'No designs match these filters.' },
  'col.all': { gu: 'બધા', en: 'All' },
  'price.under': { gu: 'થી ઓછું', en: 'Under' },
  'price.above': { gu: 'થી વધુ', en: 'Above' },

  // cart
  'cart.title': { gu: 'તમારી બેગ', en: 'Your bag' },
  'cart.empty': { gu: 'તમારી બેગ ખાલી છે', en: 'Your bag is empty' },
  'cart.emptyBody': { gu: 'તમને ગમતા આભૂષણો ઉમેરો.', en: 'Add the pieces you love.' },
  'cart.start': { gu: 'ખરીદી શરૂ કરો', en: 'Start shopping' },
  'cart.subtotal': { gu: 'પેટા સરવાળો', en: 'Subtotal' },
  'cart.shipping': { gu: 'વીમા સાથે ડિલિવરી', en: 'Insured shipping' },
  'cart.free': { gu: 'મફત', en: 'Free' },
  'cart.total': { gu: 'કુલ રકમ', en: 'Total' },
  'cart.checkout': { gu: 'ચેકઆઉટ કરો', en: 'Proceed to checkout' },
  'cart.remove': { gu: 'કાઢી નાખો', en: 'Remove' },
  'cart.qty': { gu: 'જથ્થો', en: 'Qty' },
  'cart.items': { gu: 'આભૂષણ', en: 'items' },
  'cart.note': {
    gu: 'અંતિમ કિંમત બિલ સમયના સોના/ચાંદીના ભાવ પ્રમાણે રહેશે.',
    en: 'Final price is based on the metal rate at the time of billing.',
  },

  // checkout
  'co.title': { gu: 'ચેકઆઉટ', en: 'Checkout' },
  'co.contact': { gu: 'સંપર્ક વિગત', en: 'Contact details' },
  'co.address': { gu: 'ડિલિવરી સરનામું', en: 'Delivery address' },
  'co.name': { gu: 'પૂરું નામ', en: 'Full name' },
  'co.phone': { gu: 'મોબાઇલ નંબર', en: 'Mobile number' },
  'co.email': { gu: 'ઇમેઇલ (વૈકલ્પિક)', en: 'Email (optional)' },
  'co.line1': { gu: 'મકાન નં., શેરી, વિસ્તાર', en: 'House no., street, area' },
  'co.city': { gu: 'શહેર', en: 'City' },
  'co.state': { gu: 'રાજ્ય', en: 'State' },
  'co.pin': { gu: 'પિન કોડ', en: 'PIN code' },
  'co.payment': { gu: 'ચુકવણી', en: 'Payment' },
  'co.payStore': { gu: 'સ્ટોર પર / ડિલિવરી સમયે ચુકવણી', en: 'Pay at store / on delivery' },
  'co.payOnline': { gu: 'UPI / કાર્ડ / નેટ બેન્કિંગ', en: 'UPI / Card / Net banking' },
  'co.soon': { gu: 'ટૂંક સમયમાં', en: 'Coming soon' },
  'co.place': { gu: 'ઓર્ડર આપો', en: 'Place order' },
  'co.summary': { gu: 'ઓર્ડર સારાંશ', en: 'Order summary' },
  'co.success': { gu: 'આભાર! તમારો ઓર્ડર મળી ગયો છે.', en: 'Thank you! Your order request is received.' },
  'co.successBody': {
    gu: 'અમારી ટીમ ટૂંક સમયમાં તમારો સંપર્ક કરીને ઓર્ડરની ખાતરી કરશે.',
    en: 'Our team will call you shortly to confirm your order.',
  },
  'co.required': { gu: 'આ વિગત જરૂરી છે', en: 'This field is required' },
  'co.invalidPhone': { gu: '૧૦ અંકનો મોબાઇલ નંબર લખો', en: 'Enter a 10-digit mobile number' },
  'co.invalidPin': { gu: '૬ અંકનો પિન કોડ લખો', en: 'Enter a 6-digit PIN code' },

  // wishlist
  'wish.title': { gu: 'મારી ઇચ્છા યાદી', en: 'My wishlist' },
  'wish.empty': { gu: 'તમારી ઇચ્છા યાદી ખાલી છે', en: 'Your wishlist is empty' },
  'wish.emptyBody': { gu: '♡ પર ક્લિક કરીને આભૂષણ સાચવો.', en: 'Tap ♡ on any design to save it here.' },

  // stores
  'stores.title': { gu: 'અમારા સ્ટોર', en: 'Our Stores' },
  'stores.sub': {
    gu: 'અમારા શોરૂમમાં પધારો અને આભૂષણો જાતે પહેરીને જુઓ.',
    en: 'Visit our showrooms and try every piece in person.',
  },
  'stores.directions': { gu: 'રસ્તો જુઓ', en: 'Get directions' },
  'stores.call': { gu: 'કોલ કરો', en: 'Call' },

  // about
  'about.title': { gu: 'અમારી વાર્તા', en: 'Our Story' },
  'about.lead': {
    gu: 'એક નાની દુકાનથી શરૂ થયેલી સફર આજે હજારો પરિવારોના વિશ્વાસમાં ફેરવાઈ છે.',
    en: 'A journey that began in a small shop has grown into the trust of thousands of families.',
  },
  'about.p1': {
    gu: 'શ્રી ભરતકુમારજીએ એક સરળ સિદ્ધાંત સાથે શરૂઆત કરી — સાચું વજન, સાચી શુદ્ધતા અને સાચો ભાવ. આજે તેમના પુત્રો એ જ મૂલ્યો સાથે આ પરંપરાને આગળ વધારી રહ્યા છે.',
    en: 'Shri Bharatkumar began with a simple principle — honest weight, honest purity and an honest price. Today his sons carry the same values forward.',
  },
  'about.p2': {
    gu: 'અમારા કારીગરો પરંપરાગત કુંદન, મીનાકારી અને નકશી કામને આધુનિક ડિઝાઇન સાથે જોડે છે, જેથી દરેક આભૂષણ પેઢીઓ સુધી સાચવી શકાય.',
    en: 'Our karigars blend traditional kundan, meenakari and nakshi work with modern design, so every piece can be cherished for generations.',
  },
  'about.values': { gu: 'અમારા મૂલ્યો', en: 'Our values' },
  'about.v1': { gu: 'શુદ્ધતા', en: 'Purity' },
  'about.v1d': { gu: 'દરેક ગ્રામ હોલમાર્ક અને પ્રમાણિત.', en: 'Every gram hallmarked and certified.' },
  'about.v2': { gu: 'કારીગરી', en: 'Craft' },
  'about.v2d': { gu: 'અનુભવી કારીગરોના હાથે ઘડાયેલું.', en: 'Shaped by the hands of master karigars.' },
  'about.v3': { gu: 'પારદર્શિતા', en: 'Transparency' },
  'about.v3d': { gu: 'દરેક બિલમાં ભાવની સંપૂર્ણ વિગત.', en: 'A full price breakup on every bill.' },

  // footer
  'footer.about': {
    gu: 'હોલમાર્ક સોનું, સ્ટર્લિંગ ચાંદી અને દુલ્હન આભૂષણો — વિશ્વાસ સાથે.',
    en: 'Hallmarked gold, sterling silver and bridal jewellery — made with trust.',
  },
  'footer.shop': { gu: 'ખરીદી', en: 'Shop' },
  'footer.help': { gu: 'મદદ', en: 'Help' },
  'footer.company': { gu: 'કંપની', en: 'Company' },
  'footer.shipping': { gu: 'ડિલિવરી નીતિ', en: 'Shipping policy' },
  'footer.returns': { gu: 'પરત અને એક્સચેન્જ', en: 'Returns & exchange' },
  'footer.ringSize': { gu: 'વીંટીનું માપ', en: 'Ring size guide' },
  'footer.faq': { gu: 'વારંવાર પૂછાતા પ્રશ્નો', en: 'FAQs' },
  'footer.newsletter': { gu: 'નવા સંગ્રહની માહિતી સૌથી પહેલાં મેળવો', en: 'Be the first to see new collections' },
  'footer.emailPh': { gu: 'તમારો ઇમેઇલ', en: 'Your email' },
  'footer.subscribe': { gu: 'જોડાઓ', en: 'Subscribe' },
  'footer.subscribed': { gu: 'આભાર! તમે જોડાઈ ગયા છો.', en: 'Thank you for subscribing!' },
  'footer.rights': { gu: 'સર્વ હક્ક સુરક્ષિત.', en: 'All rights reserved.' },

  // 404
  'nf.title': { gu: 'આ પાનું મળ્યું નહીં', en: 'Page not found' },
  'nf.body': { gu: 'તમે શોધી રહ્યા છો તે પાનું ખસેડાયું હોઈ શકે છે.', en: 'The page you are looking for may have moved.' },
  'nf.cta': { gu: 'હોમ પેજ પર જાઓ', en: 'Back to home' },
} satisfies Record<string, L>

export type StringKey = keyof typeof strings
