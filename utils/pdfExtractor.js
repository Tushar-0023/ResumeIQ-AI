const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractPDFText = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdfParse(dataBuffer);

    return data.text;
  } catch (error) {
    console.log("PDF Extraction Error:", error);
    return null;
  }
};

module.exports = extractPDFText;