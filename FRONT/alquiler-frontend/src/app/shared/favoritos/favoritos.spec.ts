import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritosComponent } from './favoritos';
import { RouterModule } from '@angular/router';

describe('FavoritosComponent', () => {
  let component: FavoritosComponent;
  let fixture: ComponentFixture<FavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoritosComponent,
        // Simulamos las rutas vacías para que los routerLink del HTML no den error
        RouterModule.forRoot([]) 
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});