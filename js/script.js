var app = new Vue({
  el: '#content',
  data: {
    contentType: 'menu',
    menu: [],
    title: '',
    author: '',
    stepCategory: '',
    step: 0,
    poem: []
  },
  methods: {
    initMenu: function() {
      this.menu = Object.entries(poems).map(function(entry) {
        return {
          path: "#" + entry[0],
          name: "<strong>" + entry[1].title + "</strong> by " + entry[1].author
        }
      }).sort(function(a, b) {
        return a.name > b.name;
      });
    },
    updateContent: function() {
      key = window.location.hash.substring(1);
      if (poems[key]) {
        this.contentType = 'poem';
        this.title = poems[key].title;
        this.author = poems[key].author;
        var lines = [];
        var stanzaCount = 0;
        var lineCount = 0;
        var startOfStanza = true;
        poems[key].text.map(function(stanza) {
          startOfStanza = true;
          stanza.map(function(line) {
            lines.push({
              text: line,
              stanza: stanzaCount + 1,
              line: lineCount + 1,
              startOfStanza: startOfStanza
            });
            lineCount++;
            startOfStanza = false;
          });
          stanzaCount++;
        });
        this.poem = lines;
        this.byLine();
        document.title = this.title;
      }
      else {
        this.contentType = 'menu';
        document.title = 'Memorize Poetry';
      }
    },
    showMenu: function() {
      window.location.hash = '';
      this.stepCategory = '';
      this.contentType = 'menu';
    },
    nextStep: function() {
      if ( (this.stepCategory == 'line' && this.step < this.poem.length)
        || (this.stepCategory == 'stanza' && this.step < this.poem[this.poem.length -1].stanza)
      ) {
        this.step += 1;
        this.progress = this.step / 100.0;
      }
    },
    byPoem: function() {
      this.stepCategory = 'poem';
      this.step = 0;
    },
    byStanza: function() {
      this.stepCategory = 'stanza';
      this.step = 0;
    },
    byLine: function() {
      this.stepCategory = 'line';
      this.step = 0;
    }
  },
  mounted: function () {
    this.initMenu();
    this.updateContent();
  }
});

window.addEventListener("hashchange", function(event) {
  app.updateContent();
});

app.$watch('step', function(newValue, oldValue) {
  // if (app.stepCategory == 'line') {
  //   var els = document.getElementsByClassName("highlight");
  //   els[els.length - 1].scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'end'
  //   });
  // }
});

app.$watch('title', function(newValue, oldValue) {
  document.title = app.title;
});
