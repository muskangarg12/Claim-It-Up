

var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');

var extracted_data=obj.extracted;

var vehicleNumber=extracted.vehicleNumber;
var engineNumber=extracted_data.engineNumber;
var dlNumber= extracted_data.dlNumber;
var claimDate= extracted_data.claimDate;
var claimNumber = extracted_data.claimDate;
var insuranceFrom=extracted_data.insuranceFrom;
var insuranceTo=extracted_data.insuranceTo;
var maker=extracted_data.maker;
var type=extracted_data.type;


var compare_data=obj.compareResult;

var cvehicleNumber=compare.vehicleNumber.count;
var cengineNumber=compare_data.engineNumber.count;
var cdlNumber= compare_data.dlNumber.count;
var cclaimDate= compare_data.claimDate.count;
var cclaimNumber = compare_data.cclaimNumber.count;
var cinsuranceFrom=compare_data.insuranceFrom.count;
var cinsuranceTo=compare_data.insuranceTo.count;
var cmaker=compare_data.maker.count;
var ctype=compare_data.type.count;


var input_data = obj.input.value;

var ivehicleNumber =input_data["DL Number"]
var iclaimNumber=input_data["Claim Number"];
var idlNumber = input_data["DL Number"];
var iengineNumber =input_data["Engine Number"];
var iinsuranceFrom = input_data["Policy Start date"];
var iinsuranceTo= input_data["Policy End date"];
var imaker=input_data["Mfg. CD"];
var itype=input_data["Class"];
var iclaimDate = input_data["Date of Claim Registration"];

var rowdata = '<thead><tr><th scope="col">Document Name</th><th scope="col">Extracted Data</th><th scope="col">Given Data</th><th scope="col">Extraction Accuracy</th><th scope="col"Comparision Accuracy</th><th scope="col">Result</th></tr></thead><tbody>';

rowData += '<tr><td>Claim Number</td><td>' + claimNumber.value + '</td><td>' + iclaimNumber.value + '</td><td>' + claimNumber.accuracy + '</td><td>' + cclaimNumber.count + '</td></tr>';
rowData += '<tr><td>Engine Number</td><td>' + engineNumber.value + '</td><td>' + iengineNumber.value + '</td><td>' + engineNumber.accuracy + '</td><td>' + cengineNumber.count + '</td></tr>';
rowData += '<tr><td>Vehicle Registration Number</td><td>' + vehicleNumber.value + '</td><td>' + ivehicleNumber.value + '</td><td>' + vehicleNumber.accuracy + '</td><td>' + cvehicleNumber.count + '</td></tr>';
rowData += '<tr><td>Vehicle Make</td><td>' +maker.value+ '</td><td>' +imaker.value+ '</td><td>' +maker.accuracy+ '</td><td>' +cmaker.count+ '</td</tr>';
rowData += '<tr><td>Vehicle Body Type</td><td>' + type.value + '</td><td>' + itype.value + '</td><td>' + type.accuracy + '</td><td>' + ctype.count + '</td></tr>';
rowData += '<tr><td>Driving License Number</td><td>' + dlNumber.value + '</td><td>' + idlNumber.value + '</td><td>' + dlNumber.accuracy + '</td><td>' + cdlNumber.count + '</td></tr>';
rowData += '<tr><td>Claim Date</td><td>' + claimDate.value + '</td><td>' + iclaimDate.value + '</td><td>' + claimDate.accuracy + '</td><td>' + cclaimDate.count + '</td></tr>';
rowData += '<tr><td>Policy Start Date</td><td>' + insuranceFrom.value + '</td><td>' + iinsuranceFrom.value + '</td><td>' + insuranceFrom.accuracy + '</td><td>' + cinsuranceFrom.count + '</td></tr>';
rowData += '<tr><td>Policy End Date</td><td>' +insuranceTo.value + '</td><td>' +iinsuranceTo.value + '</td><td>' +insuranceTo.accuracy + '</td><td>' + cinsuranceTo.count + '</td></tr>';

rowData += '</tbody>';
$("#getData").html(rowData);