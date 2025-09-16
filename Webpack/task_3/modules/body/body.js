import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$(document).ready(function() {
  $('body').append('<button id="btn">Click here to get started</button>');
  $('body').append("<p id='count'></p>");

  let count = 0;

  function updateCounter() {
    count++;
    $('#count').text(`${count} clicks on the button`);
  }

  $('#btn').on('click', _.debounce(updateCounter, 500));
});
