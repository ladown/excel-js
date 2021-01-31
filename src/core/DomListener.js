export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`$root is not provided for DomListener `);
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    console.log(this.listeners);
  }

  removeDOMListeners() {}
}
