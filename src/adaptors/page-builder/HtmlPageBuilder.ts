import {AbstractPageBuilder, AbstractPageDirector, Page} from "./BuilderAbstracts";

class HtmlPage {
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
        this.page = "<html>"
        this.page += '<head><title>' + this.pageTitle + '</title></head>';
        this.page += '<body>';
        this.page += '<h1>' + this.pageHeading + '</h1>';
        this.page += this.pageText;
        this.page += '</body>';
        this.page += '</html>';
    }
}

export class HtmlPageBuilder extends AbstractPageBuilder {

    private page;

    constructor() {
        super();
        this.page = new HtmlPage()
    }

    getPage(){
        return this.page.showPage()
    }

    setHeading(heading : string): any {
        this.page.setHeading(heading)
    }

    setText(text : string): any {
        this.page.setText(text)
    }

    setTitle(title : string): any {
        this.page.setTitle(title)
    }

    formatPage(): any {
        this.page.formatPage()
    }

}
