import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../redux/actions";

export default function Products() {
  const prods = useSelector((state) => state);
  const { data } = prods;
  const [productss, setProductss] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState(true);
  const [page, setpage] = useState(0);
  const [itemsperpage, setitemsperpage] = useState(5);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
    };
    fetchdata();
    localStorage.clear();
  }, []);
  const handlesearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const filterProducts = (searchValue) => {
    console.log(search);
    if (searchValue === "") {
      return originalProducts;
    } else {
      return originalProducts.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  };
  useEffect(() => {
    setProductss(data);
    setOriginalProducts(data);
  }, [data]);
  useEffect(() => {
    if (flag) {
      setProductss(filterProducts(search));
      setFlag(false);
      setTimeout(() => {
        setFlag(true);
      }, 2000);
    }
  }, [search, flag]);
  const handlepagination = (page) => {
    setpage(page);
  };
  const handleleft = () => {
    setpage(page - 1);
  };
  const handleright = () => {
    setpage(page + 1);
  };
  const handleitemsperpage = (e) => {
    setitemsperpage(e.target.value);
  };
  return (
    <>
      <div className="input">
        <input
          value={search}
          type="text"
          placeholder="please type something to search"
          onChange={(e) => handlesearch(e)}
        ></input>
      </div>
      <div className="App">
        {productss &&
          productss
            .slice(page * itemsperpage, itemsperpage * (page + 1))
            .map((item) => <Card item={item} />)}
      </div>
      {productss && productss.length > 0 ? (
        <div className="pagination">
          {page === 0 ? null : (
            <button className="button-right" onClick={handleleft}>
              ⬅️
            </button>
          )}
          {Array(Math.ceil(productss.length / itemsperpage))
            .fill()
            .map((_, index) =>
              page === index ? (
                <button className="button active">{index + 1}</button>
              ) : (
                <button
                  className="button"
                  onClick={() => handlepagination(index)}
                >
                  {index + 1}
                </button>
              )
            )}
          {page === Math.ceil(productss.length / itemsperpage) - 1 ? null : (
            <button className="button-left" onClick={handleright}>
              ➡️
            </button>
          )}
          <div className="selectnoofpages">
            <select value={itemsperpage} onChange={handleitemsperpage}>
              <option value="5">5/page</option>
              <option value="10">10/page</option>
              <option value="15">15/page</option>
              <option value="20">20/page</option>
            </select>
          </div>
        </div>
      ) : null}
    </>
  );
}
