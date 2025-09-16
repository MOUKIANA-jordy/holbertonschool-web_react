import $ from 'jquery';
import './header.css';

$(document).ready(function() {
  $('body').prepend('<div id="logo"></div><h1>Holberton Dashboard</h1>');
  console.log('Init header');
});
