const input = document.getElementById("taskInput");
const submit_btn = document.getElementById("addButton");
const tasks_list = document.getElementById("taskList");
tasks_list.classList.add("tasksList")
// Loads the tasks from the localstrorage:
const saved_tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Rendering the loaded data from local storage.
saved_tasks.forEach((task, index) => {
	renderTask(task, index);
})

// Submit button handling function
submit_btn.addEventListener('click', (event) => {
	event.preventDefault();
	const task = input.value.trim();
	if(task !== "") {
		renderTask(task, saved_tasks.length);
		saved_tasks.push(task);
		updateLocalStorage();
		input.value = "";
	}
})

function renderTask(task, index) {
	const li = document.createElement("li");
	li.classList.add("tasksList_item")
	li.textContent = task;
	input.value = "";

	const delete_btn = document.createElement('button');
	delete_btn.classList.add("remove_btn");
	delete_btn.type = "button";
	delete_btn.textContent = "Task done"

	delete_btn.addEventListener('click', () => {
		let isTrue = confirm("Is the task over?")
		if(isTrue == false) {
			alert("The task is not completed, so not deleted.")
		}
		else {
			li.remove();
			saved_tasks.splice(index, 1);
			updateLocalStorage();
			alert("Task successfully completed!");
		}
	});

	li.appendChild(delete_btn);
	tasks_list.appendChild(li);
}

function updateLocalStorage() {
	localStorage.setItem("tasks", JSON.stringify(saved_tasks));
}