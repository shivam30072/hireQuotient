import { useState, useEffect } from "react";
import "./App.css";
import { URL } from "./constants";
import DataTable from "./components/DataTable";

function App() {
  const [data, setData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const changePage = (page, prevOrNext = 0) => {
    const copyData = data.slice();

    if (prevOrNext === 0) {
      setPageNo((prev) => {
        setCurrentPageData(copyData.slice((page - 1) * 10, page * 10));
        prev = page;
        return prev;
      });
    } else if (prevOrNext === 1) {
      setPageNo((prev) => {
        const startIndex = prev * 10;
        const endIndex = startIndex + 10;
        setCurrentPageData(copyData.slice(startIndex, endIndex));
        prev++;
        return prev;
      });
    } else {
      setPageNo((prev) => {
        console.log(prev, "back");
        const endIndex = (prev - 1) * 10;
        const startIndex = endIndex - 10;
        setCurrentPageData(copyData.slice(startIndex, endIndex));
        prev--;
        return prev;
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let res = await fetch(URL);
        res = await res.json();

        setData(res);
        setCurrentPageData(res.slice(0, 10));
      } catch (error) {
        console.log("error occured", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <div style={{ background: "#ccc", minHeight: "100vh" }}>
      {!loading ? (
        <DataTable
          loading={loading}
          setData={setData}
          data={data}
          currentPageData={currentPageData}
          changePage={changePage}
          setCurrentPageData={setCurrentPageData}
          pageNo={pageNo}
        />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          loading...
        </div>
      )}
    </div>
  );
}

export default App;
