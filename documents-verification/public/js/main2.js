//Global object to store the files
let fileStorage = {};


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



function panNumber() {
  var pannumber = $("#pan").val();

  if (panVerification(pannumber) == 100) {
    $("#pan-error").html("<p style='color:green;'>Valid PAN number</p>");
  } else {
    $("#pan-error").html("<p style='color:red;'>Not a valid PAN number acc: "+panVerification(pannumber)+"</p>");
  }
};

function vehicleNumber() {
  var vehicleNumber = $("#vehicle").val();

  if (vehicleNumberVerification(vehicleNumber) == 100) {
    $("#vehicle-error").html("<p style='color:green;'>Valid Vehicle number</p>");
  } else {
    $("#vehicle-error").html("<p style='color:red;'>Not a valid Vehicle number acc: "+vehicleNumberVerification(vehicleNumber)+" </p>");
  }
};

$(document).ready(function () {
$("#btn").click(function(){
  
  $("#table").hide();
  // setTimeout(
  //   function() 
  //   {
  //     $("#loading").hide();
  //     $("#table").show();
  //     //do something special
  //   }, 5000);

})

  //Handle the file change
  $("input[type='file']").change(function (e) {
    //Get the id
    let id = e.target.id;

    //Get the files
    let files = e.target.files;

    //Store the file
    storeFile(id, files);

    //Show the complete icon
    $(this).siblings('.icon').hide();
    $(this).parent().removeClass('drawn');
    setTimeout(() => {
      $(this).parent().addClass('drawn');
    }, 50);
  });

  //Store the file for particular filepicker
  let storeFile = (id, files) => {
    fileStorage[id] = files;

    //Update the file count
    $(`[data-id="${id}"] > .file-total-viewer`).text(files.length);
  }

  //Show file list
  $('[data-toggle="popover"]').popover({
    html: true,
    title: "Files",
    placement: "bottom",
    content: function () {
      //Get the id of the file picker
      let id = $(this).attr('data-id');

      //Get all the files of this filepicker
      let items = fileStorage[id];

      //Preview the file 
      let template = '<div class="row">';
      if (items && items.length) {
        for (let val of items) {
          template += "<div class='col-12 pb10'><span class='popover-content-file-name'>" + val.name + "</span><span class='popover-content-remove' data-target='" + id + "' data-name='" + val.name + "' data-type='upload'><i class='fas fa-trash'></i></span></div>"
        }
      } else {
        template += "<div class='col-12 pb10'><span class='popover-content'>No file</span></div>";
      }

      template += '</div>';
      return template;
    }
  });

  //Prevent multiple popover
  $('body').on('click', function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
        (($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false;  // fix for BS 3.3.6
      }
    });
  });

  //Delete files
  $(document).on('click', '.popover-content-remove', function (e) {
    //Get the id whose file to delete
    let id = $(this).attr('data-target');

    //Get the name of the file to delete
    let name = $(this).attr('data-name');

    //Confirm delete
    let isDelete = confirm("Do you really want to delete this file?");

    //If confirmed
    if (isDelete) {
      //Remove the requested file
      let files = Object.values(fileStorage[id]);
      let newArr = files.filter((e) => { return e.name !== name; });

      //Update the list
      storeFile(id, newArr);

      //If there is no file then show No file
      if (newArr.length === 0) {
        $(this).parent().parent().append("<div class='col-12 pb10'><span class='popover-content'>No file</span></div>");
      }

      //Remove the current file
      $(this).parent().remove();
    }
  });
});