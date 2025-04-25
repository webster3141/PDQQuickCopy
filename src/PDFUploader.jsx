
import { useState } from "react";

export default function PDFUploader() {
  const [sourcePDF, setSourcePDF] = useState(null);
  const [destinationPDFs, setDestinationPDFs] = useState([null, null, null, null, null]);
  const [selectedPDFs, setSelectedPDFs] = useState([]);
  const [mismatchedFields, setMismatchedFields] = useState({});

  const handleFileInput = (e, index, isSource) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (isSource) {
        setSourcePDF(file);
      } else {
        const newPDFs = [...destinationPDFs];
        newPDFs[index] = file;
        setDestinationPDFs(newPDFs);
      }
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedPDFs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const compareFieldsAndHighlight = () => {
    // Simulate mismatched fields for demonstration
    const fakeMismatchData = {};
    selectedPDFs.forEach((i) => {
      fakeMismatchData[i] = ["Field A", "Field C"];
    });
    setMismatchedFields(fakeMismatchData);
    alert("Data transferred to selected PDFs (simulated)");
  };

  return (
    <div className="uploader" style={{ padding: "1rem" }}>
      <h2>PDF Quick Copy</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label><strong>Source PDF:</strong></label><br />
        <input type="file" accept="application/pdf" onChange={(e) => handleFileInput(e, null, true)} />
      </div>

      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <label><strong>Destination PDF {i + 1}:</strong></label><br />
          <input type="file" accept="application/pdf" onChange={(e) => handleFileInput(e, i, false)} />
          <label style={{ marginLeft: "0.5rem" }}>
            <input type="checkbox" checked={selectedPDFs.includes(i)} onChange={() => handleCheckboxChange(i)} />
            Use this file
          </label>
          {mismatchedFields[i] && (
            <div style={{ color: "red", marginTop: "0.25rem" }}>
              <em>Non-matching fields:</em> {mismatchedFields[i].join(", ")}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={compareFieldsAndHighlight}
        disabled={!sourcePDF || selectedPDFs.length === 0}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px"
        }}
      >
        Copy Data
      </button>
    </div>
  );
}
