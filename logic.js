import * as crypto from "crypto";

class ToDo {
	constructor(title, description, dueDate, priority, checklist) {
		this.id = 1; //crypto.randomUUID();
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
}

let list1 = new ToDoList("List1", []);

let toDo1 = new ToDo("prueba", "primer todo", "11/05", 1, false);
console.log(toDo1);

list1.addToDo(toDo1);
list1.editToDoById(1, "prueba", "descripcion editada", "11/05", 1, false);

console.log(list1);
