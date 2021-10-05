const timer = document.getElementById("timer");
const list = document.getElementById("list");
const taskInput = document.getElementById("task-input");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const pauseBtn = document.querySelector(".pause");
const clearBtn = document.querySelector(".clear");

let interval;
let hours = 0;
let minutes = 0;
let seconds = 0;

const updateStorage = function () {
  const taskEl = document.querySelectorAll("li");
  const tasks = [];

  taskEl.forEach((task) => {
    const taskText = task.textContent.split(" ");
    tasks.push({
      text: taskText[0],
      hour: taskText[3],
      min: taskText[5],
      sec: taskText[8],
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const updateTime = function () {
  timer.textContent = `${hours.toString().padStart(2, 0)}:${minutes
    .toString()
    .padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
};

const start = function () {
  interval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateTime();
  }, 1000);
};

const addtask = function (taskEl) {
  const task = document.createElement("li");
  task.textContent = `${taskInput.value} finished in ${hours} hour(s) ${minutes} minutes and ${seconds} seconds`;
  if (taskEl) {
    task.textContent = `${taskEl.text} finished in ${taskEl.hour} hour(s) ${taskEl.min} minutes and ${taskEl.sec} seconds`;
  }
  list.appendChild(task);
};

const startTimer = function () {
  if (taskInput.value.length === 0) return;
  start();
  startBtn.disabled = true;
};

const stopTimer = function () {
  if (taskInput.value.length === 0) return;
  clearInterval(interval);
  addtask();
  updateStorage();
  hours = minutes = seconds = 0;
  updateTime();
  startBtn.disabled = false;
  taskInput.value = "";
};

const pauseTimer = function () {
  clearInterval(interval);
  startBtn.disabled = false;
};

const clearAlltasks = function () {
  const tasks = document.querySelectorAll("li");
  if (tasks.length === 0) return;
  tasks.forEach((task) => {
    task.remove();
  });
  updateStorage();
};

startBtn.addEventListener("click", startTimer);

stopBtn.addEventListener("click", stopTimer);

pauseBtn.addEventListener("click", pauseTimer);

clearBtn.addEventListener("click", clearAlltasks);

const tasks = JSON.parse(localStorage.getItem("tasks"));

if (tasks) {
  tasks.forEach((task) => {
    addtask(task);
  });
}
