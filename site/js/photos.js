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
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'spa', name: 'Spa' },
  { id: 'property', name: 'Property' },
];

// Photos page
window.PHOTOS = [
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
  { file: 'oceanfront-resort-aerial', title: 'Resort courtyard', group: 'property', w: 16, h: 9,
    alt: 'Terracotta-roof resort with a pool, palm trees and the beach behind' },
  { file: 'coastal-palms-dusk', title: 'Palms at dusk', group: 'property', w: 3, h: 4,
    alt: 'Palm trees rising above red tile roofs with coastal cliffs and a pink dusk sky' },
  { file: 'island-beach-moment', title: 'Island afternoon', group: 'lifestyle', w: 3, h: 4,
    alt: 'Two people sitting on a white sand beach facing a tall limestone cliff and anchored boats' },
];

// Video page (first wide clip is shown large at the top)
window.VIDEOS = [
  { file: 'dolphins-aerial', w: 16, h: 9, title: 'Dolphins off the coast', tag: 'Drone', w: 16, h: 9 },
  { file: 'oceanfront-dining-clip', title: 'Oceanfront dining room', tag: 'Interior', w: 9, h: 16 },
  { file: 'pool-clip', title: 'By the pool', tag: 'Amenity', w: 9, h: 16 },
  { file: 'beachside-lunch-clip', title: 'Lunch with a view', tag: 'Dining', w: 9, h: 16 },
  { file: 'restaurant-ocean-view', title: 'Dining room walkthrough', tag: 'Interior', w: 9, h: 16 },
  { file: 'resort-grounds-aerial', w: 9, h: 16, title: 'Resort grounds', tag: 'Drone', w: 9, h: 16 },
  { file: 'palms-boardwalk-aerial', w: 9, h: 16, title: 'Palms and the boardwalk', tag: 'Drone', w: 9, h: 16 },
  { file: 'coast-at-dusk', title: 'The coast at dusk', tag: 'Property', w: 9, h: 16 },
  { file: 'beach-overhead', w: 9, h: 16, title: 'Beach from above', tag: 'Drone', w: 9, h: 16 },
];

// Drone page (grid): hotel and coast first, landscapes last
window.DRONE = [
  { type: 'video', file: 'resort-grounds-aerial', title: 'Resort grounds', text: 'Gardens, the lagoon and the coast, in one slow pass.' },
  { type: 'photo', file: 'coastline-resort-aerial', w: 16, h: 9, title: 'The resort and the coast', text: 'Shows guests exactly where you are: steps from the sand.' },
  { type: 'video', file: 'dolphins-aerial', title: 'Dolphins off the coast', text: 'The moments guests share after their stay.' },
  { type: 'video', file: 'palms-boardwalk-aerial', title: 'Palms and the boardwalk', text: 'The walk from the hotel to the water.' },
  { type: 'photo', file: 'island-resort-aerial', w: 9, h: 16, title: 'Island resort', text: 'Two bays, the town and the hills, in one frame.' },
  { type: 'video', file: 'beach-overhead', title: 'Beach from above', text: 'Straight down over the surf line.' },
  { type: 'photo', file: 'rocky-mountain-alpenglow', w: 16, h: 9, title: 'Mountains at first light', text: 'Mountain resorts and lodges look best at sunrise.' },
  { type: 'photo', file: 'alpine-lake-aerial', w: 16, h: 9, title: 'Alpine lake', text: 'Lakes, trails and the scenery around a property.' },
  { type: 'photo', file: 'mountain-lake-reflection', w: 16, h: 9, title: 'Still water', text: 'Calm mornings make the best aerials.' },
];

// Home page "See the work" tiles
window.HOME_TILES = [
  { label: 'Pools', href: 'photos.html?c=pools', file: 'hotel-pool-courtyard', alt: 'Hotel pool courtyard' },
  { label: 'Dining', href: 'photos.html?c=dining', file: 'arched-dining-room', alt: 'Arched dining room over the ocean' },
  { label: 'Video', href: 'video.html', video: { file: 'oceanfront-dining-clip' } },
  { label: 'Drone', href: 'drone.html', file: 'coastline-resort-aerial', alt: 'Resort and coastline from above' },
  { label: 'Lifestyle', href: 'photos.html?c=lifestyle', file: 'beach-chairs-umbrella', alt: 'Beach chairs under an umbrella' },
  { label: 'Spa', href: 'photos.html?c=spa', file: 'cedar-sauna', alt: 'Cedar sauna' },
];
