import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TruckoverviewPage } from './truckoverview.page';

describe('TruckoverviewPage', () => {
  let component: TruckoverviewPage;
  let fixture: ComponentFixture<TruckoverviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckoverviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TruckoverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
