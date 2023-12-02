import React, { useEffect, useMemo, useState } from "react";
import "../App.css";
import { Col, Container, Row } from "react-bootstrap";
import SingleRow from "./SingleRow";
import { URL } from "../constants";

const DataTable = ({
  pageNo,
  data = [],
  changePage,
  currentPageData = [],
  setData,
  setCurrentPageData,
}) => {
  const [search, setSearch] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const toatlPages = useMemo(() => Math.ceil(data.length / 10), [data]);

  const pagination = [];
  for (let i = 1; i <= toatlPages; i++) {
    pagination.push(i);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (search !== "") {
        handleSearch();
        setSearch("");
      }
    }
  };

  useEffect(() => {
    // should be using debouncing but api is not that heavy so I think its fine
    handleSearch();
  }, [search]);

  const handleSearch = async () => {
    try {
      let res = await fetch(URL);
      res = await res.json();

      res = res.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(search.toLowerCase())
        )
      );
      setData(res);
      setCurrentPageData(res.slice(0, 10));
    } catch (error) {
      console.log("error occured", error);
    }
  };

  const handleDelete = (id) => {
    setCurrentPageData(currentPageData.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    setEdit(!edit);
    setId(id);
  };

  const handleSaveEdit = (e, updatedFields) => {
    if (e.key === "Enter") {
      setCurrentPageData(
        currentPageData.map((item) => {
          if (item.id === updatedFields.id) {
            item.name = updatedFields.name;
            item.email = updatedFields.email;
            item.role = updatedFields.role;
          }
          return item;
        })
      );
      setEdit(false);
    }
  };

  const deleteSelectedRows = () => {
    setCurrentPageData(
      currentPageData.filter((item) => !selectedRows.includes(item.id))
    );
  };

  return (
    <div style={{ padding: "24px 0px" }}>
      <Container>
        <div>
          <span
            style={{ fontSize: "24px", fontWeight: 600, margin: "24px 0px" }}
          >
            Admin Dashboard
          </span>

          <div
            style={{
              margin: "24px 0px",
              display: "flex",
              gap: "4px",
              justifyContent: "space-between",
            }}
          >
            <input
              onKeyDown={handleKeyPress}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="inputStyles"
              type="text"
              placeholder="Search"
            />
            <button
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "none",
                background: "red",
              }}
              onClick={() => {
                setCurrentPageData([]);
                setData([]);
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  border: "none",
                  padding: "2px",
                  borderRadius: "4px",
                  color: "#fff",
                  background: "red",
                }}
                class="material-symbols-outlined"
              >
                delete
              </span>
            </button>
          </div>

          <div
            style={{
              background: "#bd8966",
              padding: "8px 12px",
              borderRadius: "6px",
            }}
          >
            <Row>
              <Col xs={3} md={3}>
                {" "}
                <input
                  value={allChecked}
                  onChange={() => {
                    setAllChecked(!allChecked);
                    const fullPage = currentPageData.map((item) => item.id);
                    setSelectedRows(fullPage);
                  }}
                  type="checkbox"
                  style={{ transform: "scale(1.3)" }}
                />
                <span style={{ fontWeight: 500, marginLeft: "8px" }}>
                  {" "}
                  Name
                </span>
              </Col>
              <Col xs={3} md={3}>
                {" "}
                <span style={{ fontWeight: 500 }}>Email</span>
              </Col>
              <Col xs={3} md={3}>
                <span style={{ fontWeight: 500 }}>Role</span>
              </Col>
              <Col xs={3} md={3}>
                <span style={{ fontWeight: 500 }}>Actions</span>
              </Col>
            </Row>
          </div>
          <Row
            style={{
              background: "#ccc",
              margin: "4px 0px",
              borderRadius: "4px",
            }}
          >
            {currentPageData.map((item) => (
              <SingleRow
                id={id}
                edit={edit}
                handleEdit={handleEdit}
                key={item.id}
                details={item}
                handleDelete={handleDelete}
                handleSaveEdit={handleSaveEdit}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                allChecked={allChecked}
              />
            ))}
          </Row>
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent:
              selectedRows.length > 0 ? "space-between" : "flex-end",
          }}
        >
          {selectedRows.length > 0 && data?.length > 0 && (
            <button
              style={{ padding: "2px 10px", borderRadius: "4px" }}
              onClick={deleteSelectedRows}
            >
              Delete Selected Rows
            </button>
          )}
          <div>
            {pageNo > 1 && (
              <button
                onClick={() => {
                  changePage(pageNo, -1);
                }}
                style={{
                  borderRadius: "4px",
                  padding: "2px 15px",
                  background: "#fff",
                  marginLeft: "4px",
                  border: "none",
                }}
              >
                {"<"}
              </button>
            )}
            {pagination.map((btn) => (
              <button
                key={btn}
                onClick={() => {
                  changePage(btn);
                }}
                style={{
                  borderRadius: "4px",
                  padding: "2px 15px",
                  background: "#fff",
                  marginLeft: "4px",
                  border: "none",
                }}
              >
                {btn}
              </button>
            ))}

            {pageNo < 5 && data.length > 0 && (
              <button
                onClick={() => {
                  changePage(pageNo, 1);
                }}
                style={{
                  borderRadius: "4px",
                  padding: "2px 15px",
                  background: "#fff",
                  marginLeft: "4px",
                  border: "none",
                }}
              >
                {">"}
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DataTable;
