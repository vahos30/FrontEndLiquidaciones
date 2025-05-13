import { BehaviorSubject } from 'rxjs'

const loadingSubject = new BehaviorSubject<boolean>(false)

export const loadingService = {
  loading$: loadingSubject.asObservable(),

  showLoading: () => loadingSubject.next(true),

  hideLoading: () => loadingSubject.next(false),

  setLoading: (isLoading: boolean) => loadingSubject.next(isLoading),
}
