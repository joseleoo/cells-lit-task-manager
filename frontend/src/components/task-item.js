import { LitElement, html, css, nothing } from 'lit';

export class TaskItem extends LitElement {
  static properties = {
    task: { type: Object },
    editing: { state: true },
    draftTitle: { state: true }
  };

  constructor() {
    super();
    this.task = null;
    this.editing = false;
    this.draftTitle = '';
  }

  render() {
    if (!this.task) {
      return nothing;
    }

    if (this.editing) {
      return html`
        <div class="item editing">
          <input
            class="edit-input"
            aria-label="Edit task title"
            .value=${this.draftTitle}
            maxlength="200"
            @input=${this.handleDraftInput}
            @keydown=${this.handleKeydown}
          />
          <div class="actions">
            <button type="button" class="save" ?disabled=${!this.draftTitle.trim()} @click=${this.handleSave}>Save</button>
            <button type="button" class="cancel" @click=${this.handleCancel}>Cancel</button>
          </div>
        </div>
      `;
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
          <div class="actions">
            <button type="button" class="edit" @click=${this.startEdit}>Edit</button>
            <button type="button" class="delete" @click=${this.handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    `;
  }

  startEdit() {
    this.draftTitle = this.task.title;
    this.editing = true;
  }

  handleDraftInput(event) {
    this.draftTitle = event.target.value;
  }

  handleKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSave();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.handleCancel();
    }
  }

  handleSave() {
    const title = this.draftTitle.trim();

    if (!title) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('task-update', {
        detail: { id: this.task.id, title },
        bubbles: true,
        composed: true
      })
    );

    this.editing = false;
  }

  handleCancel() {
    this.editing = false;
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

    .item.editing {
      border-color: #93c5fd;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
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

    .actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .edit-input {
      flex: 1;
      min-width: 0;
      padding: 0.55rem 0.7rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font: inherit;
    }

    button {
      border: 0;
      background: transparent;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .edit {
      color: #2563eb;
    }

    .delete {
      color: #dc2626;
    }

    .save {
      padding: 0.45rem 0.8rem;
      border-radius: 8px;
      background: #2563eb;
      color: #ffffff;
    }

    .cancel {
      color: #6b7280;
    }

    button:hover:not(:disabled) {
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
