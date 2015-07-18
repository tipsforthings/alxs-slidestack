/* ALXS Design - jQuery Slidestack */
/* Written by Alex Scott aka ALXS */
/* Started on Friday 2 Apr 2015 */

/********* v.0.0.1.beta1 **********/

(function($) {
  
	$.fn.slidestack = function(options) {

    var options = $.extend({
      wrapper:              "#slidestack", // Main overall wrapper for the slides
      section:              ".slide", // Slide class
      inner:              ".slide-container", // Slide inner container
      bgColor:              "transparent", // Can use HEX colors or RGB(A)
      speed:                1000, // In milliseconds
      easein:                'linear', // Page transition easing, any jQuery compatible easing can go here
      easeout:                'linear', // Page transition easing, any jQuery compatible easing can go here
      direction:                'vertical', // Page transition easing, any jQuery compatible easing can go here
      centercontent:            'true', // Vertically and horizontally align content in each slide
      
      /* Link Settings */
			linkclass:                 "slidenav-link", // Link class (minus the dot)
			linkimageclass:                 "slidenav-link-image", // Link image class (minus the dot)
			linkimageheight:                 '30px', // Takes size value or 'linksize'
			linkimagewidth:                 'linksize', // Takes size value or 'linksize'
			linkmore:                 "next-slide", // Next page link class (minus the dot)
		  linkmoreimage:                 'false', // Next page link image, 'false' or src url
      linkless:                 "prev-slide", // Previous page link class (minus the dot)
      linklessimage:                 'false', // Previous page link image, 'false' or src url
      linkcolor:            "#FFF", // Can use HEX colors or RGB(A)
      linkbackground:            "rgba(0,0,0,0.4)", // Can use HEX colors or RGB(A)
      linklayout:            "sides",  // Available settings - 'updown', 'sides', 'horizontal' and 'vertical'
      linkposition:          "right", // 'left' & 'right' for horizontal layout, 'top' & 'bottom' for vertical layout
      linkvmargin:            "1rem", // Link vertical margin
      linkhmargin:            "1rem", // Link horizontal margin
      linkpadding:             "0", // Link padding
      linkheight:             "60px", // Link height
      linkwidth:             "30px", // Link width
      linkradius:             "5px", // Link border radius
      linkborder:             "none", // Use CSS border shorthand for this, or just 'none'
      
      /* Container Settings */
      containermax:           '1080px', // Container max-width or 'false'
      padenable:                 'true', // Enable container padding to account for links
      padvalue:                 'linksize'// Container padding amount, takes size value or 'linksize'

    }, options, objD );

    
    var objD;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var documentWidth = $(document).width();

    
    function readMore() {
      if (options.linkmoreimage == 'false' ) {
        $(options.section).not(options.section + ':last').append('<a href="/" class="' + options.linkmore + ' ' + options.linkclass + '">Next</a>');
      } else {
        $(options.section).not(options.section + ':last').append('<a href="/" class="' + options.linkmore + ' ' + options.linkclass + '"><img src="' + options.linkmoreimage + '" class="' + options.linkimageclass + '" /></a>');
      };
    }

    function readLess() {
      if (options.linklessimage == 'false' ) {
        $(options.section).not(options.section + ':first').prepend('<a href="/" class="' + options.linkless + ' ' + options.linkclass + '">Prev</a>');
      } else {
        $(options.section).not(options.section + ':first').prepend('<a href="/" class="' + options.linkless + ' ' + options.linkclass + '"><img src="' + options.linklessimage + '" class="' + options.linkimageclass + '" /></a>');
      };
    }

    function fadeLinks() {
      $('a').fadeToggle(250);
    }
    
    function sortSizes() {
      windowHeight = $(window).height();
      windowWidth = $(window).width();
      var slide = $(options.section);
      var allcontainers = $(options.wrapper + ', ' + options.section + ', ' + options.inner)
      slide.each( function(i) {
        var top = $(this).css('top');
        var left = $(this).css('left');
        
        if (options.direction != 'horizontal' && top != '0px') {
          $(this).css({'top': windowHeight + 'px'});
        };
        if (options.direction == 'horizontal' && left != '0px') {
          $(this).css({'left': windowWidth + 'px','right': '-' + windowWidth + 'px'});
        };
      });

      allcontainers.css({'height':windowHeight+'px','width':windowWidth + 'px'});
    }
    $(window).resize(function() {
      sortSizes()
    });
    function prepareDOM() {
      readLess();
      readMore();
      
      var windowHeight = $(window).height();
      var windowWidth = $(window).width();

      if (options.linkborder != 'none' ) {
        $("." + options.linkclass ).css({'border': options.linkborder});
      };

      if (options.centercontent == 'true' ) {
        $(options.inner ).css({'display': 'table-cell', 'vertical-align':'middle', 'text-align':'center'});
      };

      $(options.wrapper).css({'position': 'fixed',
                              "height":windowHeight+"px",
                              'width': windowWidth + 'px',
                              'top':'0',
                              'left':'0',
                              'right':'0'
      });
      
      $(options.section).css({'height':windowHeight+'px',
                              'width': windowWidth + 'px',
                              'position':'absolute',
                              'top': 0, 
                              'left': '0', 
                              'right': '0'
      });

      $(options.inner).css({'height':windowHeight+'px',
                            'position':'relative',
                            'width': windowWidth + 'px'
      });
      
      $("." + options.linkclass).css({'position':'absolute', 
                                                         'text-align':'center',
                                                         'color': options.linkcolor, 
                                                         'background-color': options.linkbackground,
                                                         'text-decoration':'none',
                                                         'z-index': 1,
                                                         'padding':options.linkpadding,
                                                         'border-radius':options.linkradius,
                                                         'outline': 0
      });

      if (options.direction == 'horizontal') {
        $(options.section).not(options.section + ':first').css({'left': windowWidth+'px', 'right': '-' + windowWidth + 'px'});
      } else {
        $(options.section).not(options.section + ':first').css({'top': windowHeight+'px'});
      };

      if (options.linkimageheight == 'linksize') {
        $('.' + options.linkimageclass).attr({'height': options.linkheight}).css({'height': options.linkheight});
      } else {
        $('.' + options.linkimageclass).attr({'height': options.linkimageheight}).css({'height': options.linkimageheight});
      };

      if (options.linkimagewidth == 'linksize') {
        $('.' + options.linkimageclass).attr({'width': options.linkwidth}).css({'width': options.linkwidth});
      } else {
        $('.' + options.linkimageclass).attr({'width': options.linkimagewidth}).css({'width': options.linkimagewidth});
      };

      
      
      switch (options.linklayout) { 

        case 'updown': 
          
          $('.' + options.linkclass)
            .css({'left':0,
                  'right':0,
                  'height': options.linkheight,
                  'line-height':options.linkheight
                });
          
          $('.' + options.linkmore ).css({'bottom':0});
          $('.' + options.linkless ).css({'top':0});
          
          if (options.padenable == 'true' && options.padvalue == 'linksize' ) {
              $(options.inner).children('div').css({
                'padding-top': options.linkheight,
                'padding-bottom': options.linkheight
              });
          } else if (options.padenable == 'true' && options.padvalue != 'linksize' ) {
              $(options.inner).children('div').css({
                'padding-top': options.padvalue,
                'padding-bottom': options.padvalue
              });
          };
          
          break;
        
        case 'sides': 
          
          $('.' + options.linkclass)
            .css({'top':0,
                  'bottom':0,
                  'width': options.linkwidth,
                  'height': windowHeight+'px',
                  'line-height': windowHeight+'px'
                });
          
          $('.' + options.linkmore)
            .css({'right':0});
          
          $('.' + options.linkless )
            .css({'left':0});
          
          if (options.padenable == 'true' && options.padvalue == 'linksize' ) {
              $(options.inner).children('div').css({
                'padding-left': options.linkwidth,
                'padding-right': options.linkwidth
              });
          } else if (options.padenable == 'true' && options.padvalue != 'linksize' ) {
              $(options.inner).children('div').css({
                'padding-left': options.padvalue,
                'padding-right': options.padvalue
              });
          };
          
          break;
        
        case 'vertical': 
          $('.' + options.linkclass)
            .css({'height': options.linkheight,
                  'width': options.linkwidth,
                  'line-height': options.linkheight,
                });

          if (options.linkposition == 'left') {
            $('.' + options.linkclass)
              .css({'left': options.linkhmargin});
          } else {
            $('.' + options.linkclass)
              .css({'right': options.linkhmargin});
          };
          
          $('.' + options.linkmore )
            .css({'bottom': options.linkvmargin});

          $('.' + options.linkless )
            .css({'top': options.linkvmargin});

          break;


        case 'horizontal': 

          $('.' + options.linkclass)
            .css({'height': options.linkheight,
                  'width': options.linkwidth,
                  'line-height': options.linkheight,
                });
          
          if (options.linkposition == 'top') {
            $('.' + options.linkclass)
              .css({'top': options.linkvmargin});
          } else {
            $('.' + options.linkclass)
              .css({'bottom': options.linkvmargin});
          };
          
          $('.' + options.linkmore )
            .css({'right': options.linkhmargin});
          $('.' + options.linkless )
            .css({'left': options.linkhmargin});
          break;
        default:
          alert('Nobody Wins!');
      }
      //outputs "jQuery Wins!"      
    };

    prepareDOM();
    sortSizes()
    
    $("." + options.linkless).click(function(e) {
      e.preventDefault();
      
      var prevSection = $(this).parent().prev()
      var originSection = $(this).parent()
      var originContainer = $(this)
      
      fadeLinks();
      
      if (options.direction == 'horizontal') {
        originSection.delay(250).animate({'left': windowWidth + 'px', 'right' : '-' + windowWidth + 'px'}, 1000, options.easeout);
        prevSection.delay(250).animate({'left':'0px','right':'0px'},1000, options.easein, function() {
          fadeLinks();
        });
      } else {
        originSection.delay(250).animate({'top':'100%'}, 1000, options.easeout);
        prevSection.delay(250).animate({'top':'0px'},1000, options.easein, function() {
          fadeLinks();
        });
      };
      
      
    });

    $("." + options.linkmore).click(function(e) {
      e.preventDefault();

      var nextSection = $(this).parent().next()
      var originSection = $(this).parent()
      var originContainer = $(this)

      fadeLinks();

      if (options.direction == 'horizontal') {
        originSection.delay(250).animate({'left':'-' + windowWidth + 'px', 'right' : windowWidth + 'px'}, 1000, options.easeout);
        nextSection.delay(250).animate({'left':'0px','right':'0px'},1000, options.easein, function() {
          fadeLinks();
        });
      } else {
        originSection.delay(250).animate({'top':'-100%'}, 1000, options.easeout);
        nextSection.delay(250).animate({'top':'0px'},1000, options.easein, function() {
          fadeLinks();
        });
      };
    });
  };
}( jQuery ));
