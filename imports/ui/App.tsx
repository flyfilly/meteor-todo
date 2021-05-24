import React from 'react';

import { TodosProvider } from '/imports/ui/context/Todos';
import { Todos } from '/imports/ui/Todos';

export const App: React.FunctionComponent = () => {
	return (
		<TodosProvider>
			<h1>This is my Meteor //TODO Application</h1>
			<Todos />
		</TodosProvider>
	);
};
