<script>
	import logo from '/Users/pitchaya/1/myapp/src/image/logo.png';
	let { data } = $props();
	let menuItems = [
		{ name: 'Company', icon: 'fa-building' },
		{ name: 'Super admin', icon: 'fa-user' },
		{ name: 'Setting', icon: 'fa-gear' },
		{ name: 'Activity log', icon: 'fa-file-lines' }
	];
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
	{#each data.applications as application}
		<div>application</div>
		<div>name:{application.ApplicationName}</div>
	{/each}
	<a href="/" data-testid="list-button"><button>company list</button></a>
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
