import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrucklogdetailPage } from './trucklogdetail.page';

describe('TrucklogdetailPage', () => {
  let component: TrucklogdetailPage;
  let fixture: ComponentFixture<TrucklogdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrucklogdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrucklogdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
