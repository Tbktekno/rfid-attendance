const pdfmake = require("pdfmake");

const fonts = {
  Helvetica: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
    italics: "Helvetica-Oblique",
    bolditalics: "Helvetica-BoldOblique"
  }
};

pdfmake.setFonts(fonts);

const docDefinition = {
  content: ["Hello World"],
  defaultStyle: {
    font: "Helvetica"
  }
};

async function test() {
  try {
    const output = pdfmake.createPdf(docDefinition);
    const buffer = await output.getBuffer();
    console.log("Success! Buffer size:", buffer.length);
  } catch (err) {
    console.error("Failed:", err);
  }
}

test();
