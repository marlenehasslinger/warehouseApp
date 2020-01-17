import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserlogPage } from './userlog.page';

describe('UserlogPage', () => {
  let component: UserlogPage;
  let fixture: ComponentFixture<UserlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
