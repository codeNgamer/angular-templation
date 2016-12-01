  # Angular-Templation
Anglar 2 module that enables angular components take on multiple templates

  ## Install
  > npm install --save angular-templation
  
 ## Usage
 
 * in app.module.ts
 ```javascript
 import { TemplationModule } from 'angular-templation';
@NgModule({
  imports: [..., TemplationModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
 ```
 
  * use templation component and supply component and template/templateUrl
   ```javascript
  <div>
  <templation [component]="testComponent" [template]="template1" ></templation>
  <templation [component]="testComponent" [templateUrl]="path/to/template2" ></templation>
  </div>
```

