import { fakeAsync, tick } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  it('shows one toast and clears it after its time', fakeAsync(() => {
    const toasts = new ToastService();

    toasts.show('ok', 'book.saved', { title: 'Dune' });
    expect(toasts.current()).toEqual({ kind: 'ok', key: 'book.saved', params: { title: 'Dune' } });

    tick(3500);
    expect(toasts.current()).toBeNull();
  }));

  it('lets a newer toast replace the one on screen and keeps it for its own time', fakeAsync(() => {
    const toasts = new ToastService();

    toasts.show('ok', 'first');
    tick(3000);
    toasts.show('error', 'second');
    tick(1000);
    expect(toasts.current()?.key).toBe('second');

    tick(2500);
    expect(toasts.current()).toBeNull();
  }));

  it('turns a business-rule code from the backend into its translated error', fakeAsync(() => {
    const toasts = new ToastService();

    toasts.apiError({ error: { code: 'book_borrowed' } });
    expect(toasts.current()).toEqual({ kind: 'error', key: 'errors.book_borrowed', params: undefined });

    toasts.apiError({});
    expect(toasts.current()?.key).toBe('errors.unknown');
    tick(3500);
  }));
});
