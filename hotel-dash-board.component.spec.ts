import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HotelDashBoardComponent } from './hotel-dash-board.component';

describe('HotelDashBoardComponent', () => {
  let component: HotelDashBoardComponent;
  let fixture: ComponentFixture<HotelDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
