var app = new Vue({
  el: '#content',
  data: {
    contentType: 'menu',
    menu: [],
    title: '',
    author: '',
    stepCategory: '',
    step: 1,
    poem: []
  },
  computed: {
    filteredPoem: function() {
      let poem = this.poem;
      var count = 0;
      if (this.stepCategory == 'stanza') {
        poem = poem.filter((stanza) => {
          count += 1;
          return count < this.step;
        });
      }
      else if (this.stepCategory == 'line') {
        filteredPoem = []
        poem.forEach( (stanza) => {
          filteredStanza = [];
          stanza.forEach( (line) => {
            count += 1;
            if (count < this.step) {
              filteredStanza.push(line);
            }
          });
          if (filteredStanza.length > 0) {
            filteredPoem.push(filteredStanza);
          }
        });
        poem = filteredPoem;
      }
      return poem;
    }
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
        this.stepCategory = 'poem';
        this.title = poems[key].title;
        this.author = poems[key].author;
        this.poem = poems[key].text;
      }
      else {
        this.contentType = 'menu';
      }
    },
    showMenu: function() {
      window.location.hash = '';
      this.stepCategory = '';
      this.contentType = 'menu';
    },
    nextStep: function() {
      this.step += 1;
      this.progress = this.step / 100.0;
    },
    byPoem: function() {
      this.stepCategory = 'poem';
      this.step = 1;
    },
    byStanza: function() {
      this.stepCategory = 'stanza';
      this.step = 1;
    },
    byLine: function() {
      this.stepCategory = 'line';
      this.step = 1;
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


