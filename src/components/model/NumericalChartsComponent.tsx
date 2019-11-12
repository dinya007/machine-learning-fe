import React, {Component} from "react";
import {Numerical} from "../../types/DatasetAnalyze";
import Chart from "react-google-charts";

type Props = {
    numerical: Numerical
};

export class NumericalChartsComponent extends Component<Props, {}> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        return this.props.numerical.features.map(feature => {
            let sliceSize = (feature.max - feature.min) / 10;

            let values = feature.values.sort((a, b) => a - b);

            var count = 0;
            var nextSlice = sliceSize;
            let data: any[][] = [[feature.name, 'Amount']];
            // console.log(values);
            // console.log(`Min: ${feature.min}`);
            // console.log(`Max: ${feature.max}`);
            for (let i = 0; i < values.length; i++) {
                ++count;
                if (i === (values.length - 1)) {
                    // console.log(`nextSlice: ${feature.max}`);
                    // console.log(`Count: ${count}`);
                    data.push([feature.max, count]);
                    break;
                }

                if (values[i] >= nextSlice) {
                    // console.log(`nextSlice: ${nextSlice}`);
                    // console.log(`Count: ${count}`);
                    data.push([nextSlice, count]);
                    nextSlice += sliceSize;
                    count = 0;
                }
            }

            // console.log(`Data: ${JSON.stringify(data)}`);

            return (
                <div className="row">
                    <div className="col-6">
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="SteppedAreaChart"
                            data={data}
                            options={{
                                title: `${feature.name}`,
                                legend: {position: 'none'},
                                aggregationTarget: 'none',
                                hAxis: {
                                    viewWindowMode: 'explicit',
                                    viewWindow: {
                                        min: feature.min,
                                        max: feature.max
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className="col-6">
                        <Chart
                            width={'600px'}
                            height={'300px'}
                            chartType="Table"
                            data={[
                                [
                                    {type: 'string', label: 'Feature Name'},
                                    {type: 'number', label: 'Min'},
                                    {type: 'number', label: 'Max'},
                                    {type: 'number', label: 'Mean'},
                                    {type: 'number', label: 'Median'},
                                    {type: 'number', label: 'Missing'},
                                    {type: 'number', label: 'Zeros'},
                                    {type: 'number', label: 'Count'},
                                    {type: 'number', label: 'Correlation'},
                                ],
                                [
                                    feature.name,
                                    feature.min,
                                    feature.max,
                                    feature.mean,
                                    feature.median,
                                    feature.missing,
                                    feature.zeros,
                                    feature.count,
                                    feature.correlation,
                                ],
                            ]}
                        />
                    </div>
                </div>
            )
        })
    }
}