import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AboutComponent } from "../about/about.component";



@NgModule({
  declarations: [AboutComponent],
  imports: [RouterModule ],
  exports:[AboutComponent],
  providers :[],
})
export class UserModule { }
