import { AppModule } from './app.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'universal',
    }),
    ServerModule,
    AppModule,
    ModuleMapLoaderModule, // <-- Allows server to render lazy loaded modules
    ServerTransferStateModule,
  ],
  bootstrap: [AppComponent],
})
export class ServerAppModule { }
