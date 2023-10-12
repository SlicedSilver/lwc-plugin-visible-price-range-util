import { VisiblePriceRangeUtilOptions, defaultOptions } from './options';
import { PluginBase } from './plugin-base';
import { Delegate, ISubscription } from './helpers/delegate';

export interface VisiblePriceRange {
	bottom: number;
	top: number;
}

export type VisiblePriceRangeResult = Readonly<VisiblePriceRange> | null;

export class VisiblePriceRangeUtil extends PluginBase {
	_options: VisiblePriceRangeUtilOptions;
	_currentRange: VisiblePriceRange | null = null;
	private _changed: Delegate<VisiblePriceRangeResult> = new Delegate();

	constructor(options: Partial<VisiblePriceRangeUtilOptions> = {}) {
		super();
		this._options = {
			...defaultOptions,
			...options,
		};
	}

	updateAllViews() {
		// a chart rendering is occurring, might result in a different price range
		this._checkPriceRange();
	}

	public get options(): VisiblePriceRangeUtilOptions {
		return this._options;
	}

	applyOptions(options: Partial<VisiblePriceRangeUtilOptions>) {
		this._options = { ...this._options, ...options };
	}

	public priceRangeChanged(): ISubscription<VisiblePriceRangeResult> {
		return this._changed;
	}

	public getVisiblePriceRange(): VisiblePriceRangeResult {
		return this._currentRange;
	}

	private _checkPriceRange() {
		const newRange = this._measurePriceRange();
		const oneNull = newRange === null || this._currentRange === null;
		const bothNull = oneNull && newRange === this._currentRange;
		const changed =
			(oneNull && !bothNull) ||
			newRange!.bottom !== this._currentRange!.bottom ||
			newRange!.top !== this._currentRange!.top;
		if (changed) {
			this._changed.fire(newRange);
		}
		this._currentRange = newRange;
	}

	private _measurePriceRange(): VisiblePriceRange | null {
		if (!this.chart || !this.series) return null;
		const paneSize = this.chart.paneSize();
		const top = this.series.coordinateToPrice(0);
		const bottom = this.series.coordinateToPrice(paneSize.height);
		if (top === null || bottom === null) return null;
		return {
			top,
			bottom,
		};
	}
}
