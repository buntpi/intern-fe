import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
	
	// const token = cookies.get('token');
	// if (!token) throw redirect(302, '/login');

	const email = cookies.get('email');
	if (!email) throw redirect(302, '/login');

	const res = await fetch(`http://localhost:8080/isscan?email=${email}`);
    const user = await res.json();

	const qrSrc = `http://localhost:8080/qr?email=${email}`;
	return { email, qrSrc, scanned: user.scanned };
};

export const actions: Actions = {
	verifyotp: async ({ request, cookies, fetch }) => {
		const form = await request.formData();
		const otp = form.get('otp') as string;
		if (!otp) return fail(400, { error: 'OTP is required' });

		const email = cookies.get('email');
		if (!email) throw redirect(302, '/login');

		const res = await fetch(`http://localhost:8080/validate`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, otp })
		});

		if (!res.ok) return fail(401, { error: 'Invalid OTP' });

        const { token, refresh_token } = await res.json();

        cookies.set('token', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 15
        });

        cookies.set('refresh_token', refresh_token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

		throw redirect(303, '/');
	},
    scanned: async ({ cookies, fetch }) => {
		const email = cookies.get('email');
		if (!email) throw redirect(302, '/login');

		const res = await fetch(`http://localhost:8080/scanned`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
		if (!res.ok) {
			return { error: 'Failed to update scanned state' };
		}
		throw redirect(303, '/otp');
	}
};