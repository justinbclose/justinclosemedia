/*
  SITE CONTENT: every photo and video on the site is listed here.
  ---------------------------------------------------------------
  Add a photo:  tools/optimize-photo.sh "<path>" <lowercase-name>   then add a line to PHOTOS or DRONE
  Add a video:  tools/optimize-video.sh "<path>" <lowercase-name>   then add a line to VIDEOS or DRONE
  Both tools resize the file and remove GPS location data.

  Only real photos and video by Justin. No AI-generated or AI-edited images.
  w / h = width and height (any matching ratio works, e.g. 3 / 4).
*/

// Photos page filters
window.GROUPS = [
  { id: 'pools', name: 'Pools' },
  { id: 'dining', name: 'Dining' },
  { id: 'rooms', name: 'Rooms' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'property', name: 'Property' },
];

// Photos page
window.PHOTOS = [
  { file: 'oceanfront-hotel-pool-dusk', title: 'Pool at blue hour', group: 'pools', w: 16, h: 9,
    alt: 'Oceanfront hotel pool lit at dusk with palm trees and the beach behind' },
  { file: 'oceanfront-restaurant', title: 'Oceanfront dining room', group: 'dining', w: 9, h: 16,
    alt: 'Restaurant with tall windows looking out at crashing waves, gray chairs and a blue patterned rug' },
  { file: 'oceanfront-resort-aerial', title: 'Resort courtyard', group: 'property', w: 16, h: 9,
    alt: 'Terracotta-roof resort with a pool, palm trees and the beach behind' },
  { file: 'coastal-palms-dusk', title: 'Palms at dusk', group: 'property', w: 3, h: 4,
    alt: 'Palm trees rising above red tile roofs with coastal cliffs and a pink dusk sky' },
  { file: 'island-beach-moment', title: 'Island afternoon', group: 'lifestyle', w: 3, h: 4,
    alt: 'Two people sitting on a white sand beach facing a tall limestone cliff and anchored boats' },
];

// Video page
window.VIDEOS = [
  { file: 'restaurant-ocean-view', title: 'Oceanfront dining room', tag: 'Vertical', w: 9, h: 16 },
];

// Drone page: hotel and coast first, landscapes last
window.DRONE = [
  { type: 'photo', file: 'oceanfront-hotel-pool-dusk', title: 'Oceanfront hotel, blue hour', text: 'The pool deck, the beach and the coastline in one frame.' },
  { type: 'photo', file: 'coastline-resort-aerial', title: 'The resort and the coast', text: 'Shows guests exactly where you are: steps from the sand.' },
  { type: 'photo', file: 'beachfront-palms-aerial', title: 'Palms over the beach', text: 'A summer evening on the beach in front of the property.' },
  { type: 'photo', file: 'blue-hour-rooftops', title: 'Rooftops at blue hour', text: 'The property and the bay just after sunset.' },
  { type: 'photo', file: 'rocky-mountain-alpenglow', title: 'Mountains at first light', text: 'Mountain resorts and lodges look best at sunrise.' },
  { type: 'photo', file: 'alpine-lake-aerial', title: 'Alpine lake', text: 'Lakes, trails and the scenery around a property.' },
  { type: 'photo', file: 'mountain-lake-reflection', title: 'Still water', text: 'Calm mornings make the best aerials.' },
];

// Home page "See the work" tiles
window.HOME_TILES = [
  { label: 'Pools', href: 'photos.html?c=pools', file: 'oceanfront-hotel-pool-dusk', alt: 'Hotel pool at dusk' },
  { label: 'Dining', href: 'photos.html?c=dining', file: 'oceanfront-restaurant', alt: 'Oceanfront dining room' },
  { label: 'Video', href: 'video.html', video: { file: 'restaurant-ocean-view' } },
  { label: 'Drone', href: 'drone.html', file: 'coastline-resort-aerial', alt: 'Resort and coastline from above' },
  { label: 'Property', href: 'photos.html?c=property', file: 'oceanfront-resort-aerial', alt: 'Resort courtyard with pool' },
  { label: 'Lifestyle', href: 'photos.html?c=lifestyle', file: 'island-beach-moment', alt: 'Two people on a beach' },
];
