var exec = require('child_process').exec



function reportPython(reportPath) {

    datesJson = {
        claimDate:'23-06-09',
        insuranceFrom:'04-05-2018',
        insuranceTo:'03-05-2019'
    }
    if (datesJson.claimDate == '00-00-00') {
        resultJson['claimDate'] = {
            value: datesJson.claimDate,
            accuracy: 0
        }

    }
    else {
        resultJson['claimDate'] = {
            value: datesJson.claimDate,
            accuracy: 100
        }

    }
    if (datesJson.insuranceFrom == '00-00-00') {
        resultJson['insuranceFrom'] = {
            value: datesJson.insuranceFrom,
            accuracy: 0
        }

    }
    else {
        resultJson['insuranceFrom'] = {
            value: datesJson.insuranceFrom,
            accuracy: 100
        }

    }
    if (datesJson.insuranceTo == '00-00-00') {
        resultJson['insuranceTo'] = {
            value: datesJson.insuranceTo,
            accuracy: 0
        }
    }
    else {

        resultJson['insuranceTo'] = {
            value: datesJson.insuranceTo,
            accuracy: 100
        }


    }





    // return new Promise(function (resolve, reject) {



      

    //     resolve(JSON.parse(datesJson));


    //     // exec("python "+currentPath+"/algo/ocr_surveyor.py" + reportPath, (error, stdout, stderr) => {
    //     //     if (error) {
    //     //         console.log(error)
    //     //         reject(error);

    //     //     }





    //     // });

    // })




}




module.exports = {
    reportPython
}

