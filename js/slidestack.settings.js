$(document).ready(function() {
  $('#slidestack').slidestack({
    wrapper:              "#slidestack", // Main overall wrapper for the slides
    section:              ".slide", // Slide class
    inner:              ".slide-container", // Slide inner container
    bgColor:              "transparent", // Can use HEX colors or RGB(A)
    speed:                1000, // In milliseconds
    
    /* Link Settings */
		linkmore:                 'next-slide', // Next page link class (minus the dot)
    linkless:                 'prev-slide', // Previous page link class (minus the dot)
		linkmoreimage:                 '/img/arrow-down.png', // Next page link image, 'false' or src url
    linklessimage:                 '/img/arrow-up.png', // Previous page link image, 'false' or src url
    linkcolor:            '#FFF', // Can use HEX colors or RGB(A)
    linkbackground:            'transparent', // Can use HEX colors or RGB(A)
    linklayout:            'updown',  // Available settings - 'updown', 'sides', 'horizontal' and 'vertical'
    linkposition:          'left', // 'left' & 'right' for vertical layout, 'top' & 'bottom' for horizontal layout
    linkvmargin:            '1rem', // Link vertical margin
    linkhmargin:            '1rem', // Link horizontal margin
    linkpadding:             '0.5rem 0', // Link padding
    linkheight:             'unset', // Link height
    linkwidth:             '60px', // Link width
    linkradius:             '5px', // Link border radius
    linkborder:             'none', // Use CSS border shorthand for this, or just 'none'
    
    /* Container Settings */
    containermax:           'false', // Container max-width or 'false'
    padenable:                 'true', // Enable container padding to account for links
    padvalue:                 'linksize'// Container padding amount, takes size value or 'linksize'
  });
});

