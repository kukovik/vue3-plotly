import { v4 } from 'uuid';
import Plotly from 'plotly.js-dist';
import { openBlock, createElementBlock } from 'vue';

var script = {
  name: 'VuePlotly',

  data() {
    return {
      plotlyId: `plotly-${v4()}`,
    };
  },

  props: ['data', 'layout', 'config'],

  watch: {
    data() { this.renewGraph(); },
    layout() { this.renewGraph(); },
    config() { this.renewGraph(); },
  },

  mounted() {
    this.setGraph();
  },

  methods: {
    setGraph() {
      Plotly.newPlot(this.plotlyId, this.data, this.layout, this.config);
    },
    renewGraph() {
      Plotly.react(this.plotlyId, this.data, this.layout, this.config);
    },
    updateGraph(args) {
      Plotly.update(args);
    },
    toImage(args) {
      return Plotly.toImage(this.plotlyId, args);
    },
  },
};

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", { id: $data.plotlyId }, null, 8 /* PROPS */, _hoisted_1))
}

script.render = render;
script.__file = "src/VuePlotly.vue";

export { script as VuePlotly };
