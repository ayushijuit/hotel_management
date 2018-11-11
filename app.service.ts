import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { config } from "./app.config"

@Injectable()
export class AppService {
  loginUrl = "http://localhost:2100/hotelLogin";
  addRoomsUrl = "http://localhost:2100/addRooms";
  roomDetailsUrl = "http://localhost:2100/roomDetails"
  allRoomsUrl = "http://localhost:2100/allRooms"
  removeRoomUrl = "http://localhost:2100/removeRoom"
  roomStatusUrl = "http://localhost:2100/roomStatus"
  allocateRoomUrl = "http://localhost:2100/bookRoom"
  customerDetailsUrl = "http://localhost:2100/customerDetails";
  addLodgeUrl = "http://localhost:2100/addLodge";
  totalCustomerDetailsUrl = "http://localhost:2100/totalAmount";
  sendEmailUrl = "http://localhost:2100/sendEmail";
  adminAuthUrl = "http://localhost:2100/adminAuth"
  checkOutUrl = "http://localhost:2100/checkOut"
  getDetailByDateUrl = "http://localhost:2100/getDetailByDate"
  editRoomUrl = "http://localhost:2100/editRoom"
  constructor(private http: HttpClient) { }

  bitCurrentPrise() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'content-type': 'application/json',
        'Accept': 'application/json',
      })
    }
  }

  editRoom(form){
    return this.http.post(this.editRoomUrl, form, { headers: { 'Content-Type': 'application/json' } });
  }
  getDetailsByDate(details) {
    return this.http.post(this.getDetailByDateUrl, details, { headers: { 'Content-Type': 'application/json' } })
  }
  checkOut(roomId) {
    var roomID = {
      roomId: roomId
    }
    console.log(roomId)
    return this.http.post(this.checkOutUrl, roomID, { headers: { 'Content-Type': 'application/json' } })
  }

  adminAuth(data) {
    var data1 = {
      roomID: data
    }
    return this.http.post(this.adminAuthUrl, data1, { headers: { 'Content-Type': 'application/json' } })
  }

  sendEmail(email) {
    return this.http.post(this.sendEmailUrl, email, { headers: { 'Content-Type': 'application/json' } })
  }

  totalCustomerDetails(romID) {
    var roomID = {
      roomId: romID
    }
    console.log(romID)
    return this.http.post(this.totalCustomerDetailsUrl, roomID, { headers: { 'Content-Type': 'application/json' } })

  }

  addLodge(extraLodge) {
    return this.http.post(this.addLodgeUrl, extraLodge, { headers: { 'Content-Type': 'application/json' } })
  }

  removeRoom(room) {
    var roomNumber = { 'roomNumber': room }
    return this.http.post(this.removeRoomUrl, roomNumber, { headers: { 'Content-Type': 'application/json' } })
  }

  allocateRoom(roomNumber) {
    return this.http.post(this.allocateRoomUrl, roomNumber, { headers: { 'Content-Type': 'application/json' } })
  }
  customerDetails(roomId) {
    console.log(roomId)

    return this.http.post(this.customerDetailsUrl, roomId, { headers: { 'Content-Type': 'application/json' } })
  }
  roomStatus(hotelStatus) {
    var roomstatus = { status: hotelStatus }
    console.log(roomstatus)
    return this.http.post(this.roomStatusUrl, roomstatus, { headers: { 'Content-Type': 'application/json' } })
  }

  allRooms() {
    return this.http.get(this.allRoomsUrl, { headers: { 'Content-Type': 'application/json' } })
  }

  login(form) {
    return this.http.post(this.loginUrl, form, { headers: { 'Content-Type': 'application/json' }, responseType: 'text' })
  }

  addRooms(room) {
    return this.http.post(this.addRoomsUrl, room);
  }

  roomDetails() {
    return this.http.get(this.roomDetailsUrl);
  }
}
