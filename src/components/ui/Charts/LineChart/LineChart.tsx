// import classes from './LineChart.module.scss'
import {FC, PropsWithChildren} from "react"
import {Line} from "react-chartjs-2";
import {Chart as ChartJS, LineElement, PointElement, LinearScale,CategoryScale} from "chart.js";

interface LineChartProps {

}

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)


export const LineChart: FC<PropsWithChildren<LineChartProps>> = ({}) => {

    const data = {
        labels: ["red", "blue", "yellow", "green", "purple", "orange"],
        datasets: [{
            label: "#",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    }
    let options = {
        // maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        // legend: {
        //     labels: {
        //         fontsize: 12
        //     }
        // }
    }

    return (

        <div>
            <Line
                data={data}
                width={"fit-content"}
                options={options}
            />
        </div>
    )
}