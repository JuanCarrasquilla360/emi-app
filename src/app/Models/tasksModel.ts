import moment from "moment"

export interface TaskModel {
  tasks: TaskProps[]
  states: State[]
}

export interface TaskProps {
  id?: string
  title: string
  description: string
  dueDate: string
  completed: boolean
  stateHistory: StateHistory[]
  notes: string[]
}

export interface StateHistory {
  state: string
  date: string
}

export interface State {
  name: string
}

export class Tasks implements TaskProps {
  title!: string
  description!: string
  dueDate!: string
  completed!: boolean
  stateHistory!: StateHistory[]
  notes!: string[]
  constructor(el: any) {
    if (el) {
      this.title = el.title || ""
      this.description = el.description || ""
      this.dueDate = el.dueDate || ""
      this.completed = el.completed || false
      this.stateHistory = [{ state: el.stateHistory || "", date: moment().format("YYYY-MM-DD") }]
      this.notes = [el.notes || ""]
    }

  }
}
