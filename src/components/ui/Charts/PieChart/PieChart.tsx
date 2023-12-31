import {FC, PropsWithChildren} from "react"
import {Bar, Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

interface PieChartProps {

}

ChartJS.register(
    Tooltip, Legend,
    ArcElement
)

export const PieChart: FC<PropsWithChildren<PieChartProps>> = ({}) => {

    const data = {
        labels: ["red", "blue", "yellow", "green", "purple", "orange"],
        datasets: [{
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
        legend: {
            labels: {
                fontsize: 12
            }
        }
    }


    return (
        <div>
            <Doughnut
                data={data}
                height={"fit-content"}
                options={options}
            />
        </div>
    )
}