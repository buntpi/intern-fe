export async function load({ cookies,params }) {
    const token = cookies.get('token');
	const res2 = await fetch(`http://localhost:8080/companies/${params.id}/applications`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
	if (!res2.ok){
		return { applications:null };
	}
	const applications = await res2.json();
	return { applications };
}
