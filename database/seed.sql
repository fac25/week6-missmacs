BEGIN;

INSERT INTO products VALUES
  (1, 'Mac and Cheese', 'image.png',  7,'main', 'Garfields favourite', 'everyone', 'none'),
  (2, 'Chocolate cake', 'image2.png',  7,'dessert', 'Yassiens favourite', 'everyone', 'none')
ON CONFLICT DO NOTHING;

COMMIT;