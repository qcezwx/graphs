import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GraphComponent} from './graph/graph.component';
import {GraphDataContainerComponent} from './graph-data-container/graph-data-container.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule, MatExpansionModule, MatInputModule} from "@angular/material";
import {MatSelectModule} from '@angular/material/select';
import {GraphDetailsComponent} from './graph-details/graph-details.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    GraphComponent,
    GraphDataContainerComponent,
    GraphDetailsComponent
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
