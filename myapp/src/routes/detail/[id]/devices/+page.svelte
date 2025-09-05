<script>
	let { data } = $props();

</script>

<div class="container">
{#if !data.scanned}
	<h1>Scan this QR with Authenticator</h1>
	<img src={data.qrSrc} alt="QR Code" />
	<br />
	<form method="POST" action="?/scanned">
		<button type="submit" class="button">
			Already Scanned
		</button>
	</form>
{:else}
	already scanned
{/if}
</div>

<style>
	:global(body) {
		/* background-color: #e4e7f2; */
		background-image: linear-gradient(#112c53, #131927);
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
	.button {
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
	.button:hover {
		background-color: #131927;
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
