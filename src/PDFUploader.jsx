
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PDFUploader() {
  const [sourceFile, setSourceFile] = useState(null);
  const [destFiles, setDestFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [status, setStatus] = useState("");

  const handleSourceUpload = (e) => {
    setSourceFile(e.target.files[0]);
  };

  const handleDestUpload = (e) => {
    setDestFiles(Array.from(e.target.files).slice(0, 5));
  };

  const handleCheckboxChange = (fileName) => {
    setSelectedFiles(prev =>
      prev.includes(fileName)
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const handleTransfer = async () => {
    if (!sourceFile || selectedFiles.length === 0) {
      setStatus("Please upload and select files.");
      return;
    }

    const sourcePdf = await PDFDocument.load(await sourceFile.arrayBuffer());
    const sourceForm = sourcePdf.getForm();
    const sourceFields = sourceForm.getFields();
    const sourceData = {};

    sourceFields.forEach(field => {
      const name = field.getName();
      const value = field.getText ? field.getText() : '';
      sourceData[name] = value;
    });

    for (let file of destFiles) {
      if (!selectedFiles.includes(file.name)) continue;

      const destPdf = await PDFDocument.load(await file.arrayBuffer());
      const destForm = destPdf.getForm();
      const destFields = destForm.getFields();

      destFields.forEach(field => {
        const name = field.getName();
        if (sourceData[name]) {
          field.setText(sourceData[name]);
        }
      });

      const modifiedPdf = await destPdf.save();
      const blob = new Blob([modifiedPdf], { type: 'application/pdf' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `Updated_${file.name}`;
      a.click();
    }

    setStatus("Transfer complete!");
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>PDF Quick Copy</h2>
      <div>
        <label>Upload Source PDF:</label>
        <input type="file" accept="application/pdf" onChange={handleSourceUpload} />
      </div>
      <div>
        <label>Upload up to 5 Destination PDFs:</label>
        <input type="file" accept="application/pdf" multiple onChange={handleDestUpload} />
      </div>
      <div>
        <h4>Select destination PDFs to copy data into:</h4>
        {destFiles.map(file => (
          <div key={file.name}>
            <input
              type="checkbox"
              checked={selectedFiles.includes(file.name)}
              onChange={() => handleCheckboxChange(file.name)}
            />
            <label>{file.name}</label>
          </div>
        ))}
      </div>
      <button onClick={handleTransfer}>Transfer Data</button>
      <p>{status}</p>
    </div>
  );
}


