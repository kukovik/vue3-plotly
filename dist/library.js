'use strict';

var uuid = require('uuid');
var Plotly = require('plotly.js-dist');
var vue = require('vue');

let timeOutFunctionId;

var script = {
  name: 'VuePlotly',

  data() {
    return {
      plotlyId: `plotly-${uuid.v4()}`,
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
      Plotly.toImage(this.plotlyId, args);
    },
  },
};

const _hoisted_1 = ["id"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", { id: $data.plotlyId }, null, 8 /* PROPS */, _hoisted_1))
}

script.render = render;
script.__file = "src/VuePlotly.vue";

exports.VuePlotly = script;
