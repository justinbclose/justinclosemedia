/*
  SITE CONTENT: every photo and video on the site is listed here.
  ---------------------------------------------------------------
  Add a photo:  tools/optimize-photo.sh "<path>" <lowercase-name>   then add a line to PHOTOS or DRONE
  Add a video:  tools/optimize-video.sh "<path>" <lowercase-name>   then add a line to VIDEOS or DRONE
  Both tools resize the file and remove GPS location data.

  Only real photos and video by Justin. No AI-generated or AI-edited images.
  w / h = width and height (any matching ratio works, e.g. 3 / 4).
*/

// Home page full-screen background. To use a video: run tools/optimize-video.sh, then set
// video: '<name>' (the photo shows until the video starts, and on slow connections).
window.HERO = { video: '' };

// Photos page filters
window.GROUPS = [
  { id: 'pools', name: 'Pools' },
  { id: 'dining', name: 'Dining' },
  { id: 'rooms', name: 'Rooms' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'spa', name: 'Spa' },
  { id: 'events', name: 'Events' },
  { id: 'property', name: 'Property' },
];

// Photos page
window.PHOTOS = [
  { file: 'poolside-tile-loungers', title: 'Poolside', group: 'pools', w: 3, h: 4,
    alt: 'Gray pool loungers with striped towels, white umbrellas, a blue tile wall and two cocktails by the pool' },
  { file: 'beachside-brunch-pour', title: 'Brunch by the beach', group: 'dining', w: 3, h: 4,
    alt: 'Syrup poured over pancakes beside a mimosa and a fruit bowl, with the beach and ocean behind' },
  { file: 'balcony-palm-view', title: 'Balcony view', group: 'rooms', w: 2, h: 3,
    alt: 'Private balcony with two coffee mugs on a small table, looking out at tall palms and the ocean' },
  { file: 'bedroom-shell-art', title: 'Guest room', group: 'rooms', w: 2, h: 3,
    alt: 'Guest room with crisp white bedding, a wooden headboard and two framed seashell paintings' },
  { file: 'corridor-ocean-view', title: 'Ocean through the corridor', group: 'property', w: 2, h: 3,
    alt: 'Covered walkway framing red tile roofs, a palm tree and the blue ocean' },
  { file: 'bathroom-vanity', title: 'Bathroom details', group: 'rooms', w: 2, h: 3,
    alt: 'Marble bathroom vanity with a hammered gold mirror, glasses and an ice bucket' },
  { file: 'balcony-coffee-mugs', title: 'Morning coffee', group: 'rooms', w: 2, h: 3,
    alt: 'Two white coffee mugs on a stone table on a terracotta-tiled balcony' },
  { file: 'rooftops-palm-ocean', title: 'Rooftops to the ocean', group: 'property', w: 2, h: 3,
    alt: 'Red tile hotel rooftops, a tall palm and white pool umbrellas with the blue ocean behind' },
  { file: 'pool-loungers-tile-roof', title: 'Pool loungers', group: 'pools', w: 2, h: 3,
    alt: 'Gray loungers under white umbrellas beside a turquoise pool, red tile roofs and arches behind' },
  { file: 'room-key-cards', title: 'Welcome', group: 'rooms', w: 2, h: 3,
    alt: 'Two hotel key cards with a palm tree logo on white bedding' },
  { file: 'covered-walkway', title: 'Covered walkway', group: 'property', w: 2, h: 3,
    alt: 'Sunlit covered walkway with wood beams, terracotta hex tiles and white stucco walls' },
  { file: 'terracotta-screen-tree', title: 'Architectural details', group: 'property', w: 2, h: 3,
    alt: 'White stucco wall with a terracotta lattice screen and red tile roof under tree branches and blue sky' },
  { file: 'room-balcony-view', title: 'Room with a view', group: 'rooms', w: 2, h: 3,
    alt: 'Guest room bed beside an open sliding door to a balcony with two mugs, palms and the coastline beyond' },
  { file: 'la-jolla-cove-kayaks', title: 'Steps from the beach', group: 'property', w: 2, h: 3,
    alt: 'Red tile roof and tall palms above a beach with colorful kayaks and the La Jolla coastline' },
  { file: 'beach-up-the-coast', title: 'Up the coast', group: 'property', w: 2, h: 3,
    alt: 'Busy beach and pier below a palm tree and red tile roof, with cliffs along the coast' },
  { file: 'room-number-door', title: 'Room details', group: 'rooms', w: 2, h: 3,
    alt: 'Green patina room numbers 129 on a white door frame next to a black iron handle' },
  { file: 'oceanfront-terrace', title: 'Oceanfront terrace', group: 'dining', w: 4, h: 3,
    alt: 'Hotel restaurant terrace with white umbrellas, set tables and the ocean beyond' },
  { file: 'marine-room-window', title: 'Window seat, oceanfront dining', group: 'dining', w: 3, h: 4,
    alt: 'Restaurant window seat with an orange velvet chair, a marble table and a tall plant in soft daylight' },
  { file: 'hotel-pool-courtyard', title: 'Pool courtyard', group: 'pools', w: 3, h: 4,
    alt: 'Hotel pool courtyard with white umbrellas and loungers, palm trees and the ocean behind' },
  { file: 'arched-dining-room', title: 'Arched dining room', group: 'dining', w: 3, h: 4,
    alt: 'Dining room with tall arched windows looking out over the ocean' },
  { file: 'beach-chairs-umbrella', title: 'Beach day', group: 'lifestyle', w: 3, h: 4,
    alt: 'Two blue beach chairs with striped towels under a blue and white umbrella on the sand, ocean behind' },
  { file: 'brunch-by-the-sea', title: 'Brunch by the sea', group: 'dining', w: 3, h: 4,
    alt: 'Mimosas, pancakes and a pastry plate on a white table with the beach behind' },
  { file: 'terrace-midday-shade', title: 'Terrace at midday', group: 'dining', w: 4, h: 3,
    alt: 'Sunlit restaurant terrace with pergola shadows, umbrellas and a sea view' },
  { file: 'tropical-cocktail', title: 'Beach bar cocktail', group: 'dining', w: 3, h: 4,
    alt: 'Tropical cocktail with an orchid and dried pineapple, a lifeguard tower behind' },
  { file: 'beachside-lunch', title: 'Lunch under the umbrellas', group: 'dining', w: 3, h: 4,
    alt: 'Lunch spread on a wooden table under an umbrella with striped beach cabanas beyond' },
  { file: 'golden-hour-margarita', title: 'Golden hour margarita', group: 'dining', w: 3, h: 4,
    alt: 'Margarita with a dried orange slice on a white chair arm in late sunlight' },
  { file: 'cedar-sauna', title: 'Cedar sauna', group: 'spa', w: 3, h: 4,
    alt: 'Cedar sauna with a large window looking out at green hills' },
  { file: 'oceanfront-restaurant', title: 'Oceanfront dining room', group: 'dining', w: 9, h: 16,
    alt: 'Restaurant with tall windows looking out at crashing waves' },
  { file: 'event-tables-overhead', title: 'Garden dinner from above', group: 'events', w: 16, h: 9,
    alt: 'Overhead drone view of a hotel garden dinner with white umbrellas, set tables and palm trees' },
  { file: 'lawn-event-sunset', title: 'Lawn party at sunset', group: 'events', w: 16, h: 9,
    alt: 'Hotel lawn event at sunset with umbrellas, tables, a lagoon fountain, palm trees and the ocean' },
  { file: 'coastal-palms-dusk', title: 'Palms at dusk', group: 'property', w: 3, h: 4,
    alt: 'Palm trees rising above red tile roofs with coastal cliffs and a pink dusk sky' },
  { file: 'island-beach-moment', title: 'Island afternoon', group: 'lifestyle', w: 3, h: 4,
    alt: 'Two people sitting on a white sand beach facing a tall limestone cliff and anchored boats' },
];

// Video page (first wide clip is shown large at the top)
window.VIDEOS = [
  { file: 'dolphins-aerial', title: 'Dolphins off the coast', tag: 'Drone', w: 16, h: 9 },
  { file: 'oceanfront-dining-clip', title: 'Oceanfront dining room', tag: 'Interior', w: 9, h: 16 },
  { file: 'pool-clip', title: 'By the pool', tag: 'Amenity', w: 9, h: 16 },
  { file: 'beachside-lunch-clip', title: 'Lunch with a view', tag: 'Dining', w: 9, h: 16 },
  { file: 'restaurant-ocean-view', title: 'Dining room walkthrough', tag: 'Interior', w: 9, h: 16 },
  { file: 'resort-grounds-aerial', title: 'Resort grounds', tag: 'Drone', w: 9, h: 16 },
  { file: 'surf-break-aerial', title: 'Surf break', tag: 'Drone', w: 9, h: 16, focus: '50% 12%' },
  { file: 'kayaks-sea-cliffs', title: 'Kayaks by the sea cliffs', tag: 'Drone', w: 9, h: 16 },
  { file: 'dolphin-pod-aerial', title: 'Dolphin pod', tag: 'Drone', w: 9, h: 16 },
  { file: 'beach-town-aerial', title: 'Beach town', tag: 'Drone', w: 9, h: 16 },
  { file: 'island-cliffs-clouds', title: 'Island cliffs', tag: 'Drone', w: 9, h: 16 },
  { file: 'palms-boardwalk-aerial', title: 'Palms and the boardwalk', tag: 'Drone', w: 9, h: 16 },
  { file: 'coast-at-dusk', title: 'The coast at dusk', tag: 'Property', w: 9, h: 16 },
  { file: 'beach-overhead', title: 'Beach from above', tag: 'Drone', w: 9, h: 16 },
];

// Drone page (grid): hotel and coast first, landscapes last
window.DRONE = [
  { type: 'video', file: 'resort-grounds-aerial', w: 9, h: 16, title: 'Resort grounds', text: 'Gardens, the lagoon and the coast, in one slow pass.' },
  { type: 'video', file: 'surf-break-aerial', w: 9, h: 16, focus: '50% 12%', title: 'Surf break', text: 'Surfers on a turquoise wave, seen from above.' },
  { type: 'photo', file: 'coastline-resort-aerial', w: 16, h: 9, title: 'The resort and the coast', text: 'Shows guests exactly where you are: steps from the sand.' },
  { type: 'photo', file: 'event-tables-overhead', w: 16, h: 9, title: 'Event from above', text: 'A garden dinner on the property, straight down from the drone.' },
  { type: 'photo', file: 'lawn-event-sunset', w: 16, h: 9, title: 'Lawn party at sunset', text: 'The event, the lagoon, the palms and the ocean in one frame.' },
  { type: 'video', file: 'dolphins-aerial', w: 16, h: 9, title: 'Dolphins off the coast', text: 'The moments guests share after their stay.' },
  { type: 'video', file: 'dolphin-pod-aerial', w: 9, h: 16, title: 'Dolphin pod', text: 'What guests see just offshore.' },
  { type: 'video', file: 'kayaks-sea-cliffs', w: 9, h: 16, title: 'Kayaks by the sea cliffs', text: 'The things to do around the property sell the stay too.' },
  { type: 'video', file: 'palms-boardwalk-aerial', w: 9, h: 16, title: 'Palms and the boardwalk', text: 'The walk from the hotel to the water.' },
  { type: 'video', file: 'beach-town-aerial', w: 9, h: 16, title: 'Beach town', text: 'The neighborhood guests explore between beach days.' },
  { type: 'photo', file: 'island-resort-aerial', w: 9, h: 16, title: 'Island resort', text: 'Two bays, the town and the hills, in one frame.' },
  { type: 'video', file: 'island-cliffs-clouds', w: 9, h: 16, title: 'Island cliffs', text: 'The scenery that makes a destination worth the trip.' },
  { type: 'video', file: 'beach-overhead', w: 9, h: 16, title: 'Beach from above', text: 'Straight down over the surf line.' },
  { type: 'photo', file: 'rocky-mountain-alpenglow', w: 16, h: 9, title: 'Mountains at first light', text: 'Mountain resorts and lodges look best at sunrise.' },
  { type: 'photo', file: 'alpine-lake-aerial', w: 16, h: 9, title: 'Alpine lake', text: 'Lakes, trails and the scenery around a property.' },
  { type: 'photo', file: 'mountain-lake-reflection', w: 16, h: 9, title: 'Still water', text: 'Calm mornings make the best aerials.' },
];

// Home page "See the work" tiles
window.HOME_TILES = [
  { label: 'Pools', href: 'photos.html?c=pools', file: 'poolside-tile-loungers', alt: 'Pool loungers with striped towels by a blue tile wall' },
  { label: 'Dining', href: 'photos.html?c=dining', file: 'beachside-brunch-pour', alt: 'Syrup poured over pancakes with a mimosa by the beach' },
  { label: 'Video', href: 'video.html', video: { file: 'oceanfront-dining-clip' } },
  { label: 'Drone', href: 'drone.html', file: 'coastline-resort-aerial', alt: 'Resort and coastline from above' },
  { label: 'Lifestyle', href: 'photos.html?c=lifestyle', file: 'beach-chairs-umbrella', alt: 'Beach chairs under an umbrella' },
];

// Square-crop framing: which part of each photo/clip the square tiles show
// ('50% 0%' = top, '50% 50%' = center, '50% 100%' = bottom). Unlisted = center.
window.FOCUS = {
  'poolside-tile-loungers': '50% 72%',
  'pool-loungers-tile-roof': '50% 78%',
  'hotel-pool-courtyard': '50% 55%',
  'beachside-brunch-pour': '50% 62%',
  'balcony-palm-view': '50% 85%',
  'balcony-coffee-mugs': '50% 72%',
  'bathroom-vanity': '50% 92%',
  'room-balcony-view': '50% 62%',
  'rooftops-palm-ocean': '50% 45%',
  'la-jolla-cove-kayaks': '50% 72%',
  'beach-up-the-coast': '50% 70%',
  'tropical-cocktail': '50% 75%',
  'golden-hour-margarita': '50% 62%',
  'beachside-lunch': '50% 72%',
  'brunch-by-the-sea': '50% 72%',
  'marine-room-window': '50% 88%',
  'oceanfront-restaurant': '50% 62%',
  'beach-chairs-umbrella': '50% 55%',
  'coastal-palms-dusk': '50% 45%',
  'kayaks-sea-cliffs': '50% 30%',
  'island-cliffs-clouds': '50% 40%',
  'resort-grounds-aerial': '50% 40%',
};
