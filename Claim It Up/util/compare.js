const xlsxj = require("xlsx-to-json-lc");
var requiredFunctions = require("./required-functions");
var saveToExcel = require('./save_to_excel').writeToExcel
var moment = require('moment');
var index = -1;
async function compareData(dataPath, outputPath, res) {

    console.log("comparing started");


    await xlsxj({
        input: dataPath,
        output: outputPath
    }, function (err, result) {
        if (err) {
            console.error(err);
            compareResult['error'] = {
                value: "Input File Cannot be Read",
                code: 0
            };
            var finalResult = {
                extracted: resultJson,
                input: {},
                compareResult

            }

            res.json(finalResult);
            return;
        }

        // vehicle number check---


        for (var i = 0; i < result.length; i++) {

            if (requiredFunctions.compareString(result[i]['Reg No,'], resultJson.vehicleNumber.value).count == 0) {

                compareResult['vehicleNumber'] = {
                    count: 0
                }
                index = i;
                break;

            }
        }

        console.log("index is " + index.toString());
        if (index == -1) {
            compareResult['vehicleNumber'] = {
                count: 50
            }

            // dl number check if vehicle number not found

            for (var i = 0; i < result.length; i++) {

                for (var j = 0; j < resultJson.dlNumber.value.length; j++) {


                    if (requiredFunctions.compareString(result[i]['DL Number'], resultJson.dlNumber.value[j]).count == 0) {
                        compareResult['dlNumber'] = {
                            count: 0
                        }
                        index = i;
                        resultJson['dlNumber'] = {
                            value: result[i]['DL Number'],
                            accuracy: 100
                        }
                        break;

                    }


                }

            }

            if (index == -1) {
                compareResult['error'] = {
                    value: "No Match Found!",
                    code: 1
                };

                var finalResult = {
                    extracted: resultJson,
                    input: {},
                    compareResult

                }

                res.json(finalResult);
                return;
            }

        }

        // setting values from authorative data

        inputJson['value'] = result[index];



        // engine number check


        for (var i = 0; i < resultJson.engineNumber.value.length; i++) {

            if (requiredFunctions.compareString(resultJson.engineNumber.value[i], result[index]['Engine Number']).count == 0) {
                compareResult['engineNumber'] = {
                    count: 0
                };
                resultJson['engineNumber'] = {
                    value: result[index]['Engine Number'],
                    accuracy: 100
                }
                break;
            }
        }



        // maker check
        for (var i = 0; i < resultJson.maker.value.length; i++) {

            if (requiredFunctions.compareString(resultJson.maker.value[i], result[index]['Mfg. CD']).count == 0) {
                compareResult['maker'] = {
                    count: 0
                };

                resultJson['maker'] = {
                    value: result[index]['Mfg. CD'],
                    accuracy: 100
                }


                break;
            }
        }



        // type check

        for (var i = 0; i < resultJson.type.value.length; i++) {

            if (requiredFunctions.compareString(resultJson.type.value[i], result[index]['Class']).count == 0) {
                compareResult['type'] = {
                    count: 0
                };
                resultJson['type'] = {
                    value: result[index]['Class'],
                    accuracy: 100
                }
                break;
            }
        }

        // dl number check


        for (var i = 0; i < resultJson.dlNumber.value.length; i++) {

            if (requiredFunctions.compareString(resultJson.dlNumber.value[i], result[index]['DL Number']).count == 0) {
                compareResult['dlNumber'] = {
                    count: 0
                };
                resultJson['dlNumber'] = {
                    value: result[index]['DL Number'],
                    accuracy: 100
                }
                break;
            }
        }



        // claim number [reverse] check


        if (reportText.search(result[index]['Claim Number'].trim().replace(/[\W_]+/g, "")) != -1) {
            compareResult['claimNumber'] = {
                count: 0
            }
            resultJson['claimNumber'] = {
                value: result[index]['Claim Number'],
                accuracy: 100
            }

        }

        else {
            compareResult['claimNumber'] = {
                count: 50
            }

            resultJson['claimNumber'] = {
                value: "Not found",
                accuracy: 0
            }

        }



        // insurance from check

        if (resultJson.insuranceFrom.accuracy == 100) {
            compareResult['insuranceFrom'] = {
                count: Math.abs(requiredFunctions.compareDate(result[index]['Policy Start date'], resultJson.insuranceFrom.value) - 100),

            }

        }



        // insurance to check

        if (resultJson.insuranceTo.accuracy == 100) {

            compareResult['insuranceTo'] = {
                count: Math.abs(requiredFunctions.compareDate(result[index]['Policy End date'], resultJson.insuranceTo.value) - 100),
            }

        }

        

        // claim date check

        if (resultJson.claimDate.accuracy == 100) {
            compareResult['claimDate'] = {
                count: Math.abs(requiredFunctions.compareDate(result[index]['Date of Claim Registration'], resultJson.claimDate.value) - 100),

            }

        }



        // checking if claim date is between  insurance from and insurance to --


        if (resultJson.claimDate.accuracy == 0 || resultJson.insuranceFrom.accuracy == 0 || resultJson.insuranceTo.accuracy == 0) {
            compareResult['isClaimDateValid'] = {
                value: 0,
                code: "Cannot verify claim date on or more parameter Missing!"
            }
        }

        else {


            var claimDateCheck = moment(resultJson.claimDate.value, "DD-MM-YYYY");
            var insuranceFromCheck = moment(resultJson.insuranceFrom.value, "DD-MM-YYYY");
            var insuranceToCheck = moment(resultJson.insuranceTo.value, "DD-MM-YYYY");
            if (claimDateCheck >= insuranceFromCheck && claimDateCheck <= insuranceToCheck) {
                compareResult['isClaimDateValid'] = {
                    value: 1,
                    code: "Claim date is b/w Insurance Period"
                }
            }
            else {

                compareResult['isClaimDateValid'] = {
                    value: 0,
                    code: "Claim date is not in Insurance Period"
                }

            }

        }









        // finally sending the details

        var finalResult = {
            extracted: resultJson,
            input: inputJson,
            compareResult

        }

        console.log(finalResult);
        compareResult['Insured Name'] = inputJson['value']['Insured Name'];
        console.log(compareResult);
        saveToExcel(finalResult);
        res.json(finalResult);
        // saveToExcel(compareResult).then((val) => {
            
        // })







    });

}

module.exports = {
    compareData
}
