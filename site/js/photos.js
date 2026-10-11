/*
  PORTFOLIO PHOTOS
  ----------------
  To add a photo:
  1. Run: tools/optimize-photo.sh "<path to photo>" <lowercase-name>
     (resizes it and removes GPS location data)
  2. Add a line below with the same name.

  category: interiors | lifestyle | property | drone
  w / h: the photo's width and height (any matching ratio works, e.g. 3 / 4).
  Only real photos taken by Justin. No AI-generated or AI-edited images.
*/
window.PHOTOS = [
  { file: 'oceanfront-hotel-pool-dusk', title: 'Oceanfront hotel at blue hour', category: 'drone', w: 16, h: 9,
    alt: 'Aerial view of an oceanfront hotel at dusk with a lit pool, palm trees and the beach behind' },
  { file: 'oceanfront-restaurant', title: 'Oceanfront restaurant', category: 'interiors', w: 9, h: 16,
    alt: 'Restaurant with tall windows looking out at crashing waves, gray chairs and a blue patterned rug' },
  { file: 'coastline-resort-aerial', title: 'The resort and the coast', category: 'drone', w: 16, h: 9,
    alt: 'Aerial view of a red-roofed beachfront resort along a long sandy coastline with a pier in the distance' },
  { file: 'island-beach-moment', title: 'Island afternoon', category: 'lifestyle', w: 3, h: 4,
    alt: 'Two people sitting on a white sand beach facing a tall limestone cliff and anchored boats' },
  { file: 'beachfront-palms-aerial', title: 'Palms over the beach', category: 'drone', w: 16, h: 9,
    alt: 'Two tall palm trees above a crowded beach with colorful umbrellas and red tile roofs' },
  { file: 'coastal-palms-dusk', title: 'Coastal palms at dusk', category: 'property', w: 3, h: 4,
    alt: 'Palm trees rising above red tile roofs with coastal cliffs and a pink dusk sky' },
  { file: 'blue-hour-rooftops', title: 'Rooftops at blue hour', category: 'drone', w: 16, h: 9,
    alt: 'Red tile hotel rooftops and a beach at dusk under a dramatic blue and pink sky' },
  { file: 'palm-silhouettes', title: 'Palm silhouettes', category: 'property', w: 3, h: 4,
    alt: 'Two palm trees silhouetted against a soft blue evening sky with a pink cloud' },
  { file: 'oceanfront-resort-aerial', title: 'Resort courtyard', category: 'property', w: 16, h: 9,
    alt: 'Aerial view of a terracotta-roof resort with a pool, palm trees and the beach behind' },
  { file: 'rocky-mountain-alpenglow', title: 'Mountains at first light', category: 'drone', w: 16, h: 9,
    alt: 'Aerial drone photo of snowy mountain peaks glowing pink at sunrise above pine forests' },
  { file: 'alpine-lake-aerial', title: 'Alpine lake', category: 'drone', w: 16, h: 9,
    alt: 'Aerial view of a deep blue alpine lake surrounded by rocky peaks and pine forest' },
  { file: 'mountain-lake-reflection', title: 'Still water', category: 'drone', w: 16, h: 9,
    alt: 'Mountain lake perfectly reflecting the forest and blue sky' },
];

/*
  A GUEST'S DAY
  -------------
  The pinned scroll story on the home page. Each step shows one photo.
*/
window.STORY = [
  { file: 'coastline-resort-aerial', time: 'Arrival', title: 'First <em>impressions</em>',
    text: 'Most guests meet your hotel on a screen. The first image has to make them stay.' },
  { file: 'oceanfront-restaurant', time: 'Midday', title: 'Lunch with a <em>view</em>',
    text: 'Restaurants and bars sell the stay. Real light, real moments.' },
  { file: 'oceanfront-resort-aerial', time: 'Afternoon', title: 'By the <em>pool</em>',
    text: 'The amenities guests book for, shown the way they’ll experience them.' },
  { file: 'beachfront-palms-aerial', time: 'Golden hour', title: 'The property at its <em>best</em>',
    text: 'Palms, rooftops and the coast, in the light that sells rooms.' },
  { file: 'blue-hour-rooftops', time: 'Evening', title: 'Stay a little <em>longer</em>',
    text: 'The last image is the one they remember when they book.' },
];

window.CATEGORIES = [
  { id: 'interiors', name: 'Interiors' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'property', name: 'Property' },
  { id: 'drone', name: 'Drone' },
];
