import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TruckdefectsPage } from './truckdefects.page';

describe('TruckdefectsPage', () => {
  let component: TruckdefectsPage;
  let fixture: ComponentFixture<TruckdefectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckdefectsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TruckdefectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
