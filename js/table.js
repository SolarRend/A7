/*
 * Author: Joshua Rodriguez
 * Contact: joshua_rodriguez@student.uml.edu
 * UMass Lowell student in GUI Programming 1 
 * Date Created: 11.02.2016
 * used to to display a multiplication table on index.html
 * given the input in the text fields
 * 
 * ** UPDATE** added jquery validation plugin functionality
 */


/**
 * takes input from a form and generates a multipliction table
 */
function generateTable() {


   // clearing previous table everytime generate button is clicked
   $(".tableContent").empty();

   // gathering all input
   var multiplierOne = document.getElementsByName("multiplierFrom")[0];
   var multiplierTwo = document.getElementsByName("multiplierTo")[0];
   var multiplicandOne = document.getElementsByName("multiplicandFrom")[0];
   var multiplicandTwo = document.getElementsByName("multiplicandTo")[0];

   /*
    // **Bad input checking**
    
    // Checking for missing inputs
    if (multiplierOne.value === "" || multiplierTwo.value === "" ||
    multiplicandOne.value === "" || multiplicandTwo.value === "") {
    console.log("Missing input");
    alert("Please fill in all fields.");
    return;
    }
    
    // Checking if multiplier interval is reversed
    if (Number(multiplierOne.value) > Number(multiplierTwo.value)) {
    alert("Please make sure 'Multipliers From' is not greater than 'Multipliers To'");
    return;
    }
    
    // Checking if multiplicand interval is reversed
    if (Number(multiplicandOne.value) > Number(multiplicandTwo.value)) {
    alert("Please make sure 'Multiplicands From' is not greater than 'Multiplicands To'");
    return;
    }
    
    // checking if there are any strings
    if (isNaN(Number(multiplicandOne.value)) || isNaN(Number(multiplicandTwo.value))
    || isNaN(Number(multiplierOne.value)) || isNaN(Number(multiplierTwo.value))) {
    alert("Please make sure there are only integers entered.");
    return;
    }
    
    // checking for whole integers
    if (Number(multiplicandOne.value) % 1 !== 0 || Number(multiplicandTwo.value) % 1 !== 0
    || Number(multiplierOne.value) % 1 !== 0 || Number(multiplierTwo.value) % 1 !== 0) {
    alert("Please make sure there are no decimals.");
    return;
    } 
    // ** End bad input checking **
    */


   //creating two arrays for the intervals
   var multipliers = [];
   var multiplicands = [];


   /* 
    * loops to gather all numbers and in the interval and populate
    * the respective arrays 
    */

   //multipliers population
   for (var i = Number(multiplierOne.value); i <= multiplierTwo.value; i++) {
      multipliers.push(i);
   }

   //multiplicands population
   for (var i = Number(multiplicandOne.value); i <= multiplicandTwo.value; i++) {
      multiplicands.push(i);
   }

   //console.log(multipliers);
   //console.log(multiplicands);

   // creating table element and table body element
   var tableElem = document.createElement("table");
   var tbodyElem = document.createElement("tbody");

   // looping through arrays to create each row of a table at a time
   for (var j = 0; j < multiplicands.length + 1; j++) {

      // current row element
      var trElem = document.createElement("tr");

      for (var i = 0; i < multipliers.length + 1; i++) {

         if (j === 0 && i === 0) {

            // multiplication symbol cell at coordinate (0,0)
            var tdElem = document.createElement("td");
            tdElem.appendChild(document.createTextNode("x"));
            tdElem.className = "tableHeaders";
            trElem.appendChild(tdElem);

         } else if (j === 0 & i !== 0) {

            // multipliers row special case
            var tdElem = document.createElement("td");
            tdElem.appendChild(document.createTextNode(multipliers[i - 1]));
            tdElem.className = "tableHeaders";
            trElem.appendChild(tdElem);

         } else if (j !== 0 & i === 0) {

            // multiplicands column special case
            var tdElem = document.createElement("td");
            tdElem.className = "tableHeaders";
            tdElem.appendChild(document.createTextNode(multiplicands[j - 1]));
            trElem.appendChild(tdElem);

         } else {

            // regular cell in row
            var tdElem = document.createElement("td");
            tdElem.appendChild(document.createTextNode((multiplicands[j - 1] * multipliers[i - 1])));
            trElem.appendChild(tdElem);
            //console.log(multiplicands[j]*multipliers[i]);
         }

      }

      //adding row to body element
      tbodyElem.appendChild(trElem);
   }

   //adding body to table
   tableElem.appendChild(tbodyElem);

   // setting table className
   tableElem.className = "multTable";

   // displaying table by appending it to structure skeleton in html
   var table = document.getElementsByClassName("tableContent")[0];
   table.appendChild(tableElem);


   /*
    console.log(multiplierOne.value);
    console.log(multiplierTwo.value);
    console.log(multiplicandOne.value);
    console.log(multiplicandTwo.value);
    */

}

// adding clickable action to generate table button
generateButton = document.getElementById("generate");
generateButton.addEventListener("click", generateTable);


// ** Validation - added in A7 **
$(document).ready(function () {

   // custom validation rules

   // Checking if interval is reversed
   function isMultiplierOneGreater(value, element) {

      if (value > Number($("#two").val())) {
         return false;
      }
      return true;

   }

   // Checking if interval is reversed
   function isMultiplicandOneGreater(value, element) {

      if (value > Number($("#four").val())) {
         return false;
      }
      return true;

   }

   // adding rules
   jQuery.validator.addMethod("isMultiplierOneGreater", isMultiplierOneGreater);
   jQuery.validator.addMethod("isMultiplicandOneGreater", isMultiplicandOneGreater);

   // Validation method
   $("#tableForm").validate({
      
      // Placing Error messages next to form input label
      errorPlacement: function (error, element) {

         var nameOfInput = element.attr("name");

         if (nameOfInput === "multiplierFrom") {
            error.insertBefore(element);
         }
         if (nameOfInput === "multiplierTo") {
            error.insertBefore(element);
         }
         if (nameOfInput === "multiplicandFrom") {
            error.insertBefore(element);
         }
         if (nameOfInput === "multiplicandTo") {
            error.insertBefore(element);
         }

      },
      
      // rules of each form
      rules: {
         // multiplierFrom input rules
         multiplierFrom: {
            required: true,
            isMultiplierOneGreater: true,
            digits: true
         },
         // multiplierTo input rules
         multiplierTo: {
            required: true,
            digits: true
         },
         // multiplicandFrom input rules
         multiplicandFrom: {
            required: true,
            isMultiplicandOneGreater: true,
            digits: true
         },
         // multiplicandTo input rules
         multiplicandTo: {
            required: true,
            digits: true
         }
      },
      
      // error messages to be displayed 
      messages: {
         // multiplierFrom input messages
         multiplierFrom: {
            required: "Please fill.",
            isMultiplierOneGreater: "Can't be larger than Multipliers To",
            digits: "Must be a whole non-negative number"
         },
         // multiplierTo input messages
         multiplierTo: {
            required: "Please fill.",
            digits: "Must be a whole non-negative number"
         },
         // multiplicandFrom input messages
         multiplicandFrom: {
            required: "Please fill.",
            isMultiplicandOneGreater: "Can't be larger than Multiplicands To",
            digits: "Must be a whole non-negative number"
         },
         // multiplicandTo input messages
         multiplicandTo: {
            required: "Please fill.",
            digits: "Must be a whole non-negative number"
         }
      }
   });

   // disabling butting submitting if form is not valid
   // code source: http://stackoverflow.com/questions/21953694/enabling-disabled-button-after-successful-jquery-validation
   $('#tableForm').on('keyup blur', function () {
      if ($('#tableForm').valid()) {
         $('#generate').prop('disabled', false);
      } else {
         $('#generate').prop('disabled', 'disabled');
      }
   });
});