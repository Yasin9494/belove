// checkup ***
// for input[type=checkbox/radio]
// $('input').checkup();
// $('input').checkup('checked', true/false);
// $('input').checkup('disabled', true/false);
// $('input').checkup('destroy');
// <input class="active disabled" type="checkbox/radio" />
// $('input').bind('change/disabled', function() {});

(function($){

	$.fn.checkup = function( method ) {
		if ( $.fn.checkup.methods[ method ] ) {
			return $.fn.checkup.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return $.fn.checkup.methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist' );
		}
	};

	$.fn.checkup.methods = {

		init : function( options ) {

			options = $.extend( {}, $.fn.checkup.options, options );

			var all = this;

			var action_c = function(e, p) {
					if(e.is(':checked')) {
						e.addClass('active');
						if(p.length) p.addClass('active');
						options.onChange(e);
					} else {
						e.removeClass('active');
						if(p.length) p.removeClass('active');
					};
				},
				action_r = function(e, p) {
					if(e.is(':checked')) {
						e.addClass('active');
						if(p.length) p.addClass('active');
						options.onChange(e);
					} else {
						e.removeClass('active');
						if(p.length) p.removeClass('active');
					};
				},
				action_disabled = function(e, p) {
					if(e.is(':disabled')) {
						e.addClass('disabled');
						if(p.length) p.addClass('disabled');
					} else {
						e.removeClass('disabled');
						if(p.length) p.removeClass('disabled');
					};
				};

			return this.each(function () {

				// start ******************************

				var e = $(this),
					g = all.filter('[name="'+e.attr('name')+'"]'),
					p = e.parent('label'), // p = (p.length) ? p : e.next('label'),
					type = e.attr('type');

				var checkup_change, checkup_changeonce, checkup_disabled, checkup_destroy, checkup_blur, checkup_focus;

				checkup_focus = function() {
					p.addClass('focus');
				};
				checkup_blur = function() {
					p.removeClass('focus');
				};
				checkup_disabled = function() {
					action_disabled(e, p);
				};
				checkup_destroy = function() {
					e.unbind('change', checkup_change).unbind('changeonce', checkup_changeonce).unbind('disabled', checkup_disabled).unbind('destroy', checkup_destroy).removeClass('active disabled');
				};

				// action start
				switch(type) {
					case 'checkbox' :
						checkup_change = function () {
							action_c(e, p);
						};
						e.unbind('change', checkup_change).bind('change', checkup_change).bind('focus', checkup_focus).bind('blur', checkup_blur);
						break;
					case 'radio' :
						checkup_change = function() {
							action_r(e, p);
							g.trigger('changeonce');
						};
						checkup_changeonce = function() {
							action_r(e, p);
						};
						e.unbind('change', checkup_change).bind('change', checkup_change).unbind('changeonce', checkup_changeonce).bind('changeonce', checkup_changeonce).bind('focus', checkup_focus).bind('blur', checkup_blur);
						break;
					default :
						return false;
				};
				e.unbind('disabled', checkup_disabled).bind('disabled', checkup_disabled);

				e.trigger('change').trigger('disabled');
				// action end

				// api start
				e.bind('destroy', checkup_destroy);
				// api end

				// end ********************************

			});
		},
		checked : function(val) {
			return this.each(function() {
				$(this).prop('checked', val).trigger('change');
			});
		},
		disabled : function(val) {
			return this.each(function() {
				$(this).prop('disabled', val).trigger('disabled');
			});
		},
		destroy : function() {
			return this.each(function() {
				$(this).trigger('destroy');
			});
		}

	};

	$.fn.checkup.options = {
		onChange: function() {} //(element)
	};

})(jQuery);



// select ***
// $('select').select();

(function($){

	$.fn.select = function( method ) {
		if ( $.fn.select.methods[ method ] ) {
			return $.fn.select.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return $.fn.select.methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist' );
		}
	};

	$.fn.select.methods = {

		init : function( options ) {

			options = $.extend( {}, $.fn.select.options, options );

			var subdomain = location.href.split('.').slice(1)[0];
			text_select_all = 'выбрать все';
			text_select_resall = 'сбросить все';
			if (subdomain == 'en') {
				text_select_all = 'Choose all';
				text_select_resall = 'Clear';
			}

			var template =  (options.template)
					?
				'<div class="select-container">'+
				options.template +
				'</div>'
					:
				'<div class="select-container">'+
				'<div class="select-input"></div>'+
				'<div class="select-title"></div>'+
				'<div class="select-search-holder"><input class="select-search" type="text" name="select" value="" autocomplete="off" tab-index="-1" /></div>'+
				'<div class="select-list">'+
				'<div class="select-action"><a class="select-link select-selall" href="#">'+text_select_all+'</a><a class="select-link select-resall" href="#">'+text_select_resall+'</a></div>'+
				'<div class="select-holder"></div>'+
				'</div>'+
				'</div>',
				template_small = 	'<div class="select-container">'+
					'<div class="select-input"></div>'+
					'</div>',
				template_item = '<div class="select-item {class}" rel="{id}">{before}<span>{content}</span>{after}</div>',
				body = $('body'),
				select_last,
				select_timer,
				select_close = function() {
					clearTimeout(select_timer);
					select_timer = setTimeout(function () {
						if (select_last) select_last.trigger('change');
						body.unbind('click', select_close);
					}, 200);
				};

			return this.each(function() {

				// start ******************************

				var e = $(this),
					ar,
					ar_o,
					ar_g,
					ar_f = $(),
					s = (options.small) ? $(template_small) : $(template),
					s_title = s.find('.select-title'),
					s_input = s.find('.select-input'),
					s_list = s.find('.select-holder'),
					s_srch = s.find('.select-search'),
					s_action = s.find('.select-action'),
					s_sall = s.find('.select-selall'),
					s_rall = s.find('.select-resall'),
					temp = '',
					curent_number = -1,
					f_total = 0,
					selected_count = 0,
					c;

				var select_change, select_list_click, select_input_click, select_destroy, select_search_click, select_search_input, select_set, select_update, select_disabled, select_focus, select_blur, select_keypress, select_hover;
				
				var group_counter = 0;

				var multiple = e.prop('multiple');

				var each_group = function () {
					if (this.tagName.toLowerCase() == 'option') {
						temp += template_item.replace( '{class}', $(this).is(':disabled') ? 'disabled' : '' ).replace( '{id}', ar_o.index(this) ).replace( '{content}', $(this).text() ).replace( '{before}', $(this).data('select-before') ? $(this).data('select-before') : '' ).replace( '{after}', $(this).data('select-after') ? $(this).data('select-after') : '' );
					} else if (this.tagName.toLowerCase() == 'optgroup') {
						if (multiple) temp += template_item.replace( '{class}', 'g'+ group_counter + ($(this).is(':disabled') ? ' disabled' : '') ).replace( '{id}', '' ).replace( '{content}', $(this).attr('label') ).replace( '{before}', $(this).data('select-before') ? $(this).data('select-before') : '' ).replace( '{after}', $(this).data('select-after') ? $(this).data('select-after') : '' );
						temp += '<div class="select-group" rel="g'+group_counter+'">';
						$(this).children().each(each_group);
						temp += '</div>';
						this.setAttribute('rel', 'g'+group_counter);
						group_counter++;
					};
				};

				// action start
				ar_o = e.find('option');
				ar_g = e.find('optgroup');

				if(options.small) {
					s.css({ 'position' : 'relative' });
					e.css({ 'position' : 'absolute', 'top' : 0, 'left' : 0, 'width' : '100%', 'height' : '100%', 'opacity' : 0, 'z-index' : 1 });
					ar_o.each(function(i) {
						$(this).attr('rel', i);
					});
				} else {
					s.css({ 'position' : 'relative' });
					//e.hide();
					e.children().each(each_group);
					ar_o.each(function(i) {
						//temp += template_item.replace( '{class}', $(this).is(':disabled') ? 'disabled' : '' ).replace( '{id}', i ).replace( '{content}', $(this).text() ).replace( '{before}', $(this).data('select-before') ? $(this).data('select-before') : '' ).replace( '{after}', $(this).data('select-after') ? $(this).data('select-after') : '' );
						$(this).attr('rel', i);
					});
					s_list.append(temp);
					ar = s_list.find('.select-item');
				};

				c = e.attr('class').match(/(t\-[a-z0-9]+)/ig);
				e.after(s);
				s.prepend(e).addClass( c ? c.join(' ') : '' );

				s.addClass(multiple ? 't-multiple' : '');

				select_focus = function(event) {
					s.addClass('focus');
				};
				select_blur = function(event) {
					s.removeClass('focus');
				};

				if(options.small) {
					select_change = function(event) {
						var sel = [];
						ar_o.filter(':selected').each(function() {
							sel.push( $(this).text() );
						});
						s_input.text( sel.join(', ') );
					};
					select_input_click = function(event) {
						/*if( e.prop('multiple') ) {
							e.css({ 'top' : '100%', 'height' : 'auto', 'opacity' : 1 })
						};*/
					};
					select_list_click = function(event) {
						/*if( e.prop('multiple') ) {
							e.css({ 'top' : 0, 'height' : '100%', 'opacity' : 0 })
						};*/
					};

					e.bind('change', select_change).bind('click', select_input_click).bind('focus', select_focus).bind('blur', select_blur);
					s_input.bind('click', select_list_click);
				} else {
					select_change = function() {
						var sel = [];
						select_last = null;
						clearTimeout(select_timer);
						body.unbind('click', select_close);
						s.removeClass('active');
						ar.removeClass('active');
						selected_count = 0;
						ar_o.filter(':selected').each(function() {
							if (options.title && !this.index && !multiple) return;
							sel.push( $(this).text() );
							ar.filter('[rel="'+ this.getAttribute('rel') +'"]').addClass('active');
							selected_count++;
						});
						ar_g.each(function() {
							var o = $(this).find('option'),
								l = o.length,
								ls = o.filter(':selected').length;
							if (l != ls) {
								ar.filter('.'+ this.getAttribute('rel')).removeClass('active');
							} else {
								ar.filter('.'+ this.getAttribute('rel')).addClass('active');
							};
						});
						s_input.text( sel.join(', ') );
						ar.removeClass('hidden hover');
						s_srch.val('');
						$(document).unbind('keydown', select_keypress);
						curent_number = -1;
						if (selected_count) s.addClass('f-full');
						else s.removeClass('f-full');
					};
					select_set = function() {
						var sel = [];
						clearTimeout(select_timer);
						ar.removeClass('active');
						ar_o.filter(':selected').each(function() {
							sel.push( $(this).text() );
							ar.filter('[rel="'+ this.getAttribute('rel') +'"]').addClass('active');
						});
						ar_g.each(function() {
							var o = $(this).find('option'),
								l = o.length,
								ls = o.filter(':selected').length;
							if (l != ls) {
								ar.filter('.'+ this.getAttribute('rel')).removeClass('active');
							} else {
								ar.filter('.'+ this.getAttribute('rel')).addClass('active');
							};
						});
						s_input.text( sel.join(', ') );
					};
					select_update = function() {
						temp = '';
						ar_o = e.find('option');
						ar_g = e.find('optgroup');
						ar_o.each(function(i) {
							temp += template_item.replace( '{class}', $(this).is(':disabled') ? 'disabled' : '' ).replace( '{id}', i ).replace( '{content}', $(this).text() ).replace( '{before}', $(this).data('select-before') ? $(this).data('select-before') : '' ).replace( '{after}', $(this).data('select-after') ? $(this).data('select-after') : '' );
							$(this).attr('rel', i);
						});
						s_list.empty().append(temp);
						ar = s_list.children();
						ar.bind('click', select_list_click);
						select_set();
					};
					select_list_click = function() {
						var i = $(this).attr('rel');
 						if( $(ar_o[i]).prop('disabled') ) return false;
						if (i == '' && e.prop('multiple')) {
							if ($(this).hasClass('active')) {
								ar_g.filter('[rel="'+ $(this).next().attr('rel') +'"]').children().prop('selected', false);
							} else {
								ar_g.filter('[rel="'+ $(this).next().attr('rel') +'"]').children().prop('selected', true);
							};
							select_set();
							return false;
						};
						if( $(ar_o[i]).prop('selected') ) $(ar_o[i]).prop('selected', false);
						else $(ar_o[i]).prop('selected', true);
						if( !e.prop('multiple') ) {
							e.trigger('change');
							s.removeClass('active');
						} else {
							setTimeout(function () {
								e.trigger('set');
							}, 50);
						};
					};
					select_input_click = function() {
						if (e.is(':disabled')) return;
						s.toggleClass('active');
						if (s.hasClass('active')) {
							if (select_last) select_last.trigger('change');
							setTimeout(function () {
								body.bind('click', select_close);
							}, 50);
							select_last = e;
							s_srch.focus();
							$(document).bind('keydown', select_keypress);
							ar_f = ar;
							f_total = ar_f.length;
						} else {
							e.trigger('change');
						};
					};
					select_search_click = function(event) {
						event.stopPropagation();
					};
					select_search_input = function(event) {
						var reg = new RegExp(s_srch.val(), 'ig');
						ar.removeClass('hover');
						ar_f = $();
						ar.addClass('hidden').filter(function (i, v) {
							var r = $(v).text().match(reg);
							if (r) ar_f = ar_f.add($(v));
							return r;
						}).removeClass('hidden');
						f_total = ar_f.length;
						curent_number = -1;
					};
					select_disabled = function(event) {
						if(e.is(':disabled')) {
							s.addClass('disabled');
						} else {
							s.removeClass('disabled');
						};
					};
					select_keypress = function(event) {
						if ((event.which || event.keyCode) == 40) {
							if (curent_number >= 0) $(ar_f[curent_number]).removeClass('hover');
							curent_number++;
							curent_number = curent_number > f_total-1 ? f_total-1 : curent_number;
							var cur = $(ar_f[curent_number]);
							cur.addClass('hover');
							s_list.scrollTop(cur[0].offsetTop);
							return false;
						} else if ((event.which || event.keyCode) == 38) {
							if (curent_number >= 0) $(ar_f[curent_number]).removeClass('hover');
							curent_number--;
							curent_number = curent_number < 0 ? 0 : curent_number;
							var cur = $(ar_f[curent_number]);
							cur.addClass('hover');
							s_list.scrollTop(cur[0].offsetTop);
							return false;
						} else if ((event.which || event.keyCode) == 13) {
							$(ar_f[curent_number]).trigger('click');
							return false;
						};
					};
					select_hover = function(event) {
						var i = $(this).attr('rel');
						ar.removeClass('hover');
						$(ar[i]).addClass('hover');
						curent_number = i;
					};

					if (multiple) {
						s_sall.bind('click', function () {
							ar_o.prop('selected', true);
							select_set();
							return false;
						});
						s_rall.bind('click', function () {
							ar_o.prop('selected', false);
							select_set();
							return false;
						});
					} else {
						s_action.hide();
					};

					if (options.title) {
						var title = (e[0].hasAttribute('placeholder')) ? e[0].getAttribute('placeholder') : multiple ? '' : ar_o[0].text;
						s_title.text(title);
						s.addClass('f-placeholder');
						if (!title) s.addClass('f-noplaceholder');
						s_title.bind('click', function () {
							s_input.trigger('click');
						});
					};

					e.wrap('<div class="select-hidden"></div>');
					e.bind('change', select_change).bind('set', select_set).bind('update', select_update).bind('disabled', select_disabled).bind('focus', select_focus).bind('blur', select_blur)
						.bind('keydown', function (event) {
							if ((event.keyCode || event.which) === 13 || (event.keyCode || event.which) === 32) {
								s_input.trigger('click');
								return false;
							};
						});
					ar.bind('click', select_list_click).bind('mouseover', select_hover);
					s_input.bind('click', select_input_click);
					s_srch.bind('click', select_search_click).bind('input', select_search_input);
				};

				options.onLoad(e, s, s_list);

				e.trigger('change');
				// action end

				// api start
				select_destroy = function() {
					s.after(e);
					e.show();
					e.unbind('change', select_change).unbind('set', select_set).unbind('update', select_update).unbind('disabled', select_disabled).unbind('focus', select_focus).unbind('blur', select_blur).unbind('keydown');
					s.remove();
				};
				e.bind('destroy', select_destroy);
				// api end

				// end ********************************

			});
		},
		destroy : function() {
			return this.each(function() {
				$(this).trigger('destroy');
			});
		}

	};

	$.fn.select.options = {
		template: null,
		small: false,
		title: false,
		onLoad: function() {}, //(select, element, element_list)
		onSelect: function() {} //()
	};

})(jQuery);



// popup ***
// 	$('a').popup();
//	$('a').popup({
//		overlay: '#overlay',
//		layer: '#layer',
//		type: 'iframe/html/image/ajax',
//		width: 560,
//		height: 315
//	});
// 	$('a').popup('update');
// 	$('a').popup('destroy');

(function($){

	$.popup = function( selector ) {
		if( typeof selector === 'string' ) {
			var a = $('<a href="'+ selector +'"></a>');
			return $.fn.popup.methods.init.apply( a, Array.prototype.slice.call( arguments, 1 )).trigger('open');
		} else {
		  $.error( 'Error' );
		};
	};

	$.fn.popup = function( method ) {
		if ( $.fn.popup.methods[ method ] ) {
			return $.fn.popup.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return $.fn.popup.methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist' );
		}
	};

	$.fn.popup.methods = {

		init : function( options, functions ) {

			var selector = this.selector.replace(/[#]+/g, '1_').replace(/[\.]+/g, '2_').replace(/[^a-z0-9_]+/ig, '').slice(0,50);

			options = $.extend( {}, $.fn.popup.options, options );
			functions = $.fn.popup.functions;

			var template =  (options.template)
					?
				'<div class="popup">'+
				options.template +
				'<div class="popup-preload">Загрузка...</div>'+
				'</div>'
					:
				'<div class="popup">'+
				'<div class="popup-wrapper">'+
				'<div class="popup-title"></div>'+
				'<div class="popup-holder"></div>'+
				'<div class="popup-error">Error</div>'+
				'<a class="popup-but-close" href="#close">Close</a>'+
				'<a class="popup-but-prev" href="#prev">Prev</a>'+
				'<a class="popup-but-next" href="#next">Next</a>'+
				'</div>'+
				'<div class="popup-preload">Loading...</div>'+
				'</div>',
				template_holder =   '<div class="popup-holder">'+
					'<div class="popup-content"></div>'+
					'</div>',
				body = $('body'),
				hold = {
					o : $(options.overlay),
					l : $(options.layer),
					p : $(template),
					h : $(template_holder)
				},
				current,
				tr = {
					open : false
				},
				nav = {
					prev : null,
					next : null
				},
				keeper = $.fn.popup.keeper[selector] = {},
				parent = false,
				line = false;

			hold.p_wrapper = hold.p.find('.popup-wrapper'),
				hold.p_holder = hold.p.find('.popup-holder'),
				hold.p_close = hold.p.find('.popup-but-close'),
				hold.p_prev = hold.p.find('.popup-but-prev'),
				hold.p_next = hold.p.find('.popup-but-next'),
				hold.p_preload = hold.p.find('.popup-preload'),
				hold.p_error = hold.p.find('.popup-error');

			keeper.ar = this,
				keeper.g_ar = {},
				keeper.total = keeper.ar.length;

			keeper.init = function(ar) {
				keeper.g_ar = functions.groupElements( 0, keeper.total, keeper.ar, {}, options );

				ar.bind('click open', keeper.popup_open);
			};
			keeper.popup_open = function() {
				if(!tr.open) {
					line = ($.fn.popup.line.length) ? true : false;
					tr.open = functions.openPopup( hold.o, hold.l, hold.p, hold.p_wrapper, hold.p_preload, hold.p_error, body, line, options );
					options.onOpen($(this), hold.p);
					$(document).bind('keyup', keeper.keypress);
				};
				current = $(this),
					hold.p_holder_old = hold.p_holder,
					hold.p_holder = hold.h.clone().hide(),
					nav = functions.setPopup( $(this), keeper.g_ar[ this.getAttribute(options.group) ], hold.p_prev, hold.p_next ),
					parent = functions.loadPopup( $(this), hold.p, hold.p_wrapper, hold.p_holder, hold.p_holder_old, hold.p_preload, hold.p_error, parent, options, keeper.g_ar[ this.getAttribute(options.group) ] );
				return false;
			};
			keeper.popup_close = function() {
				if(tr.open) {
					options.onClose(hold.p);
					functions.unloadPopup( hold.p_wrapper, hold.p_preload, hold.p_error, options );
					tr.open = functions.closePopup( hold.o, hold.l, hold.p, body, line, options );
					hold.p_holder.children().remove();
					$(document).unbind('keyup', keeper.keypress);
				};
				return false;
			};
			keeper.popup_prev = function() {
				if(nav.prev) {
					functions.unloadPopup( hold.p_wrapper, hold.p_preload, hold.p_error, options );
					nav.prev.trigger('click');
				};
				return false;
			};
			keeper.popup_next = function() {
				if(nav.next) {
					functions.unloadPopup( hold.p_wrapper, hold.p_preload, hold.p_error, options );
					nav.next.trigger('click');
				};
				return false;
			};
			keeper.destroy = function() {
				keeper.ar.unbind('click open', keeper.popup_open);
				hold.p.remove();
			};
			keeper.click = function(event) {
				if(!event.target || event.target == event.currentTarget) {
					keeper.popup_close.apply(this);
					return false;
				};
			};
			keeper.keypress = function(event) {
				if (event.which == 27 || event.keyCode == 27) {
					keeper.popup_close.apply(this);
				} else if (event.which == 37 || event.keyCode == 37) {
					keeper.popup_prev.apply(this);
				} else if (event.which == 39 || event.keyCode == 39) {
					keeper.popup_next.apply(this);
				};
			};

			// start ******************************

			hold.p.children()
				.bind('click', function(event) {
					event.stopPropagation();
				});
			hold.p_close.add(hold.p)
				.bind('click close', keeper.popup_close);
			hold.p_prev
				.bind('click', keeper.popup_prev);
			hold.p_next
				.bind('click', keeper.popup_next);

			hold.p.addClass( options.popupClass );

			keeper.init( keeper.ar );

			// end ********************************

			return this;

		},
		update : function() {
			var selector = this.selector.replace(/[#]+/g, '1_').replace(/[\.]+/g, '2_').replace(/[^a-z0-9_]+/ig, '').slice(0,50),
				keeper = $.fn.popup.keeper[selector],
				ar, new_el;
			if(keeper) {
				ar = this,
				new_el = ar.not(keeper.ar);
			};
			keeper.ar = ar,
			keeper.total = ar.length;
			keeper.init(new_el);

			return new_el;
		},
		destroy : function() {
			var selector = this.selector.replace(/[#]+/g, '1_').replace(/[\.]+/g, '2_').replace(/[^a-z0-9_]+/ig, '').slice(0,50),
				keeper = $.fn.popup.keeper[selector];

			keeper.destroy();
			$.fn.popup.keeper[selector] = keeper = {};
		}

	};

	$.fn.popup.functions = {
		groupElements : function(start, end, ar, g_ar, options) {
			for(var i=start; i<end; i++) {
				var g_name = ar[i].getAttribute(options.group);
				if( !g_name ) {
					g_name = 'g'+( (options.grouped)?0:i );
					ar[i].setAttribute( options.group, g_name );
				};
				if(!g_ar[g_name]) g_ar[g_name] = [];
				g_ar[g_name].push( $(ar[i]) );
				ar[i].setAttribute( 'data-popup-index', g_ar[g_name].length-1 );
			};

			return g_ar;
		},
		openPopup : function(o, l, p, p_wrapper, p_preload, p_error, body, line, options) {
			l.append(p);
			o.css({ 'display' : 'block' }).addClass( options.overlayClass );
			l.addClass( options.layerClass );
			p.css({ 'display' : 'block' });
			p_wrapper.css({ 'display' : 'none' });
			p_preload.css({ 'display' : 'block' });
			p_error.css({ 'display' : 'none' });
			body.css('overflow', 'hidden');

			if(line) {
				$.fn.popup.line[ $.fn.popup.line.length-1 ].css({ 'display' : 'none' });
			};
			$.fn.popup.line.push( p );

			return true;
		},
		setPopup : function(e, g, p_prev, p_next) {
			var index = e.data('popup-index'),
				total = g.length,
				tr = {
					prev : (index) ? true : false,
					next : (index != (total-1)) ? true : false
				},
				nav = {
					prev : (tr.prev) ? g[index-1] : null,
					next : (tr.next) ? g[index+1] : null
				};

			p_prev.removeClass('disabled').addClass( (tr.prev) ? '' : 'disabled' );
			p_next.removeClass('disabled').addClass( (tr.next) ? '' : 'disabled' );

			return nav;
		},
		loadPopup : function(e, p, p_wrapper, p_holder, p_holder_old, p_preload, p_error, parent_old, options, ar) {
			var title = e.attr('title'),
				p_title = p_wrapper.find('.popup-title'),
				p_content = p_holder.find('.popup-content'),
				html, parent;

			switch(options.type) {
				case 'html':
					html = $( e.attr('href').replace( /[^0-9a-zA-Z_#\-]+/g, '' ) );
					parent = html.parent();
					break;
				case 'iframe':
					html = $('<iframe class="popup-content-iframe" src="'+e.attr('href')+'" style="width: 100%; height: 100%;" frameborder="0" allowfullscreen="true">Error</iframe>');
					break;
				case 'image':
					html = $('<img class="popup-content-image" src="'+e.attr('href')+'" alt="" />');
					break;
				case 'ajax':
					options.request.url = e.attr('href');
					html = $('<div class="popup-content-ajax"></div>');
					break;
			};

			p_holder_old.after( p_holder );
			p_title.text( (title) ? title : '' );

			try {
				if( html.length != 1) { throw new Error('Error'); };
				switch(options.type) {
					case 'iframe':
					case 'image':
						p_content.html( html );
						html
							.bind('load', function() {
								return success();
							})
							.bind('error', function() {
								return error();
							});
						break;
					case 'html':
						p_content.html( html );
						if(parent_old) {
							parent_old.append( p_holder_old.find('.popup-content').children() );
						};
						return success();
						break;
					case 'ajax':
						$.ajax(options.request)
							.done(function( data ) {
								p_content.html( data );
								return success();
							})
							.fail(function() {
								return error();
							});
						break;
				};
			} catch(er) {
				return error();
			};

			function success() {
				p_holder_old.remove();
				p_wrapper.css({ 'display' : 'block' });
				p_holder.css({ 'display' : 'block' });
				p_preload.css({ 'display' : 'none' });
				style();
				options.onLoad(e, p, ar);
				return (parent) ? parent : false;
			};
			function error() {
				p_holder_old.remove();
				p_wrapper.css({ 'display' : 'block' });
				p_preload.css({ 'display' : 'none' });
				p_error.css({ 'display' : 'block' });
				style();
				return false;
			};
			function style() {
				var w = (options.width == 'auto' && options.type == 'image') ? html.get(0).width : options.width,
					h = options.height;
				p_wrapper.css({ 'max-width' : w });
				p_content.css({ 'height' : h });
			};
		},
		unloadPopup : function(p_wrapper, p_preload, p_error, options) {
			p_preload.css({ 'display' : 'block' });
			p_error.css({ 'display' : 'none' });
		},
		closePopup : function(o, l, p, body, line, options) {
			if(!line) {
				o.css({ 'display' : 'none' }).removeClass( options.overlayClass );
				l.removeClass( options.layerClass );
				body.css({ 'overflow' : '' });
			};
			p.detach();

			$.fn.popup.line.pop();
			if(line) {
				$.fn.popup.line[$.fn.popup.line.length-1].css({ 'display' : 'block' });
			};

			return false;
		}
	};

	$.fn.popup.options = {
		template: null,
		overlay: null,
		layer: 'body',
		overlayClass: '',
		layerClass: '',
		popupClass: '',
		grouped: true,
		group: 'rel',
		type: 'image', //iframe, image, html, ajax
		width: 'auto',
		height: 'auto',
		request: {},
		onOpen: function() {}, //(element, popup)
		onClose: function() {}, //(popup)
		onLoad: function() {} //(element, popup)
	};

	$.fn.popup.keeper = {};

	$.fn.popup.line = [];

})(jQuery);



// tooltip ***
// $('div').tooltip();

(function($){

	$.fn.tooltip = function( method ) {
		if ( $.fn.tooltip.methods[ method ] ) {
			return $.fn.tooltip.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return $.fn.tooltip.methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist' );
		}
	};

	$.fn.tooltip.methods = {

		init : function( options ) {

			options = $.extend( {}, $.fn.tooltip.options, options );

			var template = '<div class="tooltip-container"><div class="tooltip-holder"></div></div>',
				l = $(options.layer),
				t = $(template),
				h = t.find('.tooltip-holder');

			l.append(t.css('visibility', 'hidden'));

			function getPos(el, event, tt, options) {
				var p = {},
					el_pos,
					el_width,
					el_height;
				switch(options.mode) {
					case 'element':
						el_pos = el.offset();
						el_width = el.outerWidth();
						el_height = el.outerHeight();
						break;
					case 'cursor':
						el_pos = { 'left' : event.pageX, 'top' : event.pageY };
						el_width = 0;
						el_height = 0;
						break;
				};
				switch(options.pos) {
					case 'top':
						p.top = el_pos.top-tt.outerHeight();
						p.left = el_pos.left+el_width/2-tt.outerWidth()/2;
						break;
					case 'bottom':
						p.top = el_pos.top+el_height;
						p.left = el_pos.left+el_width/2-tt.outerWidth()/2;
						break;
					case 'right':
						p.top = el_pos.top+el_height;
						p.left = el_pos.left+el_width+10;
						break;
				};
				return p;
			};

			return this.each(function() {

				// start ******************************

				var e = $(this),
					e_event,
					trigger = false, //mouseover
					to;
				var tooltip_mouseover, tooltip_mouseout, tooltip_mousemove, tooltip_destroy;

				var text = e.data('tooltip');

				if (!text) return;

				tooltip_mouseover = function (event) {
					var el = $(this)
					e_event = event;
					trigger = true;
					clearTimeout(to);
					to = setTimeout(function() {
						h.html( text );
						var p = getPos(el, e_event, t, options);
						t.addClass(options.pos).css({ 'position' : 'absolute', 'top' : p.top, 'left' : p.left, 'visibility' : 'visible' });
					}, options.timeout);
				};
				tooltip_mousemove = function (event) {
					if(!trigger) return;
					e_event = event;
				};
				tooltip_mouseout = function () {
					trigger = false;
					clearTimeout(to);
					to = setTimeout(function() {
						t.css({ 'visibility' : 'hidden' });
					}, options.timeout/2);
				};


				// action start
				e
					.bind('mouseover', tooltip_mouseover)
					.bind('mouseout', tooltip_mouseout)
				if(options.mode == 'cursor') e.bind('mousemove', tooltip_mousemove);
				// action end

				// api start
				tooltip_destroy = function () {
					e
						.unbind('mouseover', tooltip_mouseover)
						.unbind('mouseout', tooltip_mouseout)
						.unbind('mousemove', tooltip_mousemove)
						.unbind('destroy', tooltip_destroy);
					t.remove();
				};
				e.bind('destroy', tooltip_destroy);
				// api end

				// end ********************************

			});
		},
		destroy : function() {
			return this.each(function() {
				$(this).trigger('destroy');
			});
		}

	};

	$.fn.tooltip.options = {
		layer: 'body',
		pos: 'top', //top, bottom
		mode: 'element', //element, cursor
		timeout: 200
	};

})(jQuery);



// file ***
// for input[type=file]
// $('input').file();
// $('input').file('destroy');

(function($){

	$.fn.file = function( method ) {
		if ( $.fn.file.methods[ method ] ) {
			return $.fn.file.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return $.fn.file.methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist' );
		}
	};

	$.fn.file.methods = {

		init : function( options ) {

			options = $.extend( {}, $.fn.file.options, options );

			var template =  '<div class="file">'+
				'<div class="file-add button t-red"><span>ПРИКРЕПИТЬ ФАЙЛ</span></div>'+
				'<div class="file-holder"></div>'+
				'</div>';

			return this.each(function() {

				// start ******************************

				var e = $(this),
					ar = $(),
					total = 0,
					f = $(template),
					f_add = f.find('.file-add'),
					f_holder = f.find('.file-holder'),
					f_input = e.clone().removeAttr('class id');
				var file_change, file_delete, file_destroy, file_clear, file_disabled, file_focus, file_blur;

				file_change = function() {
					var new_input =  f_input.clone(),
						name, title;
					name = this.value,
					title = name.replace(/.*\\(.*)/, "$1"),
					title = title.replace(/.*\/(.*)/, "$1"),
					size = (this.files && this.files[0]) ? this.files[0].size : 0;
					if(!title) return;
					f_input.unbind('change', file_change).unbind('disabled', file_disabled).bind('delete', file_delete);
					f_holder.append( f_input );
					f_add.append( new_input );
					new_input.bind('change', file_change).bind('disabled', file_disabled);
					ar = ar.add( f_input );
					total++;
					f_input = new_input;

					if(options.max && total >= options.max) { f_input.prop('disabled', true); f_add.addClass('disabled'); }
					else { f_input.prop('disabled', false); f_add.removeClass('disabled'); };

					options.onChange( f, $(this), title, size );
				};
				file_delete = function() {
					$(this).remove();
					total--;

					if(options.max && total <= options.max) { f_input.prop('disabled', false); f_add.removeClass('disabled'); };
				};
				file_disabled = function() {
					if(e.is(':disabled')) {
						f.addClass('disabled');
					} else {
						f.removeClass('disabled');
					};
				};
				file_focus = function() {
					f.addClass('focus');
				};
				file_blur = function() {
					f.removeClass('focus');
				};

				// action start
				e.hide().after(f);
				f_add.append(f_input);

				f_input.bind('change', file_change).bind('disabled', file_disabled).bind('focus', file_focus).bind('blur', file_blur).trigger('change');
				// action end

				// api start
				file_clear = function() {
					ar.remove();
					total = 0;
					ar = $();

					f_add.removeClass('disabled');
				};
				file_destroy = function() {
					e.show();
					f.after(ar);
					f.remove();
					ar.unbind('change', file_change);
				};
				e.bind('destroy', file_destroy).bind('clear', file_clear);
				// api end

				// end ********************************

			});
		},
		clear : function() {
			return this.each(function() {
				$(this).trigger('clear');
			});
		},
		destroy : function() {
			return this.each(function() {
				$(this).trigger('destroy');
			});
		}

	};

	$.fn.file.options = {
		max: 0,
		onChange: function() {}
	};

})(jQuery);



// errortip ***
// $('div').errortip();

(function($){

	$.fn.errortip = function( method ) {
		if ( $.fn.errortip.methods[ method ] ) {
			return $.fn.errortip.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return $.fn.errortip.methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist' );
		}
	};

	$.fn.errortip.methods = {

		init : function( options ) {

			options = $.extend( {}, $.fn.errortip.options, options );

			var template = '<div class="errortip-container"><div class="errortip-holder">{title}</div></div>',
				fn_get_position = function (el, tip, upos) {
					var w = el.outerWidth(),
						h = el.outerHeight();
					hh = tip.outerHeight();
					if (options.superposition) {
						return {
							'top' : (w < 400) ? el.offset().top + h/2 - upos.top : el.offset().top - hh - upos.top,
							'left' : (w < 400) ? el.offset().left + w - upos.left : el.offset().left - upos.left,
							'mod' : (w < 400) ? 'left' : 'top'
						};
					} else {
						return {
							'top' : (w < 400) ? el.offset().top + h/2 : el.offset().top - hh,
							'left' : (w < 400) ? el.offset().left + w : el.offset().left,
							'mod' : (w < 400) ? 'left' : 'top'
						};
					};
				};

			return this.each(function() {

				// start ******************************

				var e = $(this),
					l, t,
					trigger = false;
				var errortip_bind, errortip_click, errortip_destroy;

				if (this.hasAttribute('data-errortip-set')) return;

				errortip_bind = function () {
					if (trigger || !e.attr('data-errortip')) return;
					var pos, upos,
						temp = template.replace('{title}', e.attr('data-errortip'));
					l = $(options.layer);
					t = $(temp).addClass(options.errorClass);
					upos = l.offset();
					upos.top -= l.scrollTop();
					upos.left -= l.scrollLeft();
					l.append(t);
					pos = fn_get_position(e.is(':visible') ? e : e.parent(), t, upos);
					t.addClass(pos.mod).css({ 'top' : pos.top, 'left' : pos.left });
					t.bind('click', errortip_click);
					e.bind('unerror', errortip_click);
					if (options.onError) options.onError(e);
					trigger = true;
				};
				errortip_click = function () {
					e.bind('error', errortip_bind).unbind('unerror', errortip_click);
					e.trigger('unerror').find('input, select, textarea').trigger('unerror');
					if (t) t.remove();
					if (options.onUnerror) options.onUnerror(e);
					trigger = false;
					return false;
				};

				// action start
				e.bind('error', errortip_bind);
				e.attr('data-errortip-set', true);
				errortip_bind();
				// action end

				// api start
				errortip_destroy = function () {
					e.unbind('error', errortip_bind).unbind('unerror', errortip_click);
					if (t) t.remove();
				};
				e.bind('destroy', errortip_destroy);
				// api end

				// end ********************************

			});
		},
		destroy : function() {
			return this.each(function() {
				$(this).trigger('destroy');
			});
		}

	};

	$.fn.errortip.options = {
		errorClass: '',
		layer: 'body',
		superposition: false,
		onError: null,
		onUnerror: null
	};

})(jQuery);