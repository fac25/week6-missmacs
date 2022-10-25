const get_all_products = db.prepare(/*sql */ `
    SELECT * from products
`);

export function getProducts() {
  return get_all_products.all();
}