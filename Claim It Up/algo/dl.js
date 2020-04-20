var cloudinary = require("../util/config").cloudinary;

var dlVerification = require('../util/required-functions').dlVerification
async function dl(dlPath) {

    

    console.log("loading Dl details.......");

    await cloudinary.v2.uploader.upload(dlPath,
        {
            ocr: "adv_ocr"
        }, function (error, result) {
            if (error) {
                console.log(error)
                return;
            }
            if (result.info.ocr.adv_ocr.status === "complete") {
                var isDlFound = 0;
                var textFromDL = result.info.ocr.adv_ocr.data[0].textAnnotations[0].description;
                var dlNumber = [];
                textFromDL = textFromDL.trim().replace(/[\W_]+/g, "");
                var regex1 = /^[A-Za-z].*[0-9]{13}$/
                for (var i = 0; i < textFromDL.length - 15; i++) {
                    if (textFromDL.substring(i, i + 15).search(regex1) == 0) {
                        dlNumber.push(textFromDL.substring(i, i + 15))
                        isDlFound = 1;
                    }

                }
                if (!isDlFound) {
                    resultJson["dlNumber"] = {
                        value: "Not Found",
                        count: 0
                    };

                }
                else {

                    resultJson["dlNumber"] = {
                        value: dlNumber,
                        accuracy: 100
                    };
                }

            }


        });

}



module.exports = {
    dl
}