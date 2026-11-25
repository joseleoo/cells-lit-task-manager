class LegacyTaskBadge extends Polymer.Element {
  static get is() {
    return 'legacy-task-badge';
  }

  static get properties() {
    return {
      completed: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      label: {
        type: String,
        value: ''
      }
    };
  }

  _statusClass(completed) {
    return completed ? 'done' : 'open';
  }

  _label(completed, label) {
    return label || (completed ? 'Completed' : 'Open');
  }
}

const module = document.currentScript && document.currentScript.parentNode;
if (module && module.localName === 'dom-module') {
  module.register();
}

customElements.define(LegacyTaskBadge.is, LegacyTaskBadge);
