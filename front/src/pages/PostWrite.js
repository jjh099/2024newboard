import React, { useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";

const continents = [
  { key: 1, value: "seoul" },
  { key: 2, value: "busan" },
  { key: 3, value: "gangwon" },
  { key: 4, value: "suwon" },
  { key: 5, value: "daegu" },
];

function PostWrite() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    continents: 1,
    images: [],
  });

  const navigate = useNavigate();

  function handelChange(e) {
    const { name, value } = e.target;
    console.log(value, name);
    // product 값이 출력
    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
        // -> input의 name이 출력
      };
    });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    // alert("입력");
    const body = {
      ...product,
    };
    try {
      await axiosInstance.post("/products", body);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <h2>자료입력</h2>
      {product.title} / {product.description}
      <form onSubmit={handelSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-3">
            제목
          </label>
          <input
            type="text"
            id="title" // = htmlfor
            name="title"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-3">
            설명
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.description}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-3">
            가격
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.price}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="continents" className="block mb-3">
            지역
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md"
            name="continents"
            id="continents"
            onChange={handelChange}
            value={product.continents}
          >
            {continents.map((item) => {
              return (
                <option value={item.key} key={item.key}>
                  {item.value}
                </option>
                // key={item.key} 오류 안나기 위해서 넣은 것
              );
            })}
            {/* <option value="1">서울</option>
            <option value="2">부산</option> */}
          </select>
        </div>
        <div>
          <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            글 작성 완료
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostWrite;
