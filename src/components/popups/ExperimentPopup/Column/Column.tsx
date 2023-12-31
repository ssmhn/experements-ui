import {FC, PropsWithChildren} from "react"
import classes from './Column.module.scss'
import cn from "classnames";
import {ColumnType, TaskType} from "../../../../types/DNDTypes";
import {Experiment} from "./Experiment/Experiment";
import {Droppable} from "react-beautiful-dnd";

interface ColumnProps {
    className?: string
    column: ColumnType
    tasks: TaskType[]
    showFormToggler: (id: string) => void
}

export const Column: FC<PropsWithChildren<ColumnProps>> = ({className, column, tasks, showFormToggler}) => {
    return (
        <div className={cn(classes.Column, className)}>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={classes.Items}
                    >
                        {tasks.map((el, i) => (
                            <Experiment key={el.id} showFormToggler={showFormToggler} click={column.id === 'column-2'} task={el} index={i} />
                        ))}
                    </div>
                )}
            </Droppable>
        </div>
    )
}