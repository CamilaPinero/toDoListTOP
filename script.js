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
		this.title = title;
		this.toDos = toDos;
	}
	editToDoById(id) {}
}

let list1 = new ToDoList("List1", []);

let toDo1 = new ToDo("prueba", "primer todo", "11/05", 1, false);
//toDo1.editToDo("prueba1", "primer todo", "11/05", 1, true);
console.log(toDo1);

list1.toDos.push(toDo1);

console.log(list1.toDos);
