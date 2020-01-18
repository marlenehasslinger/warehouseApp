import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserlogdetailPage } from './userlogdetail.page';

describe('UserlogdetailPage', () => {
  let component: UserlogdetailPage;
  let fixture: ComponentFixture<UserlogdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlogdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserlogdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
