var cloudinary = require("../util/config").cloudinary;
var pan = require('../util/required-functions').panVerification;

async function panCard(panCardPath) {
    console.log("loading Pancard details.......");
    await cloudinary.v2.uploader.upload(panCardPath,
        {
            ocr: "adv_ocr"
        }, function (error, result) {
            if (error) {
                console.log(error)
                return;
            }
            if (result.info.ocr.adv_ocr.status === "complete") {
                var textFromPanCard = result.info.ocr.adv_ocr.data[0].textAnnotations[0].description;
                var textArray = textFromPanCard.split("\n");
                var accuracy = 0;
                var panNumber="";
                for(var i=0;i<textArray.length;i++)
                {
                    var indexArray= textArray[i].split(" ");
                    for( var j=0;j<indexArray.length;j++)
                    {
                        if(pan(indexArray[j])>=accuracy){
                            panNumber=indexArray[j];
                            accuracy = pan(indexArray[j]);
                        }

                        console.log(panNumber);

                    }
                    
                }
                resultJson["panNumber"] = {
                    value:panNumber,
                    accuracy:accuracy
                };
               






            }
        });
}


module.exports = {
    panCard
}