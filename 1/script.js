const fs = require('fs');

// Ruta del archivo
const filePath = './input.txt';

// Leer el archivo
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }

  // Procesar el contenido del archivo
  const lines = data.trim().split("\n");

  const leftArray = [];
  const rightArray = [];

  lines.forEach(line => {
    // Dividir por espacios y filtrar valores vacíos
    const columns = line.split(" ").filter(value => value.trim() !== "");
    const left = Number(columns[0]); // Primera columna
    const right = Number(columns[1]); // Segunda columna
    leftArray.push(left);
    rightArray.push(right);
  });
  
  leftArray.sort((a, b) => b - a).reverse();
  rightArray.sort((a, b) => b - a).reverse();

 // console.log("Números de la izquierda:", leftArray);
 // console.log("Números de la derecha:", rightArray);

  var combinedSum = leftArray.reduce((acc, num, index) => {
    var difference = num - rightArray[index]; // Suma el elemento de array1 y array2 en el índice actual
    var absoluteDifference = difference < 0 ? -difference : difference;
    return acc + absoluteDifference;
  }, 0);
 // console.log("Suma combinada de las diferencias:", combinedSum);

  var counts = leftArray.reduce((acc, num) => {
    var count = rightArray.filter(item => item === num).length; // Contar ocurrencias de num en array2
    if (count > 0) {
      acc[num] = count; // Solo almacenar si hay ocurrencias
    };
    return acc;
  }, {});
  const keys = Object.keys(counts);
  const values = Object.values(counts);
  let finalSum = 0;
  for (let key of keys){
   // console.log(key);
   // console.log(counts[key]);
    finalSum += key*counts[key];
  } 
  console.log("Cuentas de cada número:", finalSum);
  
});




