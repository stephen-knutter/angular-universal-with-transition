import { AppModule } from './app.module';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'universal',
    }),
    BrowserTransferStateModule,
    AppModule
  ],
  bootstrap: [ AppComponent ],
})
export class BrowserAppModule { }
