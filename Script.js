"use strict"
$("#add").on("click", function(event) {
  event.preventDefault()
  var Button = $("<button>")
  var name = $("#exampleCheck1").val()
  Button.text(name)
  Button.addClass("generatedButton bbtn btn-outline-secondary")
  Button.attr("data-state")
  Button.data("person", name)
  $("#myButtons").append(Button)
})
const initialSearches = [
  "Pikachu",
  "Charmander",
  "Eevee",
  "Squirtle",
  "Lickatung",
  "Meowth",
  "Ekans",
  "Koffing",
  "Muk",
  "Psyduck"
]
const initialButtons = initialSearches.map(
  search =>
    `<button class='generatedButton bbtn btn-outline-secondary' data-state="" data-person="${search}">${search}</button>`
)
$("#myButtons").append(initialButtons)
// Event listener for all button elements

$("#myButtons").on("click", ".generatedButton", async function() {
  // In this case, the "this" keyword refers to the button that was clicked
  var person = $(this).data("person")

  const queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    person +
    "&api_key=bVngz5WP33zjuUihdjRJXfSZQqDODhvh"

  // Performing our AJAX GET request
  const response = await $.ajax({
    url: queryURL,
    method: "GET"
  })
  // Constructing a URL to search Giphy for the name of the person who said the quote
  var { data: results } = response
  $("#gifs-appear-here").text("")
  // Looping over every result item
  for (var i = 0; i < 10; i++) {
    // Only taking action if the photo has an appropriate rating
    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
      // Creating a div with the class "item"
      var gifDiv = $("<div class='item'>")

      // Storing the result item's rating
      var rating = results[i].rating
      var still = results[i].images.fixed_height_still.url
      var animated = results[i].images.fixed_height.url
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + rating)

      // Creating an image tag
      var personImage = $("<img>")

      // Giving the image tag an src attribute of a proprty pulled off the
      // result item
      personImage.attr("src", still)
      personImage.attr("data-still", still)
      personImage.attr("data-animate", animated)
      personImage.addClass("gif")

      // Appending the paragraph and personImage we created to the "gifDiv" div we created
      gifDiv.append(p)
      gifDiv.append(personImage)
      if (personImage.attr("src") === still) {
        personImage.attr("data-state", "still")
      } else {
        personImage.attr("data-state", "animate")
      }
      // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
      $("#gifs-appear-here").prepend(gifDiv)
    }
  }
})

$("#gifs-appear-here").on("click", ".item img", function() {
  var state = $(this).attr("data-state")
  console.log("click")
  console.log(state)
  // STEP THREE: Check if the variable state is equal to 'still',
  if (state === "still") {
    // then update the src attribute of this image to it's data-animate value,
    $(this).attr("src", $(this).attr("data-animate"))
    console.log("still")
    // and update the data-state attribute to 'animate'.
    state = $(this).attr("data-state", "animate")
  }
  // If state is equal to 'animate', then update the src attribute of this
  else if (state === "animate") {
    $(this).attr("src", $(this).attr("data-still"))
    // image to it's data-still value and update the data-state attribute to 'still'
    state = $(this).attr("data-state", "still")
  }
})
