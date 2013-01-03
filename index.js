(function($) {

  function getUrls() {
    try {
      var arr = JSON.parse(window.location.hash.substr(1));
      var a = '' + (arr[0] || '');
      var b = '' + (arr[1] || '');
      return [a, b];
    } catch (e) { return ['', '']; }
  }

  function setUrls(urls) {
    window.location.hash = JSON.stringify(urls);
  }

  function makeSection(i) {
    var section = $('<section/>');
    var textarea = $('<textarea/>')
      .data('two-index', i)
      .appendTo(section)
      .keypress(function(e) {
        if (e.which === 13) {
          var urls = getUrls();
          var self = $(this);
          urls[self.data('two-index')] = self.val();
          setUrls(urls);
        }
      });
    var iframe = $('<iframe/>')
      .appendTo(section);
    return section;
  }

  function hashchange() {
    var urls = getUrls();
    for (var i = 0; i < 2; i++) {
      var url = urls[i];
      $($('section')[i]).toggleClass('go', !!url);
      if (url) {
        $('iframe')[i].src = url;
      }
    }
  }

  $(function() {
    for (var i = 0; i < 2; i++) {
      makeSection(i).appendTo('body');
    }
    $(window).on('hashchange', hashchange);
    hashchange();
  });

})(jQuery);
