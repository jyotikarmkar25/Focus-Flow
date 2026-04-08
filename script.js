let time = 1500;
let timerInterval = null;
let score = localStorage.getItem("score") || 0;
let streak = localStorage.getItem("streak") || 0;

document.getElementById("score").innerText = score;
document.getElementById("streak").innerText = streak;

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
savedTasks.forEach(task => renderTask(task));

function updateDisplay() {
    let m = Math.floor(time/60);
    let s = time % 60;

    document.getElementById("timer").innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function startTimer() {
    if(timerInterval) return;

    timerInterval = setInterval(() => {
        if(time > 0) {
            time--;
            updateDisplay();
        }else {
            alert("Time's up! Take a break!");
            score++;
            localStorage.setItem("score", score);
            document.getElementById("score").innerText = score;
            // clearInterval(timerInterval);
            // timerInterval = null;
            resetTimer();
        }
    }, 1000);
}


function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 1500;
    updateDisplay();
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if(text === "")return;

    savedTasks.push({text, done:false});
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    renderTask({text, done:false});
    input.value = "";

}

function renderTask(task) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = task.text;

    if(task.done) span.style.textDecoration = "line-through";

   span.onclick = () => {
    // agar already done hai to kuch na kare
    if (task.done) return;

    span.style.textDecoration = "line-through";

    task.done = true;
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    streak++;
    localStorage.setItem("streak", streak);
    document.getElementById("streak").innerText = streak;
};

    let del = document.createElement("button");
    del.innerText = "x";
   del.onclick = () => {
    li.remove();

    savedTasks = savedTasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
};

    li.appendChild(span);
    li.appendChild(del);
    document.getElementById("taskList").appendChild(li);
}
updateDisplay();

// Enter press = Add Task
document.getElementById("taskInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});


  