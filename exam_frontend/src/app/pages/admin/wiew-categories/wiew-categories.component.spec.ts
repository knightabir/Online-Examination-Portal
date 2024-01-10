import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiewCategoriesComponent } from './wiew-categories.component';

describe('WiewCategoriesComponent', () => {
  let component: WiewCategoriesComponent;
  let fixture: ComponentFixture<WiewCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WiewCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WiewCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
