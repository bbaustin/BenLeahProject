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



'<li><a href=' + response[i][2] + '>' + 
