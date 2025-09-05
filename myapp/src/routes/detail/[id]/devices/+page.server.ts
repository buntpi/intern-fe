import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies, params }) => {
	
	const token = cookies.get('token');
	// if (!token) throw redirect(302, '/login');

	const email = cookies.get('email');
	// if (!email) throw redirect(302, '/login');

	const res = await fetch(`http://localhost:8080/isscan/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    const user = await res.json();

	const qrSrc = `http://localhost:8080/qr/${params.id}`
	return { email, qrSrc, scanned: user };
};

export const actions: Actions = {
	scanned: async ({ fetch, params, cookies }) => {
		const token = cookies.get('token');
		const deviceID = params.id;

		const res = await fetch(`http://localhost:8080/scanned`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' ,
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ deviceID })
		});
		if (!res.ok) {
			return { error: 'Failed to update scanned state' };
		}
		throw redirect(302, '/');
	}
};