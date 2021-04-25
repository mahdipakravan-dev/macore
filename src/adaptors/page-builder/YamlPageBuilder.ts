import {AbstractPageBuilder, AbstractPageDirector, Page} from "./BuilderAbstracts";

class YamlPage {
    private page : Page = "" ;
    private pageTitle = "";
    private pageHeading = "";
    private pageText = "";

    constructor() {}

    public showPage(){
        return this.page;
    }

    public setTitle(title : string){
        this.pageTitle = title;
    }

    public setHeading(title : string){
        this.pageHeading = title;
    }

    public setText(text : string){
        this.pageText = text
    }

    public formatPage(){
        this.page =  `${this.pageTitle}`
        this.page += `     ${this.pageHeading}`
        this.page += `                        ${this.pageText}`
    }
}

export class YamlPageBuilder extends AbstractPageBuilder{
    private page ;

    constructor() {
        super();
        this.page = new YamlPage()
    }

    formatPage(): any {
        this.page.formatPage()
    }

    getPage(): any {
        return this.page.showPage()
    }

    setHeading(t: string): any {
        this.page.setHeading(t)
    }

    setText(t: string): any {
        this.page.setText(t)
    }

    setTitle(t: string): any {
        this.page.setTitle(t)
    }
}