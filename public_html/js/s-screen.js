//init
(function () {

	var initMobilemenu, initFixedmenu, initMixblock, setMobile;

	$(function () {
		if (document.site) {
			var mobile_is_set = (document.site.version === 'pda');

			if (mobile_is_set === true) {
				$('body').removeClass('f-desktop').addClass('f-mobile f-fakemobile');

				setMobile();
			};
		};

		//setMobile();
	});

	setMobile = function () {

		$('link[media="none"]').attr('media', 'all');

		initMobilemenu();
		initFixedmenu();
		initMixblock();

		$('.b-head_main-center').prepend($('.e-mobile-links'));
		$('.e-mobile-links').children(':not(.e-mobile-eng, .e-mobile-full)').remove();

		$('article table').each(function () {
			$(this).wrapAll('<figure class="f-table"></figure>');
		});

		var ar1 = $('.e-mobilepagination');
		if (ar1.length) {
			ar1.each(function () {
				var el = $(this),
					gr = el.find('.b-navigation-group:not(.t-small_left, .t-big_left, .t-small_right, .t-big_right)'),
					ar_ar = gr.children();

				ar_ar.first().remove();
				ar_ar.last().remove();
			});
		};

	};

	initMixblock = function () {

		var template = '<div class="c-block m_b3"><div class="c-title t-2 t-2a m_b3"><h2 class="ct-h2"></h2></div><div class="c-group t-1"><div class="cg-holder t-1a"></div></div></div>';

		var comp = $('.e-mobile-mixblock');
		if (!comp.length) return;
		var comp_ar = comp.find('.c-block'),
			comp_add = {},
			comp_links = {};
		comp_ar.each(function () {
			var el = $(this),
				name = el.find('.c-title h2').text(),
				link = el.find('.f-onlymobile'),
				ar = el.find('.cg-item').slice(0, 2);
			if (comp_add[name]) comp_add[name] = comp_add[name].add(ar);
			else comp_add[name] = ar;
			if (!comp_links[name]) comp_links[name] = link;
		});
		$.each(comp_add, function (i, v) {
			var block = $(template),
				block_t = block.find('.ct-h2'),
				block_h = block.find('.cg-holder'),
				link = comp_links[i];
			block_t.text(i);
			block_t.after(link);
			block_h.append(v);
			comp.before(block);
		});
		comp.remove();

	};

	initFixedmenu = function () {

		var holder = $('body'),
			menu = $('<div class="b-fixed_menu"><div class="b-fixed_menu-search"></div><div class="b-fixed_menu-title"></div></div>'),
			menu_t = menu.find('.b-fixed_menu-title'),
			menu_s = menu.find('.b-fixed_menu-search');

		var comp1 = $('h1').first();
		menu_t.text(comp1.length ? comp1[0].hasAttribute('data-mobile-title') ? comp1[0].getAttribute('data-mobile-title') : comp1.text() : 'Главная');

		var comp2 = $('<div class="b-mobile_search"></div>').append($('.b-head_search-holder form').clone());
		menu_s.append(comp2);

		holder.prepend(menu);

		var top = 480,
			cur = 0,
			last = 0,
			dir = 0,
			trigger = false,
			stopper= false,
			fn_set = function () {
				if (trigger) return;
				trigger = true;
				holder.addClass('f-fixedmenu');
			},
			fn_unset = function () {
				if (!trigger) return;
				trigger = false;
				holder.removeClass('f-fixedmenu');
			};
		$(document).bind('scroll', function () {
			if (stopper) return;
			cur = $(document).scrollTop();
			dir = (cur > last) ? 1 : -1;
			last = cur;
			if (dir < 0 && cur > top) return fn_set();
			else return fn_unset();
			stopper = true;
			setTimeout(function () {
				stopper = false;
				cur = $(document).scrollTop();
				dir = (cur > last) ? 1 : -1;
				last = cur;
				if (dir < 0 && cur > top) return fn_set();
				else return fn_unset();
			}, 200);
		});
		setTimeout(function () { $(document).trigger('scroll') }, 50);

	};

	initMobilemenu = function () {

		var holder = $('body'),
			template = $('<a class="b-mobile_menu-but-open" href="#"></a><div class="b-mobile_menu"><div class="b-mobile_menu-container"><a class="b-mobile_menu-but-close" href="#"></a><div class="b-mobile_menu-holder"></div></div></div>'),
			template_nav = $('<div class="b-mobile_navigation"></div>'),
			menu = template.filter('.b-mobile_menu'),
			menu_h = menu.find('.b-mobile_menu-holder'),
			menu_open = template.filter('.b-mobile_menu-but-open'),
			menu_close = menu.find('.b-mobile_menu-but-close'),
			menu_add = [];

		var comp1 = $('.e-mobile-social');
		menu_add.push(comp1);

		var comp2 = $('.b-main_menu');

		var title1 = comp2.find('.b-main_menu-first_item.selected');
		if (title1.length) {
			template_nav.append('<div class="b-mobile_navigation-title">'+ title1.children('a').text() +'</div>');
		};

		var holder1 = title1.find('.b-main_menu-second'),
			title2 = holder1.find('.selected'),
			tigger1 = false;
		if (title2.length) {
			var html = (function () {
					var temp = '';
					holder1.find('li:not(.selected)').each(function () {
						temp += '<li>'+ $(this).html() +'</li>';
					});
					return temp;
				})();

			template_nav.append('<div class="b-mobile_navigation-holder"><a class="b-mobile_navigation-link" href="javascript:void(0);">'+ title2.text() +'</a><ul class="b-mobile_navigation-list">'+ html +'</ul></div>');

			template_nav.find('.b-mobile_navigation-link').bind('click', function () {
				if (!tigger1) {
					template_nav.addClass('f-active');
					tigger1 = true;
				} else  {
					template_nav.removeClass('f-active');
					tigger1 = false;
				};
				return false;
			});

			$(document).bind('click', function () {
				if (tigger1) {
					setTimeout(function () {
						template_nav.removeClass('f-active');
						tigger1 = false;
					}, 50);
				};
			});
		};

		comp2.after(template_nav);

		comp2.find('.b-main_menu-second').remove();
		comp2.find('.b-main_menu-first').unwrap();
		comp2.find('.b-main_menu-first_holder, .b-main_menu-first_item').removeClass('b-main_menu-first_holder b-main_menu-first_item');
		menu_add.push(comp2);

		var comp3 = $('.b-footer_subscribe');
		comp3.removeClass('m_b15');
		menu_add.push(comp3);

		var comp4 = $('.b-footer_info');
		menu_add.push(comp4);

		var comp5 = $('.b-footer_copy');
		menu_add.push(comp5);

		var comp6 = $('.e-controlversion');
		menu_add.push(comp6);

		menu_h.append(menu_add);
		holder.prepend(template);

		menu_open.bind('click', function () {
			holder.addClass('f-mobilemenu');
			menu.scrollTop(0);
			return false;
		});
		menu_close.bind('click', function () {
			holder.removeClass('f-mobilemenu');
			return false;
		});

	};

})();
