var selectedFilters = [];



$(".tag").on("click", function(){
  $(this).toggleClass("tag-on");
  const text = $(this).text();

  if(selectedFilters.includes(text) !== true){
    selectedFilters.push(text);
    console.log(selectedFilters);
  }

});
