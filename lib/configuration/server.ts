import { Application } from "express"
import { ch } from ".."

export default function serve(app:Application){
  app.listen(app.get('port') , app.get('host') , () => {
    console.log(`Server ${ch.blue('Started')} On : ${app.get('host')}/${app.get('port')}`)
  })  
}