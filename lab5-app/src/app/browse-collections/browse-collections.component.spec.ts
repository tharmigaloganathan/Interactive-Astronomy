import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCollectionsComponent } from './browse-collections.component';

describe('BrowseCollectionsComponent', () => {
  let component: BrowseCollectionsComponent;
  let fixture: ComponentFixture<BrowseCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
