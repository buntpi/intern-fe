<script>
	let email = $state('');
	let password = $state('');
	let { form } = $props();
</script>

<div class="container">
	<h1>Login</h1>
	<form method="POST" action="?/auth">
		{#if form?.error}
			<p style="color: red">{form.error}</p>
		{/if}
		<div>
			<input class="box" name="email" bind:value={email} placeholder="Email" required />
			<input
				class="box"
				name="password"
				bind:value={password}
				placeholder="Password"
				type="password"
				required
			/>
		</div>
		<button type="submit" class="login-button" name="action" value="login">Login</button>
		<!-- <button type="submit" name="action" value="register">Register</button> -->
	</form>
</div>

<style>
	:global(body) {
		background-color: #e4e7f2;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.container {
		background-color: white;
		border-radius: 10px;
		width: fit-content;
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 35%;
		padding: 20px;
	}
	.login-button {
		background-color: #112c53;
		color: white;
		height: 36px;
		padding: 8px 14px 8px 14px;
		border-radius: 5px;
		gap: 8px;
		font-size: 12px;
		border: none;
		font-size: 12px;
		white-space: nowrap;
		align-self: center;
		width: 100%;
		margin: 7px 0;
	}
	.login-button:hover {
		background-color: #131927;
	}
	.box {
		display: flex;
		flex-direction: column;
		border: 1px solid #a7afb7;
		border-radius: 5px;
		height: 38px;
		margin: 10px 0px;
		width: 100%;
	}
	h1{
		margin:0;
	}
	*:not(i) {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}
</style>
