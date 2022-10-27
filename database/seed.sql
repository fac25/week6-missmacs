BEGIN;

INSERT INTO products VALUES
  (1, 'Mushroom Mac and Cheese', 'img1.jpg',  8,'mains', 'Classic cheese sauce with mushroom', 'dairy, gluten'),
   (2, 'Chicken Strips', 'img2.jpg',  8,'starters', 'Juicy chicken strips', 'gluten'),
    (3, 'Sloppy Joe Mac and Cheese', 'img3.jpg',  10,'mains', 'Classic cheese sauce with beef ragu', 'dairy, gluten'),
  (4, 'Chocolate Brownie', 'img4.jpg',  5.50,'desserts', 'Gooey chocolate brownie', 'dairy, gluten'),
  (5, 'Cheesey Fries', 'img5.jpg',  5.50,'sides', 'Fries loaded with cheese sauce', 'dairy, gluten')
ON CONFLICT DO NOTHING;

COMMIT;