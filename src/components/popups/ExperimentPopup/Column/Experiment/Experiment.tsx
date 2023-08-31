import {FC, PropsWithChildren} from "react"
import classes from './Experiment.module.scss'
import {TaskType} from "../../../../../types/DNDTypes";
import {Draggable} from "react-beautiful-dnd";

interface ExperimentProps {
    className?: string
    task: TaskType
    index: number
}

export const Experiment: FC<PropsWithChildren<ExperimentProps>> = ({task, index}) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={classes.Item}
                >
                    {task.id}
                </div>
            )}
        </Draggable>

    )
}