var cloudinary = require("../util/config").cloudinary;
var vehicleNumberVerification = require("../util/required-functions").vehicleNumberVerification;

async function vehicle(vehiclePath) {

    console.log("loading Vehicle Number .......");


    await cloudinary.v2.uploader.upload(vehiclePath,
        {
            ocr: "adv_ocr"
        }, function (error, result) {
            if (error) {
                console.log(error)
                return;
            }
            if (result.info.ocr.adv_ocr.status === "complete") {
                var textFroVI = result.info.ocr.adv_ocr.data[0].textAnnotations[0].description;
                var convertToArray = textFroVI.split("\n");
                var accuracy = 0;
                var vehiclenumber = "";

                for (var i = 0; i < convertToArray.length; i++) {
                    var tempAccuracy = vehicleNumberVerification(convertToArray[i]);
                    if (tempAccuracy >= accuracy) {
                        accuracy = tempAccuracy;
                        vehiclenumber = convertToArray[i];
                    }
                    var vehicleNumberIndex = convertToArray[i].split(" ");
                    
                    for (var j = 0; j < vehicleNumberIndex.length; j++) {
                        var tempAccuracy = vehicleNumberVerification(vehicleNumberIndex[j]);
                        if (tempAccuracy >= accuracy) {
                            accuracy = tempAccuracy;
                            vehiclenumber = vehicleNumberIndex[j];
                        }
                       

                    }

                }
                resultJson["vehicleNumber"] = {
                    value: vehiclenumber,
                    accuracy: accuracy
                };

        






            }
        });


}


module.exports = {
    vehicle
}