import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TestScheduler } from 'rxjs/testing';
import { productsInitialState, PRODUCTS_STATE_KEY } from '../../+state';
import { ProductsModule } from '../../products.module';
import { ProductsComponent } from './products.component';
import { selectProductsVM } from './products.helper';

describe('Products Component', () => {
  let testScheduler: TestScheduler;
  let fixture: ComponentFixture<ProductsComponent>;

  const initialState = { [PRODUCTS_STATE_KEY]: productsInitialState };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ProductsModule,
        HttpClientModule,
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [ProductsComponent],
    });

    fixture = TestBed.createComponent(ProductsComponent);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('Should have a property name state$ (observable) of the required data for the view', () => {
    testScheduler.run(({ expectObservable }) => {
      const state = selectProductsVM(initialState);

      expectObservable(fixture.componentInstance.state$).toBe('a', {
        a: state,
      });
    });
  });
});
