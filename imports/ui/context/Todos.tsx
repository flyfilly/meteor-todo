import React, { useCallback } from 'react';

import { TaskCollection } from '/imports/api/TaskCollection';
import { useTracker } from 'meteor/react-meteor-data';

export type Todo = {
	_id?: string;
	text: string;
	isDone: boolean;
};

export enum TodoActionType {
	GET,
	ADD,
	UPDATE,
	DELETE,
}

export type Action = {
	type: TodoActionType;
	bindle: Todo;
};

type TodosContext = {
	todos: Array<Todo>;
	updateTodos: (action: Action) => void;
};

export const TodosContext = React.createContext<TodosContext>(
	{} as TodosContext,
);

export const TodosProvider: React.FC = ({ children }) => {
	const todos = useTracker(() => TaskCollection.find().fetch());

	const updateTodos = useCallback((action: Action) => {
		switch (action.type) {
			case TodoActionType.ADD:
				TaskCollection.insert({ text: action.bindle.text, isDone: false });
				break;
			case TodoActionType.UPDATE:
				TaskCollection.update({ _id: action.bindle._id }, action.bindle);
				break;
			case TodoActionType.DELETE:
				TaskCollection.remove({ _id: action.bindle._id });
				break;
			default:
				throw new Error(
					`Unable to dispatch action (${action.type}.  Please use ${TodoActionType})`,
				);
		}
	}, []);

	return (
		<TodosContext.Provider value={{ todos, updateTodos }}>
			{children}
		</TodosContext.Provider>
	);
};
