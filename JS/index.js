// & |=================|================= {SetUp} =================|=================|

var siteName = document.getElementById("nameInput");
var siteUrl = document.getElementById("urlInput");

var siteList = [];

// TODO: is LocalStorage null or not ?
if (localStorage.getItem("sites") != null) {
  var siteList = JSON.parse(localStorage.getItem("sites"));
  display(siteList);
}

// & |=================|================= {SetUp} =================|=================|

// ^ |================= {Create function} =================|

function createSite() {
  var siteNameValue = siteName.value.trim();
  var siteUrlValue = siteUrl.value.trim();
  // alert("Site Name: " + siteNameValue);
  // Check if the site already exists in the siteList array
  var isDuplicateSite = siteList.some(function (site) {
    return (
      site.name.toLowerCase() === siteNameValue.toLowerCase() &&
      site.url.toLowerCase() === siteUrlValue.toLowerCase()
    );
  });

  if (isDuplicateSite) {
    var errorMessageContainer = document.querySelector(
      ".error-message-container"
    );
    errorMessageContainer.classList.remove("d-none");
    var p = document.querySelector(".errorM");
    p.innerHTML = "This site already exists in the list.";
    return;
  }

  if (siteNameValidation() && siteUrlValidation()) {
    var site = {
      name: siteNameValue,
      url: siteUrlValue,
    };
    siteList.push(site);
    localStorage.setItem("sites", JSON.stringify(siteList));
    display(siteList);
    Reset();
     
  
  } else {
    // Show the error message container
    var errorMessageContainer = document.querySelector(
      ".error-message-container"
    );
    errorMessageContainer.classList.remove("d-none");
    var p = document.querySelector(".errorM");
    p.innerHTML = "Site Name or Url is not valid, Please follow the rules below :";
    var errorRules = document.getElementById("errorRules");
    errorRules.classList.remove("d-none");
  }
}

// |================= {End Create function} =================|

function Reset() {
  siteName.value = "";
  siteUrl.value = "";

  // Reset error message container
  var errorMessageContainer = document.querySelector(".error-message-container");
  errorMessageContainer.classList.add("d-none");

  // Reset input styles by reapplying the "initial-style" class
  var siteNameInput = document.querySelector(".siteName-input");
  var siteUrlInput = document.querySelector(".siteUrl-input");

  siteNameInput.classList.add("initial-style");
  siteUrlInput.classList.add("initial-style");

   // Hide the icons by setting their display to none
   var exIcons = document.querySelectorAll(".ex");
   var chIcons = document.querySelectorAll(".ch");
 
   exIcons.forEach(function (icon) {
     icon.style.display = "none";
   });
 
   chIcons.forEach(function (icon) {
     icon.style.display = "none";
   });

   reloadPage();
}
// this


function reloadPage() {
  location.reload();
}




// ^ |================= {display function} =================|

function display(arr) {
  var trs = ``;
  for (var i = 0; i < arr.length; i++) {
    trs += `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].name}</td>
        <td>
          <a class="btn btn-primary" href="${arr[i].url}" target="_blank">
            <i class="fa-solid fa-eye"></i>Visit
          </a>
        </td>
        <td><button class="btn btn-danger" onclick="deleteRow(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>  
      </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = trs;
}

//  |================= {End display function} =================|

// ^ |================= {delete function} =================|

function deleteRow(index) {
  siteList.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(siteList));
  display(siteList);
}

//  |================= {End delete function} =================|

// & |=================| {Site Name Validation} |=================|

function siteNameValidation() {
  var regex = /^\w{3,}$/g;
  return regex.test(siteName.value) && siteName.value != null;
}

function siteUrlValidation() {
  var regex = /^[a-z]{1,}\.[a-z]{2,}$/g;
  return regex.test(siteUrl.value) && siteUrl.value != null;
}
//  |=================| {End Site Name Validation} |=================|

// ? |================= {Event Listeners} =================|

// Add event listeners for keyup on the input elements
var siteNameInput = document.querySelector(".siteName-input");
var siteUrlInput = document.querySelector(".siteUrl-input");

siteNameInput.addEventListener("keyup", handleSiteNameValidation);
siteUrlInput.addEventListener("keyup", handleSiteUrlValidation);

//  |================= {End Event Listeners} =================|

// ^ |================= {Input Validation and Styling} =================|

function handleSiteNameValidation() {
  var isSiteNameValid = siteNameValidation();
  changeIconStyle(isSiteNameValid, ".siteName");
  changeInputStyle(".siteName-input", ".siteName", isSiteNameValid);
  // Show/hide error message container based on validation results
  // errorMessageContainer.style.display = isSiteNameValid ? "d-none" : "d-block";
}

function handleSiteUrlValidation() {
  var isSiteUrlValid = siteUrlValidation();
  changeIconStyle(isSiteUrlValid, ".siteUrl");
  changeInputStyle(".siteUrl-input", ".siteUrl", isSiteUrlValid);
  // errorMessageContainer.style.display = isSiteUrlValid ? "none" : "block";
}

function changeIconStyle(isValid, inputClass) {
  // Show/hide SVG icon based on validation result for siteUrl or siteName
  var exIcon = document.querySelector(`${inputClass} .ex`);
  var chIcon = document.querySelector(`${inputClass} .ch`);
  chIcon.style.display = isValid ? "block" : "none";
  exIcon.style.display = isValid ? "none" : "block";
}

function changeInputStyle(wnatedInputClass, containerNameClass, isvalid) {
  // Adjust form-control:focus styles based on validation result for siteUrl
  var formControl = document.querySelector(`${wnatedInputClass}`);
  var parentContainer = document.querySelector(`${containerNameClass}`);
  if (!isvalid) {
    formControl.style.borderColor = "#dc3545";
    formControl.style.boxShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.25)";
    parentContainer.style.borderColor = "#dc3545";
  } else {
    formControl.style.borderColor = "#198754";
    formControl.style.boxShadow = "0 0 0 0.25rem rgba(25, 135, 84, 0.25)";
    parentContainer.style.borderColor = "#198754";
  }
}

//  |================= {End Input Validation and Styling} =================|

function hideErrorMessage() {
  var errorMessageContainer = document.querySelector(
    ".error-message-container"
  );
  errorMessageContainer.style.display = "none";
}

// Add event listener to the close button
var closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", hideErrorMessage);
