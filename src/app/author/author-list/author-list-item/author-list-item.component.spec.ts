import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AurhorListItemComponent } from './aurhot-list-item.component';

describe('AurhotListItemComponent', () => {
  let component: AurhorListItemComponent;
  let fixture: ComponentFixture<AurhorListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AurhorListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AurhorListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
