// jshint ignore:start
var _gaq = [
  ['_setAccount', 'UA-1128111-24'],
  ['_trackPageview']
];
// jshint ignore:end

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') +
            '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

window.test = function(expression) {
  var result = (typeof expression === "string" ? expression : !!expression ? 'Yes' : 'No');
  document.write('<td class="' + result.toLowerCase() + ' current">' + result + '</td><td></td>');
};

document.write('<style>td:nth-of-type(2) { outline: #aaf solid 3px; }</style>');

// For async tests, this returned function is used to set results
// instead of returning true/false.
function makeAsyncPassedFn(className, textContent) {
  return function(rowNum) {
    return function() {
      var elem = $("#table-wrapper tbody tr:not(.category)").eq(+rowNum).children(".current")[0];
      elem.className = className;
      elem.textContent = textContent;
      if (window.__updateHeaderTotal) {
        $(elem).parent().prevAll('.supertest').first().each(window.__updateSupertest);
        $('th.current').each(window.__updateHeaderTotal);
      }
    };
  };
}
window.__asyncPassedFn = makeAsyncPassedFn('yes', "Yes");
window.__strictAsyncPassedFn = makeAsyncPassedFn("no strict", "Strict");

$(function() {
  'use strict';
  var table = $('#table-wrapper');
  var currentBrowserSelector = ":nth-of-type(2)";
  var thead = $('thead');
  
  if (thead.css('position') === "-webkit-sticky") {
    // Remove floatThead when native position:sticky is usable.
    // Currently, only Safari (which floatThead incidentally does not support),
    // and its -webkit-sticky prefix, works correctly with <thead>.
    $.fn.floatThead = function() { return this };
  }

  // position: sticky is implemented in chrome but buggy. currently makes the background transparent sometimes
  if (thead.css('position') === "sticky" && window.chrome) {
    thead.css('position', 'static');
  }

  var initFloatingHeaders = function() {
    table.floatThead({
      headerCellSelector: 'tr:last>*:visible'
    });
  };

  var setColSpans = function() {
    $('#desktop-header' ).prop('colSpan', $('.platform.desktop:visible').length);
    $('#compiler-header').prop('colSpan', $('.platform.compiler:visible').length);
    $('#engine-header'  ).prop('colSpan', $('.platform.engine:visible').length);
    $('#mobile-header'  ).prop('colSpan', $('.platform.mobile:visible').length);
    $('tr.category>td'  ).prop('colSpan', $('tr.supertest:first>td:visible').length);
  };



  table.on("floatThead", function (evt, isFloating, $container) {
    $container.toggleClass("floating-header", isFloating);
  });


  // Set up the Show Obsolete checkbox
  $('#show-obsolete, #show-unstable').on('click', function() {
    $('body').toggleClass(this.id, this.checked);
    setTimeout(function() {
      setColSpans();
      table.triggerHandler('reflow'); //refresh floatThead
    }, 100);
  }).each(function() {
    if (this.checked) $(this).triggerHandler("click");
  });

  window.__updateSupertest = function() {
    var tr = $(this);
    var isNonStandardTable = $('.non-standard table').length > 0;
    var subtests = tr.nextUntil('tr:not(.subtest)');
    if (subtests.length === 0) {
      return;
    }
    var tally = subtests.find(".yes" + currentBrowserSelector).length;
    var grade = tally/subtests.length;
    tr
      .find('.tally.current, .tally.current + td:empty').remove().end()
      .find('td:first-child')
      .after(
      '<td class="tally current" data-tally="' + tally/subtests.length
      + (isNonStandardTable ? '' : '" style="background-color:hsl(' + (120*grade|0) + ',' +((86 - (grade*44))|0)  +'%,50%)')
      + '">' +
      tally + '/' + subtests.length + '</td><td></td>'
    );
  };

  $('tr.supertest').each(function() {
    var tr = $(this);
    var subtests = tr.nextUntil('tr:not(.subtest)');
    if (subtests.length === 0) {
      return;
    }
    // Attach dropdown indicator and onclick to those tests with subtests
    $('<span class="folddown">&#9658;</span>')
      .appendTo(tr.children()[0]);

    tr.on('click', function(event) {
      if (!$(event.target).is('a')) {

        // toggle manually for perf. reasons
        // it would be even better to toggle this via higher-level CSS (on a parent)
        // but current optimization (getting rid of `toggle`)
        // already brings time from ~500ms to ~15ms
        // (mostly due to removal of recalc-heavy `css` for each element)
        // so this is probably sufficient for now
        subtests.each(function(i, el) {
          el.style.display = el.style.display === 'table-row' ? 'none' : 'table-row';
        });

        var deg = subtests[0].style.display === 'table-row' ? '90deg' : '0deg';
        tr.find(".folddown").css('transform', 'rotate(' + deg + ')');
      }
    });

    // Also, work out tallies for the current browser's tally features
    tr.each(window.__updateSupertest);
  });


  var globalFoldDown = $('<span class="folddown">&#9658;</span>');
  if ($('tr.supertest').size()) {
    $('.test-name').append(globalFoldDown);
  }
  globalFoldDown.data('is-expanded', false);

  globalFoldDown.on('click', function(e) {
    e.stopPropagation();

    // let's horribly cheat here for now

    $('tr.supertest').click();
    globalFoldDown.data('is-expanded', !globalFoldDown.data('is-expanded'));

    var deg = globalFoldDown.data('is-expanded') ? '90deg' : '0deg';
    globalFoldDown.css('transform', 'rotate(' + deg + ')');
  })
  .css('cursor', 'pointer')
  .prop('title', 'Expand/Collapse all tests');


  // Set up the tooltip HTML
  var infoTooltip = $('<pre class="info-tooltip">')
    .hide()
    .appendTo('body')
    .on('click', function (e) {
      e.stopPropagation();
    });

  infoTooltip.fillAndShow = function (e, scriptTag) {
    return this
      .text(scriptTag.attr('data-source').trim())
      .show()
      .moveHere(e);
  };

  infoTooltip.unlockAndHide = function (lockedFrom) {
    lockedFrom.removeClass('tooltip-locked');
    return this
      .data('locked-from', null)
      .hide();
  };

  infoTooltip.moveHere = function (e) {
    return this.offset({
      left: e.pageX + 10,
      top: e.pageY
    });
  };

  // Attach tooltip buttons to each feature <tr>
  $('#table-wrapper td:first-child').each(function() {
    var td = $(this);
    var scriptTag = td.parents('tr').find('script');
    if (scriptTag.length === 0) {
      return;
    }
    $('<span class="info">c</span>')
      .appendTo(td)
      .on('mouseenter', function (e) {
        if (!infoTooltip.data('locked-from')) {
          infoTooltip.fillAndShow(e, scriptTag);
        }
      })
      .on('mouseleave', function () {
        if (!infoTooltip.data('locked-from')) {
          infoTooltip.hide();
        }
      })
      .on('mousemove', function (e) {
        if (!infoTooltip.data('locked-from')) {
          infoTooltip.moveHere(e);
        }
      })
      .on('click', function (e) {
        var lockedFrom = infoTooltip.data('locked-from');
        if (lockedFrom) {
          infoTooltip.unlockAndHide(lockedFrom);
        }
        var elem = $(this);
        if (!elem.is(lockedFrom)) {
          infoTooltip
            .fillAndShow(e, scriptTag)
            .data('locked-from', elem);
          elem.addClass('tooltip-locked');
        }
        e.stopPropagation();
      });
  });

  // Hide locked tooltip when clicking outside of it
  $(window).on('click', function () {
    var lockedFrom = infoTooltip.data('locked-from');
    if (lockedFrom) {
      infoTooltip.unlockAndHide(lockedFrom);
    }
  });


  // Function to retrieve the platform name of a given <td> cell
  function platformOf(elem) {
    return elem.getAttribute('data-browser') || '';
  }

  // Since you can't add a :hover effect for columns,
  // these handlers must suffice.
  function addRemoveHover(name) {
    return function() {
      var c = platformOf(this);
      if (c) {
        $("[data-browser='" + c + "']")[name]('hover');
      }
    };
  }
  table
    .on('mouseenter', 'td', addRemoveHover('addClass'))
    .on('mouseleave', 'td', addRemoveHover('removeClass'));

  // Cell highlighting function
  function highlightSelected(elem) {
    var win = $(window);
    var left = win.scrollLeft();
    table.detach().find('.selected').removeClass('selected');

    elem.addClass('selected');

    // Trigger `click` event on supertest to open dropdown.
    if (!elem.is('.parent') && elem.is('.subtest:hidden')) {
      var supertest = elem.prevUntil('.supertest').prev();
      // If there are no other subtests before this, `prevUntil`
      // will return an empty jQuery object. To select the supertest,
      // we can just select the previous element.
      if (!supertest.length) {
        supertest = elem.prev();
      }
      supertest.triggerHandler('click');
    }

    table.addClass('one-selected').insertBefore('#footnotes');
    win.scrollLeft(left);
    table.triggerHandler('reflow');
  }

  $(document).on('click', function removeHighlighting(event) {
    // Don't remove all dimming if another link was clicked in this event.
    if ($(event.target).is('[href],[href] *, .supertest *'))
      return;
    table.removeClass('one-selected');
  });

  window.onhashchange = function() {
    if (location.hash) {
      var elem = $('[href="' + location.hash + '"]');

      // If it's a feature anchor, select only the <tr>.
      // (The CSS widens the selected row only vertically.)
      if (elem.is('.anchor')) {
        highlightSelected(elem.parents('tr'));
      }
      // If it's a browser name, select all matching <td> elements
      // (The CSS widens the selected column only horizontally.)
      else if (elem.is('.browser-name')) {
        // This assumes that all <td>s in the column have a class that matches
        // the browser-name's ID.
        highlightSelected(table.find('td' + currentBrowserSelector + ', td[data-browser="' + elem.attr('href').slice(1) + '"]'));
      }
    }
  };
  window.onhashchange();

  // browser engine color stripes
  function getBrowserColour(name) {
    /* Chakra */
    if (/^(ie|edge)/.exec(name)) {
      return "hsla(217, 85%, 54%, .5)";
    }
    /* SpiderMonkey */
    if (/^(firefox|rhino)/.exec(name)) {
      return "hsla(35, 100%, 50%, .5)";
    }
    /* JavaScriptCore */
    if (/^(webkit|safari|jxa|phantom|ios|android4_0)/.exec(name)) {
      return "hsla(220, 25%, 70%, .5)";
    }
    /* V8 */
    if (/^(chrome|node|iojs|android4[1-9]|android[5-9])/.exec(name)) {
      return "hsla(79, 100%, 37%, .5)";
    }
    /* Carakan */
    if (/^opera/.exec(name)) {
      return "hsla(358, 86%, 43%, .5)";
    }
    /* KJS */
    if (/^konq/.exec(name)) {
      return "hsla(200, 100%, 74%, .5)";
    }
    /* BESEN */
    if (name === "besen") {
      return "rgba(173, 108, 23, .5)";
    }
    /* Current browser */
    if (name === "current") {
      return "hsla(0, 0%, 75%, .5)";
    }
    /* Compilers */
    return "hsla(52, 85%, 63%, .5)";
  }

  // Store number of features for each column/browser and numeric index.
  // The reason this is done at runtime instead of build time is because
  // the current browser's totals must be done at runtime, and to save on
  // duplicated code, we may as well do the predefined results too.
  window.__updateHeaderTotal = function(i) {
    var elem = $(this);
    var name;
    var id = 'current';

    if (elem.is('.browser-name')) {
      id = elem.attr('href').slice(1);
      name = elem.attr('href').replace("#", '[data-browser="')+'"]';
      elem = elem.parent();
    }
    else {
      name = currentBrowserSelector;
    }

    var yesPoints = 0;
    var flaggedPoints = 0;
    var totalPoints = 0;

    table.find('tbody tr:not(.subtest):not(.category):not(.not-applicable)').each(function() {
      var row = $(this);
      var points = +(row.attr('significance') || 1);
      var cell = row.find('td' + name);

      if (row.find('.separator').length || cell.length === 0) {
        return;
      }
      totalPoints += points;

      if (row.is('.supertest')) {
        // test with subtests
        var tally = +(cell.attr('data-tally') || 0);
        var flaggedTally = +(cell.attr('data-flagged-tally') || 0);

        yesPoints += tally * points;

        if (flaggedTally > tally) {
          flaggedPoints += flaggedTally * points;
        } else {
          flaggedPoints += tally * points;
        }
      } else {
        // test with yes/no
        if (cell.is('.yes')) {
          yesPoints += points;
          flaggedPoints += points;
        } else if (cell.is('.flagged')) {
          flaggedPoints += points;
        }
      }
    });

    var featuresCount = yesPoints / totalPoints;
    var flaggedFeaturesCount = flaggedPoints / totalPoints;

    function gradient(colour, percent) {
      return 'linear-gradient(to top, ' +
        colour + ' 0%, ' + colour + ' ' +
        (percent * 100|0) + '%, transparent ' + (percent * 100|0) +
        '%,transparent 100%)';
    }
    var colour = getBrowserColour(id);
    elem
      .attr('data-num', i)
      .attr('data-features', featuresCount)
      .attr('data-flagged-features', flaggedFeaturesCount)
      .find('.num-features').remove().end()
      .append('<sup class="num-features" title="Number of implemented features">' +
        // Don't bother with a HSL fallback for IE 8.
        '<b style="color:hsl(' + (featuresCount * 120|0) + ',100%,25%)">' +
        (Math.floor(featuresCount*100)) +
        '</b>%</sup>')
      // Fancy bar graph background garnish (again, no fallback required).
      .css({'background-image': gradient(colour, featuresCount) +
        (flaggedFeaturesCount > featuresCount
          ? ',' + gradient(colour.replace(".5",".2"), flaggedFeaturesCount)
          : '')});
  };
  $('.browser-name, th.current').each(window.__updateHeaderTotal);

  setColSpans();
  initFloatingHeaders();

  // Cached arrays of sort orderings
  var ordering = { };

  var defaultSortVal = 'engine-types';
  var noPlatformtype = $(".platformtype").length === 0;
  if (noPlatformtype) {
    $('body').addClass('hide-platformtype');
  }

  $('#sort').on('change', function() {

    var sortSpecMap = {
      'features':         {attr: 'data-features', order: 1, hidePlatformtype: true},
      'flagged-features': {attr: 'data-flagged-features', order: 1, hidePlatformtype: true},
      'engine-types':     {attr: 'data-num', order: -1, hidePlatformtype: false}
    };

    table.floatThead('destroy');

    var sortSpec = sortSpecMap[this.value];
    var sortAttr = sortSpec.attr;

    // First, hide the platformtype bar if we're sorting by features.
    $('body').toggleClass('hide-platformtype', noPlatformtype || sortSpec.hidePlatformtype);

    // Next, cache the sort orderings
    if (!ordering[sortAttr]) {
      // Sort the platforms

      var cells = [].slice.call($('th.platform')).sort(function(a, b) {
        return sortSpec.order * (parseFloat(b.getAttribute(sortAttr)) - parseFloat(a.getAttribute(sortAttr)));
      });
      ordering[sortAttr] = $.map(cells, platformOf);
    }

    var ord = ordering[sortAttr];

    // Define a comparison function using the orderings
    var comparator = function(a, b) {
      return ord.indexOf(platformOf(a)) - ord.indexOf(platformOf(b));
    };

    // Now sort the columns using the comparison function
    table.detach().find('tr').each(function(i, row) {

      var cells = [].slice.call(row.cells, 3).sort(comparator);

      for (var j = 0, jlen = cells.length; j < jlen; j++) {
        row.appendChild(cells[j]);
      }
    });
    table.insertBefore('#footnotes');

    initFloatingHeaders();
  });
  if ($("#sort").val() !== defaultSortVal) {
    $("#sort").triggerHandler('change');
  }
});
