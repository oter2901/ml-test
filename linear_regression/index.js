const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR;

const csvFilePath = './advertising.csv';
let csvData = [],
  X = [],
  y = [];

let regressionModel;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

csv()
  .fromFile(csvFilePath)
  .subscribe(jsonObj => {
    csvData.push(jsonObj);
  })
  .on('done', () => {
    dressData();
    performRegression();
  });

function performRegression() {
  regressionModel = new SLR(X, y);
  console.log(regressionModel.toString(3));
  predictOutput();
}

function dressData() {
  csvData.forEach(row => {
    X.push(float(row.Radio));
    y.push(float(row.Sales));
  });
}

function float(string) {
  return parseFloat(string);
}

function predictOutput() {
  rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', answer => {
    console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer)).toFixed(2)}`);
    predictOutput();
  });
}
