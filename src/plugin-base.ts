import {
	DataChangedScope,
	IChartApi,
	ISeriesApi,
	ISeriesPrimitive,
	SeriesAttachedParameter,
	SeriesOptionsMap,
	Time,
} from 'lightweight-charts';
import { ensureDefined } from './helpers/assertions';

export abstract class PluginBase implements ISeriesPrimitive<Time> {
	private _chart: IChartApi | undefined = undefined;
	private _series: ISeriesApi<keyof SeriesOptionsMap> | undefined = undefined;

	protected dataUpdated?(scope: DataChangedScope): void;

	public attached({ chart, series }: SeriesAttachedParameter<Time>) {
		this._chart = chart;
		this._series = series;
	}

	public detached() {
		this._chart = undefined;
		this._series = undefined;
	}

	public get chart(): IChartApi {
		return ensureDefined(this._chart);
	}

	public get series(): ISeriesApi<keyof SeriesOptionsMap> {
		return ensureDefined(this._series);
	}
}
