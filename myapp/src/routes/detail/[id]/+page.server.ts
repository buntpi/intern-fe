export async function load({ cookies,params }) {
    const token = cookies.get('token');
	const res = await fetch(`http://localhost:8080/companies/${params.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
	const company = await res.json();
	const res2 = await fetch(`http://localhost:8080/companies/${params.id}/license/latest`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
	if (!res2.ok){
		return { company, license:null };
	}
	const license = await res2.json();
	return { company, license };
}
