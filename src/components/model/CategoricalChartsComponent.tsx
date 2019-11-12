import React, {Component} from "react";
import {Categorical} from "../../types/DatasetAnalyze";
import Chart from "react-google-charts";

type Props = {
    categorical: Categorical
};

export class CategoricalChartsComponent extends Component<Props, {}> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
    }


    render() {
        return this.props.categorical.features.map(feature => {
            let data = feature.values.map(value => [value.name, value.count]);
            data.unshift([feature.name, 'Amount']);
            return (
                <div className="row">
                    <div className="col-6">
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="ColumnChart"
                            data={data}
                            options={{
                                title: `${feature.name}`,
                                legend: {position: 'none'},
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
                                    {type: 'number', label: 'Unique'},
                                    {type: 'string', label: 'Top value'},
                                    {type: 'number', label: 'Top value frequency'},
                                    {type: 'number', label: 'Count'},
                                    {type: 'number', label: 'Missing'},
                                ],
                                [
                                    feature.name,
                                    feature.unique,
                                    feature.top,
                                    feature.frequencyTop,
                                    feature.count,
                                    feature.missing,
                                ],
                            ]}
                        />
                    </div>
                </div>
            );
        })
    }
}