import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeModalComponent } from './barcodesmodal.component';

describe('BarcodeModalComponent', () => {
  let component: BarcodeModalComponent;
  let fixture: ComponentFixture<BarcodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarcodeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
