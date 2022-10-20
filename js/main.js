"use strict";

const validation = function (n) {
  if (
    n.replace(/([^а-яА-ЯёЁ\s]+$)/, "") !== "" &&
    n.trim().split(" ").length === 2
  ) {
    return true;
  } else {
    return false;
  }
};

const formatDate = function () {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleString("ru", options);
};

const usersArr = localStorage.usersArr ? JSON.parse(localStorage.usersArr) : [];

const list = document.getElementById("list");

const render = function () {
  list.textContent = "";
  usersArr.forEach(function (item, i) {
    if (usersArr[i] === null) {
      usersArr.splice(i, 1);
    }
    const li = document.createElement("li");
    li.innerHTML =
      "<div>" +
      "<p>Имя: " +
      usersArr[i].firstName +
      ", фамилия: " +
      usersArr[i].lastName +
      ", зарегистрирован(a): " +
      usersArr[i].regDate +
      "</p>" +
      '<button id="deleteUser">Удалить</button>' +
      "</div>";
    list.append(li);
    const removeBtn = li.querySelector("#deleteUser");
    removeBtn.addEventListener("click", function () {
      usersArr.splice(i, 1);
      render();
    });
  });
  localStorage.usersArr = JSON.stringify(usersArr);
};

const register = function () {
  const user = {};
  let userNameSurname;
  do {
    userNameSurname = prompt("Введите через пробел Имя и Фамилию пользователя");
  } while (!validation(userNameSurname));
  userNameSurname = userNameSurname.split(" ");
  user.firstName = userNameSurname[0];
  user.lastName = userNameSurname[1];
  user.login = prompt("Придумайте логин");
  user.password = prompt("Придумайте пароль");
  user.regDate = formatDate();
  usersArr.push(user);
  localStorage.usersArr = JSON.stringify(usersArr);
  render();
};

const logIn = function () {
  const inputLogin = prompt("Введите логин");
  const inputPassword = prompt("Введите пароль");
  const count = usersArr.length;
  usersArr.forEach(function (item, i) {
    if (item.login === inputLogin && item.password === inputPassword) {
      document.getElementById("username").textContent = item.firstName;
      return;
    }
    if (i === count - 1) {
      document.getElementById("username").textContent = "Аноним";
      alert("Пользователь не найден");
      return;
    }
  });
};

const reg = document.getElementById("registerUser");
reg.addEventListener("click", register);

const auth = document.getElementById("login");
auth.addEventListener("click", logIn);

render();
