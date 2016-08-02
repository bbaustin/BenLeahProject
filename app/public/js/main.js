$('button').click(function(event){
  event.preventDefault();

  $.ajax({
    url: '/',
    type: 'post',
    // dataType: 'json',
    data: { 
      state: $('select[name=state]').val() 
    },
    success: function(response) {
      console.log(typeof response);
      console.log(response);
      $('p').html("");
      for (var i=0; i <response.length; i++) {
        $('p').append('<li>' + response[i][0] + '</li>');
      }
    },
    error: function(error) {
      console.log("error: " + error);
    }
  });
});
<<<<<<< HEAD:app/js/main.js


// Leah is working here
// ***********************************




=======
>>>>>>> af8b89dd23f5db5d95205d41d01d953c5e699932:app/public/js/main.js
