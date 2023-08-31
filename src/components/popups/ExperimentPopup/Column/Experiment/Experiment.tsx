import {FC, PropsWithChildren} from "react"
import classes from './Experiment.module.scss'
import {TaskType} from "../../../../../types/DNDTypes";
import {Draggable} from "react-beautiful-dnd";

interface ExperimentProps {
    className?: string
    task: TaskType
    index: number
    click?: boolean
    showFormToggler: (id: string) => void
}

export const Experiment: FC<PropsWithChildren<ExperimentProps>> = ({task, index, click, showFormToggler}) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={() => {
                        click && showFormToggler(task.id)
                    }}
                    className={classes.Item}
                >
                    {task.id}
                </div>
            )}
        </Draggable>

    )
}