import App  from "./app";

export default abstract class Adaptor<T = any> {
    /**
     * An Abstract Class For Implement Any Adaptors
     */
    protected app: App;

    constructor(app: App, public config?: T) {
        this.app = app;
    }

    abstract init(): void;
}
