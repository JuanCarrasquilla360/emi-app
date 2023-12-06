import { StateHistory, TaskModel } from "../Models/TasksModel";

export const formatTasks = (arr: TaskModel["tasks"]) => {
    return arr.map(task => ({
        ...task,
        stateHistory: getNearstateHistory(task.stateHistory)
    }))
}

export const getNearstateHistory = (arr: StateHistory[]) => (
    arr.reduce((currentObj, nextObj) => {
        return (nextObj.date > currentObj.date ? nextObj : currentObj)
    }, arr[0])
)