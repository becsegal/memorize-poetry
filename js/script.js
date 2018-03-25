var app = new Vue({
  el: '#content',
  data: {
    title: '',
    author: '',
    stepCategory: 'poem',
    step: 1,
    poem: [],
    progress: 100
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
    setPoem: function(key) {
      this.$data.title = poems[key].title;
      this.$data.author = poems[key].author;
      this.$data.poem = poems[key].poem;
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
    this.setPoem('theraven');
  }
});
