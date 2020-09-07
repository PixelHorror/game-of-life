/**
 * Simple class for holding the global state
 */
export default class State {
  constructor() {
    this.running = false;
  }

  isRunning() {
    return this.running;
  }

  toggle() {
    this.running = !this.running;
  }
}