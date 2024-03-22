<template>
<div :id="plotlyId"></div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Plotly from 'plotly.js-dist';

let timeOutFunctionId;

export default {
  name: 'VuePlotly',

  data() {
    return {
      plotlyId: `plotly-${uuidv4()}`,
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
</script>
