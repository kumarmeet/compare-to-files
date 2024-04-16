const fs = require('fs');

// Create read streams for file1 and file2
const stream1 = fs.createReadStream("./t1.txt", 'utf8');
const stream2 = fs.createReadStream("./t2.txt", 'utf8');

let data1 = '';
let data2 = '';

// Read data from stream1
stream1.on('data', (chunk) => {
  data1 += chunk;
});

// Read data from stream2
stream2.on('data', (chunk) => {
  data2 += chunk;
});

// When both streams finish reading
stream1.on('end', () => {
  // Split file contents into lines
  const lines1 = data1.split('\n');
  const lines2 = data2.split('\n');

  // Compare line by line
  const differences = [];
  lines1.forEach((line, index) => {
    if (line !== lines2[index]) {
      differences.push({ line: index + 1, file1: line, file2: lines2[index] });
    }
  });

  if (differences.length === 0) {
    console.log({ identical: true });
  } else {
    console.log({ identical: false, differences });
  }
});

// Handle errors
stream1.on('error', (err) => {
  console.error('Error reading file 1:', err);
});

stream2.on('error', (err) => {
  console.error('Error reading file 2:', err);
});
