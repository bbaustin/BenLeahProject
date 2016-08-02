$('button').click(function(event){
  event.preventDefault();

  $.ajax({
    url: '/',
    type: 'post',
    data: { 
      state: $('select[name=state]').val() 
    },
    success: function(response) {
      
      console.log("success: " + response);

    },
    error: function(error) {
      console.log("error: " + error);
    }
  });
});


// Leah is working here
// ***********************************

// write ajax call using govttack_id to get photo and last 3 votes
// Create learn more button on home.erb

$('#learn-more').click(function(event) {
  event.preventDefault();

  var id = 

  $.ajax({
    url:'https://www.govtrack.us/data/photos/'+id+'-200px.jpeg',
    type: 'get'
    data: {

    },
    success: function(res) {

    },
    error: function(err){

    }
  });
});
