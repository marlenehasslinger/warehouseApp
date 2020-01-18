import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrucklogPage } from './trucklog.page';

describe('TrucklogPage', () => {
  let component: TrucklogPage;
  let fixture: ComponentFixture<TrucklogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrucklogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrucklogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
