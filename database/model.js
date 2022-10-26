import db from "./db.js";

const get_all_products = db.prepare(/*sql */ `
    SELECT * from products
`);

export function getProducts() {
  return get_all_products.all();
}

const get_products_by_category = db.prepare(
  /*sql*/
  `SELECT id, name ,src, price
  FROM products
  WHERE category = ?`
);

export function getProductsByCategory(category) {
  return get_products_by_category.all(category);
}
