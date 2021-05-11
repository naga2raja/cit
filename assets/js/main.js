/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : CABC'S Group India Website
    Version         : 1.0
    
* ================================================================= */

(function($) {
    "use strict";

    $(document).on('ready', function() {

        /* =====================================================================
        *    # Auto website language setting based on Requestor Location
        ======================================================================*/
        // Get the path from URL
        var domainName   = window.location.origin;
        var pathName = $(location).attr('pathname');
        var parts = pathName.split("/");
        var pathContainsJP = pathName.indexOf('jp');
        // Set access key for Requester Lookup: Look up the data behind the IP address your API request is coming from.
        var access_key = '5f60e47920c11805ade447c0357d1a9f';

        // On Click of Logo, set session storage.
        $(".navbar-brand").click(function(){
            sessionStorage.setItem("langEngClick", "true");
        });
        // On Click of Home, set session storage.
        $(".active").click(function(){
            sessionStorage.setItem("langEngClick", "true");
        });
        // On Click of English Language setting, set session storage.
        $("#navEng").click(function(){
            sessionStorage.setItem("langEngClick", "true");
        });

        // On Click of Home in other pages except index.html, setting session storage.
        $(".dropdown").click(function(){
            sessionStorage.setItem("langEngClick", "true");
        });

        /* API call is made only when the visitor lands in the website for the firstime.
        Language setting are not specifically selected by the visitor. */		
        if (sessionStorage.getItem("langEngClick") != "true" && sessionStorage.getItem("firstArrivedPath") === null){
            //Get the country_code of the requestor from Ipstack API via jQuery.ajax
            $.ajax({
                url: 'http://api.ipstack.com/check' + '?access_key=' + access_key + '&fields=country_code& output = json' ,   
                dataType: 'json',
                success: function(json) {
                    // In case if requester is from Japan and initial web url is for English site
                    if (json.country_code ==  "JP" && sessionStorage.getItem("langEngClick") != "true" && (pathContainsJP == -1) && sessionStorage.getItem("firstArrivedPath") == null){
                        
                        // HTTP redirect to Japanese site
                        var url= domainName  + '/jp' + pathName;
                        window.location.replace(url);
                    }
                    // In case if requester is from any other country except Japan and initial web url is for Japanese site
                    else if (json.country_code !=  "JP" && (pathContainsJP != -1) && sessionStorage.getItem("langEngClick") != "true" && sessionStorage.getItem("firstArrivedPath") == null){
                        // Replace JP pathname to Englist site path name 
                        ePathName= pathName.replace("/jp", "");
                        
                        // HTTP redirect to English site
                        var url= domainName + ePathName;
                        window.location.replace(url);
                    }
                    // Incase of improper API response, allow the first loaded URL.
                    else if(json['error']){
                        console.log("API returns with no response due to "+ json.error.info);
                    }                    
                    // After reaching proper Website,  setting proper session storage values.
                    sessionStorage.setItem("firstArrivedPath", pathName);
                    sessionStorage.setItem("langEngClick", "false");
                },
                // Incase of AJAX call failure.
                error: function(jqHXR, textStatus , errorThrow){
                    console.log("API call fails due to stated reasons. Text status : " + textStatus  + " Text errorThrow : " + errorThrow);
                    // After reaching default Website,  setting proper session storage values.
                    sessionStorage.setItem("firstArrivedPath", pathName);
                    sessionStorage.setItem("langEngClick", "false");
                }
            }); // End of ajax call
        }// End of If condition

        /* ==================================================
            # Wow Init
         ===============================================*/
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
        

        /* ==================================================
            # Tooltip Init
        ===============================================*/
        $('[data-toggle="tooltip"]').tooltip(); 
        


        /* ==================================================
            # Smooth Scroll
         ===============================================*/
        $("body").scrollspy({
            target: ".navbar-collapse",
            offset: 200
        });
        $('a.smooth-menu').on('click', function(event) {
            var $anchor = $(this);
            var headerH = '75';
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });


        /* ==================================================
            # Banner Animation
        ===============================================*/
        function doAnimations(elems) {
            //Cache the animationend event in a variable
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        }

        //Variables on page load
        var $immortalCarousel = $('.animate_text'),
            $firstAnimatingElems = $immortalCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        //Initialize carousel
        $immortalCarousel.carousel();
        //Animate captions in first slide on page load
        doAnimations($firstAnimatingElems);
        //Other slides to be animated on carousel slide event
        $immortalCarousel.on('slide.bs.carousel', function(e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });


        /* ==================================================
            # Equal Height Init
        ===============================================*/
        $(window).on('resize', function() {
            $(".equal-height").equalHeights();
        });

        $(".equal-height").equalHeights().find("img, iframe, object").on('load', function() {
            $(".equal-height").equalHeights();
        });


        /* ==================================================
            # Youtube Video Init
         ===============================================*/
        $('.player').mb_YTPlayer();


        /* ==================================================
            # imagesLoaded active
        ===============================================*/
        $('#portfolio-grid,.blog-masonry').imagesLoaded(function() {

            /* Filter menu */
            $('.mix-item-menu').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });

            /* filter menu active class  */
            $('.mix-item-menu button').on('click', function(event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

            /* Filter active */
            var $grid = $('#portfolio-grid').isotope({
                itemSelector: '.pf-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.pf-item',
                }
            });

            /* Filter active */
            $('.blog-masonry').isotope({
                itemSelector: '.blog-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.blog-item',
                }
            });

        });


         /* ==================================================
            # Fun Factor Init
        ===============================================*/
        $('.timer').countTo();
        $('.fun-fact').appear(function() {
            $('.timer').countTo();
        }, {
            accY: -100
        });


        /* ==================================================
            # Magnific popup init
         ===============================================*/
        $(".popup-link").magnificPopup({
            type: 'image',
            // other options
        });

        $(".popup-gallery").magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            // other options
        });

        $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        $('.magnific-mix-gallery').each(function() {
            var $container = $(this);
            var $imageLinks = $container.find('.item');

            var items = [];
            $imageLinks.each(function() {
                var $item = $(this);
                var type = 'image';
                if ($item.hasClass('magnific-iframe')) {
                    type = 'iframe';
                }
                var magItem = {
                    src: $item.attr('href'),
                    type: type
                };
                magItem.title = $item.data('title');
                items.push(magItem);
            });

            $imageLinks.magnificPopup({
                mainClass: 'mfp-fade',
                items: items,
                gallery: {
                    enabled: true,
                    tPrev: $(this).data('prev-text'),
                    tNext: $(this).data('next-text')
                },
                type: 'image',
                callbacks: {
                    beforeOpen: function() {
                        var index = $imageLinks.index(this.st.el);
                        if (-1 !== index) {
                            this.goTo(index);
                        }
                    }
                }
            });
        });


        /* ==================================================
            # Testimonial Carousel
         ===============================================*/
        $('.testimonial-carousel').owlCarousel({
            loop: false,
            margin: 50,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1200: {
                    items: 2
                }
            }
        });


        /* ==================================================
            # Case Carousel
         ===============================================*/
        $('.case-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: true,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });


        /* ==================================================
            # Services Carousel
         ===============================================*/
        $('.services-carousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: true,
            autoplay: true,
            responsive: {
                0: {
                    items: 1
                },
                800: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });


        /* ==================================================
            # Clients Carousel
         ===============================================*/
        $('.clients-carousel').owlCarousel({
            loop: false,
            margin: 80,
            nav: false,
            navText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            dots: false,
            autoplay: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 3
                }
            }
        });


        /* ==================================================
            Preloader Init
         ===============================================*/
        $(window).on('load', function() {
            // Animate loader off screen
            $(".se-pre-con").fadeOut("slow");;
        });



        /* ==================================================
            Nice Select Init
         ===============================================*/
        $('select').niceSelect();


        /* ==================================================
            Contact Form Validations
        ================================================== */
        $('.contact-form').each(function() {
            var formInstance = $(this);
            formInstance.submit(function() {

                var action = $(this).attr('action');

                $("#message").slideUp(750, function() {
                    $('#message').hide();

                    $('#submit')
                        .after('<img src="assets/img/ajax-loader.gif" class="loader" />')
                        .attr('disabled', 'disabled');

                    $.post(action, {
                            name: $('#name').val(),
                            email: $('#email').val(),
                            phone: $('#phone').val(),
                            comments: $('#comments').val()
                        },
                        function(data) {
                            document.getElementById('message').innerHTML = data;
                            $('#message').slideDown('slow');
                            $('.contact-form img.loader').fadeOut('slow', function() {
                                $(this).remove()
                            });
                            $('#submit').removeAttr('disabled');
                        }
                    );
                });
                return false;
            });
        });

        // Function to open the map tab on click of View Map link
        var url = document.location.toString();
        if (url.match('#')) {
            $('#' + url.split('#')[1]).tab('show');
        }

    }); // end document ready function
})(jQuery); // End jQuery