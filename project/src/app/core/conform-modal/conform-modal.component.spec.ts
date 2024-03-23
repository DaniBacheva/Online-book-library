import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformModalComponent } from './conform-modal.component';

describe('ConformModalComponent', () => {
  let component: ConformModalComponent;
  let fixture: ComponentFixture<ConformModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConformModalComponent]
    });
    fixture = TestBed.createComponent(ConformModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
