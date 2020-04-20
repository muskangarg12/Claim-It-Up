const fs = require('fs');
var data = { vehicleNumber: 'Verified',
engineNumber: 'Verified',
type: 'Verified',
maker: 'Verified',
dlNumber: 'Verified',
claimNumber: 'Verified',
insuranceFrom: 'Verified',
insuranceTo: 'Verified',
claimDate: 'Verified',
isClaimDateValid: 'Error' };
var write = (data) => {
    fs.writeFileSync('./dataset/excel.json', JSON.stringify(data));
}



// write(data);

