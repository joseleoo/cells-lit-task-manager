import { LitElement, css, html } from 'lit';

export class TaskBadge extends LitElement {
  static properties = {
    completed: { type: Boolean },
    label: { type: String }
  };

  constructor() {
    super();
    this.completed = false;
    this.label = '';
  }

  render() {
    const text = this.label || (this.completed ? 'Completed' : 'Open');
    const status = this.completed ? 'done' : 'open';

    return html`<span class="badge ${status}">${text}</span>`;
  }

  static styles = css`
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 1.4;
      white-space: nowrap;
    }

    .done {
      background: #dcfce7;
      color: #166534;
    }

    .open {
      background: #e0e7ff;
      color: #3730a3;
    }
  `;
}

if (!customElements.get('task-badge')) {
  customElements.define('task-badge', TaskBadge);
}
