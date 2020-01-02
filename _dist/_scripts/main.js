/*!
 * Scripts for Stoddart code test by Nimrod Evans 2020-01-01
 */

///////////////////////////
// Custom Hamburger Menu //
///////////////////////////
/**
 * Requires: jQuery
 * Written by: Nimrod Evans
 * Last updated: 2019-12-24
 */

$("#hamburger-menu").click( function(e) {
  $this = $("#"+this.id);

  if( !$('#main-nav-wrapper').hasClass('rclosed') ) {
    $this.attr("aria-expanded","false");
    $('#site-search-wrapper').addClass('rclosed');
    $('#user-nav').addClass('rclosed');
    $('#main-nav-wrapper').addClass('rclosed');
  } else {
    $this.attr("aria-expanded","true");
    $('#site-search-wrapper').removeClass('rclosed');
    $('#user-nav').removeClass('rclosed');
    $('#main-nav-wrapper').removeClass('rclosed');
  }
});

/////////////////////
// Custom dropdown //
/////////////////////
/**
* Note: Entirely seperate from hamburger menu
* Requires: jQuery
* Written by: Nimrod Evans
* Last updated: 2020-01-01
*/

// Close all open downdowns function
function customDropdownCloseAll() {
  $("*.customdropdown").attr("aria-expanded","false");
  $("*.customdropdown-panel").not(".closed").addClass('closed');
  window.removeEventListener('click', customDropdownCloseAll);
}

// Initiate dropdown
$(".customdropdown").click( function(e) {
  $this = $("#"+this.id);

  e.preventDefault();
  window.removeEventListener('click', customDropdownCloseAll); // Make sure there is no close all listener
  customDropdownCloseAll(); // Clear all other tabs

  if( $this.attr("aria-expanded") == "false" ) {
    // Open dropdown
    $this = $("#"+this.id);
    $this.attr("aria-expanded","true");
    $("*[aria-labelledby="+this.id).removeClass('closed');
    setTimeout(function(){window.addEventListener('click', customDropdownCloseAll); }, 1);
  }
});



/////////////////////
// Initialisations //
/////////////////////

// Initiate Tabs
// Requires: jQuery, jQueryUI
$(function() {
  $('.tabs').tabs();
});

// Initiate fotorama
// Requires: jQuery, fotorama (https://cdnjs.cloudflare.com/ajax/libs/fotorama/4.6.4/fotorama.js)
var productImageControls = (function () {
  var $fotoramaDiv = $('#product-image-focus').fotorama();
  return $fotoramaDiv.data('fotorama');
})();

// Initiate custom fotorama navigation
$('.product-image-main nav img').each(function(i){
  $(this).on('click', function(e) {
    productImageControls.show(i);
  });
});

