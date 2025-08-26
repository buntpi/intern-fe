<script>
	let otp = $state('');
	let { form, data } = $props();
</script>

{#if !data.scanned}
	<h1>Scan this QR with Authenticator</h1>
	<img src={data.qrSrc} alt="QR Code" />
	<br />
	<form method="POST" action="?/scanned">
		<button type="submit">
			Already Scanned
		</button>
	</form>
{:else}
	<form method="POST" action="?/verifyotp">
		<h1>Enter OTP</h1>
		<input
			class="box"
			name="otp"
			bind:value={otp}
			placeholder="One Time Password"
			required
		/>
		<button type="submit">Login</button>
	</form>

	{#if form?.error}
		<p style="color:red">{form.error}</p>
	{/if}
{/if}
<!-- <script>
	let otp = $state('');
	let { form, data } = $props();
</script>

<h1>Scan this QR with Authenticator</h1>
<img src={data.qrSrc} alt="QR Code" />
<br />

<form method="POST">
	<h1>Enter OTP</h1>
	<input
		class="box"
		name="otp"
		bind:value={otp}
		placeholder="One Time Password"
		required
	/>
	<button type="submit">Login</button>
</form>

{#if form?.error}
	<p style="color:red">{form.error}</p>
{/if} -->

<!-- <script>
	import { goto } from '$app/navigation';
	let otp = $state('');
	let error = $state('');
	let { data } = $props();

	async function submit() {
		const res = await fetch(`http://localhost:8080/validate?otp=${otp}`);
		if (res.ok) {
			goto('/');
		} else {
			error = 'Invalid OTP';
		}
	}
</script>

<h1>Scan this QR with Authenticator</h1>
<img src={data.qrSrc} alt="QR Code" />
<br />

<h1>Enter OTP</h1>
<input type="text" bind:value={otp} placeholder="One Time Password" />
<button onclick={submit}>Login</button>
{#if error}
	<p style="color:red">{error}</p>
{/if}
 -->
