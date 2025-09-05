import type { Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
export async function load({ cookies, params }) {
	const token = cookies.get('token');
	const res2 = await fetch(`http://localhost:8080/admin/${params.id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	});
	if (!res2.ok) {
		return { admins: null };
	}
	const admins = await res2.json();
	return { admins };
}

export const actions: Actions = {
	createdevice: async ({ params, cookies }) => {
		const token = cookies.get('token');
		const adminID = params.id;

		const res = await fetch(`http://localhost:8080/device`, {
			method: 'POST',
			headers:  {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({adminID})
		});

		if (!res.ok) {
			return fail(401, { error: 'fail to create device' });
		}
		throw redirect(303, `/detail/${params.id}/admins`);
	},
	deletedevice: async ({ request, cookies,params }) => {
		const token = cookies.get('token');
		const formData = await request.formData();
		const deviceID = formData.get('deviceID');

		const res = await fetch(`http://localhost:8080/device/${deviceID}`, {
			method: 'DELETE',
			headers:  {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			return fail(401, { error: 'fail to delete device' });
		}
		throw redirect(303, `/detail/${params.id}/admins`);
	},
};
