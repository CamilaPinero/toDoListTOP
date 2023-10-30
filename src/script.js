import { ToDo, ToDoList } from "../logic.js";

$("#myModal").on("shown.bs.modal", function () {
	$("#myInput").trigger("focus");
});

let lists = [
	new ToDoList("lista 1", [
		new ToDo(
			"Titulo todo prueba",
			"Descripcion todo prueba",
			"2023-10-25T15:03",
			"low"
		),
	]),
];

const board = document.querySelector(".board");
const addList = document.querySelector(".addList");

addList.addEventListener("click", (e) => {
	let listTitle = prompt("List title", "New list");
	if (listTitle !== null) {
		let list = new ToDoList(listTitle, []);
		lists.push(list);
	}
	renderAll();
});

function renderTodo(todo) {
	return `<li class="list-group-item" style="padding: 0px" id="toDo-${
		todo.id
	}" >
    <div  class="todo priority-${todo.priority}">
        <h5 class="header">${todo.title}</h5>
        <div class="card-body">
            <p class="card-text">
            ${todo.description}
            </p>
            <div class="todo-info">
                <p class="card-text">${todo.dueDate}</p>
                <button type="button" class="btn btn-sm delete delete-toDo" id="delete-toDo-${
					todo.id
				}">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"  >
                        <title>delete-outline</title>
                        <path
                            d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                        />
                    </svg>
                </button>
				<button type="button" class="btn btn-sm edit-toDo" id="edit-toDo-${
					todo.id
				}" data-toggle="modal"
				data-target="#modal-${todo.id}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<title>pencil-outline</title>
					<path
						d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
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
	<!-- modal -->
	<div
		class="modal fade"
		id="modal-${todo.id}"
		tabindex="-1"
		role="dialog"
		aria-labelledby="modal-${todo.id}"
		aria-hidden="true"
	>
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">
						Edit To Do
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
				<form id="edit-todo-${todo.id}" class="form-edit-toDo">
					<div class="modal-body">
						<div class="form-group">
							<label for="title" class="col-form-label" 
								>${todo.title}</label
							>
							<input
								type="text"
								class="form-control"
								id="title"
								value="To do title" 
								required
							/>
						</div>
						<div class="form-group">
							<label for="description" class="col-form-label"
								>Description</label
							>
							<textarea
								class="form-control"
								id="description"
								placeholder="To do description" 
								required
							>${todo.description}</textarea>
						</div>
						<div class="form-group">
							<label for="dueDate" class="col-form-label"
							>Due Date</label
							>
							<input
							type="datetime-local"
							class="form-control"
							id="dueDate"
							required
							/>
						</div>
						<div class="form-group">
							<label for="priority" class="col-form-label"
								>Priority</label
							>
							<select id='priority' class="form-control priority"
							required >
								
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
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
							form="edit-todo-${todo.id}"
							value="Submit"
							class="btn btn-primary editToDoBody"
                            data-bs-dismiss="modal"
							id="editToDoBody-${todo.id}"
						>
							Edit To Do
						</button>
					</div>
				</form>
			</div>
		</div>
</li>

`;
}

function renderList(list) {
	return `<div id="list-${list.id}" class="card list">
	<div class="card-header">
		<h5>${list.title}</h5>
		<button
			id="delete-list-${list.id}"
			class="btn btn-sm delete ${list.id}"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<title>delete-outline</title>
				<path
					d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
				/>
			</svg>
		</button>
	</div>
	<ul class="list-group list-group-flush">
		${list.toDos.map((t) => renderTodo(t)).join("")}
	</ul>
	<button
		id="addToDo-${list.id}"
		class="btn btn-primary addToDo"
		data-toggle="modal"
		data-target="#modal-${list.id}"
	>
		Add To Do
	</button>
	<!-- modal -->
	<div
		class="modal fade"
		id="modal-${list.id}"
		tabindex="-1"
		role="dialog"
		aria-labelledby="modal-${list.id}"
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
				<form id="toDoBody-${list.id}" class="form-new-toDo">
					<div class="modal-body">
						<div class="form-group">
							<label for="title" class="col-form-label" 
								>Title</label
							>
							<input
								type="text"
								class="form-control"
								id="title"
								value="To do title" 
								required
							/>
						</div>
						<div class="form-group">
							<label for="description" class="col-form-label"
								>Description</label
							>
							<textarea
								class="form-control"
								id="description"
								placeholder="To do description" 
								required
							></textarea>
						</div>
						<div class="form-group">
							<label for="dueDate" class="col-form-label"
							>Due Date</label
							>
							<input
							type="datetime-local"
							class="form-control"
							id="dueDate"
							required
							/>
						</div>
						<div class="form-group">
							<label for="priority" class="col-form-label"
								>Priority</label
							>
							<select id='priority' class="form-control priority"
							required >
								
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
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
                            data-bs-dismiss="modal"
							id="addToDoBody-${list.id}"
						>
							Add new To Do
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
`;
}

function renderAll() {
	board.innerHTML = `${lists.map((l) => renderList(l)).join("")}`;

	lists.forEach((l) => {
		document
			.querySelector(`#delete-list-${l.id}`)
			.addEventListener("click", (e) => {
				document.querySelector(`#list-${l.id}`).remove();
				lists = lists.filter((list) => !(list.id === l.id));
				renderAll();
			});
	});

	document.querySelectorAll(".form-new-toDo").forEach((form) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let toDo = new ToDo(
				e.target.elements.title.value,
				e.target.elements.description.value,
				e.target.elements.dueDate.value,
				e.target.elements.priority.value
			);

			let list = lists.find((l) => l.id === form.id.slice(9));
			list.addToDo(toDo);

			document.querySelector(".modal-backdrop").remove();

			renderAll();
		});
	});

	document.querySelectorAll(".delete-toDo").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			document.querySelector(`#toDo-${btn.id.slice(12)}`).remove();

			for (let i = 0; i < lists.length; i++) {
				for (let j = 0; j < lists[i].toDos.length; j++) {
					if (lists[i].toDos[j].id === btn.id.slice(12)) {
						lists[i].deleteToDo(btn.id.slice(12));
					}
				}
			}
			renderAll();
		});
	});

	document.querySelectorAll(".form-edit-toDo").forEach((form) => {
		form.addEventListener("submit", (e) => {
			e.preventDefault();
			for (let i = 0; i < lists.length; i++) {
				for (let j = 0; j < lists[i].toDos.length; j++) {
					if (
						lists[i].toDos[j].id ===
						e.target.elements[5].id.slice(13)
					) {
						lists[i].editToDoById(
							e.target.elements[5].id.slice(13),
							e.target.elements.title.value,
							e.target.elements.description.value,
							e.target.elements.dueDate.value,
							e.target.elements.priority.value
						);
					}
				}
			}
			document.querySelector(".modal-backdrop").remove();
			renderAll();
		});
	});

	localStorage.setItem("lists", JSON.stringify(lists));
}

window.addEventListener("load", (e) => {
	const localLists = localStorage.getItem("lists");
	if (localLists) lists = JSON.parse(localLists);
	renderAll();
});
