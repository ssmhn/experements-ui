import {InitialDataType} from "../../../types/DNDTypes";

export const initialData: InitialDataType = {
    tasks: {
        'task-1': {
            id: 'task-1',
            text: 'test '
        },
        'task-2': {
            id: 'task-2',
            text: 'test '
        },
        'task-3': {
            id: 'task-3',
            text: 'test '
        },
        'task-4': {
            id: 'task-4',
            text: 'test '
        }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            taskIds: []
        }
    },
    columnOrder: ['column-1', 'column-2']
}