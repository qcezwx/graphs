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
import {MatToolbarModule} from '@angular/material/toolbar';
import {FileDropModule} from 'ngx-file-drop';
import {GraphInputDropzoneComponent} from './graph-input-dropzone/graph-input-dropzone.component';
import {GraphInputRandomComponent} from './graph-input-random/graph-input-random.component';
import {MatTabsModule} from '@angular/material/tabs';
import { GraphChartsComponent } from './graph-charts/graph-charts.component';
import {GoogleChartsModule} from "angular-google-charts";


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
    MatToolbarModule,
    FileDropModule,
    MatTabsModule,
    GoogleChartsModule,
    HttpClientModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatTabsModule
  ],
  declarations: [
    AppComponent,
    GraphComponent,
    GraphDataContainerComponent,
    GraphDetailsComponent,
    GraphInputDropzoneComponent,
    GraphInputRandomComponent,
    GraphChartsComponent
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
