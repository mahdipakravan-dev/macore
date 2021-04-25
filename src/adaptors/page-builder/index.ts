import {HtmlPageBuilder} from "./HtmlPageBuilder";
import {AbstractPageBuilder, AbstractPageDirector} from "./BuilderAbstracts";
import {YamlPageBuilder} from "./YamlPageBuilder";

/*
* Creational : Builder Design Pattern
* */

export class PageDirector extends AbstractPageDirector {

    private builder ;

    constructor(builder_in : AbstractPageBuilder) {
        super(builder_in);
        this.builder = builder_in
    }

    buildPage(): any {
        this.builder.setTitle("My Director Title")
        this.builder.setHeading("Director Heading")
        this.builder.setText("First Text")
        this.builder.setText("Second Text")
        this.builder.setText("Finally Text")
        this.builder.formatPage()
    }

    getPage(): any {
        return this.builder.getPage()
    }

}

console.log("------------------- HTML -------------------")
const htmlPageBuilder = new HtmlPageBuilder()
const pageDirector = new PageDirector(htmlPageBuilder)
pageDirector.buildPage()
console.log(pageDirector.getPage())

console.log("------------------- YAML -------------------")
const yamlPageBuilder = new YamlPageBuilder()
const yamlPageDirector = new PageDirector(yamlPageBuilder)
yamlPageDirector.buildPage()
console.log(yamlPageDirector.getPage())

