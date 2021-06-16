"use strict";
let obj = [
  { info: "Cut the Grass", status: false },
  { info: "Clean Room", status: false },
  { info: "Go to Gym", status: false },
  { info: "Make Dinner", status: false },
];
let taskList = document.querySelector(".taskList");
let html = "";
let form = document.querySelector(".myForm");
let taskName = form.querySelector("input[type=text]");
let btn = form.querySelector("input[type=submit]");
//
window.addEventListener("load", function () {
  taskName.focus();
  if (!localStorage.getItem("task")) {
    taskList.innerHTML = "";

    checkBoxRender();
    return;
  }
  obj = JSON.parse(localStorage.getItem("task"));
  taskList.innerHTML = "";

  checkBoxRender();
  return;
});

let checkBoxRender = function (i = 0) {
  taskList.innerHTML = "";
  for (let { info: k, status: v } of obj) {
    html += `<li>${k}<input type="checkbox" value="${i}" ${
      v ? "checked" : ""
    } /><span>❌</span></li>`;
    i++;
  }
  taskList.innerHTML = html;
  html = "";
};
//
let updateOnChange = function (e) {
  let index = e.target.value;
  obj[index].status = !obj[index].status;
  localStorage.setItem("task", JSON.stringify(obj));
};
taskList.addEventListener("change", updateOnChange);
//
let addNewTask = function (e) {
  e.preventDefault();
  let task = taskName.value;
  if (!task) return;
  taskName.value = "";
  obj.push({ info: task, status: false });
  let index = obj.length - 1;
  taskList.insertAdjacentHTML(
    "beforeend",
    `<li>${task}<input type="checkbox" value="${index}"><span>❌</span></li>`
  );
  localStorage.setItem("task", JSON.stringify(obj));
};
btn.addEventListener("click", addNewTask);
//
let deleteTask = function (e) {
  if (e.target.tagName !== "SPAN") return;
  let indexToDelete = e.target.closest("li").querySelector("input").value;
  obj.splice(indexToDelete, 1);
  localStorage.setItem("task", JSON.stringify(obj));
  checkBoxRender();
};
taskList.addEventListener("click", deleteTask);
//
