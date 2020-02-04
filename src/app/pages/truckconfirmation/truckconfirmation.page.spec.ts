import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TruckconfirmationPage } from './truckconfirmation.page';

describe('TruckconfirmationPage', () => {
  let component: TruckconfirmationPage;
  let fixture: ComponentFixture<TruckconfirmationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckconfirmationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TruckconfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
