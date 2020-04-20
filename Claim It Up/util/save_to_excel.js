var xl = require('excel4node');
var wb = new xl.Workbook();
var ws = wb.addWorksheet('Sheet 1');


function writeToExcel(resultJson){
    var head = wb.createStyle({
        alignment: { // §18.8.1
            horizontal: 'center',
            indent: 2, // Number of spaces to indent = indent value * 3
            justifyLastLine: true,
            readingOrder: 'leftToRight',
            relativeIndent: 3, // number of additional spaces to indent
            shrinkToFit: false,
            textRotation: 0, // number of degrees to rotate text counter-clockwise
            vertical: 'center',
            wrapText: true
        },
        font: {
            color: '#000000',
            size: 12,
        },
        fill: {
            type: 'pattern',
            patternType: 'lightGrid',
            bgColor: 'gray-25'
        }
    });
    
    
    var wrong=wb.createStyle({
        alignment: { // §18.8.1
            horizontal: 'center',
            indent: 2, // Number of spaces to indent = indent value * 3
            justifyLastLine: true,
            readingOrder: 'leftToRight',
            relativeIndent: 3, // number of additional spaces to indent
            shrinkToFit: false,
            textRotation: 0, // number of degrees to rotate text counter-clockwise
            vertical: 'center',
            wrapText: true
        },
        font: {
            color: '#000000',
            size: 12,
        },
        fill: {
            type: 'pattern',
            patternType: 'lightGrid',
            bgColor: 'red'
        }
    });
    
    var correct =wb.createStyle({
        alignment: { // §18.8.1
            horizontal: 'center',
            indent: 2, // Number of spaces to indent = indent value * 3
            justifyLastLine: true,
            readingOrder: 'leftToRight',
            relativeIndent: 3, // number of additional spaces to indent
            shrinkToFit: false,
            textRotation: 0, // number of degrees to rotate text counter-clockwise
            vertical: 'center',
            wrapText: true
        },
        font: {
            color: '#ffffff',
            size: 12,
        },
        fill: {
            type: 'pattern',
            patternType: 'lightGrid',
            bgColor: 'green'
        }
    });
    
    
    ws.cell(1, 1)
        .string('Claim Number')
        .style(head);
    ws.cell(1, 2)
        .string('Vehicle Number')
        .style(head);
    ws.cell(1, 3)
        .string('Engine Number')
        .style(head);
    ws.cell(1, 4)
        .string('Type')
        .style(head);
    ws.cell(1, 5)
        .string('Maker')
        .style(head);
    ws.cell(1, 6)
        .string('DL Number')
        .style(head);
    ws.cell(1, 7)
        .string('Insurance Data')
        .style(head);
    ws.cell(1, 8)
        .string('Expiry Data')
        .style(head);
        ws.cell(1, 9)
        .string('Claim Date Valid')
        .style(head);
    
    
    
      if(resultJson.compareResult.claimNumber.count){
        ws.cell(2, 1)
        .string(resultJson.input.value["Claim Number"])
        .style(wrong);
    
      }
      else{
        ws.cell(2, 1)
        .string(resultJson.input.value["Claim Number"])
        .style(correct);
       
      }
    
    
      if(resultJson.compareResult.vehicleNumber.count){
        ws.cell(2, 2)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 2)
        .string('Verified')
        .style(correct);
      }
    
    
    
      if(resultJson.compareResult.engineNumber.count){
        ws.cell(2, 3)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 3)
        .string('Verified')
        .style(correct);
      }
    
    
    
      if(resultJson.compareResult.type.count){
        ws.cell(2, 4)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 4)
        .string('Verified')
        .style(correct);
      }
    
    
    
      if(resultJson.compareResult.maker.count){
        ws.cell(2, 5)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 5)
        .string('Verified')
        .style(correct);
      }
    
    
    
      if(resultJson.compareResult.dlNumber.count){
        ws.cell(2, 6)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 6)
        .string('Verified')
        .style(correct);
      }
    
    
    
      if(resultJson.compareResult.insuranceFrom.count){
        ws.cell(2, 7)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 7)
        .string('Verified')
        .style(correct);
      }
    
    
    
      if(resultJson.compareResult.insuranceTo.count){
        ws.cell(2, 8)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 8)
        .string('Verified')
        .style(correct);
      }
    
      if(resultJson.compareResult.isClaimDateValid.count){
        ws.cell(2, 9)
        .string('Not Verified')
        .style(wrong);
    
      }
      else{
        ws.cell(2, 9)
        .string('Verified')
        .style(correct);
      }
    
    
      
    
    
    wb.write('output.xlsx');

}


module.exports={
    writeToExcel
}
