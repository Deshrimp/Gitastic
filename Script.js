"use strict"
$("#add").on("click", function(event) {
  event.preventDefault()
  var Button = $("<button>")
  var name = $("#exampleCheck1").val()
  Button.text(name)
  Button.addClass("generatedButton")
  Button.data("person", name)
  $("#myButtons").append(Button)
})
// Event listener for all button elements
console.log("The page was loaded and i can see this text")
$("#myButtons").on("click", ".generatedButton", async function() {
  // In this case, the "this" keyword refers to the button that was clicked
  var person = $(this).data("person")

  // Constructing a URL to search Giphy for the name of the person who said the quote
  mport
  var { data: results } = response
  // Looping over every result item
  for (var i = 0; i < results.length; i++) {
    // Only taking action if the photo has an appropriate rating
    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
      // Creating a div with the class "item"
      var gifDiv = $("<div class='item'>")

      // Storing the result item's rating
      var rating = results[i].rating

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating)

      // Creating an image tag
      var personImage = $("<img>")

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      personImage.attr("src", results[i].images.fixed_height.url)

      // Appending the paragraph and personImage we created to the "gifDiv" div we created
      gifDiv.append(p)
      gifDiv.append(personImage)

      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
      $("#gifs-appear-here").prepend(gifDiv)
    }
  }
})
