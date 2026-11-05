import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';

import { BookResponse } from '../api/models/book-response';
import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  function render(book: Partial<BookResponse>): HTMLElement {
    TestBed.configureTestingModule({
      imports: [BookCardComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideTransloco({ config: { availableLangs: ['en'], defaultLang: 'en' } }),
      ],
    });
    const fixture = TestBed.createComponent(BookCardComponent);
    fixture.componentRef.setInput('book', { id: 1, mine: true, hasCover: false, genre: 'OTHER', ...book });
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the book title', () => {
    expect(render({ title: 'The Hobbit' }).textContent).toContain('The Hobbit');
  });

  it('offers a wishlist bookmark on another reader\'s book', () => {
    expect(render({ title: 'Theirs', mine: false }).querySelector('button[aria-label]')).not.toBeNull();
  });

  it('offers no wishlist bookmark on the reader\'s own book', () => {
    const card = render({ title: 'Mine', mine: true });
    expect(card.querySelector('article')).not.toBeNull();
    expect(card.querySelector('button[aria-label]')).toBeNull();
  });
});
