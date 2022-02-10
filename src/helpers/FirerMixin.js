export const FirerMixin = superClass =>
  class extends superClass {
    fire(eventName, data) {
      this.dispatchEvent(
        new CustomEvent(eventName, {
          detail: data,
          bubbles: true,
          composed: true,
        })
      );
    }
  };
