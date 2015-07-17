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
      
      /* Link Settings */
			linkclass:                 ".slidenav-link", // Link class (minus the dot)
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
      containermax:           'false', // Container max-width or 'false'
      padenable:                 'true', // Enable container padding to account for links
      padvalue:                 'linksize'// Container padding amount, takes size value or 'linksize'

    }, options, objD );

    
    var objD;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    
    function readMore() {
      if (options.linkmoreimage == 'false' ) {
        $(options.section).not(options.section + ':last').append('<a href="/" class="' + options.linkmore + '">Next</a>');
      } else {
        $(options.section).not(options.section + ':last').append('<a href="/" class="' + options.linkmore + '"><img src="' + options.linkmoreimage + '" class="' + options.linkimageclass + '" /></a>');
      };
    }

    function readLess() {
      if (options.linklessimage == 'false' ) {
        $(options.section).not(options.section + ':first').prepend('<a href="/" class="' + options.linkless + '">Prev</a>');
      } else {
        $(options.section).not(options.section + ':first').prepend('<a href="/" class="' + options.linkless + '"><img src="' + options.linklessimage + '" class="' + options.linkimageclass + '" /></a>');
      };
    }

    function fadeLinks() {
      $('a').fadeToggle(250);
    }
    
    
    function prepareDOM() {
      readLess();
      readMore();
      
      if (options.linkborder != 'none' ) {
        $("." + options.linkmore + ", ." + options.linkless ).css({'border': options.linkborder});
      };

      if (options.containermax != 'false' ) {
        $(options.inner ).css({'max-width': options.containermax});
      };

      $(options.wrapper).css({'position': 'fixed',
                              "height":windowHeight+"px",
                              'top':'0',
                              'left':'0',
                              'right':'0'
      });
      
      $(options.section).css({'height':windowHeight+'px',
                              'position':'absolute',
                              'top': 0, 
                              'left': '0', 
                              'right': '0'
      });

      $(options.inner).css({'height':windowHeight+'px',
                            'position':'relative',
                            'width': '100%'
      });
      
      $("." + options.linkmore + ", ." + options.linkless ).css({'position':'absolute', 
                                                         'text-align':'center',
                                                         'color': options.linkcolor, 
                                                         'background-color': options.linkbackground,
                                                         'text-decoration':'none',
                                                         'z-index': 1,
                                                         'padding':options.linkpadding,
                                                         'border-radius':options.linkradius,
                                                         'outline': 0
      });
      
      $(options.section).not(options.section + ':first').css({'top': windowHeight+'px'});

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
          
          $('.' + options.linkmore + ', .' + options.linkless)
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
          
          $('.' + options.linkmore + ', .' + options.linkless)
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
          $('.' + options.linkmore + ', .' + options.linkless)
            .css({'height': options.linkheight,
                  'width': options.linkwidth,
                  'line-height': options.linkheight,
                });
          if (options.linkposition == 'left') {
            $('.' + options.linkmore + ', .' + options.linkless)
              .css({'left': options.linkhmargin});
          } else {
            $('.' + options.linkmore + ', .' + options.linkless)
              .css({'right': options.linkhmargin});
          };
          
          $('.' + options.linkmore )
            .css({'bottom': options.linkvmargin});
          $('.' + options.linkless )
            .css({'top': options.linkvmargin});
          break;


        case 'horizontal': 

          $('.' + options.linkmore + ', .' + options.linkless)
            .css({'height': options.linkheight,
                  'width': options.linkwidth,
                  'line-height': options.linkheight,
                });
          
          if (options.linkposition == 'top') {
            $('.' + options.linkmore + ', .' + options.linkless)
              .css({'top': options.linkvmargin});
          } else {
            $('.' + options.linkmore + ', .' + options.linkless)
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
    
    
    $("." + options.linkless).click(function(e) {
      e.preventDefault();
      
      var prevSection = $(this).parent().prev()
      var originSection = $(this).parent()
      var originContainer = $(this)
      
      fadeLinks();
      
      originSection.delay(250).animate({'top':'100%'}, 1000, 'easeOutCirc');
      prevSection.delay(250).animate({'top':'0px'},1000, 'easeOutCirc', function() {
        fadeLinks();
      });
      
      
    });

    $("." + options.linkmore).click(function(e) {
      e.preventDefault();

      var nextSection = $(this).parent().next()
      var originSection = $(this).parent()
      var originContainer = $(this)

      fadeLinks();

      originSection.delay(250).animate({'top':'-100%'}, 1000, 'easeOutCirc');
      nextSection.delay(250).animate({'top':'0px'},1000, 'easeOutCirc', function() {
        fadeLinks();
      });
    });
  };
}( jQuery ));
