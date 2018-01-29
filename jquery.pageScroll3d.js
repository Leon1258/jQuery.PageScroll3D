'use strict';

(function($) {
	var $window = $(window),
		winHeight = $window.height(),
		deg = 0,
		inscroll = false;

	$window.on('resize', function() {
		return winHeight = $window.height();
	});

	function setLayout($this) {
		var sides = $this.children();

		$this.append('<nav class="s3d__navigation"><ul class="s3d__navigation-list"></ul></nav>');

		sides.each(function(i) {
			var linkText = $(this).find('h1').text();

			if (i > 0) {
				$(this).css({
					'transform' : 'rotateX(' + -90*i + 'deg)',
					'-webkit-transform' : 'rotateX(' + -90*i + 'deg)'
				});
			}

			$this.find('.s3d__navigation-list')
				.append('<li class="s3d__navigation-item"><a href="#" class="s3d__navigation-link">' + linkText + '</a></li>');
		});

		$this.append('<div class="s3d__content"></div>');

		$this.find('.s3d__content').append(sides);

		sides.addClass('s3d__side');
	}

	function set3D($this) {
		var container = $this.find('.s3d__content'),
			sides = container.find('.s3d__side');

		$this.css({
			'perspective' : winHeight,
			'-webkit-perspective' : winHeight 
		});

		container.add(sides).css({
			'transform-origin' : '50% 50% ' + (-winHeight/2) + 'px',
			'-webkit-transform-origin' : '50% 50% ' + (-winHeight/2) + 'px'
		});
	}

	function setActiveElem($this) {
		$this.find('.s3d__side').first().addClass('active');
		$this.find('.s3d__navigation-item').first().addClass('active');
	}

	var methods = {
		init: function() {
			return this.each(function() {
				var $this = $(this);
					
				$this.addClass('s3d');

				// Вёрстка
				setLayout($this);

				// Перспектива
				set3D($this);

				// Активные элементы
				setActiveElem($this);

				// Адаптация
				$window.on('resize', function() {
					set3D($this);
				});

				// Скролл
				$('body').on('mousewheel', function(e) {

					var container = $this.find('.s3d__content'),
						sides = container.find('.s3d__side'),
						activeSide = sides.filter('.active'),
						navItem = $this.find('.s3d__navigation-item'),
						posActive;

					if(!inscroll) {
						inscroll = true;

						if(e.deltaY == 1) {
							
							if(activeSide.prev().length) {
								deg -= 90;
							}

						} else if(e.deltaY == -1) {
							
							if(activeSide.next().length) {
								deg += 90;
							}
						}
					}
					
					posActive = deg / 90;
					sides.eq(posActive).addClass('active').siblings().removeClass('active');

					container.css({
						'transform' : 'rotateX(' + deg + 'deg)',
						'-webkit-transform' : 'rotateX(' + deg + 'deg)'
					});

					setTimeout(function() {
						inscroll = false;
					}, 1000);

					navItem.eq(posActive).addClass('active').siblings().removeClass('active');
				});

				// Клик по меню
				$(document).on('click', '.s3d__navigation-link', function(e) {
					e.preventDefault();

					var $this = $(this),
						navItem = $this.closest('.s3d__navigation-item'),
						posItem = navItem.index(),
						container = $this.closest('.s3d').find('.s3d__content'),
						sides = container.find('.s3d__side');

					deg = 90*posItem;

					navItem.addClass('active').siblings().removeClass('active');

					sides.eq(posItem).addClass('active').siblings().removeClass('active');

					container.css({
						'transform' : 'rotateX(' + deg + 'deg)',
						'-webkit-transform' : 'rotateX(' + deg + 'deg)'
					});

					return deg;
				});
			});
		},
		destroy: function() {
			return this.each(function() {
				$('body').off('mousewheel');
				$(document).off('click', '.s3d__navigation-link');
			});
		}
	};

	$.fn.scroll3D = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Метод с именем ' + method + ' не существует для jQuery.scroll3D');
		}
	};
})(jQuery);