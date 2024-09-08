$(window).load(function(){

  var body = $("body"),
      universe = $("#universe"),
      solarsys = $("#solar-system");

  var init = function() {
    body.removeClass('view-2D opening').addClass("view-3D").delay(2000).queue(function() {
      $(this).removeClass('hide-UI').addClass("set-speed");
      $(this).dequeue();
    });
  };

  var setView = function(view) { universe.removeClass().addClass(view); };

  $("#toggle-data").click(function(e) {
    body.toggleClass("data-open data-close");
    e.preventDefault();
  });

  $("#toggle-controls").click(function(e) {
    body.toggleClass("controls-open controls-close");
    e.preventDefault();
  });

  // Function to send data to ESP8266
  var sendToESP8266 = function(planetNumber) {
    fetch(`http://your-esp8266-ip/send?number=${planetNumber}`, {
      method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
      console.log("Sent to ESP8266: " + planetNumber);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  $("#data a").click(function(e) {
    var ref = $(this).attr("class");
    solarsys.removeClass().addClass(ref);
    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');
    
    // Assign a unique number to each planet
    var planetNumber;
    switch(ref) {
      case 'mercury': planetNumber = 1; break;
      case 'venus': planetNumber = 2; break;
      case 'earth': planetNumber = 3; break;
      case 'mars': planetNumber = 4; break;
      case 'jupiter': planetNumber = 5; break;
      case 'saturn': planetNumber = 6; break;
      case 'uranus': planetNumber = 7; break;
      case 'neptune': planetNumber = 8; break;
      case 'pluto': planetNumber = 9; break;
      default: planetNumber = 0; break;
    }

    // Send the planet number to the ESP8266
    sendToESP8266(planetNumber);

    e.preventDefault();
  });

  $(".set-view").click(function() { body.toggleClass("view-3D view-2D"); });
  $(".set-zoom").click(function() { body.toggleClass("zoom-large zoom-close"); });
  $(".set-speed").click(function() { setView("scale-stretched set-speed"); });
  $(".set-size").click(function() { setView("scale-s set-size"); });
  $(".set-distance").click(function() { setView("scale-d set-distance"); });

  init();

});
