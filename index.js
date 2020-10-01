var selectedFilters = [];

selectedFilters = ["Frontend", "Senior", "HTML", "CSS", "JavaScript"];
chechkFilters();
selectedFilters.forEach((item, i) => {
  addFilter(item);
});


$(".tag").on("click", function() {
  const txt = $(this).text();
  if ($(this).hasClass("tag-on") === false) {

    //Ha még nem szerepel, hozzáadja az aktív filterekhez
    if (selectedFilters.includes(txt) === false) {
      selectedFilters.push(txt);
    }

    //Turns on all same other tags
    addFilter(txt);
    addTags(txt);
    filterPosts();

  } else {
    //Turns off all same other tags
    removeTags(txt);
    removeFilter(txt);
    filterPosts();
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
  let filterBar = $("#filterContainer");
  let content = filterBar.html();
  content += '<p class="filter" name=' + filterName + '>' + filterName + '</p>';
  content += '<span class="close" name=' + filterName + '>x</span>'
  filterBar.html(content);
  //Add function to the x button to close
  $(".close").on("click", function() {
    let tx = $(this).attr("name");
    removeFilter(tx);
    removeTags(tx);
    filterPosts();
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

function filterPosts(){

  $(".item-bg ").not("#filterBar").each(function(index, value){
    if(selectedFilters.length > 0){
      //ha már van aktív filter
      let tagsOfItem = $(this).attr("data-tags");
      let visible = [];
      for(i=0; i<selectedFilters.length; i++){
        if(tagsOfItem.includes(selectedFilters[i])){
          visible.push(true);
        }else{
          visible.push(false);
        }
      }
      if(visible.includes(false)){
        $(this)[0].style.display = "none";
      }else{
        $(this)[0].style.display = "block";
      }
    }else{
      //Ha nincs aktív filter
      $(this)[0].style.display = "block";
    }


    // if(tagsOfItem.includes(selectedFilters)){
    //   $(this)[0].style.display = "block";
    // }else{
    //   $(this)[0].style.display = "none";
    // }


  });
}
