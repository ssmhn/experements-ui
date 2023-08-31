export type InitialDataType = {
    tasks: TasksType,
    columns: ColumnsType,
    columnOrder: ColumnOrderType
}

export type TasksType = Record<string, TaskType>
export type ColumnsType = Record<string, ColumnType>
export type ColumnOrderType = string[]

export type TaskType = {
    id: string,
    text: string
}

export type ColumnType = {
    id: string,
    taskIds: string[]
}