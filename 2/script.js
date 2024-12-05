const fs = require('fs');
const path = require('path');

// Ruta del archivo .txt
const filePath = path.join(__dirname, 'input.txt');

// Función para verificar si un array de números está en orden descendente
const isSorted = (numbers) => {
    let isAscending = true;
    let isDescending = true;

    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] < numbers[i + 1]) {
            isDescending = false;
        } else if (numbers[i] > numbers[i + 1]) {
            isAscending = false;
        }
    }

    return isAscending || isDescending;
};

// Función para verificar que los números sean únicos
const hasUniqueNumbers = (numbers) => {
    const uniqueNumbers = new Set(numbers);
    return uniqueNumbers.size === numbers.length;
};

// Función para verificar que las diferencias entre números estén entre 1 y 3
const hasValidDifferences = (numbers) => {
    for (let i = 0; i < numbers.length - 1; i++) {
        const difference = Math.abs(numbers[i] - numbers[i + 1]);
        if (difference < 1 || difference > 3) {
            return false;
        }
    }
    return true;
};

// Leer el archivo y procesar las líneas
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err.message);
        return;
    }

    let countReports = 0;  // Contador de líneas que cumplen las condiciones
    let noCountReports = 0; // Contador de líneas que no cumplen las condiciones
    const lines = data.trim().split('\n'); // Dividir el contenido en líneas

    lines.forEach((line, index) => {
        // Extraer números de la línea actual
        const numbers = line
            .trim()
            .split(/\s+/) // Divide por espacios
            .map(Number) // Convierte a números
            .filter((num) => !isNaN(num)); // Filtra valores no numéricos

        if (numbers.length > 0) {
            const isSort = isSorted(numbers);
            const unique = hasUniqueNumbers(numbers);
            const validDiff = hasValidDifferences(numbers);

            if (isSort && unique && validDiff) {
                countReports += 1;
                console.log(`Línea ${index + 1}: Cumple las condiciones.`);
            } else {
                noCountReports += 1;
                console.log(`Línea ${index + 1}: No cumple las condiciones.`);
            }
        } else {
            console.log(`Línea ${index + 1}: No contiene números.`);
        }
    });

    console.log(`Total de líneas que cumplen las condiciones: ${countReports}`);
    console.log(`Total de líneas que no cumplen las condiciones: ${noCountReports}`);
});
