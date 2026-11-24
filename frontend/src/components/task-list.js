import { LitElement, html, css } from 'lit';
import './task-item.js';

export class TaskList extends LitElement {
  static properties = {
    tasks: { type: Array }
  };

  constructor() {
    super();
    this.tasks = [];
  }

  render() {
    if (this.tasks.length === 0) {
      return html`<p class="empty">No tasks yet. Add one above.</p>`;
    }

    return html`
      <div class="list-header">
        <h2>Tasks</h2>
        <span>${this.tasks.length}</span>
      </div>
      <ul>
        ${this.tasks.map((task) => html`<li><task-item .task=${task}></task-item></li>`)}
      </ul>
    `;
  }

  static styles = css`
    :host {
      display: block;
      margin-top: 1.75rem;
    }

    .list-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    h2 {
      margin: 0;
      font-size: 1.1rem;
    }

    .list-header span {
      padding: 0.15rem 0.55rem;
      border-radius: 999px;
      background: #e5e7eb;
      color: #4b5563;
      font-size: 0.8rem;
      font-weight: 600;
    }

    ul {
      display: grid;
      gap: 0.6rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .empty {
      padding: 1.5rem;
      border: 1px dashed #cbd5e1;
      border-radius: 12px;
      color: #64748b;
      text-align: center;
    }
  `;
}

if (!customElements.get('task-list')) {
  customElements.define('task-list', TaskList);
}
