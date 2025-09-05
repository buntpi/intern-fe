import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	const token = cookies.get('token');
	const res2 = await fetch(`http://localhost:8080/companies/${params.id}/licenses`, {
		headers: {
			Authorization: `Bearer ${token}`,
		}
	});
	if (!res2.ok) {
		return { license: null };
	}
	const licenses = await res2.json();
	return { licenses };
}

export const actions: Actions = {
	createLicense: async ({ request, cookies, fetch,params }) => {
		const token = cookies.get('token');
		const form = await request.formData();
		const payload = {
			Type: form.get('type'),
			CompanyName: form.get('companyName'),
			ExpiredAt: `${form.get('expiredAt')}T00:00:00+07:00`,
			ContractStartAt: `${form.get('contractStartAt')}T00:00:00+07:00`,
			MaxUsers: Number(form.get('maxUsers')),
			Features: form.get('features'),
			CompanyID: Number(params.id)
		};
		const apiRes = await fetch('http://localhost:8080/license', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(payload)
		});
		if (!apiRes.ok) {
			return {
				errors: { server: await apiRes.text() }
			};
		}
		return { success: true };
	}
};