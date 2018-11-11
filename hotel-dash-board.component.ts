import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AppService } from '../app.service';
import { CommonService } from "../common.service"
import * as jsPDF from 'jspdf';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { InternalFormsSharedModule } from '@angular/forms/src/directives';

@Component({
  selector: 'app-hotel-dash-board',
  templateUrl: './hotel-dash-board.component.html',
  styleUrls: ['./hotel-dash-board.component.css']
})

export class HotelDashBoardComponent implements OnInit {
  @ViewChild('content') content: ElementRef
  submitted = false
  addRoom: FormGroup;
  removeRoomNumber;
  cover1;
  allRooms
  url;
  base64textString;
  fileName;
  totalRooms
  length;
  detailsOfCustomer;
  customerDetails1;
  customerName;
  roomDiscountAfterCoupen
  existDayYear
  existDayMonth
  existDayDay
  existDay
  coupen;
  email;
  idProof;
  endPrice
  checkInTime
  roomPrice1
  statusOfCustomer;
  defaultRoomPrice
  RoomId;
  city
  totalLodgeAmount;
  extraBedSheet
  extraBeds
  extraFood
  extraTowel
  from
  to
  editRoomFrom: FormGroup
  submitted1
  editedData
  imageUrl
  entryDay
  dateWiseCustomerDetails;
  demo;
  
  constructor(private appService: AppService, private commonService: CommonService) {

    this.appService.allRooms().subscribe((data: any) => {
      this.totalRooms = data
    })
  }
  // Validators.pattern(this.commonService.positiveRoom)
  ngOnInit() {
    this.removeRoomNumber = false
    this.submitted = false
    this.addRoom = new FormGroup({
      'roomNumber': new FormControl('', [Validators.required, Validators.pattern(this.commonService.roomNumber)]),
      'RoomPrice': new FormControl('', [Validators.required, Validators.pattern(this.commonService.roomNumber)]),
      'image': new FormControl('', [Validators.required]),
      'beds': new FormControl('', Validators.maxLength(1)),

    })

    this.editRoomFrom = new FormGroup({
      // 'roomNumber': new FormControl(this.roomNumber, [Validators.required, Validators.pattern(this.commonService.roomNumber)]),
      'RoomPrice1': new FormControl('', [Validators.required]), //, 
      'image1': new FormControl('', [Validators.required]),
      'beds1': new FormControl('', [Validators.maxLength(1), Validators.required, Validators.pattern(this.commonService.positive)]),
      'status1': new FormControl('', Validators.required)
    })
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];
    this.fileName = file.name;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.url = readerEvt.target.result
    this.base64textString = btoa(binaryString);

    var form = {
      'imageContent': "data:image/png;base64," + this.base64textString,
      'name': this.fileName
    }
    this.cover1 = form.imageContent
  };

  cover2
  handleFileSelect1(evt) {
    var files = evt.target.files;
    var file = files[0];
    this.fileName = file.name;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded1(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.url = readerEvt.target.result
    this.base64textString = btoa(binaryString);

    var form = {
      'imageContent': "data:image/png;base64," + this.base64textString,
      'name': this.fileName
    }
    this.cover2 = form.imageContent
  };
  
  
  datewise() {
    if (!this.from && !this.to) {
      this.removeRoomNumber = false
      alert('Please choose dates')
    }
    else {
      var from = moment(this.from).format('YYYY-MM-DD');

      var fromDate = {
        year: new Date(from).getFullYear(),
        months: new Date(from).getMonth() + 1,
        date: new Date(from).getDate(),
      }

      var to = moment(this.to).format('YYYY-MM-DD');
      var toDate = {
        year: new Date(to).getFullYear(),
        months: new Date(to).getMonth() + 1,
        date: new Date(to).getDate(),
      }

      if (fromDate.year <= toDate.year) {
        if (fromDate.months == toDate.months && fromDate.date < toDate.date) {
          console.log('Same month less from ')
          var details = {
            "hours": 23,
            "year": fromDate.year,
            "month": fromDate.months,
            "date": fromDate.date,
            "date1": toDate.date,
            "year1": toDate.year,
            "month1": toDate.months
          }

          this.appService.getDetailsByDate(details).subscribe((data) => {
            this.demo = data
            if (this.demo.length === 0) {
              alert('No data available for these dates');
              this.removeRoomNumber = false
              this.dateWiseCustomerDetails = []
            }
            else {

              this.dateWiseCustomerDetails = data;
              this.removeRoomNumber = true
              //   this.from = ''
              // this.to = ''
            }

          })
        } if (fromDate.months != toDate.months) {
          console.log("Different Month Randome date")
          var details = {
            "hours": 23,
            "year": fromDate.year,
            "month": fromDate.months,
            "date": fromDate.date,
            "date1": toDate.date,
            "year1": toDate.year,
            "month1": toDate.months
          }
          this.appService.getDetailsByDate(details).subscribe((data) => {
            this.demo = data
            if (this.demo.length === 0) {

              this.dateWiseCustomerDetails = []
            }
            else {
              this.dateWiseCustomerDetails = data;
              this.removeRoomNumber = true;
              this.from = ''
              this.to = ''
            }

          })
        } if (fromDate.date > toDate.date && fromDate.months === toDate.months)
          alert('Invalid daetails')
      }
    }
  }
  individualDetails
  getDetails(roomId) {
    for (var i = 0; i < this.dateWiseCustomerDetails.length; i++) {
      if (this.dateWiseCustomerDetails[i].roomId == roomId) {
        console.log(this.dateWiseCustomerDetails[i])
        this.individualDetails = [this.dateWiseCustomerDetails[i]]
      }
    }
  }

  removeRoomNumber1() {
    this.dateWiseCustomerDetails = []
    this.removeRoomNumber = false
  }

  roomNumber
  editRoom(roomNumber) {
    this.roomNumber = roomNumber
    document.getElementById('id04').style.display = 'block'

  };


  onEditRoom() {
    this.submitted1 = true
    if (this.editRoomFrom.valid) {
      var control = this.editRoomFrom.controls
      var form = {
        "roomNumber": this.roomNumber,
        "status": control.status1.value,
        "beds": control.beds1.value,
        "image": this.cover2,
        'RoomPrice': control.RoomPrice1.value
      }

      this.appService.editRoom(form).subscribe((data) => {
        this.editedData = data
        console.log(this.editedData.roomNumber)
        console.log(this.roomNumber)
        for (var i = 0; i < this.totalRooms.length; i++) {
          if (this.totalRooms[i].roomNumber == this.roomNumber) {
            this.totalRooms[i].RoomPrice = this.editedData.RoomPrice
            this.totalRooms[i].status = this.editedData.status
            this.imageUrl = this.editedData.image
          }
          document.getElementById('id04').style.display = 'none'
        }
      })
    } else {
      alert('Invalid Form')
    }
  }

  closeEditRoom() {
    document.getElementById('id04').style.display = 'none'
  }

  roomsID
  customerDetails(booked, roomId, RoomPrice) {
    this.roomsID = roomId
    if (booked === 'Available') {
      alert('This room is not booked yet')
    }
    else {

      // document.getElementById('loading-bar-spinner').style.display = 'block'
      var form = {
        "Booked": booked,
        "roomId": roomId
      }
      document.getElementById('id02').style.display = 'block'
      this.roomPrice1 = parseInt(RoomPrice)
      this.appService.adminAuth(form).subscribe((data) => {
        this.customerDetails1 = data

        this.customerDetails1.forEach(element => {
          console.log(element)
        });

        for (var i = 0; i < this.customerDetails1.length; i++) {
          if (this.customerDetails1[i].roomId == roomId) {
            console.log(this.customerDetails1[i])
            this.roomDiscountAfterCoupen = this.customerDetails1[i].roomDiscountAfterCoupen
            this.entryDay = this.customerDetails1[i].entryDay

            this.existDayYear = this.customerDetails1[i].existDay.year
            this.existDayMonth = this.customerDetails1[i].existDay.months
            this.existDayDay = this.customerDetails1[i].existDay.date
            this.endPrice = this.customerDetails1[i].endPrice
            this.customerName = this.customerDetails1[i].customerName
            this.email = this.customerDetails1[i].email
            this.idProof = this.customerDetails1[i].idProof
            this.coupen = this.customerDetails1[i].coupen
            this.RoomId = this.customerDetails1[i].roomId;
            this.defaultRoomPrice = this.customerDetails1[i].roomPrice
            this.city = this.customerDetails1[i].city
          }
        }
      });

      this.appService.totalCustomerDetails(form).subscribe((data) => {
        this.detailsOfCustomer = data
        for (var i = 0; i < this.detailsOfCustomer.length; i++) {
          if (this.detailsOfCustomer[i].roomId == this.roomsID) {
            this.totalLodgeAmount = this.detailsOfCustomer[i].totalLodgeAmount
            this.extraTowel = this.detailsOfCustomer[i].extraTowel
            this.extraFood = this.detailsOfCustomer[i].extraFood
            this.extraBedSheet = this.detailsOfCustomer[i].extraBedSheet
          }
        }
      });
      setTimeout(() => {
        document.getElementById('loading-bar-spinner').style.display = 'none'
      }, 150);
    }
  }

  generatePDF() {
    var doc = new jsPDF()
    var specialElementHandelers = {
      '#editor': function (element, renderer) {
        return true
      }
    }
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 400,
      'elementHandelers': specialElementHandelers
    })
    doc.save('test.pdf');
    document.getElementById('id02').style.display = 'none'
  }

  onAddRoom() {
    // if (!this.addRoom.controls.value) {
    //   alert('Please Complete all Add Room Fields')
    // }
    this.submitted = true
    if (this.addRoom.valid) {
      document.getElementById('loading-bar-spinner').style.display = 'block'
      var controls = this.addRoom.controls;
      var form = {
        'roomNumber': controls.roomNumber.value,
        'RoomPrice': controls.RoomPrice.value,
        'image': this.cover1,
        'beds': controls.beds.value,
        'status': 'Available',
      }
      this.appService.addRooms(form)
        .subscribe((data: any) => {
          if (data.result === "Room number Already Registered") {
            alert('Room number Already Registered')
          } else {
            this.totalRooms.push(data)
          }
        });
      document.getElementById('loading-bar-spinner').style.display = 'none'
    }
  }

  removeRoom(status, roomNumber) {
    if (status == "Booked") { alert('You can not remove untill Room is booked') } else {
      document.getElementById('loading-bar-spinner').style.display = 'block'
      this.appService.removeRoom(roomNumber).subscribe((data) => {
        this.totalRooms.splice(data, 1)

        document.getElementById('loading-bar-spinner').style.display = 'none'
      })
    }
  }

  hideRoomAdd() {
    this.addRoom.reset()
    document.getElementById('id02').style.display = 'none'
  }
}

