import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { HotelDashBoardComponent } from './hotel-dash-board/hotel-dash-board.component';
import { StaffDashBoardComponent } from './staff-dash-board/staff-dash-board.component';

// import {AdminAddProduct} from "./admin-dash-board/admin-dash-boardaddproduct.component";

const route : Routes = [
    {path: '', component: LoginComponent},
    {path : 'hotelDashBoard', component: HotelDashBoardComponent},
    {path: 'staffDashBoard', component:StaffDashBoardComponent}
 ]

export const appRouter : ModuleWithProviders = RouterModule.forRoot(route)


