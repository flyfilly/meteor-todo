import React, { useContext } from 'react';

import { TodoActionType, TodosContext } from '/imports/ui/context/Todos';

const AddForm: React.FC = () => {
	const { updateTodos } = useContext(TodosContext);

	const addTodo = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { text } = e.target as typeof e.target & {
			text: { value: string };
		};
		try {
			updateTodos({
				type: TodoActionType.ADD,
				bindle: {
					text: text.value,
					isDone: false,
				},
			});
		} catch (error) {
		} finally {
			text.value = '';
		}
	};

	return (
		<form onSubmit={addTodo}>
			<div>
				What needs to be done?
				<input
					type='text'
					name='text'
					id='text'
					style={{ marginRight: 10, marginLeft: 10 }}
				/>
				<button type='submit'>Add</button>
			</div>
		</form>
	);
};

export default AddForm;
