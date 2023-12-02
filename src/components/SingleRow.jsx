import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const SingleRow = ({
  details,
  handleDelete,
  handleEdit,
  edit,
  id,
  handleSaveEdit,
  setSelectedRows,
  selectedRows,
  allChecked,
}) => {
  const [fields, setFields] = useState({
    id: details?.id,
    name: details?.name,
    email: details?.email,
    role: details?.role,
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  return (
    <Col
      md={12}
      style={{
        background: checked || allChecked ? "red" : "#fff",
        marginBottom: "1px",
        padding: "10px 12px",
        borderRadius: "2px",
        color: checked || allChecked ? "#fff" : "",
      }}
    >
      <Row>
        <Col xs={3} md={3}>
          {" "}
          <input
            // checked={allChecked}
            value={checked}
            onChange={() => {
              setChecked(!checked);
              setSelectedRows([...selectedRows, details?.id]);
            }}
            type="checkbox"
            style={{ transform: "scale(1.2)" }}
          />
          {edit && id === details?.id ? (
            <input
              onKeyDown={(e) => handleSaveEdit(e, fields)}
              name="name"
              style={{ marginLeft: "8px", padding: "4px 8px" }}
              type="text"
              value={fields?.name}
              onChange={handleChange}
            />
          ) : (
            <span
              style={{
                marginLeft: "8px",
                fontSize: "clamp(0.75rem, 0.5938rem + 0.5vw, 0.875rem)",
              }}
            >
              {details?.name}
            </span>
          )}
        </Col>
        <Col xs={3} md={3}>
          {edit && id === details?.id ? (
            <input
              onKeyDown={(e) => handleSaveEdit(e, fields)}
              name="email"
              style={{ marginLeft: "8px", padding: "4px 8px" }}
              type="text"
              value={fields?.email}
              onChange={handleChange}
            />
          ) : (
            <span
              style={{
                wordWrap: "break-word",
                fontSize: "clamp(0.75rem, 0.5938rem + 0.5vw, 0.875rem)",
              }}
            >
              {details?.email}
            </span>
          )}
        </Col>
        <Col xs={3} md={3}>
          {edit && id === details?.id ? (
            <input
              onKeyDown={(e) => handleSaveEdit(e, fields)}
              name="role"
              style={{
                marginLeft: "8px",
                padding: "4px 8px",
                fontSize: "clamp(0.75rem, 0.5938rem + 0.5vw, 0.875rem)",
              }}
              type="text"
              value={fields?.role}
              onChange={handleChange}
            />
          ) : (
            <span style={{ marginLeft: "8px" }}>{details?.role}</span>
          )}
        </Col>
        <Col xs={3} md={3}>
          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "2px",
                borderRadius: "4px",
                color: checked || allChecked ? "#fff" : "blue",
              }}
              class="material-symbols-outlined"
              onClick={() => handleEdit(details.id)}
            >
              edit
            </span>
            {details?.id === id && edit && (
              <span>press enter to save updates</span>
            )}
            <span
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "2px",
                borderRadius: "4px",
                color: checked || allChecked ? "#fff" : "red",
              }}
              onClick={() => handleDelete(details?.id)}
              class="material-symbols-outlined"
            >
              delete
            </span>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default SingleRow;
