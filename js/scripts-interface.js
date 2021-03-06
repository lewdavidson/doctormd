import { Doctor } from "./../js/scripts.js";

$(document).ready(function(){
  $('form#search-form').submit(function(event){
    event.preventDefault();
    let query = $("#query").val();
    let lastName = $('#last-name').val();
    let newDoc = new Doctor(query, lastName);

    if(lastName.length === 0){
      newDoc.queryFind(query, displayDoc, failFind);
    }else if(query.length === 0){
      newDoc.nameFind(lastName, displayDoc, failFind);
    }else{
      newDoc.bothFind(lastName, query, displayDoc, failFind);
    }

  });
});


function displayDoc(result) {
  const drCount = result.meta.count;
  let queryDocFound = result.data;
  for (var i = 0; i <= drCount; i++) {
    let puppyChow = result.data[i];
};
  queryDocFound.forEach(function(result) {
    let drNew = result.practices[0].accepts_new_patients;
    function acceptingNew(){
      if (drNew === true) {
        return "Yes";
      } else {
        return "No.";
      }
    };
    $('#dr-result').append(`<li>${result.profile.first_name} ${result.profile.last_name}</li> <li>Address: ${result.practices[0].visit_address.street}</li> <li>Phone: ${result.practices[0].phones[0].number}</li>
    <li>Accepting new patients:  ${acceptingNew()}</li><hr>`);

  });
};

function failFind(error) {
  $('#dr-result').text("Something went wrong, please modify your request and try again.");
};
