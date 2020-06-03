import { Component, OnInit, SimpleChanges, ElementRef } from "@angular/core";
import { Todo } from "../models/Todo";
import { throwError } from "rxjs";

@Component({
  selector: "app-todolist",
  templateUrl: "./todolist.component.html",
  styleUrls: ["./todolist.component.css"],
})
export class TodolistComponent implements OnInit {
  constructor() {}

  set = new Set<Todo>();
  todo: Todo;
  errorMessage: string;
  isTaskCompleted: boolean;
  totalTasks: number = 0;
  todoid: number = 0;

  ngOnInit() {}

  onSubmit(form: any) {
    this.errorMessage = null;

    // if (todo.task == form.controls.task.value) {
    //   this.errorMessage = "Task is in the list already.";
    // } else {

    //   this.todo = {
    //     id: this.todoid++,
    //     completed: false,
    //     task: form.controls.task.value,
    //   };
    //   this.set.add(this.todo);
    //   this.totalTasks = this.set.size;
    //   form.reset();

    // }
    try {
      if (this.set.size != 0) {
        this.set.forEach((todo) => {
          if (todo.task == form.controls.task.value) {
            this.errorMessage =
              "Task '" + form.controls.task.value + "' is in list already.";
            form.reset();
            throw new TypeError(this.errorMessage);
          }
        });
      }
      this.todo = {
        id: this.todoid++,
        completed: false,
        task: form.controls.task.value,
      };
      this.set.add(this.todo);
      this.totalTasks = this.set.size;
      form.reset();
    } catch (e) {
      console.error("Error: " + e);
    }
  }

  clearForm(form: any) {
    this.errorMessage = null;
    this.set.clear();
    this.totalTasks = 0;
    form.reset();
  }
  deleteAllTasks() {
    this.set.clear();
    this.totalTasks = 0;
  }

  deleteTask(todo: Todo) {
    this.set.delete(todo);
    this.totalTasks = this.set.size;
  }

  handleAllTasks() {
    this.set.forEach((todo) => {
      todo.completed = !todo.completed;
    });
  }
}
