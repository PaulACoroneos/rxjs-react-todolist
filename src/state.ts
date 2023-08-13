import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';
export type Todo = {
  label: string;
  id: string;
  isCompleted: boolean;
}

const subject = new Subject<Todo[]>();

const initialState: Todo[] = [{ 'label': 'Hello rxjs todolist', id: uuid(), isCompleted: true }, { 'label': "learn reactive programming", id: uuid(), isCompleted: false }, { label: "build a proof of concept to start learning rxjs", id: uuid(), isCompleted: false }, { label: "It's been a while since you wrote vanilla CSS :)", id: uuid(), isCompleted: true }];

let state = initialState;

export const todoStore = {
  subscribe: (setState: any) => { subject.subscribe(setState) },
  init: () => { subject.next(state) },
  addTodo: (content: string) => {
    const todo = {
      id: uuid(),
      label: content,
      isCompleted: false
    }
    state = [...state, todo];
    subject.next(state);
  },
  updateTodoCompletionState: (id: string) => {
    const newState = state.map(todo => (todo.id === id) ? { ...todo, isCompleted: !todo.isCompleted } : todo);
    state = newState;
    subject.next(state);
  },
  removeTodo: (id:string) => {
    const newState = state.filter(todo => todo.id !== id);
    state = newState;
    subject.next(state);
  },
  initialState
}