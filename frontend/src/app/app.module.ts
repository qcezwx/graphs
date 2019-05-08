import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { GraphDataContainerComponent } from './graph-data-container/graph-data-container.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule, MatInputModule} from "@angular/material";


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [
    AppComponent,
    GraphComponent,
    GraphDataContainerComponent
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
