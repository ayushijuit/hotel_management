import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';

@Injectable()
export class CommonService{

  fNameRegex:any=new RegExp(/\w+\s{1}\w+\s{1}\w+/);
  contactRegex:any=new RegExp(/^\d{10}$/);
  emailRegex:any = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  passwordRegex:any=new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/);
  numericRegex: any = new RegExp(/(0|[1-9][0-9]*)$/);
  alphaNumeric: any = new RegExp (/^[a-zA-Z0-9]+$/);
  pincode: any = new RegExp(/^[1-9][0-9]{5}$/) 
  Length: any =  new RegExp(/^\d{6}$/);
  positive: any = new RegExp(/^\d*[1-5]\d*$/);
  positiveRoom: any = new RegExp(/^\d{5}$/);
  BedLimit : any = new RegExp (/\b(0*(?:[1-5][0-4]?|5))\b/)
  roomNumber: any  =new RegExp(/^\d{1,5}(?:\.\d{1,5})?$/)
  beds: any = new RegExp(/^[0-4]{1,4}$/)
  roomPrice: any =new RegExp(/[^0-9][+-]?[0-9]{1,10}[^0-9]/)
}
