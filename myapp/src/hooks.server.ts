import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	let token = event.cookies.get('token');
	const refreshToken = event.cookies.get('refresh_token');
	if (!token && refreshToken) {
		const res = await fetch('http://localhost:8080/refresh', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken })
		});
		if (res.ok) {
			const { token } = await res.json();
			event.cookies.set('token', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 1
			});
			console.log({refreshToken})
		console.log({token})
		}
		// console.log("rtplkjhgfdfghj")
	}
	// if (token) {
	// 	event.request.headers.set('Authorization', `Bearer ${token}`);
	// }
	return resolve(event);
};
