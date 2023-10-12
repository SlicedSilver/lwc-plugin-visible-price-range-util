# Visible Price Range Util - Lightweight Charts™ Plugin

A plugin for providing a utility API to retrieve the visible range of a price scale, and subscribe to changes.

- Developed for Lightweight Charts version: `v4.1.0`

## Installation

```bash
npm install lwc-plugin-visible-price-range-util
```

## Usage

```js
import { VisiblePriceRangeUtil } from 'lwc-plugin-visible-price-range-util';

// Create an instantiated Visible Price Range Util primitive.
const vprUtil = new VisiblePriceRangeUtil();

// Create the chart and series...
const chart = createChart(document.getElementById('container'));
const lineSeries = chart.addLineSeries();
const data = [
    { time: 1642425322, value: 123 },
    /* ... more data */
];

// Attach the utility to the series
lineSeries.attachPrimitive(vprUtil);

const currentVisiblePriceRange = vprUtil.getVisiblePriceRange();
vprUtil.priceRangeChanged().subscribe(function(newRange) {
    if (!newRange) return;
    console.log(`Price Range is now from ${newRange.bottom} to ${newRange.top}`);
});
```

## Developing

### Running Locally

```shell
npm install
npm run dev
```

Visit `localhost:5173` in the browser.

### Compiling

```shell
npm run compile
```

Check the output in the `dist` folder.
