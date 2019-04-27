import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { GraphDataContainerComponent } from './graph-data-container/graph-data-container.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    GraphDataContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
