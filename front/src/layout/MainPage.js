import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import CardItem from "../Compents/CardItem";

function MainPage() {
  const [products, setProducts] = useState([]);

  const limit = 4; // 4개만 보여줌
  const [skip, setSkip] = useState([]);
  const [hasMore, setHasMore] = useState(false); // 더보기 버튼

  // fetchProducts 초기값 먼저 실행
  //                    초기데이터는 {} 사용
  const fetchProducts = async ({ skip, limit, loadMore = false }) => {
    const params = {
      skip,
      limit,
    };
    try {
      const res = await axiosInstance.get("/products", { params });
      // await axiosInstance.get("/products?skip=0,limit=4",{params})
      console.log(res.data);

      if (loadMore) {
        setProducts([...products, ...res.data.products]); //loadMore가 true일때 복사해와서 뒤에 붙여라
      } else {
        setProducts(res.data.products);
      }
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.log(error);
    }
  };
  // fetchProducts 변화된 값 실행
  // function fetchProducts(){}

  useEffect(() => {
    fetchProducts({ skip, limit }); // 함수 실행
    // fetchProducts({skip:skip,limit:limit}) // 같으면 한번만 쓰면 됨
  }, []);

  function handelLoadMore() {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
    };
    fetchProducts(body);
    setSkip(Number(skip) + Number(limit));
  }

  return (
    <section>
      <h2>글 리스트</h2>

      {/* filter */}
      <div className="flex gap-3">
        <div className="w-1/2">checkbox</div>
        <div className="w-1/2">radio</div>
      </div>

      {/* search */}
      <div className="flex justify-end mb-3">search</div>

      {/* products */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-3">
        {products &&
          products.map((product) => {
            return <CardItem product={product} key={product._id} />;
          })}
      </div>

      {/* more */}

      {/* false이면 안 보임 */}
      {hasMore && (
        // true이면 안 보임
        <div className="flex justify-center ">
          <button
            onClick={handelLoadMore}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-400"
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
}

export default MainPage;
