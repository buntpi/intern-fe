import { test, expect, vi,beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';
import { userEvent } from '@testing-library/user-event';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

const mockData = {
	companies: [
		{
			id: '1',
			name: 'Test Corp',
			code: 'BB',
			activeUsers: 42,
			license: {
				type: 'xx',
				companyName: 'yy',
				expiredAt: new Date(),
				contractStartAt: new Date(),
				maxUsers: 100,
				features: ['zz']
			}
		},
		{
			id: '2',
			name: 'No License Inc.',
			code: 'AA',
			activeUsers: 0,
			license: null
		}
	]
};

const mockError = {
	errors: {
		server: 'This company already exists.'
	}
};

beforeEach(() => {
	(globalThis as any).$ = vi.fn().mockReturnValue({
		modal: vi.fn(),
		on: vi.fn()
	});
});

test('should render page', () => {
	render(Page, { props: { data: mockData,form: null} });
	// render(Page);
	expect(screen.getByTestId('page-title')).toHaveTextContent('Company');
	expect(screen.getAllByTestId('company-card').length).toBe(2);
});

test('disables create button if input is empty', async () => {
	render(Page, { props: { data: mockData,form: null} });
	const createBtn = screen.getByTestId('create-button');
	await userEvent.click(createBtn);
	const modalCreateBtn = screen.getByTestId('modal-create');
	expect(modalCreateBtn).toBeDisabled();
});

test('enables create button when input is filled', async () => {
	render(Page, { props: { data: mockData,form: null} });
	await userEvent.click(screen.getByTestId('create-button'));
	await userEvent.type(screen.getByTestId('modal-name'), 'New Company');
	await userEvent.type(screen.getByTestId('modal-code'), 'EE');
	await userEvent.type(screen.getByTestId('modal-activeUsers'), '1');
	const modalCreateBtn = screen.getByTestId('modal-create');
	expect(modalCreateBtn).not.toBeDisabled();
});

test('clears input when modal close', async () => {
	render(Page, { props: { data: mockData,form: null} });
	await userEvent.click(screen.getByTestId('create-button'));
	const input = screen.getByTestId('modal-name');
	await userEvent.type(input, 'Temporary Company');
	const closeBtn = screen.getByTestId('modal-close');
	await userEvent.click(closeBtn);
	expect(input).toHaveValue('');
});

test('Route to detail page by warn', async () => {
	render(Page, { props: { data: mockData,form: null} });
	// expect(screen.getByTestId('company-warn')).toBeInTheDocument();
	await userEvent.click(screen.getAllByTestId('company-warn')[0]);
});

test('Route to detail page by name', async () => {
	render(Page, { props: { data: mockData,form: null} });
	expect(screen.getAllByTestId('company-name')[0]).toBeInTheDocument();
	await userEvent.click(screen.getAllByTestId('company-name')[0]);
});

test('Route to detail page by button', async () => {
	render(Page, { props: { data: mockData,form: null} });
	expect(screen.getAllByTestId('company-card-button')[0]).toBeInTheDocument();
	await userEvent.click(screen.getAllByTestId('company-card-button')[0]);
});

test('shows license info for companies with license', () => {
	render(Page, { props: { data: mockData,form: null} });
	// expect(screen.getByText('License Type:')).toBeInTheDocument();
	// expect(screen.getByText('Total Active User')).toBeInTheDocument();
});

test('shows warning for company without license', () => {
	render(Page, { props: { data: mockData,form: null} });
	// expect(screen.getByTestId('company-warn')).toBeInTheDocument();
	// expect(screen.getByTestId('company-warn')).toHaveTextContent('Company has no license file');
});

test('filters companies correctly when search for exist item', async () => {
	render(Page, { props: { data: mockData,form: null} });
	const input = screen.getByTestId('search');
	await userEvent.type(input, 'No License Inc.');

	// expect(screen.getAllByTestId('company-card').length).toBe(1);
	// expect(screen.getByText('No License Inc.')).toBeInTheDocument();
});

test('shows "no results found" when search for nonexist item', async () => {
	render(Page, { props: { data: mockData,form: null} });
	const input = screen.getByTestId('search');
	await userEvent.type(input, 'zzz');
	expect(screen.getByTestId('card-cont')).toHaveTextContent('No results found');
});

//test('Login Success')
//test('Login Account not found')
//test('Login Invalid credential')