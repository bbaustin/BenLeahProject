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
        $('p').append('<li> <a href='+response[i][2] + '>' + response[i][0] + '</a> </li>');
      }
    },
    error: function(error) {
      console.log("error: " + error);
    }
  });
});

$('#pic').load(function() {
  console.log("vote div loaded")

  $.ajax({
    url:'https://www.govtrack.us/api/v2/vote',
    // https://www.govtrack.us/api/v2/vote/?congress=114&order_by=-created&limit=10
    // ***** URL for 114th congress last 10 votes
    type: 'get',
    dataType: 'json',
    // data: {
    //   legislator: params[:govtrack_id]
    // },
    success: function(response) {
      // bill = object[0].chamber;
      console.log(response);
      console.log(bill);
    }
  });

});



// '<li><a href=' + response[i][2] + '>' + 
// API Key: 787675d0ccec48fca8a936dc60ec27c6
