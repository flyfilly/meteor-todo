import React, { useContext } from 'react';
import AddForm from './AddForm';

import {
	TodosContext,
	Todo,
	TodoActionType,
	Action,
} from '/imports/ui/context/Todos';

const todoStyle: React.CSSProperties = {
	padding: 5,
	display: 'flex',
	width: '100%',
	justifyContent: 'space-between',
};

const TodoItem: React.FC<{
	todo: Todo;
	dispatch: React.DispatchWithoutAction | React.Dispatch<Action>;
}> = ({ todo, dispatch }) => (
	<li style={todoStyle}>
		<div>
			<input
				type='checkbox'
				checked={todo.isDone}
				style={{ marginRight: 15 }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					dispatch({
						type: TodoActionType.UPDATE,
						bindle: {
							...todo,
							isDone: e.target.checked,
						},
					});
				}}
			/>
			<span>{todo.text}</span>
		</div>
		<button
			onClick={() =>
				dispatch({
					type: TodoActionType.DELETE,
					bindle: todo,
				})
			}>
			Delete
		</button>
	</li>
);

export const Todos: React.FunctionComponent = () => {
	const { todos, updateTodos } = useContext(TodosContext);

	return (
		<React.Fragment>
			<AddForm />
			<ul
				style={{ listStyleType: 'none', margin: 0, padding: 0, maxWidth: 500 }}>
				{todos.map((todo: Todo, index: number) => (
					<TodoItem
						key={todo._id || `todo-${index}`}
						todo={todo}
						dispatch={updateTodos}
					/>
				))}
			</ul>
		</React.Fragment>
	);
};
