var rootPath = 'http://localhost:8888/troyhollinger.com/img/';

function mobile() {
	if($(window).width() < 3000) {
		return true;
	} else {
		return false
	}
}

var stopwatch = {
	init : function() {
		var _ = this;

		_.iterate();
	},
	// Set array of letters to be cycled through.
	letters : ["T", "R", "O", "Y", "H", "O", "L", "I", "N", "G", "E", "R"],

	element : $("#stopwatch"),

	iterate : function() {
		var _ = this,
			i = 0;

		setInterval(function(){
			if(i == _.letters.length) { i = 0; }

			var letter = _.letters[i];

			_.element.html(letter);

			i++;

		}, 35);
	}
}

var navEffects = {
	init: function() {
		var _ = this;
		var secondClick = false;

		$("li").on({
			mouseenter : function(){_.hoverIn($(this))},
			mouseleave : function(){_.hoverOut($(this))}
		});

		$("li").not('#about').click(function() {

			// if(secondClick) {
			// 	$("li").on({
			// 		mouseenter : function(){_.hoverIn($(this))},
			// 		mouseleave : function(){_.hoverOut($(this))}
			// 	});

			// 	secondClick = false;

			// } else {
				$(this).off();
				$(this).fadeIn();
			// 	secondClick = true;
			// }

		});
	},

	hoverIn : function(that) {
		that.find('.reveal').stop().fadeIn('fast');
		that.find('.title').stop().fadeOut('fast');
	},
	hoverOut : function(that) {
		that.find('.title').fadeIn('fast');
		that.find('.reveal').fadeOut('fast');
	}

}

// Object for About section viewing functionality.
var about = {
	init : function() {
		var _ = this;

		_.hint();
		_.extended();
	},
	// Set hover listener on about nav element.
	hint : function() {
		$("#about").hover(function() {	
			$("#about-title").fadeOut('fast');
			$(".about-text").fadeIn('fast');
		}, function() {
			$("#about-title").fadeIn('fast');
			$(".about-text").fadeOut('fast');
		});
	},
	full : $("#about-extended, .read-less"),
	x : $("#about-x"),
	blackLogo : $("#logo"),
	whiteLogo : $(".white-logo"),
	others : $(".nav, #stopwatch-container"),
	clickIterator : false,

	// Set click listeners on extended about viewing toggle buttons.
	extended : function() {

		var _ = this;

		$("#about").click(function() {
			_.appear();
		});

		$(".read-less").click(function() {
			_.disappear();
		});

		$(window).click(function() {

			if (_.clickIterator) {
				_.disappear();
			}
			
		});
	},
	appear : function() {
		var _ = this;

		_.full.fadeIn('fast');
		_.others.fadeOut('fast');

		setTimeout(function() {
			_.clickIterator = true;	
		}, 50);

	},
	disappear : function() {
		var _ = this;

		_.full.fadeOut('fast');
		_.others.fadeIn('fast');
		_.clickIterator = false;
	}
}

var mobileAbout = {
	init : function() {
		var _ = this;

		_.tap();
		_.about();
	},
	tap : function() {
		$("#mobile-menu").click(function() {
			$("#mobile-about-overlay").attr("style", "height:65%;padding: 30px 30px 30px 30px");
			$("#mobile-about-x").fadeIn('fast');
			$(this).fadeOut('fast');
		});

		$("#mobile-about-x").click(function() {

			if($(this).hasClass('close-about')) {
				$("#mobile-about-section").fadeOut('fast');
				$("#mobile-about-overlay").fadeIn('fast');
				$(this).removeClass('close-about');
			} else {
				$("#mobile-about-overlay").attr("style", "height:0%;padding: 0px 30px 0px 30px;");
				$("#mobile-menu").fadeIn('fast');
				$(this).fadeOut('fast');
			}

			
		});
	},
	about : function() {
		
		$("#mobile-about-overlay").on('click', '#mobile-about-text', function() {
			console.log('clicked');
			$("#mobile-about-section").fadeIn('fast');
			$("#mobile-about-overlay").fadeOut('fast');
			$("#mobile-about-x").addClass('close-about');
		})
	}
}


// Object for the project viewing state.
var viewer = {
	init : function() {
		var _ = this;

		_.trigger();
		
	},

	spinnerExists : false,
	stopwatch : $("#stopwatch-container"),
	$spinner : $("#spinner"),
	x : $("#viewer-x"),
	images : null,
	mobileTrigger : false,

	// Build & show the project viewer state.
	construct : function() {

		var _ = this;

		$("body").removeClass('initial').addClass('viewer');

		if (!_.spinnerExists) {
			_.spinner();

			// Set Up Arrow Controls.
			$(".previous").click(function() {
				_.$spinner.data().rollerblade.decrement();
				_.extraControls.linkSet();
			});

			$(".next").click(function() {
				_.$spinner.data().rollerblade.increment();
				_.extraControls.linkSet();
			});

			// Do not send controls to mobile browsers
			if(!mobile()) {
				_.spinnerControl();	
			}
			
		} else {
			// Spinner already exists, make it spin.
			_.spinnerFast();
		}

		if(mobile()) {
			// _.spinnerStop();
			$("#mobile-menu").fadeOut('fast');
			$("#copyright").fadeOut('fast');
		}

	},

	//Clear and remove the project viewer state
	destruct : function() {
		var _ = this;

		_.spinnerStop();
		$("body").removeClass('viewer').addClass('initial');

		if (mobile()) {
			$("#mobile-menu").fadeIn('fast');
			$("#copyright").fadeIn('fast');
		}

	},

	// Set click listeners for activator elements.
	trigger : function() {
		var _ = this;

		_.stopwatch.click(function() {
			_.construct();
		});

		if(!mobile()) {
			_.x.click(function() {
				_.destruct();
			});
		}
		

		$("#logo").click(function() {
			_.destruct();
		});


		if(mobile()) {

			// First tap of X will stop spinner. 
			// Secont tap will call destruct function.
			_.x.click(function() {

				if (!_.mobileTrigger) {
					_.spinnerStop();
					_.swipe();
					_.mobileTrigger = true;

				} else {
					_.destruct();
					_.mobileTrigger = false;
				}
 				
 		 	});

		}
	},

	//Setup and initiate Rollerblade spinner.
	spinner : function() {

		var _ = this;

		// Check if mobile, use first block array if true, second if false.
		if (mobile()) {
			_.images = [
				{
					path : rootPath + 'mains-mobile/avintek.jpg', 
					info : { //Avintek
						url : false,
						description: true,
						text : {
							companyType : "Architecture Co.",
							workType : "Icon"
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/botticelli.jpg',
					info : { //Botticelli
						url : false,
						description: true,
						text : {
							companyType : "Fabrication Co.",
							workType : "Icon"
						} 
					}
					
				},

				{
					path : rootPath + 'mains-mobile/breadandbutter.jpg',
					info : { //Break & Butter
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/fq.jpg',
					info : { //FQ
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/gatku.jpg',
					info : { //Gatku
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}			
				},

				{
					path : rootPath + 'mains-mobile/gatku2.jpg',
					info :{ //Gatku 2
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					},
				},

				{
					path : rootPath + 'mains-mobile/gatku3.jpg',
					info : { //Gatku 3
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/heart.jpg',
					info : { //Heart
						url : false,
						description: true,
						text : {
							companyType : "Record Label",
							workType : "Icon"
						} 
					}
				},

				{
					path :rootPath + 'mains-mobile/kaleio.jpg',
					info : { //Kaleio
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/one.jpg',
					info : { //One
						url : false,
						description: true,
						text : {
							companyType : "Financial Co",
							workType : "Icon"
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/one2.jpg',
					info : { //One 2
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/roman.jpg',
					info : { //Roman
						url : false,
						description: true,
						text : {
							companyType : "Planning Co.",
							workType : "Icon +"
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/royalunlimited.jpg',
					info : { //Royal Unlimited
						url : false,
						description: true,
						text : {
							companyType : "Service Co",
							workType : "Icon"
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/strengthteam.jpg',
					info : { //Strength Team
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/vie.jpg',
					info : { //Vie 1
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						} 
					}
				},

				{
					path : rootPath + 'mains-mobile/vie2.jpg',
					info : { //Vie 2
						url : false,
						description: false,
						text : {
							companyType : null,
							workType : null
						}		 
					}
				}
				
			];

		} else {
			_.images = [
				{	
					path : rootPath + 'mains/gatku.jpg',
					info : { 
						url : 'http://www.gatku.com',
						description: false,
						text : null 
					}
				},

				{
					path : rootPath + 'mains/avintek.jpg',
					info : { 
						url : false,
						description: true,
						text : {
							companyType : "Architecture Co.",
							workType : "Icon"
						}
					}
				},

				{
					path : rootPath + 'mains/one3.jpg',
					info : { 
						url : 'http://www.onedegreeadvisors.com',
						description: false,
						text : null
					}
				}, 

				{
					path : rootPath + 'mains/strengthteam.jpg',
					info : { 
						url : false,
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/labahn2.jpg',
					info : { 
						url : false,
						description: true,
						text : {
							companyType : "Interior Page Spread",
							workType : "Book"
						}
					}
				},
				
				{
					path : rootPath + 'mains/yv2.jpg',
					info : { 
						url : 'http://yvcenters.com',
						description: true,
						text : {
							companyType : "Interior Page Spread",
							workType : "Book"
						}
					}
				},

				{
					path : rootPath + 'mains/botticelli.jpg',
					info : { 
						url : false,
						description: true,
						text : {
							companyType: "Fabrication Co.",
							workType: "Icon"
						}
					}
				},

				{
					path : rootPath + 'mains/breadandbutter.jpg',
					info : { 
						url : 'http://www.breadandbutterplease.com',
						description: false,
						text : null 
					}
				},

				{
					path : rootPath + 'mains/kaleio3.jpg',
					info : { 
						url : false,
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/breadandbutter3.jpg',
					info : { 
						url : false,
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/labahn3.jpg',
					info : { 
						url : false, 
						description: true,
						text : {
							companyType : "Interior Page Spread",
							workType : "Book"
						}
					}
				},

				{
					path : rootPath + 'mains/vie.jpg',
					info : { 
						url : 'http://www.viefoundation.org/everylittlebitcounts/',
						description: false,
						text : null
					}
				},

				{
				 	path : rootPath + 'mains/wright.jpg',
				 	info : { 
						url : 'http://www.welovetobuild.com',
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/heart.jpg',
					info : { //9 HEART
						url : false,
						description: true,
						text : {
							companyType : "Record Label",
							workType : "Icon"
						}
					}
				},

				{
					path : rootPath + 'mains/fq.jpg',
					info : { 
						url : false,
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/kaleio.jpg',
					info : { 
						url : false,
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/yv3.jpg',
					info : { 
						url : 'http://yvcenters.com',
						description: true,
						text : {
							companyType : "Paperback Cover",
							workType : "Book"
						}
					}
				},

				{
					path : rootPath + 'mains/monty.jpg',
					info : { 
						url : false,
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/kngly.jpg',
					info : {
						url : false,
						description: true,
						text : {
							companyType : "Product Line",
							workType : "Icon +"
						}
					}
				},

				{
					path : rootPath + 'mains/labahn.jpg',
					info : { 
						url : false,
						description: true,
						text : {
							companyType : "Interior Page Spread",
							workType : "Book"
						}
					}
				},

				{
					path : rootPath + 'mains/breadandbutter2.jpg',
					info : { 
						url : 'http://breadandbutterplease.com',
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/kaleio2.jpg',
					info : { 
						url : false,
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/wright2.jpg',
					info : {
						url : 'http://www.welovetobuild.com',
						description: true,
						text : {
							companyType : null,
							workType : "Official Copy"
						}
					}
				},

				{
					path : rootPath + 'mains/one2.jpg',
					info : { 
						url : 'http://www.onedegreeadvisors.com',
						description: false,
						text : null
					}
				},

				{
					path : rootPath + 'mains/gatku2.jpg',
					info : { 
						url : 'http://www.facebook.com/gatku',
						description: true,
						text : {
							companyType : "Digital Adverts",
							workType : "Campaign"
						} 
					}
				},

				{
					path : rootPath + 'mains/yv.jpg',
					info : {
						url : 'http://yvcenters.com',
						description: true,
						text : {
							companyType : "Interior Page Spread",
							workType : "Book"
						}
					}
				},

				{
					path : rootPath + 'mains/one.jpg',
					info : { 
						url : 'http://onedegreeadvisors.com',
						description: true,
 						text : {
 							companyType : "Financial Co.",
 							workType : "Icon"
 						}
					}
				},

				{
					path : rootPath + 'mains/roman.jpg',
					info : {
						url : false,
						description: true,
						text : {
							companyType : "Planning Co.",
							workType : "Icon +"
						}
					}
				},

				{
					path : rootPath + 'mains/royalunlimited.jpg',
					info : {
						url : false,
						description: true,
						text : {
							companyType : "Service Co." ,
							workType: "Icon"
						}
					}
				}

			];
		}

		var imagePaths = [];

		for(i = 0; i < _.images.length; i++) {

			var thisPath = _.images[i].path;

			imagePaths.push(thisPath);
			
		}
	
		console.log(imagePaths);

		_.$spinner.rollerblade({

			imageArray : imagePaths,
			sensitivity : 500,
			auto : true
		});
		
	
		_.spinnerExists = true;
	},

	// Set click listeners for spinner control buttons.
	// Not sent to mobile browsers
 	spinnerControl : function() {

 		var _ = this;

 		$("#stop").click(function() {
 			_.spinnerStop();
 			
 		});

 		$("#slow").click(function() {
 			_.spinnerSlow();
 			
 		});

 		$("#fast").click(function() {
 			_.spinnerFast();
 			
 		});
 		
 	},
 	touchOnThis : false,
 	previousTouchX : null,
 	swipeDirection : null,

 	// Swipe functionality for mobile browsers.
 	swipe : function() {

 		var _ = this;

            _.$spinner.on('touchstart', function(ev) {

                var e = ev.originalEvent;
                var xcoord = e.pageX;

                // Record that this element is being touched.
                _.touchOnThis = true;
                // Record the current xcoord to be used as reference in
                // touchmove event listener.
                _.previousTouchX = xcoord;
            });

            _.$spinner.on('touchmove', function(ev) {

                var e = ev.originalEvent;
                var xcoord = e.pageX;

                if(_.touchOnThis) {
                    e.preventDefault();

                    if(_.previousTouchX < xcoord) {
                        // swiping right to go backwards
                        _.swipeDirection = "backwards";

                    } else if(_.previousTouchX > xcoord) {
                        //swiping left to go forwards
                        _.swipeDirection = "forwards";

                    }

                }

            });

            _.$spinner.on('touchend', function() {

                _.touchOnThis = false;

                // Trigger arrow event listeners depending
                // on swipe direction.
                if(_.swipeDirection == "backwards") {

                    _.$spinner.data().rollerblade.decrement();
                    _.extraControls.linkSet();
    
                } else if(_.swipeDirection == "forwards") {

					_.$spinner.data().rollerblade.increment();
					_.extraControls.linkSet();
            
                }

                // Reset in order to prevent event listeners
                // from responding to taps.
                _.swipeDirection = null;

            }); 
 	},

 	spinnerStop : function() {
 		var _ = this;

 		_.$spinner.data().rollerblade.autoStop();
 		$(".spinner-button").removeClass('spinner-selected');
		$("#stop").addClass('spinner-selected');
 		_.extraControls.show();
 	},

 	spinnerSlow : function() {
 		var _ = this;
 		_.$spinner.data().rollerblade.autoStop();
 		_.$spinner.data().rollerblade.auto(1000);
 		$(".spinner-button").removeClass('spinner-selected');
		$("#slow").addClass('spinner-selected');
 		_.extraControls.hide();
 	},

 	spinnerFast : function() {
 		var _ = this;
 		_.$spinner.data().rollerblade.autoStop();
 		_.$spinner.data().rollerblade.auto(500);
 		$(".spinner-button").removeClass('spinner-selected');
		$("#fast").addClass('spinner-selected');
 		_.extraControls.hide();
 	},

 	extraControls :  {

 		hide : function() {
 			$("#arrow-controls, .link-img, #description-container").fadeOut('fast');
 		},
 		show : function() {
 			var _ = viewer;

 			$("#arrow-controls").fadeIn('fast');		
 			_.extraControls.linkSet();	
 	
 		},
 		//Determine if link image should be shown in the bottom right tab. 
 		linkSet : function() {
 			
			var _ = viewer;
			var pos = _.$spinner.data().rollerblade.iAuto;
			//var dataSet = _.slideInfo[pos];
			var dataSet = _.images[pos].info;
			var link = $("#link");
			var linkImg = $(".link-img");
			var descContainer = $("#description-container");

			// Check if a url exists in the data, apply link image respectively.
			if (dataSet.url) {
				linkImg.fadeIn('fast');
				link.attr('href', dataSet.url);
			} else {
				linkImg.fadeOut('fast');
			}

			if(dataSet.description) {
				descContainer.fadeIn('fast');
				descContainer.find('.company-type').html(dataSet.text.companyType);
				descContainer.find('.work-type').html(dataSet.text.workType);
			} else {
				descContainer.fadeOut('fast');
			}

 		}

 	}

}

$(document).ready(function() {
	stopwatch.init();
	navEffects.init();
	viewer.init();
	about.init();
	mobileAbout.init();

});


$(window).resize(function() {

});
