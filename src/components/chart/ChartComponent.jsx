import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartComponent = ({data}) => {
    const {columns_data,pie_data} =data;
    const options = {
        chart: {
            type: 'column',
            height: 400
        },
        title: {
            text: 'Country wise total intensity',
            align: 'left'
        },
        
        xAxis: {
            categories:columns_data?.map(item=>item._id),
            crosshair: true,
            accessibility: {
                description: 'Countries'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Intensity'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Intensity',
              data: columns_data?.map(item=>item.intensity)
            },
            
        ]
    };

    const options2 = {
        chart: {
            type: 'line',
            height: 400

        },
        title: {
            text: 'Topic wise total relevance',
            align: 'left'
        },
        xAxis: {
            categories:pie_data?.map(item=>item._id),
            crosshair: true,
            accessibility: {
                description: 'Topic'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Relevance'
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Relevance',
              data: pie_data?.map(item=>item.relevance)
            },
            
        ]
    };
    return (
        <>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <HighchartsReact highcharts={Highcharts} options={options2} />

        </>
    );
};

export default ChartComponent;
