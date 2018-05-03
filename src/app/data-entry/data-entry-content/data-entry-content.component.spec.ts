import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryContentComponent } from './data-entry-content.component';

describe('DataEntryContentComponent', () => {
  let component: DataEntryContentComponent;
  let fixture: ComponentFixture<DataEntryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEntryContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
