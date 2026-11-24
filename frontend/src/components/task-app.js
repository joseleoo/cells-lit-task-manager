import { LitElement, html, css, nothing } from "lit";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  uncompleteTask,
  updateTask,
} from "../services/taskApi.js";
import "./task-list.js";

export class TaskApp extends LitElement {
  static properties = {
    tasks: { state: true },
    newTitle: { state: true },
    loading: { state: true },
    error: { state: true },
  };

  constructor() {
    super();
    this.tasks = [];
    this.newTitle = "";
    this.loading = false;
    this.error = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadTasks();
  }

  render() {
    return html`
      <section class="shell">
        <header>
          <h1>Task Manager</h1>
          <p>
            Create, review, edit, complete, uncomplete, and delete tasks loaded
            from the ASP.NET Core API.
          </p>
        </header>

        <form class="create-form" @submit=${this.handleSubmit}>
          <input
            aria-label="New task title"
            placeholder="New task title"
            .value=${this.newTitle}
            maxlength="200"
            @input=${this.handleNewTitleInput}
          />
          <button type="submit" ?disabled=${!this.newTitle.trim()}>
            Add task
          </button>
        </form>

        ${this.error
          ? html`<p class="error" role="alert">${this.error}</p>`
          : nothing}
        ${this.loading
          ? html`<p class="status">Loading...</p>`
          : html`<task-list
              .tasks=${this.tasks}
              @task-update=${this.handleUpdate}
              @task-complete=${this.handleComplete}
              @task-uncomplete=${this.handleUncomplete}
              @task-delete=${this.handleDelete}
            ></task-list>`}
      </section>
    `;
  }

  async loadTasks() {
    this.loading = true;
    this.error = "";

    try {
      this.tasks = await getTasks();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  handleNewTitleInput(event) {
    this.newTitle = event.target.value;
  }

  async handleSubmit(event) {
    event.preventDefault();

    const title = this.newTitle.trim();

    if (!title) {
      return;
    }

    this.error = "";

    try {
      const created = await createTask(title);
      this.tasks = [...this.tasks, created];
      this.newTitle = "";
    } catch (error) {
      this.error = error.message;
    }
  }

  async handleUpdate(event) {
    const { id, title } = event.detail;
    this.error = "";

    try {
      const updated = await updateTask(id, title);
      this.tasks = this.tasks.map((item) => (item.id === id ? updated : item));
    } catch (error) {
      this.error = error.message;
    }
  }

  async handleComplete(event) {
    const id = event.detail.id;
    this.error = "";

    try {
      const updated = await completeTask(id);
      this.tasks = this.tasks.map((item) => (item.id === id ? updated : item));
    } catch (error) {
      this.error = error.message;
    }
  }

  async handleUncomplete(event) {
    const id = event.detail.id;
    this.error = "";

    try {
      const updated = await uncompleteTask(id);
      this.tasks = this.tasks.map((item) => (item.id === id ? updated : item));
    } catch (error) {
      this.error = error.message;
    }
  }

  async handleDelete(event) {
    const id = event.detail.id;
    this.error = "";

    try {
      await deleteTask(id);
      this.tasks = this.tasks.filter((item) => item.id !== id);
    } catch (error) {
      this.error = error.message;
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    .shell {
      max-width: 760px;
      margin: 0 auto;
      padding: 3rem 1.25rem;
    }

    h1 {
      margin: 0 0 0.25rem;
      font-size: 2rem;
    }

    header p {
      margin: 0 0 2rem;
      color: #6b7280;
    }

    .create-form {
      display: flex;
      gap: 0.5rem;
    }

    .create-form input {
      flex: 1;
      min-width: 0;
      padding: 0.6rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font: inherit;
    }

    .create-form button {
      padding: 0.6rem 1rem;
      border: 0;
      border-radius: 8px;
      background: #2563eb;
      color: #ffffff;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .create-form button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error {
      margin-top: 1rem;
      padding: 0.75rem;
      border-radius: 8px;
      background: #fee2e2;
      color: #991b1b;
    }

    .status {
      color: #6b7280;
    }
  `;
}

if (!customElements.get("task-app")) {
  customElements.define("task-app", TaskApp);
}
