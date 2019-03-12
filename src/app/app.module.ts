import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'

import { AppComponent } from './app.component';
import { ListComponentComponent } from './components/list-component/list-component.component';
import { CreateComponentComponent } from './components/create-component/create-component.component';
import { EditComponentComponent } from './components/edit-component/edit-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponentComponent,
    CreateComponentComponent,
    EditComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
