import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormWizardComponent} from './form-wizard/form-wizard.component';

const routes: Routes = [

	{path:'',component:FormWizardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
