/*
  # Add BOTTLED GOURMET Category and Menu Items

  1. New Category
    - `bottled-gourmet` - BOTTLED GOURMET category for bottled gourmet products

  2. New Menu Items
    - Classic Tuyo 200g - Php 265
    - Sweet & Spicy Tuyo 200g - Php 265
    - Spicy Tuyo 200g - Php 265
    - Chicken Honey Flakes 200g - Php 295
    - Chicken Spicy Flakes 200g - Php 295
    - Bangus Tinapa In Lemon 200g - Php 295
    - Bangus Tinapa In Lemon Spicy 200g - Php 295
    - Chili Garlic Oil 200g - Php 220

  3. Features
    - Auto-generated UUIDs for all menu items
    - All items set to available by default
    - Category created with proper icon and sort order
*/

-- Insert the new category
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('bottled-gourmet', 'BOTTLED GOURMET', '🍶', 99, true)
ON CONFLICT (id) DO NOTHING;

-- Insert menu items (IDs will be auto-generated)
INSERT INTO menu_items (name, description, base_price, category, popular, available, image_url) VALUES
  (
    'Classic Tuyo 200g',
    'Traditional dried salted fish, perfectly preserved and ready to enjoy. A Filipino favorite that pairs well with rice, garlic, and eggs.',
    265.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  ),
  (
    'Sweet & Spicy Tuyo 200g',
    'Classic tuyo with a delightful sweet and spicy twist. A perfect balance of flavors that enhances any meal.',
    265.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  ),
  (
    'Spicy Tuyo 200g',
    'Traditional tuyo with an extra kick of heat. For those who love bold, spicy flavors.',
    265.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  ),
  (
    'Chicken Honey Flakes 200g',
    'Tender chicken flakes glazed with honey for a sweet and savory taste. Perfect as a topping or side dish.',
    295.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  ),
  (
    'Chicken Spicy Flakes 200g',
    'Flavorful chicken flakes with a spicy kick. Great for adding heat and protein to your meals.',
    295.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  ),
  (
    'Bangus Tinapa In Lemon 200g',
    'Smoked milkfish (bangus) preserved in lemon-infused oil. A tangy and savory delight that brings coastal flavors to your table.',
    295.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  ),
  (
    'Bangus Tinapa In Lemon Spicy 200g',
    'Smoked milkfish with lemon and a spicy twist. The perfect combination of tangy, smoky, and hot flavors.',
    295.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  ),
  (
    'Chili Garlic Oil 200g',
    'Aromatic chili garlic oil made with premium ingredients. Perfect for adding heat and flavor to noodles, rice, and other dishes.',
    220.00,
    'bottled-gourmet',
    false,
    true,
    NULL
  );

