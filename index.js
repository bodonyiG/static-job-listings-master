var selectedFilters = [];



$(".tag").on("click", function() {
  const txt = $(this).text();
  if ($(this).hasClass("tag-on") === false) {

    //Ha még nem szerepel, hozzáadja az aktív filterekhez
    if (selectedFilters.includes(txt) === false) {
      selectedFilters.push(txt);
      addFilter(txt);
    }

    //Turns on all same other tags
    addTags(txt);

  } else {
    //Turns off all same other tags
    removeTags(txt);
    removeFilter(txt);
  }


});


// Turns on visibility for filter bar if the array is greater than 0
function chechkFilters() {
  let filterBar = $("#filterBar");
  if (selectedFilters.length > 0) {
    filterBar[0].style.display = "block";
  } else {
    filterBar[0].style.display = "none";
  }
}

//Sets the current filters to filter bar
function addFilter(filterName) {
  let filterBar = $("#filterBar");
  let content = filterBar.html();
  content += '<p class="filter" name=' + filterName + '>' + filterName + '</p>';
  content += '<span class="close" name=' + filterName + '>x</span>'
  filterBar.html(content);
  //Add function to the x button to close
  $(".close").on("click", function() {
    let tx = $(this).attr("name");
    removeFilter(tx);
    removeTags(tx);
  });
  chechkFilters();
}

//Removes filter from menu bar
function removeFilter(filterName) {
  $("p[name=" + filterName + "]").remove();
  $("span[name=" + filterName + "]").remove();
  let pos = selectedFilters.indexOf(filterName);
  selectedFilters.splice(pos, 1);
  chechkFilters();
}

function addTags(tagName){
  $(".tag").each(function(index, value) {
    if ($(this).text() === tagName) {
      $(this).addClass("tag-on");
    }
  });
}

function removeTags(tagName){
  $(".tag").each(function(index, value) {
    if ($(this).text() === tagName) {
      $(this).removeClass("tag-on");

    }
  });
}
