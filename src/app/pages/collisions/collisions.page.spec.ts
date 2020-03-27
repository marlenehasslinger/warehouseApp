import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollisionsPage } from './collisions.page';

describe('CollisionsPage', () => {
  let component: CollisionsPage;
  let fixture: ComponentFixture<CollisionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollisionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollisionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
