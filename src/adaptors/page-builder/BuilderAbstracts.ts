export type Page = string;
export abstract class AbstractPageBuilder {
    abstract getPage() : any
    abstract setTitle(t : string) : any
    abstract setText(t : string) : any
    abstract setHeading(t : string) : any
    abstract formatPage() : any
}

export abstract class AbstractPageDirector {
    constructor(abstractPageBuilder : AbstractPageBuilder) {}

    abstract buildPage() : any;
    abstract getPage() : any
}