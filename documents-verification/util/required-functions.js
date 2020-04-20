var exec = require("child_process").exec
var stateCode = require('../dataset/statecode.json')
function hasNumber(myString) {
  return /\d/.test(myString);
}

function compareDate(date1, date2) {

  date1 = date1.trim().replace(/[\W_]+/g, "/");
  date2 = date2.trim().replace(/[\W_]+/g, "/");

  if (date1 == date2) return 100;
  else {

    d1 = date1.split("/");
    d2 = date2.split("/");

    if (d1.length != d2.length) return 0;// date not in format [dd/mm/yy]  or [mm/dd/yy] hence return false


    // checking both the date format     
    if ((parseInt(d1[0]) == parseInt(d2[1]) && parseInt(d1[1]) == parseInt(d2[0])) || (parseInt(d1[0]) == parseInt(d2[0]) && parseInt(d1[1]) == parseInt(d2[1]))) {

      if (parseInt(d1[2]) == parseInt(d2[2])) return 100;
      else {
        // checking if year is in [yy] format or [yyyy] format
        if (d1[2].length > d2[2].length) {

          if (parseInt(d1[2].substring(2, 4)) == parseInt(d2[2])) return 100;
          else return 0;


        }
        else if (d1[2].length < d2[2].length) {
          if (parseInt(d2[2].substring(2, 4)) == parseInt(d1[2])) return 100;
          else return 0;

        }
        else return 0;

      }

    }

    //  not other test case left

    return 0;



  }

}

function compareString(str1, str2) {

  str1 = str1.trim().replace(/[\W_]+/g, "");
  str2 = str2.trim().replace(/[\W_]+/g, "");

  var m = str1.length, n = str2.length;

  var count = 0; // Count of edits 

  var i = 0, j = 0;
  while (i < m && j < n) {
    // If current characters don't match 
    if (str1[i] != str2[j]) {


      // If length of one string is 
      // more, then only possible edit 
      // is to remove a character 
      if (m > n)
        i++;
      else if (m < n)
        j++;
      else //Iflengths of both strings is same 
      {
        i++;
        j++;
      }

      // Increment count of edits  
      count++;
    }

    else // If current characters match 
    {
      i++;
      j++;
    }
  }

  // Adding edits for remaining string
  if (i < m || j < n) {
    if (i < m)
      count += m - i;
    else
      count += n - j;
  }


  return {
    count,
    accuracy:((str1.length-count)/str1.length)*100

  }


}

function panVerification(panNumber) {

  var accuracy = 0;
  panNumber = panNumber.trim().replace(/[\W_]+/g, "").toLowerCase();
  if (panNumber.length == 10)
    accuracy += 1;

  try {
    if (/^[A-Za-z]+$/.test(panNumber.substring(0, 3)))
      accuracy += 1;
  }
  catch (err) {

  }

  try {
    if (panNumber[3] == 'c' || panNumber[3] == 'p' || panNumber[3] == 'h' || panNumber[3] == 'f' || panNumber[3] == 'a' || panNumber[3] == 't' || panNumber[3] == 'b' || panNumber[3] == 'l' || panNumber[3] == 'j' || panNumber[3] == 'g')
      accuracy += 1;
  }
  catch (err) {

  }

  try {
    if (/^[A-Za-z]+$/.test(panNumber.substring(4, 5)))
      accuracy += 1;
  }
  catch (err) {

  }

  try {

    if (/^\d+$/.test(panNumber.substring(5, 9)))
      accuracy += 1;
  }
  catch (err) {

  }

  try {

    if (/^[A-Za-z]+$/.test(panNumber[9]))
      accuracy += 1;
  }
  catch (err) {

  }


  return (accuracy / 6) * 100;


}

function dlVerification(dlNumber) {

  var accuracy = 0;
  var dlNumber = dlNumber.trim().replace(/[\W_]+/g, "").toLowerCase();
  if (dlNumber.length >= 8 && dlNumber.length <= 15) {
    accuracy += 1;
  }

  for (var i = 0; i < stateCode.length; i++) {
    var stateCodeIndex = stateCode[i]["Abbreviation"].toLowerCase();
    try {
      if (stateCodeIndex == dlNumber.substring(0, 2)) {
        accuracy += 1;
        break;

      }

    } catch (error) {

    }

  }

  if (/^\d+$/.test(dlNumber.substring(dlNumber.length - 7, dlNumber.length))) {
    accuracy += 1;
  }
  return (accuracy / 3) * 100;
}

function vehicleNumberVerification(vehicleNumber) {
  var accuracy = 0;
  vehicleNumber = vehicleNumber.trim().replace(/[\W_]+/g, "").toLowerCase();
  if (vehicleNumber.length == 10 || vehicleNumber.length == 9)
    accuracy += 1;
  for (var i = 0; i < stateCode.length; i++) {
    var stateCodeIndex = stateCode[i]["Abbreviation"].toLowerCase();
    try {
      if (stateCodeIndex == vehicleNumber.substring(0, 2)) {
        accuracy += 1;
        break;

      }

    } catch (error) {

    }

  }
  try {
    if (/^\d+$/.test(vehicleNumber.substring(vehicleNumber.length - 4, vehicleNumber.length)))
      accuracy += 1;

  } catch (error) {

  }

  console.log(accuracy);
  return (accuracy / 3) * 100;

}

function nameVerification(name) {
  // TODO

}

function dateVerfication(date) {
  date = date.trim().replace(/[\W_]+/g, "/");
  if (Date.parse(date))
    return 0;
  return 100;

}


module.exports = {
  hasNumber,
  dateVerfication,
  vehicleNumberVerification,
  dlVerification,
  panVerification,
  compareString,
  compareDate
}

