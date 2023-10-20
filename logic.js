class ToDo {
	constructor(title, description, dueDate, priority, checklist) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.checklist = checklist;
	}
	editToDo(title, description, dueDate, priority, checklist) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.checklist = checklist;
	}
}

class ToDoList {
	constructor(title, toDos) {
		this.id = crypto.randomUUID();
		this.title = title; // type: string
		this.toDos = toDos; // type: []
	}

	addToDo(toDo) {
		this.toDos.push(toDo);
	}

	editToDoById(id, ...newTodo) {
		// { title, description, dueDate, priority, checklist }
		const todo = this.toDos.find((toDo) => toDo.id === id);
		todo.editToDo(...newTodo);
	}

	deleteToDo(id) {
		this.toDos = this.toDos.filter((toDo) => {
			toDo.id !== id;
		});
	}
}

export { ToDo, ToDoList };
