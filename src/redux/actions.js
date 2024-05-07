export const setProducts = (products) => {
  return {
    type: "products",
    payload: products,
  };
};

export const setProdct = (product) => {
  console.log(product);
  return {
    type: "product",
    payload: product,
  };
};

export const sendproductid = (id) => {
  localStorage.setItem("id", id.toString());
  return {
    type: "productid",
    payload: id,
  };
};
