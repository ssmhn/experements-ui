import classes from './Experiment.module.scss'
import {FC, PropsWithChildren} from "react"
import {BarChart} from "../../ui/Charts/BarChart/BarChart";
import {PieChart} from "../../ui/Charts/PieChart/PieChart";
import {LineChart} from "../../ui/Charts/LineChart/LineChart";

interface ExperimentProps {

}

export const Experiment: FC<PropsWithChildren<ExperimentProps>> = () => {


    return (
        <div className={classes.Container}>

            <div className={classes.Title}>
                <div>Experiment #1</div>
                <div>data</div>
            </div>

            <div className={classes.ExperimentContainer}>
                <div className={classes.SectionOne}>
                    <div className={classes.TopRow}>
                        <div className={classes.ContainerInfo}>
                            <div className={classes.Status}>
                                status
                            </div>
                            <div className={classes.ModelName}>ModelName</div>
                        </div>
                        <div className={classes.GrafOne}>
                            {/*dataSet*/}
                            <BarChart/>
                        </div>
                    </div>
                    <div className={classes.GrafTwo}>
                        <LineChart/>
                    </div>
                </div>

                <div className={classes.SectionTwo}>
                    <div className={classes.ColumnOne}>
                        <div className={classes.SecTwoCellOne}>
                            <PieChart/>
                        </div>
                        <div className={classes.SecTwoCellTwo}
                        >
                            2
                        </div>
                        <div className={classes.SecTwoCellThree}
                        >
                            3
                        </div>
                    </div>
                    <div className={classes.ColumnTwo}>
                        <div className={classes.SecTewCellFour}>modelParams?</div>
                        <div className={classes.SecTewCellFive}>5</div>
                    </div>
                </div>
            </div>
        </div>
    )
}