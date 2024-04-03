import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.development';
import { User } from '../types/user';

@Injectable({
	providedIn: 'root'
})
export class UserService implements OnDestroy {

	private user$$ = new BehaviorSubject<User | undefined>(undefined);
	public user$ = this.user$$.asObservable()

	user: User | undefined

	private subscription: Subscription = new Subscription();
	get isLogged(): boolean {
		return !!this.user;
	}

	constructor(private http: HttpClient) {
		this.userFromLocalStorage();
		this.subscription = this.user$.subscribe(user => {
			this.user = user;
		})
	}

	private userFromLocalStorage(): void {
		const accessToken = localStorage.getItem('accessToken');
		const email = localStorage.getItem('email');
		const username = localStorage.getItem('username');
		const _id = localStorage.getItem('userId');

		if (accessToken && email && username && _id) {
			this.user$$.next({ username, email, _id, accessToken });
		} else {
			this.user$$.next(undefined);
		}
	}

	login(email: string, password: string) {
		const { apiUrl } = environment;

		return this.http.post<{ username: string, email: string, _id: string, accessToken: string }>(`${apiUrl}/users/login`, { email, password })
			.pipe(
				tap(res => {
					localStorage.setItem('accessToken', res.accessToken);
					localStorage.setItem('email', res.email);
					localStorage.setItem('username', res.username);
					localStorage.setItem('userId', res._id);
					this.user$$.next({
						email: res.email,
						username: res.username,
						_id: res._id,
						accessToken: res.accessToken
					});
				})
			);

	}
	register(username: string, email: string, password: string) {
		const { apiUrl } = environment;

		return this.http.post<{ username: string, email: string, _id: string, accessToken: string }>(`${apiUrl}/users/register`, { username, email, password })
			.pipe(
				tap(res => {
					localStorage.setItem('accessToken', res.accessToken);
					localStorage.setItem('email', res.email);
					localStorage.setItem('username', res.username);
					localStorage.setItem('userId', res._id);
					this.user$$.next({
						email: res.email,
						username: res.username,
						_id: res._id,
						accessToken: res.accessToken
					});
				})
			);
	}

	logout() {
		return this.http.post<User>(`${environment.apiUrl}/users/logout`, {})
			.pipe(
				tap(res => {
					localStorage.clear()
					this.user$$.next(undefined);
				})
			);
	}

	getProfile() {
		return this.http.get<User>(`${environment.apiUrl}/users/me`)
			.pipe(
				tap(user => this.user$$.next(user)),
				catchError((err) => {
					this.user$$.next(undefined);
					return [err];
				})
			)
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}














