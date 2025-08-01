import { time } from 'console';
import type { PageServerLoad, Actions } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ cookies, url, fetch }) => {
	const token = cookies.get('token');
	const publicRoutes = ['/login'];
	if (!token && !publicRoutes.includes(url.pathname)) {
		throw redirect(302, '/login');
	}
	// const res = await fetch('https://6809b0fb1f1a52874cdd7193.mockapi.io/data');
	const res = await fetch('http://localhost:8080/companies', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
	const companies = await res.json();
	return { companies };
};

// export const load: PageServerLoad = async ({ cookies, url, fetch }) => {
// 	const token = cookies.get('token');
// 	if (!token && url.pathname !== '/login') {
// 		throw redirect(302, '/login');
// 	}

// 	const res = await fetch('http://localhost:8080/companies');
// 	if (!res.ok) throw redirect(303, '/login');
// 	const companies = await res.json();
// 	return { companies };
// };

export const actions: Actions = {
	logout: async ({ cookies }) => {
		cookies.delete('token', { path: '/' });
		cookies.delete('refresh_token', { path: '/' });
		throw redirect(303, '/login');
	},
	createCompany: async ({ request, cookies, fetch }) => {
		const token = cookies.get('token');
		const form = await request.formData();
		const payload = {
			Name: form.get('name'),
			Code: form.get('code'),
			ActiveUsers: Number(form.get('activeUsers')),
			Licenses: form.get('hasLicense')
				? [{
					Type: form.get('type'),
					CompanyName: form.get('companyName'),
					ExpiredAt: `${form.get('expiredAt')}T00:00:00+07:00`,
					ContractStartAt: `${form.get('contractStartAt')}T00:00:00+07:00`,
					MaxUsers: Number(form.get('maxUsers')),
					Features: form.get('features')
				}]
				: []
		};
		const apiRes = await fetch('http://localhost:8080/company', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(payload)
		});
		if (apiRes.status === 409) {
			return {
				errors: { server: 'This company name already exists.' }
			};
		}
		if (!apiRes.ok) {
			return {
				errors: { server: await apiRes.text() }
			};
		}
		return { success: true };
	}
};