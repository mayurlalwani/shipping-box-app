import React, { useState, useContext } from "react";
import BoxContext from "../state/BoxContext";

// Rates can be supplied via environment variables (Vite):
// VITE_RATE_SWEDEN, VITE_RATE_CHINA, VITE_RATE_BRAZIL, VITE_RATE_AUSTRALIA
// Optionally per-country currency: VITE_CUR_SWEDEN etc. Defaults provided below.
const ENV = typeof import.meta !== "undefined" ? import.meta.env : {};

const COUNTRY_CONFIG = {
  Sweden: {
    rate: Number(ENV.VITE_RATE_SWEDEN) || 7.35,
    currency: ENV.VITE_CUR_SWEDEN || "INR",
  },
  China: {
    rate: Number(ENV.VITE_RATE_CHINA) || 11.53,
    currency: ENV.VITE_CUR_CHINA || "INR",
  },
  Brazil: {
    rate: Number(ENV.VITE_RATE_BRAZIL) || 15.63,
    currency: ENV.VITE_CUR_BRAZIL || "INR",
  },
  Australia: {
    rate: Number(ENV.VITE_RATE_AUSTRALIA) || 50.09,
    currency: ENV.VITE_CUR_AUSTRALIA || "INR",
  },
};

export default function BoxForm() {
  const { dispatch } = useContext(BoxContext);
  const [fields, setFields] = useState({
    receiver: "",
    weight: "",
    color: "#ffffff",
    country: "Sweden",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    // Allow empty or numbers with optional decimal
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setFields((prev) => ({ ...prev, weight: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!fields.receiver || fields.weight === "") {
      setError("Please fill all required fields before saving.");
      return;
    }

    const numericWeight = Number(fields.weight);
    if (isNaN(numericWeight)) {
      setError("Weight must be a valid number.");
      return;
    }

    if (numericWeight < 0) {
      // Set field to zero and show specific message; do not submit automatically
      setFields((prev) => ({ ...prev, weight: 0 }));
      setError(
        "Negative values are not permitted for weight — defaulted to 0."
      );
      return;
    }

    // Compute cost using country config (env-aware)
    const cfg = COUNTRY_CONFIG[fields.country] || { rate: 0, currency: "INR" };
    const cost = numericWeight * cfg.rate;

    setError("");
    dispatch({
      type: "ADD_BOX",
      payload: {
        receiver: fields.receiver,
        weight: numericWeight,
        color: fields.color,
        country: fields.country,
        cost,
        currency: cfg.currency,
      },
    });

    // reset fields
    setFields({
      receiver: "",
      weight: "",
      color: "#ffffff",
      country: "Sweden",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid" noValidate>
      <label>
        Receiver Name:
        <input
          name="receiver"
          type="text"
          value={fields.receiver}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Weight (kg):
        <input
          name="weight"
          type="number"
          min={0}
          value={fields.weight}
          onChange={handleNumberChange}
          required
        />
      </label>
      <label>
        Box Colour:
        <input
          name="color"
          type="color"
          value={fields.color}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <select name="country" value={fields.country} onChange={handleChange}>
          <option value="Sweden">Sweden ({COUNTRY_CONFIG.Sweden.rate})</option>
          <option value="China">China ({COUNTRY_CONFIG.China.rate})</option>
          <option value="Brazil">Brazil ({COUNTRY_CONFIG.Brazil.rate})</option>
          <option value="Australia">
            Australia ({COUNTRY_CONFIG.Australia.rate})
          </option>
        </select>
      </label>
      {error && (
        <div role="alert" style={{ color: "#ff6b6b", gridColumn: "1 / -1" }}>
          {error}
        </div>
      )}
      <div className="form-actions">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
