const initial_state = {
  data: [],
  singleprod: {},
  id: parseInt(localStorage.getItem("id")) || null,
};
const reducer = (state = initial_state, action) => {
  switch (action.type) {
    case "products":
      return { ...state, data: action.payload };
    case "product":
      console.log(action.payload);
      return { ...state, singleprod: action.payload };
    case "productid":
      return { ...state, id: action.payload };
    default:
      return state;
  }
};
export default reducer;
