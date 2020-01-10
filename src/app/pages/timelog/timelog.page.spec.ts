import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimelogPage } from './timelog.page';

describe('TimelogPage', () => {
  let component: TimelogPage;
  let fixture: ComponentFixture<TimelogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
