$('select').change(function(event) {  
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


function votePercent() {
  var eligible = ($('.eVotes').text()).split(": ");
  eligible[1] = parseInt(eligible[1]);
  
  var missed  = ($('.mVotes').text()).split(": ");
  missed[1] = parseInt(missed[1]);

  var percent = missed[1]/eligible[1];

  return percent; 
}

function makePie() {
  var sheet = document.styleSheets[1]; 
  $('.votingHistory').append('div')
    .css({
      "width": "10em",
      "height": "10em",
      "border-radius": "50%", 
      "background-color": "#3296ff", 
      "background-image": "linear-gradient(to right, transparent 50%, ghostwhite 0)",
      "overflow": "hidden"
    });
    sheet.insertRule(".votingHistory::before { content: ''; display: block; margin-left: 50%; height: 100%; background-color: inherit;  transform-origin: left; transform: rotate(" + votePercent() + "turn);", (sheet.cssRules.length));

}
makePie();

console.log(document.styleSheets[1]);

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
      params = window.location.href;
      govtrack = parseInt(params.slice(-6));
      
      console.log(response);

        
        for (var i = 0; i < response.objects.length; i++) {

          if (govtrack == response.objects[i].person.id) {
            var committee = response.objects[i].committee.name;
            var role = response.objects[i].role;
            var comRes = role + " of " + committee; 
            $('.committee').append(comRes);
            console.log(committee);
            console.log(role);
          } 
          else 
            console.log('no committee')        
          }
      // console.log(match);
      // console.log(response);
      // console.log(response.objects.length)
    },
    error: function(error) {
      console.log("error " + error);
    }
  });


$.ajax({
  url: 'https://www.govtrack.us/api/v2/committee_member',
  type: 'get',
  dataType: 'json',
  success: function(response) {
    var params = window.location.href;
    var govtrack = parseInt(params.slice(-6));      
    var counter = 0; 
    for (var i = 0; i < response.objects.length; i++) {
      if (govtrack == response.objects[i].person.id) {
        var committee = response.objects[i].committee.name;
        var role = response.objects[i].role_label;
        var comRes = role + " of " + committee; 
        $('.committee').append('<li>' + comRes + '</li>');
        counter++;
      } 

    }
    if (counter === 0) {
      $('.committee').append('<li>This government official is not currently a member of any congressional committees.</li>');
    }
  },
  error: function(error) {
    console.log("error " + error);
  }
});

$('#submit').click(function(event) {
  event.preventDefault();
  console.log('you clicked me');
  
  var street = document.getElementById('street').value,
      city = document.getElementById('city').value,
      state = document.getElementById('state').value,
      zip = document.getElementById('zip').value,
      address = street + city + state + zip;   

  function lookup(address, callback) {
    var roles = ['legislatorLowerBody', 'legislatorUpperBody'];
    var levels = 'country'
        // street = document.getElementById('street').value,
        // city = document.getElementById('city').value,
        // state = document.getElementById('state').value,
        // zip = document.getElementById('zip').value,
        // address = street + city + state + zip; 
    var req = gapi.client.request ({
      'path' : '/civicinfo/v2/representatives',
      'params' : {'roles' : roles, 'address' : address}
    });

    req.execute(callback);
    console.log(address);
    // return address

  }

  function renderResults (response, rawResponse) {
   $('p').html("");
   $('p').append('<h3>...now choose a legislator from the list below.</h3>');
    
   for (var i = 0; i < response.officials.length; i++) {
     $('p').append('<li> <a href= ' + response.officials[i].name + '>' +response.officials[i].name+ '</a> </li>'); 
     console.log(response.officials[i].name);
   }  


    console.log(response);

  }

  function load() {
    gapi.client.setApiKey('AIzaSyA_GuGo39tzdSFX2VHzvfdByqfzLQLxR-U');
    lookup(address, renderResults);
    // console.log(load);
  }
    load();
});  

// using google javascript client for API

// $('#submit').click(function(event){
//   event.preventDefault();
  
//   $.ajax({
//     url: 'https://www.googleapis.com/civicinfo/v2/representatives?adress='+address+'&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=AIzaSyA_GuGo39tzdSFX2VHzvfdByqfzLQLxR-U',
//     type: 'get',
//     dataType: 'json',
//     data: {
//       address: $('#street').val()+$('#city').val()+$('#state').val()+$('#zip').val()
//     },
//     success: function(response) {
//       console.log(response);
//       console.log(address);

//     },
//     error: function(error) {
//       console.log("no info" + error)
//     }
//   });
// });

// Fire api call on submit of adress form


// example of get request to google civic info api

$.ajax({
  url: 'https://www.govtrack.us/api/v2/bill?sort=-introduced_date',
  type: 'get',
  dataType: 'json',
  success: function(response) {
    var params = window.location.href;
    var govtrack = parseInt(params.slice(-6));
    var counter = 0;
    for (var i = 0; i < response.objects.length; i++) { 
      if (govtrack == response.objects[i].sponsor.id) {
        $('.bill').append('<li>' + response.objects[i].title + '</li>');
        $('.bill').append('<li>' + response.objects[i].introduced_date + '</li>');
        counter++;
        console.log(counter);
        console.log(i);
      }
    }
    if (counter === 0) {
      $('.bill').append('<li>This government official has not sponsored any bills in 2016.</li>');
    }
  },
  error: function(error) {
    console.log("error " + error);
  }
});


// GET https://www.googleapis.com/civicinfo/v2/representatives?address=14023+sw+151st+ave+Miami%2C+FL+33196&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key={YOUR_API_KEY}


// '<li><a href=' + response[i][2] + '>' + 
// API Key: 787675d0ccec48fca8a936dc60ec27c6
