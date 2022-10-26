BEGIN;

INSERT INTO products VALUES
  (1, 'Mac and Cheese', 'img1.jpg',  7,'main', 'Garfields favourite', 'everyone', 'none'),
  (2, 'Chocolate cake', 'img2.jpg',  7,'dessert', 'Yassiens favourite', 'everyone', 'none')
ON CONFLICT DO NOTHING;

COMMIT;