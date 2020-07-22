// js-jq-ajax-api-musica
// Attraverso una chiamata ajax all'Api di boolean avremo a
// disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo.
// In questo momento non è importante la parte grafica.
// Bonus: Creare una select con i seguenti generi: pop, rock,
// metal e jazz. In base a cosa scegliamo nella select vedremo i
// corrispondenti cd.
// Chiamata:
// https://flynn.boolean.careers/exercises/api/array/music

$(document).ready(init);

// FUNZIONI
function init() {
  addDischi();
}

  function addDischi() {
    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/array/music",
      method: "GET",
      success: function(data, state) {

        var success = data["success"];
        var array = data["response"];

        if (success) {
          var genere = $("#genere-musicale > option");
          console.log(genere);
          genere.click(getGeneri(array));
          getDischi(array);
        } else {
          console.log("errore");
        }

      },
      error: function(request, state, error) {
        console.log("request",request);
        console.log("state",state);
        console.log("error",error);
      }
    });
  }

    function getDischi(arr) {

      var discoTemplate = $("#template-disco").html();
      var compiled = Handlebars.compile(discoTemplate);
      var discotarget = $("#cd");
      for (var i = 0; i < arr.length; i++) {
        var discoHtml = compiled({
          "title": arr[i]["title"],
          "poster": arr[i]["poster"],
          "author": arr[i]["author"],
          "year": arr[i]["year"],
          "genre": arr[i]["genre"]
        });
        discotarget.append(discoHtml);
      }
    }

    function getGeneri(arr) {
      console.log(arr);
      var genereMusicale = $(this).value;

      console.log(genereMusicale);

    }
