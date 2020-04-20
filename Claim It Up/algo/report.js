var cloudinary = require("../util/config").cloudinary;
var hasNumber = require("../util/required-functions").hasNumber
var makers = require('../dataset/carBrands.json')
var types = require('../dataset/carType.json')


async function report(reportPath) {
    var claimNumber;
    var engineNumber = [];
    var make = [];
    var type = [];

    console.log("loading Report details.......");


    await cloudinary.v2.uploader.upload(reportPath,
        {
            ocr: "adv_ocr"
        }, function (error, result) {
            if (error) {
                console.log(error)
                return;
            }

            if (result.info.ocr.adv_ocr.status === "complete") {
                var textFromReport = result.info.ocr.adv_ocr.data[0].textAnnotations[0].description;
                if (textFromReport.includes("CL/")) {
                    var dataForClaimNumber = textFromReport.split("CL/");
                    var data2 = dataForClaimNumber[1];
                    var data3 = data2.split("\n");

                    if (data3[0] == "" || data3[0] == " ") {
                        claimNumber = "CL/" + data3[1];


                    }
                    else {
                        claimNumber = "CL/" + data3[0];

                    }

                }

                // engine number

                var textAnnotationsWithoutSpaces = textFromReport.trim().replace(/[\W_]+/g, "");
                reportText = textAnnotationsWithoutSpaces;
                var regex1 = /^[A-Z0-9]{6}.*[0-9]{6}$/
                var isEngineNumberFound = 0;

                for (var i = 0; i < textAnnotationsWithoutSpaces.length - 12; i++) {
                    if (textAnnotationsWithoutSpaces.substring(i, i + 12).search(regex1) == 0) {
                        engineNumber.push(textAnnotationsWithoutSpaces.substring(i, i + 12));
                    }



                }

                var finalResult = [];
                for (var i = 0; i < engineNumber.length; i++) {
                    if (engineNumber[i].search(/^(?=.*[A-Z])(?=.*[0-9])[A-Z0-9]+$/) == 0) {
                        finalResult.push(engineNumber[i]);

                    }
                }

                engineNumber = finalResult;
                isEngineNumberFound = engineNumber.length;



                // maker---

                var isMakerFound = 0;

                for (var i = 0; i < makers.length; i++) {
                    if (textFromReport.search(makers[i].Brand) > 0) {
                        make.push(makers[i].Brand);
                        isMakerFound++;
                    }
                }


                //type

                var isTypeFound = 0;

                for (var i = 0; i < types.length; i++) {
                    if (textFromReport.search(types[i].Type) > 0) {
                        type.push(types[i].Type);
                        isTypeFound++;
                    }
                }




                resultJson['claimNumber'] = {
                    value: claimNumber,
                    accuracy: 100,


                }

                if (isEngineNumberFound) {

                    resultJson['engineNumber'] = {
                        value: engineNumber,
                        accuracy: 100
                    }

                }

                else {
                    resultJson['engineNumber'] = {
                        value: "Not Found",
                        accuracy: 0
                    }
                }



                if (isMakerFound) {

                    resultJson['maker'] = {
                        value: make,
                        accuracy: 100

                    }

                }

                else {
                    resultJson['maker'] = {
                        value: "Not Found",
                        accuracy: 0

                    }
                }




                if (isTypeFound) {
                    resultJson['type'] = {
                        value: type,
                        accuracy: 100

                    }
                }
                else {
                    resultJson['type'] = {
                        value: "Not Found",
                        accuracy: 0

                    }
                }






            }



        });




}






module.exports = {
    report
}