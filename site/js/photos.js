/*
  PORTFOLIO PHOTOS
  ----------------
  To add a photo:
  1. Run: tools/optimize-photo.sh "<path to photo>" <lowercase-name>
  2. Add a line below with the same name.

  category: interiors | lifestyle | property | drone
  featured: true shows it in the "Selected work" strip on the home page.
  w / h: the photo's width and height (any matching ratio works, e.g. 3 / 4).
*/
window.PHOTOS = [
  { file: 'oceanfront-suite-sunset', title: 'Oceanfront suite at sunset', category: 'interiors', w: 3, h: 4, featured: true,
    alt: 'Hotel suite with a soft white bed facing tall windows over the ocean at sunset' },
  { file: 'bartender-cocktail-pour', title: 'The bar, evening service', category: 'lifestyle', w: 3, h: 4, featured: true,
    alt: 'Bartender pouring a cocktail at a dark wood hotel bar with a charcuterie board in front' },
  { file: 'oceanfront-resort-aerial', title: 'Oceanfront resort from above', category: 'drone', w: 16, h: 9, featured: true,
    alt: 'Aerial view of a terracotta-roof resort with a pool, palm trees and the beach behind' },
  { file: 'cedar-sauna-view', title: 'Cedar sauna with a view', category: 'interiors', w: 4, h: 3, featured: true,
    alt: 'Cedar sauna with a large window looking out at green hills and a lake' },
  { file: 'beachside-brunch-pour', title: 'Beachside brunch', category: 'lifestyle', w: 1314, h: 1197, featured: true,
    alt: 'Syrup being poured over pancakes next to a mimosa on a table above the beach' },
  { file: 'beachfront-overlook', title: 'Beachfront overlook', category: 'property', w: 1060, h: 1484, featured: true,
    alt: 'Tall palm trees above a busy beach with colorful umbrellas and a red tile roof below' },
  { file: 'oceanview-dining-table', title: 'Lunch with an ocean view', category: 'interiors', w: 3, h: 4,
    alt: 'Two plated dishes and a lemonade on a marble table beside a window overlooking the beach' },
  { file: 'poolside-cocktails', title: 'Poolside cocktails', category: 'lifestyle', w: 3, h: 4,
    alt: 'Two tropical cocktails garnished with an orchid and dried pineapple against a blue sky' },
  { file: 'coastal-palms-dusk', title: 'Coastal palms at dusk', category: 'property', w: 3, h: 4,
    alt: 'Palm trees rising above red tile roofs with coastal cliffs and a pink dusk sky' },
  { file: 'island-beach-moment', title: 'Island afternoon', category: 'lifestyle', w: 3, h: 4,
    alt: 'Two people sitting on a white sand beach facing a tall limestone cliff and anchored boats' },
  { file: 'palm-silhouettes', title: 'Palm silhouettes', category: 'property', w: 3, h: 4,
    alt: 'Two palm trees silhouetted against a soft blue evening sky with a pink cloud' },
];

window.CATEGORIES = [
  { id: 'interiors', name: 'Interiors' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'property', name: 'Property' },
  { id: 'drone', name: 'Drone' },
];
