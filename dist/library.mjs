import { v4 } from 'uuid';
import Plotly from 'plotly.js-dist';
import { openBlock, createElementBlock } from 'vue';

let timeOutFunctionId;

var script = {
  name: 'VuePlotly',

  data() {
    return {
      plotlyId: `plotly-${v4()}`,
    };
  },

  props: ['data', 'layout', 'config'],

  watch: {
    data() { this.setGraph(); },
    layout() { this.setGraph(); },
    config() { this.setGraph(); },
  },

  mounted() {
    this.setGraph();
    this.resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeOutFunctionId); // debounce the reset
      timeOutFunctionId = setTimeout(this.setGraph, 100);
    });
    this.resizeObserver.observe(document.getElementById(this.plotlyId));
  },

  beforeUnmount() { this.resizeObserver.disconnect(); },

  methods: {
    setGraph() {
      Plotly.newPlot(this.plotlyId, this.data, this.layout, this.config);
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
