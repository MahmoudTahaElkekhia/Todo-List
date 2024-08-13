$(document).ready(function () {
  function addTodoItem(text) {
    const todoItem = $("<li></li>").text(text);
    const actions = $('<div class="actions"></div>');
    const editButton = $('<button class="edit">Edit</button>');
    const deleteButton = $('<button class="delete">Delete</button>');
    actions.append(editButton, deleteButton);
    todoItem.append(actions);
    $("#todo-list").append(todoItem);
  }

  $("#todo-form").on("submit", function (event) {
    event.preventDefault();
    const newTodo = $("#new-todo").val();
    if (newTodo) {
      addTodoItem(newTodo);
      $("#new-todo").val("");
    }
  });

  $("#todo-list").on("click", ".delete", function () {
    $(this).closest("li").remove();
  });

  let prevItem;

  $("#todo-list").on("click", ".edit", function () {
    const todoItem = $(this).closest("li");
    prevItem = todoItem.contents().first().text();
    const text = todoItem.contents().first().text();
    todoItem.html(`
            <input type="text" value="${text}">
            <div class="actions">
                <button class="save">Save</button>
                <button class="cancel">Cancel</button>
            </div>
        `);
    todoItem.addClass("editing");
  });

  $("#todo-list").on("click", ".save", function () {
    const todoItem = $(this).closest("li");
    const newText = todoItem.find("input").val();
    todoItem.html(`${newText}
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `);
    todoItem.removeClass("editing");
  });

  $("#todo-list").on("click", ".cancel", function () {
    const todoItem = $(this).closest("li");
    todoItem.html(`${prevItem}
            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `);
    todoItem.removeClass("editing");
  });
});
