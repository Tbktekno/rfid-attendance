const pdfmake = require("pdfmake");
const path = require("node:path");
const fs = require("node:fs");

const fonts = {
  Roboto: {
    normal: path.resolve("src/assets/fonts/Roboto-Regular.ttf"),
    bold: path.resolve("src/assets/fonts/Roboto-Bold.ttf"),
  }
};

console.log("Paths:", fonts);
console.log("Regular exists:", fs.existsSync(fonts.Roboto.normal), "Size:", fs.statSync(fonts.Roboto.normal).size);
console.log("Bold exists:", fs.existsSync(fonts.Roboto.bold), "Size:", fs.statSync(fonts.Roboto.bold).size);

pdfmake.setFonts(fonts);
pdfmake.setLocalAccessPolicy(() => true);

const docDefinition = {
  content: ["Hello World"],
  defaultStyle: { font: "Roboto" }
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
