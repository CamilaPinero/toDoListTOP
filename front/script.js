import { ToDo, ToDoList } from "../logic.js";

$("#myModal").on("shown.bs.modal", function () {
	$("#myInput").trigger("focus");
});

let lists = [];

const board = document.querySelector(".board");
const addList = document.querySelector(".addList");

addList.addEventListener("click", (e) => {
	let listTitle = prompt("List title", "New list"); //cambiar esto por modal
	let list = new ToDoList(listTitle, []);
	lists.push(list);
	renderAll();
});

/*let prueba = new ToDoList("prueba", []);
lists.push(prueba);



lists.forEach((l) => {
	board.innerHTML += `<div id="${l.id}" class="card list">
    <div class="card-header">
        <h5>${l.title}</h5>
        <button class="btn btn-sm delete ${l.id}">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <title>delete-outline</title>
                <path
                    d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                />
            </svg>
        </button>
    </div>
    <ul class="list-group list-group-flush">
        
    </ul>
    <button
        class="btn btn-primary addToDo"
        data-toggle="modal"
        data-target="#${(l, "-modal")}"
    >
        Add To Do
    </button>
    <!-- modal -->
    <div
        class="modal fade"
        id="${(l.id, "-modal")}"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalLabel">
                        Add new to do
                    </h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="${l.id}">
                        <div class="form-group">
                            <label
                                for="recipient-name"
                                class="col-form-label"
                                >Title</label
                            >
                            <input
                                type="text"
                                class="form-control"
                                id="toDoTitle"
                            />
                        </div>
                        <div class="form-group">
                            <label
                                for="description"
                                class="col-form-label"
                                >Description</label
                            >
                            <textarea
                                class="form-control"
                                id="description"
                            ></textarea>
                        </div>
                        <div class="form-group">
                            <label
                                for="dueDate"
                                class="col-form-label"
                                >Due Date</label
                            >
                            <input
                                type="datetime-local"
                                class="form-control"
                                id="dueDate"
                            />
                        </div>
                        <div class="form-group">
                            <label
                                for="priority"
                                class="col-form-label"
                                >Priority</label
                            >
                            <select class="form-control priority">
                                <option selected disabled>
                                    Select priority
                                </option>
                                <option value="low">Low</option>
                                <option value="medium">
                                    Medium
                                </option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="submit"
                        form="${l.id}"
                        value="Submit"
                        class="btn btn-primary addToDoBody ${l.id}"
                    >
                        Add To Do
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>`;

	

	document
		.querySelector(`.addToDoBody.${l.id}`)
		.addEventListener("click", (e) => {
			let body = document.querySelector(`#${l.id}`);
			console.log(list);
			console.log(body, "asdsfaf");
			//let toDo = new ToDo();
		});
});
 */
//seleccionar los botones .addToDoBody nuevos que vayan apareciendo
//tomar los datos de los inputs del modal para hacer el new ToDo() y en base a eso construirlo en html
//agregar funcion a los botones de borrar, donde?, hay que usar el list.id
//el modal no se cierra cuando apretas add new to do, xq?
//

function renderTodo(todo) {
	return `<li class="list-group-item" style="padding: 0px">
    <div id="${todo.id}" class="todo ${todo.priority}">
        <h5 class="header">${todo.title}</h5>
        <div class="card-body">
            <p class="card-text">
            ${todo.description}
            </p>
            <div class="todo-info">
                <p class="card-text">${todo.dueDate}</p>
                <button class="btn btn-sm delete">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <title>delete-outline</title>
                        <path
                            d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                        />
                    </svg>
                </button>
                <input
                    class="form-check-input"
                    type="checkbox"
                    name="toDoCheck"
                    ${todo.checklist ? "checked" : ""}
                />
            </div>
        </div>
    </div>
</li>`;
}

function renderList(list) {
	return `<div id="list-${list.id}" class="card list">
<div class="card-header">
    <h5>${list.title}</h5>
    <button id="delete-list-${list.id}" class="btn btn-sm delete ${list.id}">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <title>delete-outline</title>
            <path
                d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
            />
        </svg>
    </button>
</div>
<ul class="list-group list-group-flush">
    ${list.toDos.map((t) => renderTodo(t))}
</ul>
<button
id='addToDo-${list.id}'
    class="btn btn-primary addToDo"
    data-toggle="modal"
    data-target="#exampleModal" 
>
    Add To Do
</button>
<!-- modal -->
<div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                    Add new to do
                </h5>
                <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id='toDoBody-${list.id}'>
                    <div class="form-group">
                        <label
                            for="recipient-name"
                            class="col-form-label"
                            >Title</label
                        >
                        <input
                            type="text"
                            class="form-control"
                            id="toDoTitle"
                        />
                    </div>
                    <div class="form-group">
                        <label
                            for="description"
                            class="col-form-label"
                            >Description</label
                        >
                        <textarea
                            class="form-control"
                            id="description"
                        ></textarea>
                    </div>
                    <div class="form-group">
                        <label
                            for="dueDate"
                            class="col-form-label"
                            >Due Date</label
                        >
                        <input
                            type="datetime-local"
                            class="form-control"
                            id="dueDate"
                        />
                    </div>
                    <div class="form-group">
                        <label
                            for="priority"
                            class="col-form-label"
                            >Priority</label
                        >
                        <select class="form-control priority">
                            <option selected disabled>
                                Select priority
                            </option>
                            <option value="low">Low</option>
                            <option value="medium">
                                Medium
                            </option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                >
                    Close
                </button>
                <button
                    type="submit"
                    form="toDoBody-${list.id}"
                    value="Submit"
                    class="btn btn-primary addToDoBody"
                    id='addToDoBody-${list.id}'
                >
                    Add new To Do
                </button>
            </div>
        </div>
    </div>
</div>
</div>`;
}

function renderAll() {
	board.innerHTML = `${lists.map((l) => renderList(l)).join("")}`;

	lists.map((l) => {
		document
			.querySelector(`#delete-list-${l.id}`)
			.addEventListener("click", (e) => {
				document.querySelector(`#list-${l.id}`).remove();
				lists = lists.filter((list) => {
					list.id !== l.id;
				});
			});
		document
			.querySelector(`#addToDoBody-${l.id}`)
			.addEventListener("click", (e) => {
				let body = document.querySelector(`#toDoBody-${l.id}`);
				console.log(body, "asdsfaf");
				//let toDo = new ToDo();
			});
	});
}
