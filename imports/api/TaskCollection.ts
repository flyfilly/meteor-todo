import { Mongo } from 'meteor/mongo';

export interface Task {
	_id?: string;
	text: string;
	isDone: boolean;
}

export const TaskCollection = new Mongo.Collection<Task>('tasks');
