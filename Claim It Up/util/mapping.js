const xlsxj = require("xlsx-to-json-lc");


var mapping = new Map([

  ["Chassis Number", ["Chassis Number"]],
  ["Claim Number", ["Claim Number"]],
  ["Claim Amount", ["Claim Amount"]],
  ["Reg No,", ["Reg No,", "Reg No"]],
  ["Engine Number", ["Engine Number"]],
  ["Mfg. CD", ["Mfg. CD"]],
  ["Class", ["Class"]],
  ["Insured Name", ["Insured Name"]],
  ["Driver", ["Driver"]],
  ["DL Number", ["DL Number"]],
  ["DL Issue Date", ["DL Issue Date"]],
  ["DL Valid Upto", ["DL Valid Upto"]],
  ["Policy No.", ["Policy No."]],
  ["Policy Start date", ["Policy Start date"]],
  ["Policy End date", ["Policy End date"]],
  ["Endorsement details", ["Endorsement details"]],
  ["Date of loss", ["Date of loss"]],
  ["Date of Intimation", ["Date of Intimation"]],
  ["Date of Registration", ["Date of Registration"]],
  ["Date of Payment", ["Date of Payment"]],
  ["Cause of Loss", ["Cause of Loss"]],
  ["Type", ["Type"]]

]);


function readMappingFile(filePath, outputPath) {
  xlsxj({
    input: filePath,
    output: outputPath
  }, function (err, result) {


    for (var i = 0; i < result.length; i++) {
      mapping.forEach((key,value)=>{
        if(result[i][key]!='')
        console.log(result[i][key])
       
      })



    }

  })

}

// readMappingFile("/Users/sarthaksadh/Desktop/ey-hack/images/mapping.xlsx", "../data.json")



// module.exports={
//     readMappingFile,
//     test
// }