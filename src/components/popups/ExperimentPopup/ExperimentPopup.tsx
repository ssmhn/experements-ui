import {FC, PropsWithChildren, useLayoutEffect, useRef, useState} from "react"
import classes from './ExperimentPopup.module.scss'
import cn from "classnames";
import {AnimatePresence, motion} from "framer-motion";
import {initialData} from "./initialData";
import {Column} from "./Column/Column";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {ColumnType} from "../../../types/DNDTypes";
import {v4} from 'uuid'

interface ExperimentPopupProps {
}

export const ExperimentPopup: FC<PropsWithChildren<ExperimentPopupProps>> = () => {
    const [rightColWidth, setRightColWidth] = useState(0)
    const [isShow, setIsShow] = useState<string | null>(null)
    const [elements, setElements] = useState(initialData)

    const wrapperRef = useRef<HTMLDivElement>(null)

    const removeFromList = (list: ColumnType, index: number) => {
        const result = Array.from(list.taskIds);
        const [removed] = result.splice(index, 1);
        return [removed, result]
    }

    const addToList = (list: ColumnType, index: number, element: string) => {
        const result = Array.from(list.taskIds);
        result.splice(index, 0, element + v4());
        console.log(result, element)
        return result
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const listCopy = { ...elements }

        if (result.source.droppableId === 'column-2') {
            const sourceList = listCopy.columns[result.source.droppableId]
            const [, newSourceList] = removeFromList(sourceList, result.source.index)

            listCopy.columns[result.source.droppableId].taskIds = newSourceList as string[]
        } else {
            const sourceList = listCopy.columns[result.source.droppableId]
            const [removedElement] = removeFromList(sourceList, result.source.index)

            const destinationList = listCopy.columns[result.destination.droppableId]
            const newIds = addToList(destinationList, result.destination.index, removedElement as string)
            listCopy.columns[result.destination.droppableId].taskIds = newIds
            newIds.forEach(el => {
                const taskIds = Object.keys(listCopy.tasks)

                const currentTask = taskIds.filter(id => el.includes(id))[0]

                listCopy.tasks[el] = {
                    ...listCopy.tasks[currentTask],
                    id: el
                }
            })
        }

        setElements(listCopy)
    }

    const showFormToggler = (id: string | null) => {
        setIsShow(prev => {
            if (!id) return null
            if (id === prev) return null

            return id
        })
    }

    useLayoutEffect(() => {
        if (!wrapperRef.current) return

        const root = document.documentElement
        root.style.setProperty('--right-width', (wrapperRef.current.offsetWidth / 4) + 'px')
        setRightColWidth(wrapperRef.current.offsetWidth / 4)
        // eslint-disable-next-line
    }, [wrapperRef.current]);

    return (
        <div className={classes.ExperimentPopup}>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div ref={wrapperRef} className={classes.Wrapper}>
                    {elements.columnOrder.map(columnId => {
                        const column = elements.columns[columnId]
                        const tasks = column.taskIds.map(taskId => elements.tasks[taskId])

                        return <Column showFormToggler={showFormToggler} key={column.id} column={column} tasks={tasks} />
                    })}

                    <AnimatePresence>
                        {isShow && (
                            <motion.div
                                initial={{
                                    width: 0
                                }}
                                animate={{
                                    width: `${rightColWidth}px`,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                                exit={{
                                    width: 0,
                                    transition: {
                                        duration: 0.5
                                    }
                                }}
                                className={cn(classes.Column, classes.Right)}
                            >
                                <div onClick={() => showFormToggler(null)} className={classes.CloseBtn}>Close</div>

                                <div className={classes.ColumnBody}>
                                    {isShow}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DragDropContext>
        </div>
    )
}