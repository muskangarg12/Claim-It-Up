function displayData(finalResult) {

    // window.location="#faq"
    var givenData = '<thead><tr><th scope="col">Key</th><th scope="col">Value</th></tr></thead><tbody>';
    var extractedData = '<thead><tr><th scope="col">Key</th><th scope="col">Value</th></tr></thead><tbody>';
    extractedData += '<tr><td>Reg No</td><td>' + finalResult['detected']['vehicleNumber'] + '</td></tr>';
    extractedData += '<tr><td>DL Number</td><td>' + finalResult['detected']['dl']['dlNumber'] + '</td></tr>';
    extractedData += '<tr><td>DL Dates</td><td>' + finalResult['detected']['dl']['dates'] + '</td></tr>';
    extractedData += '<tr><td>Pan Number</td><td>' + finalResult['detected']['panNumber'] + '</td></tr>';
    Object.entries(finalResult['detected']['report']).forEach(([key, value]) => {
        console.log(key);
        extractedData += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';

    });
    extractedData += '</tbody>';
    $("#ed").html(extractedData);
    Object.entries(finalResult['given']['auth']).forEach(([key, value]) => {
        console.log(key);
        givenData += '<tr><td>' + key + '</td><td>' + value + '</td></tr>';

    });
    givenData += '</tbody>';

    $("#gd").html(givenData);

}

var form = new FormData();


$('.dl').change(function (e) {
    var dl = this.files[0];
    console.log(dl);
    form.append('dl', dl);
})

$('.report').change(function (e) {
    var report = this.files[0];
    console.log(report);
    form.append('report', report);
})
$('.vehicle').change(function (e) {
    var vehicle = this.files[0];
    console.log(vehicle);
    form.append('vehicle', vehicle);
})
$('.data').change(function (e) {
    var data = this.files[0];
    console.log(data);
    form.append('data', data);
})


$('.pan').change(function (e) {
    var pan = this.files[0];
    if (pan != null)
        form.append('pan', pan);
})

function m() {
    console.log(dl);
    console.log(data);
    console.log(report);
    console.log(vehicle);
}


function s() {
    // $("#value").html("loading---");
    $("#loading").show();
    $.ajax({
        url: "/demo",
        type: "POST",
        cache: false,
        contentType: false,
        processData: false,
        data: form,
        success: function (response) {
            // console.log(response);
            $("#loading").hide();

            display(response);
            // displayData(response);
            // $("#value").html("done");

        }
    });

}
$('#file-upload').change(function () {
    var filepath = this.value;
    var m = filepath.match(/([^\/\\]+)$/);
    var filename = m[1];
    $('#filename').html(filename);

});

$('.custom-file-input').on('change', function () {
    var fileName = $(this).val();
})

function status(acc) {


    if (acc <= 100 && acc >= 97) {
        return '<td><span class="tick">&#10004;</span>';
    }
    else if (acc < 97 && acc >= 95) {
        return '<td><span class="tickyellow">&#10069;</span>';
    }
    else {
        return ' <td><span class="tickred">&#10008;</span>';

    }
}
function display(obj) {
    console.log(obj)
    if (obj.compareResult.error.code != -1) {
        $(".modal-body").html(' <button type="button" class="btn btn-danger">' + obj.compareResult.error.value + '</button>');
        $('#resultModal').modal('show');

        return;

    }
    var extracted_data = obj.extracted;

    var vehicleNumber = extracted_data.vehicleNumber;
    var engineNumber = extracted_data.engineNumber;
    var dlNumber = extracted_data.dlNumber;
    var claimDate = extracted_data.claimDate;
    var claimNumber = extracted_data.claimNumber;
    var insuranceFrom = extracted_data.insuranceFrom;
    var insuranceTo = extracted_data.insuranceTo;
    var maker = extracted_data.maker;
    var type = extracted_data.type;

    var compare_data = obj.compareResult;

    var cvehicleNumber = 100 - compare_data.vehicleNumber.count;
    var cengineNumber = 100 - compare_data.engineNumber.count;
    var cdlNumber = 100 - compare_data.dlNumber.count;
    var cclaimDate = 100 - compare_data.claimDate.count;
    var cclaimNumber = 100 - compare_data.claimNumber.count;
    var cinsuranceFrom = 100 - compare_data.insuranceFrom.count;
    var cinsuranceTo = 100 - compare_data.insuranceTo.count;
    var cmaker = 100 - compare_data.maker.count;
    var ctype = 100 - compare_data.type.count;


    var input_data = obj.input.value;

    var ivehicleNumber = input_data["Reg No,"];
    var iclaimNumber = input_data["Claim Number"];
    var idlNumber = input_data["DL Number"];
    var iengineNumber = input_data["Engine Number"];
    var iinsuranceFrom = input_data["Policy Start date"];
    var iinsuranceTo = input_data["Policy End date"];
    var imaker = input_data["Mfg. CD"];
    var itype = input_data["Class"];
    var iclaimDate = input_data["Date of Claim Registration"];

    var rowData = '<thead><tr><th scope="col">Document Name</th><th scope="col">Extracted Data</th><th scope="col">Given Data</th><th scope="col">Extraction Accuracy</th><th scope="col">Comparision Accuracy</th><th scope="col">Result</th></tr></thead><tbody>';

    rowData += '<tr><td>Claim Number</td><td>' + claimNumber.value + '</td><td>' + iclaimNumber + '</td><td>' + claimNumber.accuracy + '</td><td>' + cclaimNumber + '</td> ' + status(cclaimNumber) + '</tr>';
    rowData += '<tr><td>Engine Number</td><td>' + engineNumber.value + '</td><td>' + iengineNumber + '</td><td>' + engineNumber.accuracy + '</td><td>' + cengineNumber + '</td>' + status(cengineNumber) + '</tr>';
    rowData += '<tr><td>Vehicle Registration Number</td><td>' + vehicleNumber.value + '</td><td>' + ivehicleNumber + '</td><td>' + vehicleNumber.accuracy + '</td><td>' + cvehicleNumber + '</td>' + status(cvehicleNumber) + '</tr>';
    rowData += '<tr><td>Vehicle Make</td><td>' + maker.value + '</td><td>' + imaker + '</td><td>' + maker.accuracy + '</td><td>' + cmaker + '</td>' + status(cmaker) + '</tr>';
    rowData += '<tr><td>Vehicle Body Type</td><td>' + type.value + '</td><td>' + itype + '</td><td>' + type.accuracy + '</td><td>' + ctype + '</td>' + status(ctype) + '</tr>';
    rowData += '<tr><td>Driving License Number</td><td>' + dlNumber.value + '</td><td>' + idlNumber + '</td><td>' + dlNumber.accuracy + '</td><td>' + cdlNumber + '</td>' + status(cdlNumber) + '</tr>';
    rowData += '<tr><td>Claim Date</td><td>' + claimDate.value + '</td><td>' + iclaimDate + '</td><td>' + claimDate.accuracy + '</td><td>' + cclaimDate + '</td>' + status(cclaimDate) + '</tr>';
    rowData += '<tr><td>Policy Start Date</td><td>' + insuranceFrom.value + '</td><td>' + iinsuranceFrom + '</td><td>' + insuranceFrom.accuracy + '</td><td>' + cinsuranceFrom + '</td>' + status(cinsuranceFrom) + '</tr>';
    rowData += '<tr><td>Policy End Date</td><td>' + insuranceTo.value + '</td><td>' + iinsuranceTo + '</td><td>' + insuranceTo.accuracy + '</td><td>' + cinsuranceTo + '</td>' + status(cinsuranceTo) + '</tr>';
  
    rowData += '</tbody>';

    var butn = '   <button type="button" onclick="location.href = "download";"  class="btn btn-primary w-25" data-toggle="modal" data-target="#exampleModalCenter">Download Excel file</button>';
    $("#getData").html(rowData);
    $("#butn").html(butn);

    if (obj.compareResult.isClaimDateValid.value == 1) {
        $(".modal-body").html(' <button type="button" class="btn btn-success">' + obj.compareResult.isClaimDateValid.code + '</button>');
        $('#resultModal').modal('show');

    }

    if (obj.compareResult.isClaimDateValid.value == 0) {
        $(".modal-body").html(' <button type="button" class="btn btn-danger">' + obj.compareResult.isClaimDateValid.code + '</button>');
        $('#resultModal').modal('show');

    }


}


function test() {
alert("hii")
    $("#loading").show();
    abc = {
        "extracted": {
            "vehicleNumber": {
                "value": "MH 02 CH 2887",
                "accuracy": 100
            },
            "dlNumber": {
                "value": "MH0220140030838",
                "accuracy": 100
            },
            "claimDate": {
                "value": "23-08-2018",
                "accuracy": 100
            },
            "insuranceFrom": {
                "value": "04-01-2018",
                "accuracy": 100
            },
            "insuranceTo": {
                "value": "01-03-2019",
                "accuracy": 100
            },
            "claimNumber": {
                "value": "Not found",
                "accuracy": 0
            },
            "engineNumber": {
                "value": "G4LABM787522",
                "accuracy": 100
            },
            "maker": {
                "value": "Hyundai",
                "accuracy": 100
            },
            "type": {
                "value": "Saloon",
                "accuracy": 100
            }
        },
        "input": {
            "value": {
                "Date of Claim Registration": "8/23/18",
                "Claim Number": "CL/P13521035/000",
                "Claim Amount": "-",
                "Reg No,": "MH02CH2887",
                "Chassis Number": "MALABB51BLBM37342",
                "Engine Number": "G4LABM787522",
                "Mfg. CD": "Hyundai",
                "Class": "Saloon",
                "Insured Name": "Mr. Ajit G. Thakkar",
                "Driver": "Nirav Thakkar",
                "DL Number": "MH0220140030838",
                "DL Issue Date": "7/21/14",
                "DL Valid Upto": "7/20/34",
                "Policy No.": "3001/H1-10484063/01/001",
                "Policy Start date": "1/4/18",
                "Policy End date": "3/1/19",
                "Date of loss": "8/23/18",
                "Date of Intimation": "8/23/18"
            }
        },
        "compareResult": {
            "error": {
                "value": "No Error",
                "code": -1
            },
            "vehicleNumber": {
                "count": 0
            },
            "engineNumber": {
                "count": 0
            },
            "maker": {
                "count": 0
            },
            "type": {
                "count": 0
            },
            "claimNumber": {
                "count": 50
            },
            "dlNumber": {
                "count": 0
            },
            "insuranceFrom": {
                "count": 0
            },
            "insuranceTo": {
                "count": 0
            },
            "claimDate": {
                "count": 0
            }
        }
    };
    $("#loading").hide();
    display(abc);
}









