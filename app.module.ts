import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appRouter } from './app.routing';
import { AppService } from "./app.service";
import { CommonService } from './common.service';
import { HotelDashBoardComponent } from './hotel-dash-board/hotel-dash-board.component';
import { LoginComponent } from './login/login.component';
import { StaffDashBoardComponent } from './staff-dash-board/staff-dash-board.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HotelDashBoardComponent,
    StaffDashBoardComponent
  ],
  imports: [
    BrowserModule,    
    appRouter,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    
  ],
  providers: [AppService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
