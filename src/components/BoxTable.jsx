import React, { useContext } from "react";
import BoxContext from "../state/BoxContext";

function hexToRgb(hex) {
  let h = hex.replace("#", "");
  let bigint = parseInt(h, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

export default function BoxTable() {
  const { boxes } = useContext(BoxContext);

  if (!boxes.length) return <div>No boxes stored yet.</div>;

  return (
    <div className="table-responsive">
      <table className="box-table">
        <thead>
          <tr>
            <th>Receiver Name</th>
            <th>Weight (kg)</th>
            <th>Box Colour</th>
            <th>Destination</th>
            <th>Shipping Cost</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box, idx) => (
            <tr key={idx}>
              <td>{box.receiver}</td>
              <td>{box.weight}</td>
              <td>
                <span
                  style={{
                    display: "inline-block",
                    width: 30,
                    height: 20,
                    background: hexToRgb(box.color),
                    border: "1px solid rgba(0,0,0,0.3)",
                  }}
                ></span>
                <span style={{ marginLeft: 8 }}>{hexToRgb(box.color)}</span>
              </td>
              <td>{box.country}</td>
              <td>
                {box.cost !== undefined ? (
                  <>
                    {box.cost.toFixed(2)} {box.currency ? box.currency : "INR"}
                  </>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
