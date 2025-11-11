import { createApp, App as VueApp } from 'vue';
import VueBadge from '../components/Badge.vue';

class BadgeWebComponent extends HTMLElement {
  private vueApp: VueApp | null = null;
  private mountPoint: HTMLDivElement | null = null;

  static get observedAttributes() {
    return ['count', 'label', 'color'];
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.mountVueComponent();
  }

  disconnectedCallback() {
    this.unmountVueComponent();
  }

  attributeChangedCallback(oldValue: string, newValue: string) {
    if (oldValue !== newValue && this.mountPoint) {
      this.unmountVueComponent();
      this.mountVueComponent();
    }
  }

  private mountVueComponent() {
    if (!this.mountPoint) return;

    const count = parseInt(this.getAttribute('count') || '0', 10);
    const label = this.getAttribute('label') || '';
    const color = this.getAttribute('color') || 'blue';

    this.vueApp = createApp(VueBadge, {
      count,
      label,
      color: color as 'blue' | 'green' | 'red' | 'orange',
    });

    this.vueApp.mount(this.mountPoint);
  }

  private unmountVueComponent() {
    if (this.vueApp) {
      this.vueApp.unmount();
      this.vueApp = null;
    }
  }
}

if (!customElements.get('badge-web-component')) {
  customElements.define('badge-web-component', BadgeWebComponent);
}

export default BadgeWebComponent;
