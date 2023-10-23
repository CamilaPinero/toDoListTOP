import { ToDo, ToDoList } from "../logic.js";

$("#myModal").on("shown.bs.modal", function () {
	$("#myInput").trigger("focus");
});

let lists = [
	{
		id: 1,
		title: "Lista 1",
		toDos: [
			{
				title: "todo1",
				description:
					"Some quick example text to make up the bulk of the description.",
				dueDate: Date(),
				priority: "high",
				checklist: true,
			},
			{
				title: "Lista 1",
				description:
					"Some quick example text to make up the bulk of the description.",
				dueDate: Date(),
				priority: "low",
				checklist: false,
			},
		],
	},
];

const board = document.querySelector(".board");
const addList = document.querySelector(".addList");

addList.addEventListener("click", (e) => {
	let listTitle = prompt("List title", "New list"); //cambiar esto por modal
	let list = new ToDoList(listTitle, []);
	lists.push(list);
	renderAll();
});

function renderTodo(todo) {
	return `<li class="list-group-item" style="padding: 0px">
    <div id="${todo.id}" class="todo priority-${todo.priority}">
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
		${list.toDos.map((t) => renderTodo(t))}
	</ul>
	<button
		id="addToDo-${list.id}"
		class="btn btn-primary addToDo"
		data-toggle="modal"
		data-target="#modal"
	>
		Add To Do
	</button>
	<!-- modal -->
	<div
		class="modal fade"
		id="modal"
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
				<form id="toDoBody-${list.id}">
					<div class="modal-body">
						<div class="form-group">
							<label for="title" class="col-form-label"
								>Title</label
							>
							<input
								type="text"
								class="form-control"
								id="title"
							/>
						</div>
						<div class="form-group">
							<label for="description" class="col-form-label"
								>Description</label
							>
							<textarea
								class="form-control"
								id="description"
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
							/>
						</div>
						<div class="form-group">
							<label for="priority" class="col-form-label"
								>Priority</label
							>
							<select id='priority' class="form-control priority">
								<option selected disabled>
									Select priority
								</option>
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
			.querySelector(`#toDoBody-${l.id}`)
			.addEventListener("submit", (e) => {
				e.preventDefault();

				let toDo = new ToDo(
					e.target.elements.title.value,
					e.target.elements.description.value,
					e.target.elements.dueDate.value,
					e.target.elements.priority.value
				);

				l.addToDo(toDo);
				document.querySelector(".modal-backdrop").remove();

				renderAll();
			});
	});
}

renderAll();

//arreglar error cuando trato de agregar todos a otra lista
//agregar funcion a los botones de borrar, donde?, hay que usar el list.id
