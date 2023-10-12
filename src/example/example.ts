import { createChart } from 'lightweight-charts';
import { generateLineData } from './sample-data';
import { VisiblePriceRangeUtil } from '../visible-price-range-util';

const chart = ((window as unknown as any).chart = createChart('chart', {
	autoSize: true,
}));

const lineSeries = chart.addLineSeries({
	color: '#000000',
});
const data = generateLineData();
lineSeries.setData(data);

const vprUtil = new VisiblePriceRangeUtil();
(window as unknown as any).vpru = vprUtil;

lineSeries.attachPrimitive(vprUtil);

const outputEl = document.querySelector<HTMLDivElement>('#output');

vprUtil.priceRangeChanged().subscribe(function (newRange) {
	if (!newRange) {
		if (outputEl) outputEl.innerText = `No price range`;
		return;
	}
	const text = `Price Range is now from ${newRange.bottom.toFixed(2)} to ${newRange.top.toFixed(2)}`;
	console.log(text);
	if (outputEl) outputEl.innerText = text;
});
