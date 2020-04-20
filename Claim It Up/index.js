const express = require('express');
const app = express();
const multipart = require('connect-multiparty');
const cors = require('cors');
const bodyParser = require('body-parser');
const multipartMiddleware = multipart();

const panCard = require("./algo/pancard").panCard
const vehicle = require("./algo/vehicle").vehicle;
const report = require("./algo/report").report;
const dl = require("./algo/dl").dl;
const mapping = require('./util/mapping')
const compareData = require('./util/compare').compareData
const reportPython = require('./algo/report_python').reportPython
var json2xls = require('json2xls');
var data = require('./dataset/excel.json')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(json2xls.middleware);


global.resultJson = {}
global.inputJson = {}
global.compareResult = {
  error: {
    value: "No Error",
    code: -1
  },
  vehicleNumber: { count: 50 },
  engineNumber: { count: 50 },
  type: { count: 50 },
  maker: { count: 50 },
  dlNumber: { count: 50 },
  claimNumber: { count: 50 },
  insuranceFrom: { count: 50 },
  insuranceTo: { count: 50 },
  claimDate: { count: 50 },

}

global.reportText = "";

var port = process.env.PORT || 3333;


app.get('/download', function (req, res) {
  res.download('output.xlsx');
});
app.post("/demo", multipartMiddleware, (req, res) => {

  var seconds = 0;
  var reportPath = req.files.report.path;
  var dlPath = req.files.dl.path;
  var vehiclePath = req.files.vehicle.path;
  var dataPath = req.files.data.path;
  var totalFunctionCount = 4


  console.log(req.files);

  dl(dlPath).then(() => {

    console.log("dl complete--")

    totalFunctionCount--;

  })

  vehicle(vehiclePath).then(() => {
    totalFunctionCount--;
    console.log("vehicle complete--")

  });
  report(reportPath).then(() => {
    totalFunctionCount--;
    console.log("report complete--")

  })

  reportPython(reportPath);
  totalFunctionCount--;
  console.log("report 2 complete--")

  response();


  function response() {
    setInterval(function () {

      if (totalFunctionCount == 0) {
        totalFunctionCount--;

        compareData(dataPath, "./output.json", res).then(() => {
          
        })


      }

      else {
        seconds++;
        console.log(seconds);
      }

    }, 1000);
  }

});

app.listen(port, function () {
    console.log("Server running on port: %d", port);
});
