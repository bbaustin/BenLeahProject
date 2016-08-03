// $('button').click(function(event){
$('select').change(function(event){  
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
      $('p').append('<h3>...now choose a legislator from the list below.</h3>');
      for (var i=0; i <response.length; i++) {
        $('p').append('<li> <a href='+response[i][2] + '>' + response[i][0] + '</a> </li>');
      }
    },
    error: function(error) {
      console.log("error: " + error);
    }
  });
});
// API Key: 787675d0ccec48fca8a936dc60ec27c6

$('#pic').load(function() {
  console.log("vote div loaded")


  // $.ajax({
  //   url:'https://www.govtrack.us/api/v2/vote/?congress=114&order_by=-created&limit=10',
  //   // https://www.govtrack.us/api/v2/vote
  //   // ***** URL for 114th congress last 10 votes
  //   type: 'get',
  //   dataType: 'json',
  //   // data: {
  //   //   legislator: params[:govtrack_id]
  //   // },
  //   success: function(response) {
  //     bill = response.objects[0].question;
  //     link = response.objects[0].link;
  //     console.log(response);
  //     console.log(bill);
  //     $('#question').append(bill);
  //     $('#link').append(link);

  //   },
  //   error: function(error) {
  //     console.log("error " + error );
  //   }
  // });

  $.ajax({
    url: 'https://www.govtrack.us/api/v2/committee_member',
    type: 'get',
    dataType: 'json',
    success: function(response) {
      // params = window.location.href;
      // govtrack = params.slice(-6);
      
      // console.log(response);
      
      // console.log(params);
      // console.log(govtrack);
      // var rep = {},
          // committee = {},
          // role = {};
       var match = []
      for (var i=0; i <response.length; i++) {
        // rep = govtrack 
      match.push(response.objects[i].person.id);
      
      }
      console.log(match);
      console.log(response);
      // if (govtrack == rep) {
      //   committee = response.objects[i].committee.name;
      //   role = response.objects[i].role;
      //   console.log(committee);
      //   console.log(role);
        
      // } else 
      //   console.log('no comittee')
      
      
    },
    error: function(error) {
      console.log("error " + error);
    }

  });

});



// '<li><a href=' + response[i][2] + '>' + 
// API Key: 787675d0ccec48fca8a936dc60ec27c6
