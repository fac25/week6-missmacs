import db from "./db.js";

const get_all_products = db.prepare(/*sql */ `
    SELECT * from products
`);

export function getProducts() {
  return get_all_products.all();
}

const get_product_by_id = db.prepare(/*sql */ `
    SELECT * from products WHERE id = ?
`);

export function getProductById(id) {
  return get_product_by_id.get(id);
}
