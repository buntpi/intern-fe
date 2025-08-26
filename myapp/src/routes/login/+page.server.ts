import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
    auth: async ({ request, cookies }) => {
        const form = await request.formData();
        const email = form.get('email') as string;
        const password = form.get('password') as string;

        const res = await fetch(`http://localhost:8080/${form.get('action')}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.error };
        }

        cookies.set('email', email, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24
        });

        throw redirect(303, '/otp');
    }
};