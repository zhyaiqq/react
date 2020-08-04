// src/types/index.tsx
export enum FiltersEnum {
  ALL= 'ALL',
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE'
}

export interface IStoreState {
  todos: ITodo[];
  currentFilter: FiltersEnum;
}

export interface ITodo {
  title: string;
  isCompleted: boolean;
}
