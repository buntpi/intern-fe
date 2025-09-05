<script lang="ts">
	import logo from '../../../../image/logo.png';
	let { data } = $props();
	let menuItems = [
		{ name: 'Company', icon: 'fa-building', link: '/' },
		{ name: 'Super admin', icon: 'fa-user', link: '/superadmin' },
		{ name: 'Setting', icon: 'fa-gear', link: '/' },
		{ name: 'Activity log', icon: 'fa-file-lines', link: '/' }
	];
	interface License {
		Type: String;
		CompanyName: String;
		ExpiredAt: Date;
		ContractStartAt: Date;
		MaxUsers: Number;
		Features: Array<String>;
	}
	import { enhance } from '$app/forms';
	let Type = $state('');
	let CompanyName = $state('');
	let ExpiredAt = $state(new Date(''));
	let ContractStartAt = $state(new Date(''));
	let MaxUsers = $state('');
	let Features = $state(['']);
	let licenses: License;
	function closecreateLicense() {
		Type = '';
		CompanyName = '';
		ExpiredAt = new Date('');
		ContractStartAt = new Date('');
		MaxUsers = '';
		Features = [''];
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
	<button class="create-btn" data-toggle="modal" data-target="#myModal" data-testid="create-button"
		><i class="fa-solid fa-square-plus"></i> Create license</button
	>
	<a href="/" data-testid="list-button"><button>company list</button></a>
	{#each data.licenses as license}
		<div>license</div>
		<ul>
			<li>type:{license.Type}</li>
			<li>companyName:{license.CompanyName}</li>
			<li>expiredAt:{license.ExpiredAt}</li>
			<li>contractStartAt:{license.ContractStartAt}</li>
			<li>maxUsers:{license.MaxUsers}</li>
			<li>features:{license.Features}</li>
		</ul>
	{/each}
</div>
<div class="modal fade" id="myModal" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onclick={closecreateLicense}
					>&times;</button
				>
				<div class="modal-title">Create company</div>
			</div>
			<form
				method="POST"
				action="?/createLicense"
				use:enhance={() => {
					(globalThis as any).$('#myModal').modal('hide');
					licenses = {
						Type: '',
						CompanyName: '',
						ExpiredAt: new Date(),
						ContractStartAt: new Date(),
						MaxUsers: 0,
						Features: ['']
					};
				}}
			>
				<div class="modal-input-all row modal-body">
					<input class="modal-input" name="type" type="text" placeholder="Type" bind:value={Type} />
					<input
						class="modal-input"
						name="companyName"
						type="text"
						placeholder="CompanyName"
						bind:value={CompanyName}
					/>
					<input
						class="modal-input"
						name="expiredAt"
						type="date"
						placeholder="ExpiredAt"
						bind:value={ExpiredAt}
					/>
					<input
						class="modal-input"
						name="contractStartAt"
						type="date"
						placeholder="ContractStartAt"
						bind:value={ContractStartAt}
					/>
					<input
						class="modal-input"
						name="maxUsers"
						type="number"
						min="0"
						placeholder="MaxUsers"
						bind:value={MaxUsers}
					/>
					<input
						class="modal-input"
						name="features"
						type="text"
						placeholder="Features"
						bind:value={Features}
					/>
				</div>

				<div class="modal-footer">
					<button
						type="submit"
						class="crt btn btn-default"
						data-testid="modal-create"
						disabled={!(CompanyName && ExpiredAt && ContractStartAt && MaxUsers && Features)}
					>
						Create
					</button>
					<button
						type="button"
						class="cls btn btn-default"
						data-dismiss="modal"
						data-testid="modal-close"
						onclick={closecreateLicense}>Close</button
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
