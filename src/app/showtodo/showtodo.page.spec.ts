import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtodoPage } from './showtodo.page';

describe('ShowtodoPage', () => {
  let component: ShowtodoPage;
  let fixture: ComponentFixture<ShowtodoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtodoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
