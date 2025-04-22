
import { useState } from "react";

export default function PDFUploader() {
  const [sourcePDF, setSourcePDF] = useState(null);
  const [targetPDF, setTargetPDF] = useState(null);
  const [transferredPDF, setTransferredPDF] = useState(null);

  const handleFileInput = (e, isSource) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (isSource) setSourcePDF(file);
      else setTargetPDF(file);
    }
  };

  const transferData = () => {
    if (sourcePDF && targetPDF) {
      setTransferredPDF(targetPDF);
      alert("Data transferred successfully (simulated)");
    }
  };

  const previewFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">PDFQuickCopy</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border-2 border-dashed p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Upload Source PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileInput(e, true)}
          />
          {sourcePDF && (
            <div className="mt-4">
              <p className="text-sm font-medium truncate">{sourcePDF.name}</p>
              <button className="btn" onClick={() => previewFile(sourcePDF)}>
                Preview
              </button>
            </div>
          )}
        </div>

        <div className="border-2 border-dashed p-4 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Upload Target PDF</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileInput(e, false)}
          />
          {targetPDF && (
            <div className="mt-4">
              <p className="text-sm font-medium truncate">{targetPDF.name}</p>
              <button className="btn" onClick={() => previewFile(targetPDF)}>
                Preview
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          className="btn-primary"
          disabled={!sourcePDF || !targetPDF}
          onClick={transferData}
        >
          Copy Data
        </button>
      </div>

      {transferredPDF && (
        <div className="mt-6 border p-4 rounded-xl">
          <h2 className="text-lg font-semibold">Download Transferred PDF</h2>
          <button className="btn" onClick={() => previewFile(transferredPDF)}>
            Preview Final PDF
          </button>
        </div>
      )}
    </div>
  );
}
