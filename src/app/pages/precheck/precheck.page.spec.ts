import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrecheckPage } from './precheck.page';

describe('PrecheckPage', () => {
  let component: PrecheckPage;
  let fixture: ComponentFixture<PrecheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrecheckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrecheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
