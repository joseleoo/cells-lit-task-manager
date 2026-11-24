import { LitElement, html, css, nothing } from 'lit';

export class TaskItem extends LitElement {
  static properties = {
    task: { type: Object }
  };

  constructor() {
    super();
    this.task = null;
  }

  render() {
    if (!this.task) {
      return nothing;
    }

    const completed = this.task.isCompleted;

    return html`
      <div class="item">
        <div class="details">
          <span class="title ${completed ? 'completed' : ''}">${this.task.title}</span>
          <span class="status ${completed ? 'done' : 'open'}">${completed ? 'Completed' : 'Open'}</span>
        </div>
        <div class="meta">
          <span>${formatDate(this.task.createdAt)}</span>
          <button type="button" @click=${this.handleDelete}>Delete</button>
        </div>
      </div>
    `;
  }

  handleDelete() {
    this.dispatchEvent(
      new CustomEvent('task-delete', {
        detail: { id: this.task.id },
        bubbles: true,
        composed: true
      })
    );
  }

  static styles = css`
    :host {
      display: block;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.85rem 1rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
    }

    .details {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
    }

    .title {
      overflow-wrap: anywhere;
    }

    .title.completed {
      color: #9ca3af;
      text-decoration: line-through;
    }

    .status {
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .status.done {
      background: #dcfce7;
      color: #166534;
    }

    .status.open {
      background: #e0e7ff;
      color: #3730a3;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: #9ca3af;
      font-size: 0.8rem;
      white-space: nowrap;
    }

    button {
      border: 0;
      background: transparent;
      color: #dc2626;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    button:hover {
      text-decoration: underline;
    }

    @media (max-width: 520px) {
      .item {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `;
}

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

if (!customElements.get('task-item')) {
  customElements.define('task-item', TaskItem);
}
