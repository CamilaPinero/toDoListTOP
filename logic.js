//import crypto from "crypto";

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

	deleteToDo(idToDo) {
		this.toDos = this.toDos.filter((toDo) => !(toDo.id === idToDo));
	}
}

/* let lists = [];

let listaPrueba = new ToDoList("lista 1", []);
lists.push(listaPrueba);
let toDoPrueba = new ToDo(
	"Titulo todo prueba",
	"Descripcion todo prueba",
	"2023-10-25T15:03",
	"low"
);

let toDoPrueba1 = new ToDo(
	"Titulo todo prueba1",
	"Descripcion todo prueba",
	"2023-10-25T15:03",
	"low"
);

listaPrueba.addToDo(toDoPrueba);
listaPrueba.addToDo(toDoPrueba1);

listaPrueba.deleteToDo(toDoPrueba.id);
console.log("final", listaPrueba); */

export { ToDo, ToDoList };
