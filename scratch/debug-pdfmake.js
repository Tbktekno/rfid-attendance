const pdfmake = require("pdfmake");
console.log("pdfmake type:", typeof pdfmake);
console.log("pdfmake keys:", Object.keys(pdfmake));
console.log("pdfmake directly:", pdfmake.toString().slice(0, 100));
