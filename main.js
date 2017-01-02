//Snippet to match and sort terms
//Step I - Create necessary Variables
var queryBox = document.getElementById('search');
var origList = document.getElementById('listToSort');
var sortedList = document.getElementById('sortedList');
var lis = document.getElementsByTagName('li');
var highlight = document.createElement('strong');
var sortedArray = [], unsortedArray = [], query, myReg, filterReg, slicedQuery, unQuery;

// Step II - Populate a dummy list from the original list
for (var i = 0; i < lis.length; i++) {
  unsortedArray[i] = lis[i];
}

// Step III - get search query from user
queryBox.oninput = function(){
  query = queryBox.value;
  myReg = new RegExp(query,'i');  //Create a new Regular Expression with the search query
  filterReg = new RegExp("undefined");  //Will be used later

// Step IV - empty the dummy sorted list and the actual list to be displayed
  sortedList.innerHTML = "";
  sortedArray = [];

// Step V - cycle through the dummy list and filter the matches in to the dummy sorted list
  for (var i = 0; i < unsortedArray.length; i++) {
    if (myReg.test(unsortedArray[i].innerHTML)) {
      sortedArray[i] = unsortedArray[i].innerHTML;
    }
  }

// Step VI - sort the dummy sorted list alphabetically
  sortedArray.sort();

// Step VII - cycle through the dummy sorted list and populate it in to the actual list
  for (var i = 0; i < sortedArray.length; i++) {
    var sortedTerm = document.createElement('li');
// the filterReg that we created earlier is now used to remove the undefined elements from the sortedArray
    if (!filterReg.test(sortedArray[i])) {

//Down here, is the snippet that helps highlight the searched query form the list
// Firstly, convert both the search term and the list item to lowercase, just to avoid confusion
      var listLower = sortedArray[i].toLowerCase();
      var queryLower = query.toLowerCase();
// Now, the list string is split in to three parts
      var a = listLower.slice(0,listLower.search(queryLower));  //Any string before the queried string
      var b = listLower.substr(listLower.search(queryLower), queryLower.length);  //The queried string
      var c = listLower.slice(listLower.search(queryLower)+queryLower.length);  //Any string after the queried term

//Done! Now just concatenate a,b and c with opening and closing "<strong>" tags before and after b
      slicedQuery = a+"<strong><em>"+b+"</em></strong>"+c;
      sortedTerm.innerHTML = slicedQuery;
      sortedList.appendChild(sortedTerm);
    }
  }

// Step VIII - Hide the original list and display the new list
  listToSort.style.display = "none";
  sortedList.style.display = "block";

// And a Bonus content. Just for you!
  if (sortedList.innerHTML == "") {
    var sortedTerm = document.createElement('li');
    sortedTerm.innerHTML = "Oops! We had no match (0_0) Try a different term!";
    sortedList.appendChild(sortedTerm);
    sortedList.getElementsByTagName('li')[0].style.color = "#ad0a0a";
  }
};
