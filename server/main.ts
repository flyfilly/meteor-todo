import { Meteor } from 'meteor/meteor';
import { TaskCollection } from '/imports/api/TaskCollection';

function insertTask(text: string) {
	TaskCollection.insert({ text, isDone: false });
}

Meteor.startup(() => {});
