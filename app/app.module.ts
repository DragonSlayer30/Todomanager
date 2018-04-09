import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { DataService } from "./service/data.service";

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, FormsModule, AngularFontAwesomeModule ],
  declarations: [ HomeComponent, HeaderComponent ],
  providers: [ DataService ],
  bootstrap:    [ HomeComponent ]
})
/**
 * Main module for our application, if creating any new components, be sure to declare them above.
 * If creating any new services, provide them above
 */
export class AppModule { }