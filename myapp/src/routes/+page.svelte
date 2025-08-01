<script lang="ts">
	import logo from '../image/logo.png';
	let menuItems = [
		{ name: 'Company', icon: 'fa-building' },
		{ name: 'Super admin', icon: 'fa-user' },
		{ name: 'Setting', icon: 'fa-gear' },
		{ name: 'Activity log', icon: 'fa-file-lines' }
	];
	interface License {
		Type: String;
		CompanyName: String;
		ExpiredAt: Date;
		ContractStartAt: Date;
		MaxUsers: Number;
		Features: Array<String>;
	}
	interface Company {
		Name: String;
		Code: String;
		ActiveUsers: Number;
		licenses: License[];
		ID: String;
	}
	let { data } = $props();
	let filteredCompanies: Array<Company> = $state([]);
	let searchTerm = $state('');
	const searchCompanies = () => {
		return (filteredCompanies = data.companies.filter((company: Company) => {
			let name = company.Name.toLowerCase();
			return name.includes(searchTerm.toLowerCase());
		}));
	};
	import { enhance } from '$app/forms';
	let Name = $state('');
	let Code = $state('');
	let ActiveUsers = $state('');
	let Type = $state('');
	let CompanyName = $state('');
	let ExpiredAt = $state(new Date(''));
	let ContractStartAt = $state(new Date(''));
	let MaxUsers = $state('');
	let Features = $state(['']);
	
	let licenses: License;
	let hasLicense = $state(false);
	function closecreateCompany() {
		Name = '';
		Code = '';
		ActiveUsers = '';
		Type = '';
		CompanyName = '';
		ExpiredAt = new Date('');
		ContractStartAt = new Date('');
		MaxUsers = '';
		Features = [''];
		hasLicense = false;
	}
</script>

<div class="header">
	<form method="POST" action="?/logout">
		<button type="submit" class="logout-btn">Logout</button>
	</form>
</div>
<div class="sidebar">
	<div class="sidebar-header">
		<div class="logo">
			<img src={logo} alt="logo" />
		</div>
		<div class="description">Company management</div>
		<ul class="menu-container">
			{#each menuItems as item}
				<li class="menu-item">
					<i class="fa-solid {item.icon}"></i>
					<p>{item.name}</p>
				</li>
			{/each}
		</ul>
	</div>
	<div class="sidebar-footer">V1.14</div>
</div>
<div class="container">
	<div class="page-title">
		<h2 data-testid="page-title">Company</h2>
		<button
			class="create-btn"
			data-toggle="modal"
			data-target="#myModal"
			data-testid="create-button"><i class="fa-solid fa-square-plus"></i> Create company</button
		>
	</div>
	<div class="card-generic">
		<div class="info-box">
			<i class="fa-solid fa-circle-info"></i>
			<p class="info-text">
				The Company is the major responsibility of the super admin. This topic focus on creating the
				company and preparing the prerequisites for the features, such as upload licenses, creating
				the default company admin, and assigning the product support.
			</p>
		</div>
		<div class="search-box">
			<input
				type="text"
				placeholder="Search by : Company name"
				bind:value={searchTerm}
				oninput={searchCompanies}
				data-testid="search"
			/>
			<i class="fa-solid fa-magnifying-glass fa-xs"></i>
		</div>
		<div class="card-container" data-testid="card-cont">
			<p class="total" data-testid="total">
				Total companies: {searchTerm ? filteredCompanies.length : data.companies.length} Items
			</p>
			{#if searchTerm && filteredCompanies.length === 0}
				<center>No results found</center>
			{:else}
				{#each searchTerm ? filteredCompanies : data.companies as company}
					{@render card(company)}
				{/each}
			{/if}
		</div>
	</div>
</div>
{#snippet card(company: Company)}
	<div class="row card" data-testid="company-card">
		<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 card-name">
			<a href="/detail/{Number(company.ID)}"
				><div class="name" data-testid="company-name">{company.Name}</div></a
			>
			<div class="card-detail">
				Enable feature :
				{#if company.licenses}
					<span class="feature">
						{company.licenses[0].Features}
					</span>
				{:else}
					-
				{/if}
			</div>
		</div>
		{#if company.licenses}
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 card-license">
				<div class="card-topic">License Type:</div>
				<div class="card-detail">{company.licenses[0].Type}</div>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-2 card-license">
				<div class="card-topic">License expiry date:</div>
				<div class="card-detail">
					{new Date(company.licenses[0]!.ExpiredAt).toLocaleDateString('en-GB', {
						day: '2-digit',
						month: 'short',
						year: 'numeric'
					})}
				</div>
			</div>
			<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 card-license">
				<div class="card-topic">Total Active User</div>
				<div class="card-detail">{company.ActiveUsers}</div>
			</div>
		{:else}
			<a href="/detail/{company.ID}">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-7 warn" data-testid="company-warn">
					<i class="fa-solid fa-triangle-exclamation"></i>
					<span class="warn-text">
						Company has no license file, please
						<span class="underline">check for license updates at company detail.</span>
					</span>
				</div>
			</a>
		{/if}
		<a href="/detail/{company.ID}">
			<div
				class="col-xs-12 col-sm-12 col-md-12 col-lg-2 card-button"
				data-testid="company-card-button"
			>
				<button type="button" class="detail-button">Company detail</button>
			</div>
		</a>
	</div>
{/snippet}
<div class="modal fade" id="myModal" role="dialog">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onclick={closecreateCompany}
					>&times;</button
				>
				<div class="modal-title">Create company</div>
			</div>
			<form
				method="POST"
				action="?/createCompany"
				use:enhance={() => {
					(globalThis as any).$('#myModal').modal('hide');
					Name = '';
					Code = '';
					ActiveUsers = '';
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
					<input
						class="modal-input"
						data-testid="modal-name"
						name="name"
						type="text"
						placeholder="Name"
						bind:value={Name}
					/>
					<input
						class="modal-input"
						data-testid="modal-code"
						name="code"
						type="text"
						placeholder="Code"
						bind:value={Code}
					/>
					<input
						class="modal-input"
						data-testid="modal-activeUsers"
						name="activeUsers"
						type="number"
						min="0"
						placeholder="ActiveUsers"
						bind:value={ActiveUsers}
					/>
					<input type="checkbox" bind:checked={hasLicense} name="hasLicense" />
					license detail
					{#if hasLicense}
						<div>
							<input
								class="modal-input"
								name="type"
								type="text"
								placeholder="Type"
								bind:value={Type}
							/>
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
					{/if}
				</div>
				<div class="modal-footer">
					<button
						type="submit"
						class="crt btn btn-default"
						data-testid="modal-create"
						disabled={!(Name && Code && ActiveUsers)}
					>
						Create
					</button>
					<button
						type="button"
						class="cls btn btn-default"
						data-dismiss="modal"
						data-testid="modal-close"
						onclick={closecreateCompany}>Close</button
					>
				</div>
			</form>
		</div>
	</div>
</div>

<!-- <div class="modal fade" id="errorModal" role="dialog" data-testid="modal-NameError">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal">&times;</button>
				<div class="modal-title">Creation failed: duplicate company name</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal" data-testid="modal-close">Close</button>
			</div>
		</div>
	</div>
</div> -->

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
		.logout-btn {
			background-color: #dfc370;
			color: #112c53;
			border: none;
			width: auto;
			height: 36px;
			display: flex;
			padding: 8px 14px 8px 14px;
			border-radius: 5px;
			cursor: pointer;
			font-size: 12px;
			align-items: center;
			position: absolute;
			right: 15px;
			top: 15px;
		}
		.logout-btn:hover {
			background-color: #f2c028;
		}
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
			.info-box {
				height: fit-content;
				display: flex;
				align-items: center;
				gap: 8px;
				color: #112c53;
				i {
					width: 16px;
					height: 16px;
					align-self: start;
				}
				.info-text {
					font-weight: 500;
					font-size: 12px;
					line-height: 18px;
					margin: 0;
				}
			}
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
		height: auto;
		padding: 18px;
		border-radius: 5px;
		gap: 10px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		font-size: 12px;
		.card-name {
			height: 50px;
			padding: 0 0 0 10px;
			.name {
				font-size: 18px;
				font-weight: 500;
				line-height: 24px;
				color: #112c53;
				white-space: nowrap;
				/* max-width:  20rem; */
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.card-detail {
				color: #59677c;
				.feature {
					color: #112c53;
				}
			}
		}
		.card-name:hover {
			.name {
				text-decoration: underline;
			}
		}
		.card-license {
			height: 50px;
			padding: 10px;
			.card-topic {
				font-weight: 400;
				font-size: 12px;
				line-height: 14px;
				margin: 0;
				color: #212529;
			}
		}
		.card-detail {
			font-weight: 400;
			font-size: 12px;
			line-height: 14px;
			margin: 0;
			color: #59677c;
		}
		.warn {
			padding: 10px;
			min-height: 50px;
			color: #112c53;
			font-weight: 500;
			font-size: 12px;
			line-height: 18px;
			margin: 0;
			gap: 8px;
			display: flex;
			align-self: center;
			.warn-text {
				color: #112c53;
			}
			span {
				color: #f2c028;
			}
			i {
				color: #f2c028;
				font-size: 18px;
			}
		}
		.warn:hover .underline {
			text-decoration: underline;
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
				white-space: nowrap;
				align-self: center;
				width: 100%;
				margin: 7px 0;
			}
			.detail-button:hover {
				background-color: #131927;
			}
		}
	}
	.create-company {
		display: flex;
		flex-direction: column;
		border: 1px solid #a7afb7;
		border-radius: 5px;
		height: 38px;
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
	@media screen and (max-width: 650px) {
		.sidebar .sidebar-header {
			.description {
				display: none;
			}
			.menu-container .menu-item p {
				display: none;
			}
		}
		.card .card-name .name {
			max-width: 70%;
		}
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
