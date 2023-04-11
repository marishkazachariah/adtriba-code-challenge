import Papa from "papaparse";
import React from "react";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
)

export default function SphereSampleData() {

    /*
    - date
    - source - advertising source/channel
    - attributed_conversions - total number of conversions attributed to advertising
    - attributed_revenue - total revenue attributed to advertising
    - type - has two values: baseline (marketing organic channels) or incrementality (marketing paid channels).
    - spends - total spend on advertising for this source/target
    - partition_id - a partition is a unique identifier for a report, customers can have multiple reports
    - optimisation_target - two values depending on the machine learning model used: conversions or revenue.    
    */

    const [chartData, setChartdata] = useState({datasets: []})
    const [chartOptions, setCartOptions] = useState({})
    
    useEffect(() => {     
        async function fetchCsv() {
            const response = await fetch('data/sphere-sample-data.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            return csv;
        }
        async function GetData() {
            const data = Papa.parse(await fetchCsv(),
            {
                header: true,
                dynamicTyping: true,
                delimiter: ',',
                complete: ((result) => {
                    console.log('result:', result)
                    setChartdata({
                        labels: result.data.map((item, index) => [item['date']]).filter( String ),
                        datasets: [
                            {
                                label: "Attributed Revenue",
                                data: result.data.map((item, index) => [item['attributed_revenue']]).filter(Number),
                                borderColor: "black",
                                backgroundColor: "red",
                            }
                        ]
                    })
                    setCartOptions({
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top'
                            },
                            title: {
                                display: true,
                                text: 'Attributed Revenue'
                            }
                        }
                    })
                })
            }
            )
            return data
        }
        GetData()
    }, []) 

    return (
    <>
        <h1>Chart</h1>
        <div>
            {chartData.datasets.length > 0 ? (
                <div>
                    <Bar options={chartOptions} data={chartData} />
                </div>
            ) : (
                <div>
                    Loading
                </div>
            )}
        </div>
    </>
    )
  }