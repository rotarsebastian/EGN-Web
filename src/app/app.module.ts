import { NgModule } from "@angular/core";
import { AppComponent } from "./root/app.component";
import { components } from "./app.components";
import { services } from "./app.services";
import { imports } from "./app.imports";
import { ArraySortPipe } from "./pipes/sort.pipe";

@NgModule({
  imports: [imports],
  entryComponents: [components],
  declarations: [components, ArraySortPipe],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule {}
