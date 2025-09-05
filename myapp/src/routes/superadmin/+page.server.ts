import type { Actions } from './$types';
export async function load({ cookies }) {
    const token = cookies.get('token');
	const res2 = await fetch(`http://localhost:8080/admins`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
	if (!res2.ok){
		return { admins:null };
	}
	const admins = await res2.json();
	return { admins };
}

export const actions: Actions = {
    register: async ({ request, cookies }) => {
        const token = cookies.get('token');
        const form = await request.formData();
        const email = form.get('email') as string;
        const password = form.get('password') as string;

        const res = await fetch(`http://localhost:8080/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
				Authorization: `Bearer ${token}` },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.error };
        }
    }
};