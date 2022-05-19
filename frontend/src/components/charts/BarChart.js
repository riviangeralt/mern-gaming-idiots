import React from 'react';
import Chart from "react-apexcharts";

const BarChart = (props) => {
    const { category, width, data, series } = props
    const state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: category
            }
        },
        series: [
            {
                name: series,
                data: data
            }
        ],
    };


    return (
        <div style={{ marginTop: '1rem', backgroundColor: '#FFF', padding: '.8rem', display: 'inline-block', width: width }} >
            <Chart
                options={state.options}
                series={state.series}
                type="bar"
                width="100%"
                height={300}
            />
        </div>
    )
};

export default BarChart;
