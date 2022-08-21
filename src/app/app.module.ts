import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { DeviceEditComponent } from './components/device-edit/device-edit.component';
import { DeviceManagmentService } from './services/device-managment.service';

@NgModule({
  declarations: [AppComponent, TableComponent, DeviceEditComponent],
  imports: [BrowserModule, AppRoutingModule],

  providers: [DeviceManagmentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
