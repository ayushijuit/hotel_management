import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { IMyDpOptions } from 'mydatepicker';
import { Moment, months } from 'moment';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { pairs } from 'rxjs/observable/pairs';
import { CommonService } from "../common.service"
import { checkNoChangesNode } from '@angular/core/src/view/view';

@Component({
  selector: 'app-staff-dash-board',
  templateUrl: './staff-dash-board.component.html',
  styleUrls: ['./staff-dash-board.component.css']
})

export class StaffDashBoardComponent implements OnInit {



  totalRooms; detailsOfCustomer
  testArray = [
    { bed: "bed" }, { towel: "towel" }, { food: "food" }, { blanket: "blanket" }, { bedSheet: "bedsheet" }
  ];

  priceAfterDiscount = ''
  checkInDate;
  checkOutDate
  totalDays
  bookRoom: FormGroup
  bedCount = 0;
  blanketCount = 0
  bedSheetCount = 0
  originalPrice;
  towelCount = 0
  foodCount = 0
  removeBed = false
  allocate
  rateAfterDiscount;
  totalRoomCost1: FormGroup
  status
  roomId;
  lodge = {
    perBed: 1000,
    perBlanket: 200,
    perBedSheet: 200,
    towel: 100,
    food: 350
  }
  totalLodgeAmount = 0;
  coupenUsed = '';
  checkOutButton = false
  totalRooms1
  detailsOfCustomer2

  inputValid: boolean = false;
  constructor(
    private appService: AppService,
    private commonService: CommonService
  ) {

  }
  ngOnInit() {
    this.appService.allRooms().subscribe((data: any) => {
      this.totalRooms = data
      // for(var i=0; i<this.totalRooms.length; i++){
      //   if(this.totalRooms[i].status == 'Available'){

      //         this.checkOutButton = false
      //   }else{

      //     this.checkOutButton = false
      //   }
      // }

      this.totalRooms1 = data
    })
    this.originalPrice = false;
    this.bookRoom = new FormGroup({
      'customerName': new FormControl('', [Validators.required, Validators.pattern(this.commonService.fNameRegex)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(this.commonService.emailRegex)]),
      'idProof': new FormControl('', [Validators.required, Validators.maxLength(10)]),
      'city': new FormControl('', Validators.required),
      'coupen': new FormControl('', Validators.required),
      // 'entryDay': new FormControl('', Validators.required),
      'existDay': new FormControl('', Validators.required),
    })
  }

  lodging(roomNumber, status, RoomPrice) {
    if (status == "Booked") {
      document.getElementById('id03').style.display = 'block'
      var form = {
        "roomNumber": roomNumber,
        "RoomPrice": RoomPrice
      }

      this.appService.customerDetails(form).subscribe((data) => {
        this.detailsOfCustomer = data
        for (var i = 0; i < this.detailsOfCustomer.length; i++) {
          if (this.detailsOfCustomer[i].roomId == roomNumber) {
            this.detailsOfCustomer2 = [this.detailsOfCustomer[i]]
          }
        }
      });
    } else {
      alert('this room is not booked')
    }
  }

  checkOutDetails
  checkOut(roomNumber, status, RoomPrice, coupen) {
    if (status == 'Booked') {
      console.log('Checked Out');
      document.getElementById('id04').style.display = 'block'
      var form = {
        "roomNumber": roomNumber
      }
      // this.appService.checkOut(roomNumber).subscribe((data) => { console.log(data) })
      this.appService.customerDetails(form).subscribe((data)=>{this.checkOutDetails = data})
      for (var i = 0; i < this.totalRooms.length; i++) {
        if (this.totalRooms[i].roomNumber == roomNumber) {
          this.totalRooms[i].status = 'Available'
          this.totalRooms[i].coupen = coupen;
        }
      }
    } else {
      console.log('This room is not booked yet');
      alert('This room is not booked yet')
    }
  }
  
closeCheckOutModal(){
  document.getElementById('id04').style.display = 'none'
}
  bookedRooms(status) {
    this.appService.roomStatus(status).subscribe((data) => {
      this.totalRooms = data
    })
  }

  availableRooms(status) {
    this.appService.roomStatus(status).subscribe((data) => {
      this.totalRooms = data

    })
  }
  lodgeResponse;
  lodgingDetail(totalLodgeAmount, roomId, idProof, customerName, city, bedCount, towelCount, foodCount, bedSheetCount) {
    var form = {
      "totalLodgeAmount": totalLodgeAmount,
      "roomId": roomId,
      "idProof": idProof,
      "customerName": customerName,
      "city": city,
      "extraBeds": bedCount,
      "extraTowel": towelCount,
      "extraFood": foodCount,
      "extraBedSheet": bedSheetCount
    }

    this.appService.addLodge(form).subscribe((data) => { this.lodgeResponse = data });
    if (this.lodgeResponse = "Lodge Provided") {
      setTimeout(() => { alert("Lodge Provided") }, 1000)
    }
  }
  hideRoomAdd() {
    this.bookRoom.reset()
    document.getElementById('id01').style.display = 'none'
  }

  hideLodgeModal() {
    this.bedCount = 0;
    this.bedSheetCount = 0;
    this.blanketCount = 0;
    this.foodCount = 0;
    this.towelCount = 0
    this.totalLodgeAmount = 0;
  }
  roomStatus;
  roomPrice;
  coupen;

  allocateRoomModal(roomNumber, status, roomPrice, coupen) {
    if (status == "Available") {
      document.getElementById('id01').style.display = 'block'
      this.roomId = roomNumber;
      this.roomStatus = status
      this.roomPrice = roomPrice;
      this.coupen = coupen;

    } else {
      alert("Room is already booked");
    }
  }
  ok
  date3;
  checkOut1
  date;
  checkOut2Date;
submitted = false;
  timeSet() {
    this.submitted = true;
    console.log(this.bookRoom.value)
    // if (!this.bookRoom.controls.value) { alert('empty form') } 
    if(this.bookRoom.valid){
      this.date = new Date();
      this.date3 = {
        date: this.date.getDate(),
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1
      }
      this.checkOut2Date = moment(this.bookRoom.controls.existDay.value).format('YYYY-MM-DD');
      this.checkOut1 = {
        date: new Date(this.checkOut2Date).getDate(),
        year: new Date(this.checkOut2Date).getFullYear(),
        months: new Date(this.checkOut2Date).getMonth() + 1,
      }

      if (this.checkOut1.date < this.date3.date && this.date3.month === this.checkOut1.months) {
        alert('You can not select previous date');
      }
      else if ((this.date3.month != this.checkOut1.months) && (this.checkOut1.year == this.date3.year)) {
        var monthDifference = this.checkOut1.months - this.date3.month
        var currentDifference = 30 * monthDifference - this.date3.date
        this.ok = currentDifference + this.checkOut1.date
        console.log(this.ok)
        if (typeof this.ok == 'number') {
          console.log('number')
        } else {
          console.log('String')
        }
        this.allocateRoom()
      } else if (this.checkOut1.date > this.date3.date && this.date3.month === this.checkOut1.months && this.checkOut1.year == this.date3.year) {
        this.allocateRoom()
        this.submitted = false
      }
    }
  }

  allocateRoom() {
    var coupon = 'ASD10'
    
    console.log(this.bookRoom.controls)
    if(this.bookRoom.valid){
      console.log(this.bookRoom.controls)
    
      if (this.bookRoom.controls.coupen.value == coupon) {
        for (var i = 0; i < this.totalRooms.length; i++) {
          this.totalRooms[i].coupen = "Coupen Used"
          // var subCoupen = this.coupen.substring(2, 4);
          var priceAfterDiscount = 10 / 100 * this.roomPrice
          for (var i = 0; i < this.totalRooms.length; i++) {
            if (this.totalRooms[i].roomNumber == this.roomId) {
              this.totalRooms[i].status = 'Booked';
            }
          }
        }
        var control = this.bookRoom.controls
        const withCoupen = {
          'customerName': control.customerName.value,
          'email': control.email.value,
          'idProof': control.idProof.value,
          'city': control.city.value,
          'roomId': this.roomId,
          'status': 'Booked',
          'roomPrice': this.roomPrice * parseInt(this.ok),
          'coupen': control.coupen.value,
          'roomDiscountAfterCoupen': priceAfterDiscount,
          'entryDay': this.date3,
          'existDay': this.checkOut1,
          'endPrice': (this.roomPrice) - priceAfterDiscount,

        }
        console.log(withCoupen)
        document.getElementById('loading-bar-spinner').style.display = 'block'
        setTimeout(() => { document.getElementById('loading-bar-spinner').style.display = 'none' }, 1000)
        this.appService.allocateRoom(withCoupen).subscribe((data) => { console.log(data) });
        this.appService.sendEmail(withCoupen).subscribe((data) => { console.log(data) }

        ), (errr) => { console.log(errr); };
        this.hideRoomAdd()
      }
      else if (this.bookRoom.controls.coupen.value != coupon) {
        alert('Wrong Coupun code');
      }
    }
  }

  addBeds() {
    if (this.bedCount >= 0 && this.bedCount < 4) {
      this.totalLodgeAmount += this.lodge.perBed
      this.bedCount++
    }
    else {
      alert('Maximum 4 beds are allowed in each room')
    }
  }

  removeBeds() {
    if (this.bedCount >= 1) {
      this.bedCount--
      this.totalLodgeAmount -= this.lodge.perBed
    }
  }

  addBlanket() {
    if (this.blanketCount >= 0 && this.blanketCount < 4) {
      this.totalLodgeAmount += this.lodge.perBlanket
      this.blanketCount++
    } else {
      alert('Maximum 4 blanket are allowed in each room')
    }
  }

  removeBlanket() {
    if (this.blanketCount >= 1) {
      this.blanketCount--
      this.totalLodgeAmount -= this.lodge.perBlanket
    }
  }
  addBedsheet() {
    if (this.bedSheetCount >= 0 && this.bedSheetCount < 4) {
      this.totalLodgeAmount += this.lodge.perBedSheet
      this.bedSheetCount++
    } else {
      alert('Maximum 4 BedSheets are allowed in each room')
    }
  }
  removeBedSheet() {
    if (this.bedSheetCount >= 1) {
      this.bedSheetCount--
      this.totalLodgeAmount -= this.lodge.perBedSheet
    }
  }
  addTowel() {
    if (this.towelCount >= 0 && this.towelCount < 4) {
      this.totalLodgeAmount += this.lodge.towel
      this.towelCount++
    } else {
      alert('Maximum 4 Towel are allowed in each room')
    }
  }
  removeTowel() {
    if (this.towelCount >= 1) {
      this.towelCount--
      this.totalLodgeAmount -= this.lodge.towel
    }
  }
  addFood() {
    if (this.foodCount >= 0) {
      this.totalLodgeAmount += this.lodge.food
      this.foodCount++
    }
  }
  removeFood() {
    if (this.foodCount >= 1) {
      this.foodCount--
      this.totalLodgeAmount -= this.lodge.food
    }
  }
}