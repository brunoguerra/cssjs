
var bw_galleries = new Array();

(function($) {
$.GalleryBitwonWise = function(g, r, l, thumbs) {
	var
	  defaults = {
			animate_time: 500
	  },
	  pages,
	  current=1,
	  elements,
	  width,
	  steps;

	elements = $('ul li', thumbs);

	width = elements.last().offset().left + elements.last().outerWidth() - elements.first().offset().left;

	pages = Math.ceil(width / $(g).width());

	steps = $(g).width();

	var gr = {
		container: g,
		thumbs: thumbs,
		items: $('.thumbs li > img', g),
		right: r,
		left: l,
		total: pages,
		steps: steps,


		init: function() {
			this.checkControls();
		},

		slideRight: function() {
			console.log(this.thumbs.position().left);
			this.slide(this.thumbs.position().left - steps);
		},

		slideLeft: function() {
			console.log(this.thumbs.position().left);
			this.slide(this.thumbs.position().left + steps);
		},

		slide: function(value) {
			this.thumbs.animate({left: value + 'px'}, defaults.animate_time);
		},

		next: function() {
			if (current+1>pages) return; 
			this.slideRight();
			current++;
			this.checkControls();
		},

		checkControls: function() {
			current<pages ?  $(this.left).show() : $(this.left).hide();
			((pages > 1) && (current > 1)) ? $(this.right).show() : $(this.right).hide();
		},

		prev: function() {
			if ((current < 2) || (pages < 2)) return; 
			this.slideLeft();
			current--;
			this.checkControls();
		}
	};

	gr.init();

	return gr;
};

	$.fn.galleryBitwise = function(options) {

		if (options==null) options = {};
		options.target = options.target || '#gallery';

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		return this.each(function(i,g){ 
			var left = $('<a class="left gallery-control" href="'+options.target+'" data-slide="prev"><</a>'),
					right = $('<a class="right gallery-control" href="'+options.target+'" data-slide="next">></a>');
			gallery = $.GalleryBitwonWise(g, left, right, $('.thumbs', g));

			$(g).append(left);
			$(g).append(right);

			$([left[0], right[0]]).click(function() {
				var ori = $(this).attr('data-slide');
				if (ori=='next') {
					gallery.next();
				} else {
					gallery.prev();
				}
			});

			bw_galleries.push(gallery); 
		});
	}

})(jQuery);