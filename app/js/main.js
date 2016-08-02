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




