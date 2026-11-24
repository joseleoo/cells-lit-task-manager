import { LitElement, html, css, nothing } from 'lit';
import { deleteTask, getTasks, updateTask } from '../services/taskApi.js';
import './task-list.js';

export class TaskApp extends LitElement {
  static properties = {
    tasks: { state: true },
    loading: { state: true },
    error: { state: true }
  };

  constructor() {
    super();
    this.tasks = [];
    this.loading = false;
    this.error = '';
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
          <p>Review, edit, and delete tasks loaded from the ASP.NET Core API.</p>
        </header>

        ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : nothing}

        ${this.loading
          ? html`<p class="status">Loading...</p>`
          : html`<task-list
              .tasks=${this.tasks}
              @task-update=${this.handleUpdate}
              @task-delete=${this.handleDelete}
            ></task-list>`}
      </section>
    `;
  }

  async loadTasks() {
    this.loading = true;
    this.error = '';

    try {
      this.tasks = await getTasks();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }

  async handleUpdate(event) {
    const { id, title } = event.detail;
    this.error = '';

    try {
      const updated = await updateTask(id, title);
      this.tasks = this.tasks.map((item) => (item.id === id ? updated : item));
    } catch (error) {
      this.error = error.message;
    }
  }

  async handleDelete(event) {
    const id = event.detail.id;
    this.error = '';

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

if (!customElements.get('task-app')) {
  customElements.define('task-app', TaskApp);
}
