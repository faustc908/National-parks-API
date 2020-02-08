'use strict'

const NPS_key = 'H3q6H7L3ynoL4iivTIXyOAaPPPs9DR1HOXbLoOeU';
const NPS_url = 'https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1';
let lastState = '';

$(function onPageReady(){
  submitQuery ();
})

function submitQuery () {
  $('form').submit(function (e) {
    e.preventDefault(); 
    let userInput = parseInt( $('#maxResults').val().trim(), 10 ) || 10;
    let userMax = userInput;
    const userStateReq = $('#state').val().trim();
    console.log ('Input captured: ' + userInput);
    console.log ('State input captured ' + userStateReq);
    return showInfo(userMax, userStateReq)
      .then(function (data) {
        showResults(data, userInput);
      });
  });   
}

function showInfo (userInput, pickState) {
  lastState = pickState;
  return npsResult(`/parks?stateCode=${pickState.trim()}&limit=${userInput}`)
  .then (response => response.json())
}

function npsResult(show){
  return fetch (NPS_url + show, {
    headers: {
      'X-Api-Key': NPS_key
    }
  })
}

function showResults (park, userMax) {
  console.log(park);
  let parksHTML = park.data.map(displayPark).join('\n');
  $('#results').append(`<h2>Showing ${userMax} Results for ${lastState}</h2><ol>${parksHTML}</ol><br>`); 
}

function displayPark(park){
  return `<li>Park Full Name: ${park.fullName} <br>Description: ${park.description}<br>URL: ${park.url}</li>`;
}

$('form').submit(function(e){
  $("#results").html("");
})
