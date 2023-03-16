//mobile detect
/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 **/
(function (a) {
  (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
})(navigator.userAgent || navigator.vendor || window.opera);


//init
(function () {

  function setDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var hour = String(today.getHours()).padStart(2, '0');
    var minut = String(today.getMinutes()).padStart(2, '0');
    var second = String(today.getSeconds()).padStart(2, '0');

    switch (mm) {
      case '01':
        mm = 'января'
        break;
      case '02':
        mm = 'февраля'
        break;
      case '03':
        mm = 'марта'
        break;
      case '04':
        mm = 'апреля'
        break;
      case '05':
        mm = 'мая'
        break;
      case '06':
        mm = 'июня'
        break;
      case '07':
        mm = 'июля'
        break;
      case '08':
        mm = 'августа'
        break;
      case '09':
        mm = 'сентября'
        break;
      case '10':
        mm = 'октября'
        break;
      case '11':
        mm = 'ноября'
        break;
      case '12':
        mm = 'декабря'
        break;
    }

    today = dd + ' ' + mm + ' ' + yyyy + ' г. в ' + hour + ":" + minut + ":" + second;
    document.querySelector('#current_date').textContent = today
  }
  setDate()



  function printInfo(name) {
    document.querySelector('#fio').textContent = info[name]['fio']

    document.querySelector('#doc_type').textContent = info[name]['doc_type']
    document.querySelector('#doc_num').textContent = info[name]['doc_nums']
    document.querySelector('#doc_date').textContent = info[name]['doc_date']

    document.querySelector('#reg_type').textContent = info[name]['reg_type']
    document.querySelector('#reg_num').textContent = info[name]['reg_num']
    document.querySelector('#reg_address').textContent = info[name]['reg_address']
    document.querySelector('#reg_date_from').textContent = info[name]['reg_date_from']
    document.querySelector('#reg_date_to').textContent = info[name]['reg_date_to']

    document.querySelector('#status').textContent = info[name]['status']
  }







  var mediapluginPath = '/js/';

  var subdomain = location.href.split('.').slice(1)[0];
  text_popup_but_next = 'Следующая';
  text_popup_but_prev = 'Предыдущая';

  if (subdomain == 'en') {
    text_popup_but_next = 'Next';
    text_popup_but_prev = 'Previous';
  }

  document.body.className += (jQuery.browser.mobile) ? ' f-mobile' : ' f-desktop';
  if (window.innerHeight) document.getElementById('wrapper').style.minHeight = window.innerHeight + 'px';
  else document.getElementById('wrapper').style.minHeight = $(window).height() - 150;
  if (navigator.appName.indexOf("Internet Explorer") != -1 && navigator.appVersion.indexOf("MSIE 8") != -1) document.body.className += ' f-ie8';;

  $(function () {

    /* main menu fix */
    $('.b-main_menu-first_item').slice(6).hide();

    /* vart_menu fix width for submenu */
    $('.b-vert_menu ul ul').each(function () {
      var el = $(this),
        child = el.children(),
        text = el.text(),
        width = text.length / child.length / 1.4;

      el.css('width', width + 'em');
    });

    /* fix img in detail block */
    $('.c-detail img').each(function () {
      var el = $(this),
        p = el.parent(),
        tag = p[0].tagName.toLowerCase();

      if (tag === 'figure' || p.hasClass('img_left') || p.hasClass('img_right')) return;

      if (p.hasClass('c-detail')) el.addClass('img_alone');
      else if (tag === 'p') p.addClass('img_parent img_p');
      else p.addClass('img_parent');
    });

    /* fix header font size */
    $('.c-detail h1').each(function () {
      var el = $(this);

      if (el.text().length > 150) el.css('font-size', '20px');
    });

    fn_gotop('.e-gotop');

    var ar12 = $('.e-formstep');
    if (ar12.length) {
      ar12.each(function () {
        var el = $(this),
          h = $(this.getAttribute('data-formstep')),
          ar = el.find('input, textarea, select'),
          ar_o = [],
          tr = false,
          fn_check_input = function (input, method) {
            switch (method) {
              case 'text':
                if (input.val()) return true;
                break;
              case 'select':
                if (input[0].selectedIndex || (input[0].muliple && input[0].selectedIndex > 0)) return true;
                break;
              case 'check':
                if (input.is(':checked')) return true;
                break;
            };
            return false;
          };

        ar.each(function (i) {
          var tag = this.tagName.toLowerCase(),
            type = this.getAttribute('type');
          ar_o[i] = {
            input: $(this),
            method: (tag == 'select') ? 'select' : (type == 'checkbox' || type == 'radio') ? 'check' : 'text'
          };
        });

        ar.bind('change', function () {
          var tr_cur = false;
          for (var i = 0, l = ar_o.length; i < l; i++) {
            tr_cur = fn_check_input(ar_o[i].input, ar_o[i].method);
            if (tr_cur) tr = true;
            else if (ar_o[i].method != 'check') tr = false;
          };
          if (tr) {
            h.removeClass('hidden');
          } else {
            h.addClass('hidden');
          };
        });
      });
    };

    var ar10 = $('.e-cloneit'),
      ar10_count = 0;
    if (ar10.length) {
      ar10.each(function () {
        var el = $(this),
          h = $(this.getAttribute('href')),
          clone = h.clone(),
          last,
          cur,
          count = 1,
          max = parseInt(this.getAttribute('data-cloneit-max')) || 0,
          set = function (el) {
            if (el[0].id) el[0].id += '--' + ar10_count++;

            var selectElement = $(el[0]).find('select');
            if (selectElement) selectElement[0].name += (ar10_count + 1);
            if (selectElement) selectElement[0].id += (ar10_count + 1);

            //el.find('[id]').each(function () {
            //	this.id += '--'+ ar10_count++;
            //});

            if (jQuery().select) {
              el.find('.e-select').select({
                title: (navigator.appName.indexOf("Internet Explorer") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1)
              });
              el.filter('.e-select').select({
                title: (navigator.appName.indexOf("Internet Explorer") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1)
              });
              el.find('.e-datepicker').datepicker();
              el.filter('.e-datepicker').datepicker();
            };
          };

        el.bind('click', function () {
          if (max && count >= max) return false;
          cur = clone.clone();
          if (last) last.after(cur);
          else h.after(cur);
          cur.addClass('m_t35');
          set(cur);
          last = cur;
          count++;
          if (max && count >= max) el.hide();
          return false;
        });
      });
    };

    if (jQuery().checkup) {
      $('.e-checkup').checkup();
    };
    if (jQuery().select) {
      $('.e-select').select({
        small: jQuery.browser.mobile,
        title: (navigator.appName.indexOf("Internet Explorer") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1)
      });
    };
    if (jQuery().file) {
      var f_item = '<div class="b-attach_file clearfix"><a class="b-attach_file-but e-file-del" href="javascript:void(0);"><i class="ico i_trash"></i> <span class="half_link">удалить</span></a><span class="b-attach_file-text">{title}{size}</span></div>';
      var f_top = '<div class="c-title t-1 t-files_title"><h4 class="ct-h4">Прикрепленные файлы:</h4></div>';
      $('.e-file').each(function () {
        var total = 0,
          trigger = false,
          top = $(f_top);
        $(this).file({
          onChange: function (c, el, title, size) {
            var size_pref = (size < 1000) ? 'B' : (size < 1000000) ? 'KB' : (size < 1000000000) ? 'MB' : 'GB';
            size = ((size < 1000) ? size : (size < 1000000) ? size / 1024 : (size < 1000000000) ? size / 1048576 : size / 1073741824).toFixed(1);
            var item = $(f_item.replace('{title}', title).replace('{size}', size ? ' <i class="c_grey">(' + size + size_pref + ')</i>' : ''));
            if (!trigger) {
              c.before(top);
              trigger = true;
            };
            c.before(item);
            total++;
            item.find('.e-file-del').bind('click', function () {
              el.trigger('delete');
              return false;
            });
            el.bind('delete', function () {
              item.remove();
              total--;
              if (trigger && !total) {
                top.detach();
                trigger = false;
              };
            });
          }
        });
      });
    };
    if (jQuery().datepicker) {
      $.datepicker.setDefaults({
        firstDay: 1,
        dateFormat: "dd.mm.yy"
      });

      if (!document.site || document.site.version != 'en') {
        $.datepicker.setDefaults({
          changeMonth: true,
          changeYear: true,
          dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Нояб', 'Дек'],
          monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
        });
      }

      $('.e-datepicker').datepicker();
      $('.e-datepicker_link').each(function () {
        var el = $(this),
          str = el.find('.e-datepicker_link-text'),
          inp = $('<input type="text" style="width: 0; height: 1.2em; margin: 0; padding: 0; border: 0; visibility: hidden;" />');
        el.prepend(inp);
        inp.datepicker({
          onClose: function (date) {
            if (date) str.text(date);
          }
        });
        el.bind('click', function () {
          inp.datepicker('show');
          return false;
        });
      });
    };
    if (jQuery().nslider) {
      $('.e-slider_p1').nslider({
        navClass: 'hidden',
        pointClass: 't-1',
        speed: 600
      });
    };
    if (jQuery().tooltip) {
      $('.e-tooltip').tooltip({
        layer: '#layer',
        pos: 'right',
        mode: 'cursor'
      });
    };
    if (jQuery().autocolumnlist) {
      $('.e-columns_3').addClass('row t-1 clearfix').autocolumnlist({
        columns: 3,
        classname: 'cell s-4'
      });
    };
    if (jQuery().mask) {
      $('.e-mask_phone').mask('+7 (999) 999-9999');
    };
    if (jQuery().tablesorter) {
      $('.e-tablesort').tablesorter({
        cssHeader: 'b-tablesort',
        cssAsc: 't-up',
        cssDesc: 't-down'
      });
    };

    if (jQuery().mediaelementplayer) {
      $('video').mediaelementplayer({
        startVolume: 1,
        features: ['playpause', 'progress', 'duration', 'fullscreen'],
        alwaysShowControls: false,
        iPadUseNativeControls: true,
        iPhoneUseNativeControls: true,
        AndroidUseNativeControls: true,
        enableKeyboard: false,
        videoVolume: 'horizontal',
        pluginPath: mediapluginPath
      });
      $('audio').mediaelementplayer({
        audioWidth: '100%',
        startVolume: 1,
        features: ['playpause', 'progress', 'duration', 'fullscreen'],
        alwaysShowControls: false,
        iPadUseNativeControls: true,
        iPhoneUseNativeControls: true,
        AndroidUseNativeControls: true,
        enableKeyboard: false,
        audioVolume: 'horizontal',
        pluginPath: mediapluginPath
      });
    };

    var body = $('body');
    if (jQuery().popup) {
      $('.e-popup_media').popup({
        template: '<div class="popup-wrapper">' +
          '<div class="popup-holder"></div>' +
          '<div class="popup-error">Error</div>' +
          '<a class="popup-but-close" href="#close">Close</a>' +
          '<div class="b-navigation t-white m_t5">' +
          '<span class="b-navigation-group t-big_left">' +
          '<a class="popup-but-prev b-navigation-item" href="#"><i class="ico i_nar_lw"></i> ' + text_popup_but_prev + '</a>' +
          '</span>' +
          '<span class="b-navigation-group e-popup_nav"></span>' +
          '<span class="b-navigation-group t-big_right">' +
          '<a class="popup-but-next b-navigation-item" href="/">' + text_popup_but_next + ' <i class="ico i_nar_rw"></i></a>' +
          '</span>' +
          '</div>' +
          '<div class="popup-title"></div>' +
          '<div class="popup-text c-detail t-1"></div>' +
          '<div class="popup-share"></div>' +
          '</div>',
        layer: '#layer',
        popupClass: 't-media',
        type: 'image',
        onOpen: function (e, p) {
          /*var el_t = p.find('.popup-text'),
          	ct_t = body.find('article.c-detail').first().html();
          el_t.empty().html(ct_t);*/
          body.addClass('f-popup');
        },
        onClose: function () {
          body.removeClass('f-popup');
        },
        onLoad: function (e, p, ar) {
          var el_n = p.find('.e-popup_nav'),
            tmp = '<a class="b-navigation-item {c}" href="#">{n}</a> ',
            ind_cur = parseInt(e.data('popup-index')),
            ind_start = (ind_cur - 2 > 0 && ar.length > 4) ? (ind_cur + 3 >= ar.length) ? ar.length - 5 : ind_cur - 2 : 0,
            ind_end = (ind_start + 4 >= ar.length) ? ar.length - 1 : ind_start + 4;
          body.addClass('f-popup');
          el_n.empty();
          for (var i = ind_start; i <= ind_end; i++) {
            el_n.append(tmp.replace('{n}', i + 1).replace('{c}', i == ind_cur ? 'selected' : ''));
          };
          el_n.children().bind('click', function () {
            var n = parseInt($(this).text()) - 1;
            if (n == ind_cur) return false;
            $(ar[n]).trigger('click');
            return false;
          });
          if (aa_fixplaceholder) aa_fixplaceholder();
        }
      });

      $('.e-popup_photo').popup({
        template: '<div class="popup-wrapper">' +
          '<div class="popup-holder"></div>' +
          '<div class="popup-error">Error</div>' +
          '<a class="popup-but-close" href="#close">Close</a>' +
          '<div class="b-navigation t-white m_t5">' +
          '<span class="b-navigation-group t-big_left">' +
          '<a class="popup-but-prev b-navigation-item" href="#"><i class="ico i_nar_lw"></i> Предыдущая</a>' +
          '</span>' +
          '<span class="b-navigation-group e-popup_nav"></span>' +
          '<span class="b-navigation-group t-big_right">' +
          '<a class="popup-but-next b-navigation-item" href="/">Следующая <i class="ico i_nar_rw"></i></a>' +
          '</span>' +
          '</div>' +
          '</div>',
        layer: '#layer',
        popupClass: 't-media',
        type: 'image',
        onOpen: function (e, p) {
          body.addClass('f-popup');
        },
        onClose: function () {
          body.removeClass('f-popup');
        },
        onLoad: function (e, p, ar) {
          var el_n = p.find('.e-popup_nav'),
            tmp = '<a class="b-navigation-item {c}" href="#">{n}</a> ',
            ind_cur = parseInt(e.data('popup-index')),
            ind_start = (ind_cur - 2 > 0 && ar.length > 4) ? (ind_cur + 3 >= ar.length) ? ar.length - 5 : ind_cur - 2 : 0,
            ind_end = (ind_start + 4 >= ar.length) ? ar.length - 1 : ind_start + 4;
          body.addClass('f-popup');
          el_n.empty();
          for (var i = ind_start; i <= ind_end; i++) {
            el_n.append(tmp.replace('{n}', i + 1).replace('{c}', i == ind_cur ? 'selected' : ''));
          };
          el_n.children().bind('click', function () {
            var n = parseInt($(this).text()) - 1;
            if (n == ind_cur) return false;
            $(ar[n]).trigger('click');
            return false;
          });
          if (aa_fixplaceholder) aa_fixplaceholder();
        }
      });

      $('.e-popup_form').popup({
        layer: '#layer',
        popupClass: 't-form',
        type: 'ajax',
        request: {},
        width: 420,
        grouped: false,
        onOpen: function () {
          body.addClass('f-popup');
        },
        onClose: function () {
          body.removeClass('f-popup');
        },
        onLoad: function (e, p) {
          if (jQuery().checkup) {
            p.find('.e-checkup').checkup();
          };
          if (jQuery().select) {
            p.find('.e-select').select({
              title: (navigator.appName.indexOf("Internet Explorer") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1)
            });
          };
          if (jQuery().errortip) {
            p.on('error', '.e-errortip', function () {
              $(this).errortip({
                errorClass: 't-popup',
                layer: p.find('.popup-holder'),
                superposition: true,
                onError: function (el) {
                  el.addClass('t-form_error').one('focus', function () {
                    el.trigger('unerror');
                  });
                },
                onUnerror: function (el) {
                  el.removeClass('t-form_error');
                }
              });
            });
            p.find('.e-errortip').trigger('error');
          };
          if (jQuery().tooltip) {
            p.find('.e-tooltip').tooltip({
              layer: '#layer',
              pos: 'right',
              mode: 'cursor'
            });
          };
          if (window.aa_fixplaceholder) aa_fixplaceholder();
          else if (window.fn_placeholder) {
            fn_placeholder('.popup .input, .popup .textarea');
            $('.popup .e-stretchy').trigger('resize');
          };
        }
      });

      var video_tmp = '<video width="100%" height="460" poster="{poster}" controls="controls" preload="none"><source src="{url}" /></video>';
      $('.e-popup_video').popup({
        template: '<div class="popup-wrapper">' +
          '<div class="popup-holder"></div>' +
          '<div class="popup-error">Error</div>' +
          '<a class="popup-but-close" href="#close">Close</a>' +
          '<div class="popup-title"></div>' +
          '</div>',
        layer: '#layer',
        popupClass: 't-media',
        type: 'iframe',
        width: 800,
        height: 460,
        grouped: false,
        onOpen: function (e, p) {
          body.addClass('f-popup');
        },
        onClose: function () {
          body.removeClass('f-popup');
        },
        onLoad: function (e, p, ar) {
          var url = e.attr('href');

          if (!(/(?:\.)(mp4|webm|ogg|flv)(?:\?.*)?$/i.test(url))) return;

          var fr = p.find('.popup-content-iframe'),
            video = $(video_tmp.replace('{poster}', e.data('video-poster')).replace('{url}', url));
          body.addClass('f-popup');
          fr.before(video);
          fr.remove();
          video.mediaelementplayer({
            startVolume: 1,
            features: ['playpause', 'progress', 'duration', 'fullscreen'],
            alwaysShowControls: false,
            iPadUseNativeControls: true,
            iPhoneUseNativeControls: true,
            AndroidUseNativeControls: true,
            enableKeyboard: false,
            videoVolume: 'horizontal',
            pluginPath: mediapluginPath,
            success: function (mediaElement, domObject) {
              mediaElement.play();
            }
          });
        }
      });
    };

    var ar1 = $('.e-toggletabs');
    if (ar1.length) {
      ar1.each(function () {
        var e = $(this),
          ar = this.hasAttribute('data-toggletabs-el') ? e.find(this.getAttribute('data-toggletabs-el')) : e.children(),
          set_trigger = (this.hasAttribute('data-toggletabs-set')) ? parseInt(this.getAttribute('data-toggletabs-set')) : 1,
          last_el,
          last_h,
          cur = ar.filter('.active'),
          trigger = false;
        if (!cur.length && set_trigger) cur = ar.first().addClass('active');
        ar.each(function () {
          var el = $(this),
            h = $(this.getAttribute('data-toggletabs-holder') || this.getAttribute('href')),
            type = el[0].tagName.toLowerCase(),
            set = (type == 'input' || type == 'label') ? false : true;
          h.hide();
          el.bind('click', function () {
            if (el.hasClass('active') && trigger) return !set;
            if (last_el) last_el.removeClass('active');
            if (last_h) last_h.hide();
            el.addClass('active');
            h.show();
            last_el = el;
            last_h = h;
            trigger = true;
            if (set) return false;
          });
          if (!set) {
            el.bind('change', function () {
              var inp = (type == 'input') ? el : el.find('input');
              if (inp.is(':checked') && h.is(':hidden')) {
                trigger = false;
              };
            });
          };
        });
        if (set_trigger) cur.trigger('click');
      });
    };

    var ar2 = $('.e-toggleholder');
    if (ar2.length) {
      ar2.each(function () {
        var el = $(this),
          h = $(this.getAttribute('data-toggleholder') || this.getAttribute('href')),
          type = el[0].tagName.toLowerCase(),
          set = (type == 'input' || type == 'label') ? false : true,
          trigger = false;
        el.bind('click', function () {
          if (!h.hasClass('active')) {
            el.addClass('active');
            h.addClass('active');
            trigger = true;
          } else {
            el.removeClass('active');
            h.removeClass('active');
            trigger = false;
          };

          if (set) return false;
        });
      });
    };

    var ar3 = $('.e-ajaxsitemap');
    if (ar3.length) {
      ar3.each(function () {
        var el = $(this),
          h = $(this.getAttribute('data-ajaxsitemap-holder')),
          request = {
            dataType: 'HTML',
            url: this.getAttribute('href')
          },
          tr_active = false,
          tr_download = false;
        el.bind('click', function () {
          if (tr_active) {
            tr_active = false;
            el.removeClass('active');
            h.addClass('hidden');
            return false;
          } else if (tr_download) {
            tr_active = true;
            el.addClass('active');
            h.removeClass('hidden');
            return false;
          };
          tr_active = true;
          el.addClass('active');
          $.ajax(request)
            .success(function (html) {
              tr_download = true;
              h.append(html);
              $('body, html').scrollTop(h.offset().top);
            });
          return false;
        });
      });
    };

    var ar4 = $('.e-checkall'),
      ar4_all = $('.e-checkup');
    if (ar4.length) {
      ar4.each(function () {
        var el = $(this),
          ar = ar4_all.filter('[name="' + el.attr('name') + '"]').not(el);
        if (!ar.length) return;
        el.bind('change', function () {
          if (el.is(':checked')) {
            ar.prop('disabled', true).prop('checked', true).trigger('disabled').trigger('change');
          } else {
            ar.prop('disabled', false).prop('checked', false).trigger('disabled').trigger('change');
          };
        });
        el.trigger('change');
      });
    };

    var ar5 = $('.e-togglefocus');
    if (ar5.length) {
      ar5.each(function () {
        var el = $(this),
          input = el.find('.e-togglefocus-input'),
          trigger = false;
        input.bind('focus', function () {
          el.addClass('active');
          trigger = true;
        });
        el.bind('click', function () {
          trigger = true;
        });
        $(document).bind('click', function () {
          if (!trigger) {
            setTimeout(function () {
              el.removeClass('active');
            }, 100);
          };
          trigger = false;
        });
      });
    };

    var ar6 = $('.e-formreset');
    if (ar6.length) {
      ar6.each(function () {
        var el = $(this),
          input = el.parents('form').find('input, select');
        el.bind('click', function () {
          setTimeout(function () {
            input.trigger('change');
          }, 50);
        });
      });
    };

    var ar7 = $('.e-gotoprint');
    if (ar7.length) {
      ar7.each(function () {
        var el = $(this);
        el.bind('click', function () {
          window.print();
        });
      });
    };

    var ar8 = $('.e-rope');
    if (ar8.length) {
      ar8.each(function () {
        var el = $(this),
          p = $(this.getAttribute('data-rope'));
        empty_val = p.attr('data-empty-val');
        if (typeof empty_val === 'undefined') empty_val = 0;
        p.bind('change', function () {
          if (p.val() != empty_val) el.prop('disabled', false).trigger('disabled');
          else {
            $(el[0][0]).prop('selected', true).trigger('change');
            el.prop('disabled', true).trigger('disabled');
          };
        });
        el.prop('disabled', true).trigger('disabled');
      });
    };

    var ar9 = $('.e-selectenable');
    if (ar9.length) {
      ar9.each(function () {
        var el = $(this),
          p = el.parent('select'),
          h = $(this.getAttribute('data-selectenable'));

        p.bind('change', function () {
          if (el.is(':selected')) h.prop('disabled', false).trigger('disabled');
          else h.prop('disabled', true).trigger('disabled');
        });
        p.trigger('change');
      });
    };

    if (!jQuery.browser.mobile) {
      var ar10 = $('.c-detail table'),
        ar10_body = $('body'),
        ar10_scroll = $('html, body');
      if (ar10.length) {
        ar10.each(function () {
          var el = $(this),
            ps = $(),
            link_more = $('<div class="b-big_data-link t-more"><a class="f-normal" href="#full"><span class="half_link">Показать полностью</span><i class="ico i_full"></i></a></div>'),
            link_less = $('<div class="b-big_data-link t-less g-wrapper m_m"><div class="m_il"><a class="f-full" href="#"><i class="ico i_back"></i><span class="half_link">Назад</span></a></div></div>');

          if (el.width() <= 980) return;

          el.wrapAll('<div class="b-big_data"></div>');
          el.before(link_more);
          ar10_body.prepend(link_less);

          var max = 20,
            ce = el.parent(),
            cp = ce;

          while (max) {
            ce = cp;
            cp = ce.parent();

            ps = ps.add(ce.siblings());

            if (cp.hasClass('b-container')) break;

            max--;
          };

          link_more.add(link_less).find('a').bind('click', function () {
            ar10_body.toggleClass('f-bigdata');
            ps.toggleClass('hidden');
            ar10_scroll.scrollTop(0);
            return false;
          });
        });
      };
    };

    var ar11 = $('.e-selectshow');
    if (ar11.length) {
      ar11.each(function () {
        var el = $(this),
          p = el.parent('select'),
          h = $(this.getAttribute('data-selectshow'));

        p.bind('change', function () {
          if (el.is(':selected')) h.removeClass('hidden');
          else h.addClass('hidden');
        });
        p.trigger('change');
      });
    };

    var ar12 = $('.e-senderror');
    if (ar12.length) {
      ar12.each(function () {
        var el = $(this);

        var get_node_index = function (node, count) {
            count = count || 1;

            if (!node) return count;

            if (node.previousElementSibling) return get_node_index(node.previousElementSibling, ++count);
            else if (node.previousSibling) return get_node_index(node.previousSibling, ++count);

            return count;
          },
          get_node_path = function (node, path) {
            path = path || [];

            var path_item = '';

            if (!node) return path_item;

            path_item += '[' + get_node_index(node) + ']';

            if (node.tagName) path_item += node.tagName.toLowerCase();

            path.push(path_item);

            if (node.parentNode && node.parentNode !== el[0]) return get_node_path(node.parentNode, path);

            if (node.parentNode !== el[0]) return undefined;

            return path.reverse().join(' ');
          },
          get_selection = function () {
            var selection,
              selection_clone,
              result = {};

            if (window.getSelection) {
              selection = window.getSelection();

              result.text = selection.toString().replace(/(\r\n|\n)/g, ' ');
              result.startPath = get_node_path(selection.anchorNode.parentNode);
              result.startPosition = selection.anchorOffset;
              result.endPath = get_node_path(selection.focusNode.parentNode);
              result.endPosition = (result.endPath !== undefined) ? selection.focusOffset : undefined;

              return result;
            } else if (document.selection && document.selection.type != 'Control') {
              selection = document.selection.createRange();
              selection_clone = selection.duplicate();

              result.text = selection.text.replace(/(\r\n|\n)/g, ' ');

              selection.collapse(true);
              selection_clone.collapse(false);

              result.startPath = get_node_path(selection.parentElement());
              result.startPosition = 0;
              result.endPath = get_node_path(selection_clone.parentElement());
              result.endPosition = 0;

              return result;
            };
          };

        $(document).bind('keydown', function (event) {
          if (!(event.ctrlKey && (event.keyCode || event.which) === 13)) return;

          var data = get_selection();

          if (!data.text) return;

          $.popup('_ajax_errorreport.html', {
            template: '<div class="popup-wrapper">' +
              '<div class="popup-title"></div>' +
              '<div class="popup-holder"></div>' +
              '<div class="popup-error">Error</div>' +
              '<a class="popup-but-close" href="#close">Close</a>' +
              '</div>',
            layer: '#layer',
            popupClass: 't-modal',
            width: 420,
            type: 'ajax',
            onLoad: function (e, p, ar) {
              p.find('#errorreport-text').val(data.text);
              p.find('#errorreport-start-path').val(data.startPath);
              p.find('#errorreport-start-position').val(data.startPosition);
              p.find('#errorreport-end-path').val(data.endPath);
              p.find('#errorreport-end-position').val(data.endPosition);
              p.find('.e-popupclose').bind('click', function () {
                p.trigger('close');
                return false;
              });
            }
          });

          return false;
        });
      });
    };

  });

  $(window).bind('load', function () {

    if (jQuery().errortip) {
      $(document).on('error', '.e-errortip', function () {
        $(this).errortip({
          layer: '#layer',
          onError: function (el) {
            el.addClass('t-form_error').one('focus', function () {
              el.trigger('unerror');
            });
          },
          onUnerror: function (el) {
            el.removeClass('t-form_error');
          }
        });
      });
      $('.e-errortip').trigger('error');
    };

    if (!jQuery.browser.mobile) {
      var ar1 = $('.e-autoheight');
      if (ar1.length) {
        ar1.each(function () {
          var ar = $(this).find('.e-autoheight-item'),
            max = 0;
          ar.each(function () {
            h = $(this).height();
            max = (h > max) ? h : max;
          });
          ar.css('min-height', max);
        });
      };
    };

    if (jQuery.browser.mobile && window.innerHeight) document.getElementById('wrapper').style.minHeight = window.innerHeight + 'px';

  });

  // scroll top button
  var gotop = function (sel) {
    var body = $('html, body'),
      timeout,
      trigger = false,
      ar = $(sel);

    var fn_set = function () {
        body.animate({
          scrollTop: 0
        }, 200);

        return false;
      },
      fn_scroll = function () {
        clearTimeout(timeout);

        timeout = setTimeout(function () {
          if ($(document).scrollTop() > 200) {
            if (trigger) return;

            ar.addClass('f-active');

            trigger = true;
          } else {
            if (!trigger) return;

            ar.removeClass('f-active');

            trigger = false;
          };
        }, 200);
      };

    $(document)
      .on('click', sel, fn_set)
      .bind('scroll', fn_scroll);

    $(document).trigger('scroll');
  };

  window.fn_gotop = gotop;

})();

//input, textarea placeholder
(function () {
  var placeholder = function (sel) {
    var ar = $(sel);

    ar.each(function () {
      if (/radio|checkbox|color/i.test(this.getAttribute('type'))) return;
      if (!this.hasAttribute('placeholder')) this.className += ' f-placeholder f-noplaceholder';
      if (!this.hasAttribute('placeholder') || this.hasAttribute('data-placeholder') || /radio|checkbox|color/i.test(this.getAttribute('type'))) return;

      this.setAttribute('data-placeholder', true);

      var el = $(this),
        type = this.tagName.toLowerCase(),
        text = $('<div class="placeholder-title">' + this.getAttribute('placeholder') + '</div>'),
        p;

      el.addClass('f-placeholder').wrap('<div class="placeholder"></div>').after(text).attr('placeholder', '');
      text.css({
        'height': ((type == 'textarea') ? 55 : el.outerHeight()) + 'px',
        'line-height': ((type == 'textarea') ? 55 : el.outerHeight()) + 'px'
      });

      p = el.parent();

      if (type == 'textarea') el.addClass('e-stretchy');

      if (el.val()) text.addClass('f-full');
      else text.removeClass('f-full');

      text
        .bind('click', function () {
          el[0].focus();
        });
      el
        .bind('focus', function () {
          text.addClass('f-full');
        })
        .bind('blur change', function () {
          setTimeout(function () {
            if (el.val()) text.addClass('f-full');
            else text.removeClass('f-full');
          }, 100);
        });
    });
  };

  window.fn_placeholder = placeholder;

  $(function () {
    if (!window.aa_fixplaceholder) {
      var _js = document.createElement('script');
      _js.type = 'text/javascript';
      _js.src = '/js/stretchy.min.js';
      //_js.src = 'js/stretchy.min.js';
      _js.setAttribute('data-filter', '.e-stretchy');
      document.body.appendChild(_js);
      document.body.className += ' f-enableph';

      fn_placeholder('.b-container .input, .b-container .textarea');
    };
  });
})();



//ie8 font ico fix
(function () {
  if (navigator.appName.indexOf("Internet Explorer") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1) {
    // other
    var _css = document.createElement('link');
    _css.setAttribute('rel', 'stylesheet');
    _css.href = 'http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/css/font.css?' + ((new Date).valueOf());
    //_css.href = 'http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/css/font.css?'+ ((new Date).valueOf());
    document.body.appendChild(_css);
  } else {
    // ie8
    $(window).bind('load', function () {
      setTimeout(function () {
        var _css = document.createElement('link');
        var _ico = document.querySelectorAll('.icofont');
        _css.onload = function () {
          setTimeout(function () {
            for (var i = 0, l = _ico.length; i < l; i++) {
              if (_ico[i].className.indexOf('f_starempty') != -1) continue;
              _ico[i].outerHTML = _ico[i].outerHTML.replace('>', '>');
            };
          }, 200);
        };
        _css.setAttribute('rel', 'stylesheet');
        _css.href = 'http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/css/font.css?' + ((new Date).valueOf());
        //_css.href = 'http://xn--b1afk4ade4e.xn--b1ab2a0a.xn--b1aew.xn--p1ai/css/font.css?'+ ((new Date).valueOf());
        document.body.appendChild(_css);
      }, 200);
    });
  };
})();

//ie8 fix
(function () {
  if (navigator.appName.indexOf("Internet Explorer") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1) return;

  $(window).bind('load', function () {
    $('.e-popup_map').popup('destroy');
  });
})();

//ie9, ie8 input placeholder fix
(function () {
  if (navigator.appName.indexOf("Internet Explorer") == -1 && navigator.appVersion.indexOf("MSIE 8") == -1 && navigator.appVersion.indexOf("MSIE 9") == -1) return;

  var aa_fixplaceholder = function () {
    var ar = $('input, textarea');

    ar.each(function () {
      if (!this.hasAttribute('placeholder') || this.hasAttribute('data-fixplaceholder')) return;

      this.setAttribute('data-fixplaceholder', true);

      var el = $(this),
        type = this.tagName.toLowerCase(),
        text = $('<div class="input-placeholder">' + this.getAttribute('placeholder') + '</div>'),
        p = $(this).parent();

      p.css({
        'position': 'relative'
      });
      text.css({
        'position': 'absolute',
        'top': el[0].offsetTop,
        'left': el[0].offsetLeft + 20,
        'height': el.outerHeight(),
        'line-height': ((type == 'textarea') ? 40 : el.outerHeight()) + 'px'
      });
      el.after(text);

      if (el.val()) text.hide();
      else text.show();

      text
        .bind('click', function () {
          el[0].focus();
        });
      el
        .bind('focus', function () {
          text.hide();
        })
        .bind('blur change', function () {
          setTimeout(function () {
            if (el.val()) text.hide();
            else text.show();
          }, 100);
        });
    });
  };

  window.aa_fixplaceholder = aa_fixplaceholder;

  $(function () {
    aa_fixplaceholder();
  });
})();

//no svg fix 
(function () {
  if (document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.1')) return;

  document.documentElement.className += ' f-no-svg'

  var aa_svgfix = function (ar) {
    ar.each(function () {
      if (this.hasAttribute('data-svgfix') || !(/\.svg(?:\?.*)?$/.test(this.src))) return;

      this.src = this.hasAttribute('data-svgfix-image') ? this.getAttribute('data-svgfix-image') : this.src.replace(/\.svg/i, '.png');

      this.setAttribute('data-svgfix', true);
    });
  };

  window.aa_svgfix = aa_svgfix;

  $(function () {
    aa_svgfix($('img'));
  });
})();