<script lang="ts">
	import logo from '../../image/logo.png';
	let menuItems = [
		{ name: 'Company', icon: 'fa-building', link: '/' },
		{ name: 'Super admin', icon: 'fa-user', link: '/superadmin' },
		{ name: 'Setting', icon: 'fa-gear', link: '/' },
		{ name: 'Activity log', icon: 'fa-file-lines', link: '/' }
	];
	interface Admin {
		Email: String;
		Password: String;
		TOTPSecret: String;
		Scanned: String;
		ID: String;
	}
	let { data } = $props();
	let filteredAdmins: Array<Admin> = $state([]);
	let searchTerm = $state('');
	const searchAdmins = () => {
		return (filteredAdmins = data.admins.filter((admin: Admin) => {
			let email = admin.Email.toLowerCase();
			return email.includes(searchTerm.toLowerCase());
		}));
	};
	import { enhance } from '$app/forms';
	let Email = $state('');
	let Password = $state('');

	function closeregister() {
		Email = '';
		Password = '';
	}
</script>

<div class="header"></div>
<div class="sidebar">
	<div class="sidebar-header">
		<div class="logo">
			<img src={logo} alt="logo" />
		</div>
		<div class="description">Company management</div>
		<ul class="menu-container">
			{#each menuItems as item}
				<a href={item.link}>
					<li class="menu-item">
						<i class="fa-solid {item.icon}"></i>
						<p>{item.name}</p>
					</li>
				</a>
			{/each}
		</ul>
	</div>
	<div class="sidebar-footer">V1.14</div>
</div>
<div class="container">
	<div class="page-title">
		<h2 data-testid="page-title">Admin</h2>
		<button
			class="create-btn"
			data-toggle="modal"
			data-target="#myModal"
			data-testid="create-button"><i class="fa-solid fa-square-plus"></i> Register</button
		>
	</div>
	<div class="card-generic">
		<div class="search-box">
			<input
				type="text"
				placeholder="Search by : Email"
				bind:value={searchTerm}
				oninput={searchAdmins}
				data-testid="search"
			/>
			<i class="fa-solid fa-magnifying-glass fa-xs"></i>
		</div>
		<div class="card-container" data-testid="card-cont">
			<p class="total" data-testid="total">
				Total companies: {searchTerm ? filteredAdmins.length : data.admins.length} Items
			</p>
			{#if searchTerm && filteredAdmins.length === 0}
				<center>No results found</center>
			{:else}
				{#each searchTerm ? filteredAdmins : data.admins as admin}
					{@render card(admin)}
				{/each}
			{/if}
		</div>
	</div>
</div>
{#snippet card(admin: Admin)}
	<div class="card">
		<a href="/detail/{Number(admin.ID)}/admins" class="card-name">
			<div class="name">{admin.Email}</div>
		</a>
		<a href="/detail/{admin.ID}/admins" class="card-button" data-testid="company-card-button">
			<button type="button" class="detail-button">Admin detail</button>
		</a>
	</div>
{/snippet}
<div class="modal fade" id="myModal" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onclick={closeregister}
					>&times;</button
				>
				<div class="modal-title">Create company</div>
			</div>
			<form
				method="POST"
				action="?/register"
				use:enhance={() => {
					(globalThis as any).$('#myModal').modal('hide');
					Email = '';
					Password = '';
				}}
			>
				<div class="modal-input-all row modal-body">
					<input
						class="modal-input"
						name="email"
						type="text"
						placeholder="Email"
						bind:value={Email}
					/>
					<input
						class="modal-input"
						name="password"
						type="password"
						placeholder="Password"
						bind:value={Password}
					/>
				</div>
				<div class="modal-footer">
					<button
						type="submit"
						class="crt btn btn-default"
						data-testid="modal-create"
						disabled={!(Email && Password)}
					>
						Create
					</button>
					<button
						type="button"
						class="cls btn btn-default"
						data-dismiss="modal"
						data-testid="modal-close"
						onclick={closeregister}>Close</button
					>
				</div>
			</form>
		</div>
	</div>
</div>

<style>
	.header {
		background-image: linear-gradient(to right, #112c53, #131927);
		left: 18%;
		height: 64px;
		right: 0;
		top: 0;
		position: absolute;
		display: flex;
		align-items: center;
	}
	.sidebar {
		background-image: linear-gradient(#112c53, #131927);
		width: 18%;
		top: 0;
		bottom: 0;
		left: 0;
		position: absolute;
		.sidebar-header {
			padding: 8px;
			.logo {
				width: 243px;
				height: 43px;
				padding: 8px;
				img {
					width: 142px;
					height: 28px;
				}
			}
			.description {
				font-weight: 400;
				font-size: 12px;
				line-height: 20px;
				color: #73839b;
				margin: 20px 0 10px 0;
			}
			.menu-container {
				padding: 0;
				gap: 14px;
				display: grid;
				margin: 0;
				a:hover {
					text-decoration: none;
				}
				.menu-item {
					height: 38px;
					padding: 4px 8px 4px 8px;
					border-radius: 5px;
					cursor: pointer;
					gap: 24px;
					font-weight: 400;
					line-height: 100%;
					align-items: center;
					display: flex;
					color: white;
					i {
						font-size: 17px;
					}
					p {
						font-size: 14px;
						padding-top: 10px;
					}
				}
				.menu-item:hover {
					background-color: #dfc370;
					color: #112c53;
				}
			}
		}
		.sidebar-footer {
			width: 100%;
			height: 25px;
			font-size: 12px;
			color: #ffc107;
			position: absolute;
			bottom: 26px;
			text-align: center;
		}
	}
	.container {
		background-color: #e4e7f2;
		width: 82%;
		top: 64px;
		left: 18%;
		right: 0;
		bottom: 0;
		position: absolute;
		padding: 20px;
		overflow-y: scroll;
		.page-title {
			height: fit-content;
			background-image: linear-gradient(to right, #112c53, #131927);
			padding: 12px 12px 12px 20px;
			border-radius: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			h2 {
				font-size: 18px;
				color: white;
				margin: 0;
				font-weight: 600;
				line-height: 24px;
			}
			.create-btn {
				background-color: #dfc370;
				color: #112c53;
				border: none;
				width: auto;
				height: 36px;
				display: flex;
				padding: 8px 14px 8px 14px;
				border-radius: 5px;
				gap: 8px;
				cursor: pointer;
				font-size: 12px;
				align-items: center;
				i {
					width: 10px;
					height: 10px;
				}
			}
			.create-btn:hover {
				background-color: #f2c028;
			}
		}
		.card-generic {
			margin-top: 10px;
			background-color: white;
			height: auto;
			padding: 24px;
			border-radius: 5px;
			display: grid;
			gap: 10px;
			box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
			.search-box {
				display: flex;
				flex-direction: column;
				border: 1px solid #a7afb7;
				border-radius: 5px;
				height: 38px;
				input {
					padding-left: 35px;
					border-radius: 5px;
					height: 100%;
					border: none;
					font-size: 12px;
					font-weight: 500;
					line-height: 18px;
					color: #a7afb7;
					text-overflow: ellipsis;
				}
				i {
					position: absolute;
					padding: 18px 12px;
					color: #bbc2ce;
				}
				::placeholder {
					color: #59677c;
					opacity: 0.3;
				}
			}
			.card-container {
				display: grid;
				gap: 10px;
				padding: 0 15px;
				.total {
					font-size: 12px;
					margin: 0;
				}
			}
		}
		@media screen and (max-width: 380px) {
			.page-title {
				display: block;
				.create-btn {
					margin-top: 10px;
				}
			}
		}
	}
	.card {
		height: fit-content;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		padding: 12px 12px 12px 20px;
		border-radius: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.name {
			font-size: 18px;
			font-weight: 500;
			margin: 0;
			color: #112c53;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.card-name:hover {
			.name {
				text-decoration: underline;
			}
		}
		.card-button {
			padding: 0;
			.detail-button {
				background-color: #112c53;
				color: white;
				height: 36px;
				padding: 8px 14px 8px 14px;
				border-radius: 5px;
				gap: 8px;
				font-size: 12px;
				border: none;
				font-size: 12px;
				align-self: center;
				width: auto;
				margin: 7px 0;
			}
			.detail-button:hover {
				background-color: #131927;
			}
		}
	}
	.modal-input {
		border: 1px solid #a7afb7;
		border-radius: 5px;
		height: 38px;
		margin: 5px;
		width: 98%;
	}
	.modal-input-all {
		margin: 10px;
		padding: 0;
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
