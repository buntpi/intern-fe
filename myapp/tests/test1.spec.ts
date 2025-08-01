import { test, expect, type Page } from '@playwright/test';
let k = 0;
test.beforeAll(async ({ request }) => {
    k = Date.now() + Math.random();
    const formData = new FormData()
    formData.append('name', `test-mock-${k}`)
    formData.append('code','AA')
    formData.append('activeUsers','99')

    const header = {
        'x-sveltekit-action': 'true',
        'origin': 'http://localhost:5173'
    };

    await request.post('http://localhost:5173/?/createCompany', {
        form: formData,
        headers: header
    });
});

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

test('Company list Page successfully loads', async ({ page }) => {
    const textContent = await page.getByTestId('page-title').textContent();
    expect(textContent).toBe('Company');
});

test('Route to detail page by warn', async ({ page }) => {
    await page.getByTestId('company-warn').first().click();
    await expect(page).toHaveURL(/\/detail/);
});

test('Route to detail page by name', async ({ page }) => {
    let firstCardName = String(await page.getByTestId('company-name').first().textContent());
    await page.getByTestId('company-name').first().click();
    await expect(page).toHaveURL(/\/detail/);
    await expect(page.getByTestId('detail-page-name')).toContainText(firstCardName);
});

test('Route to detail page by detail button', async ({ page }) => {
    let firstCardName = String(await page.getByTestId('company-name').first().textContent());
    await page.getByTestId('company-card-button').first().click();
    await expect(page).toHaveURL(/\/detail/);
    await expect(page.getByTestId('detail-page-name')).toContainText(firstCardName);
});

test('Route from detail to list page', async ({ page }) => {
    await page.getByTestId('company-name').first().click();
    await page.getByTestId('list-button').click();
    await expect(page).toHaveURL('http://localhost:5173/');
});

test('Create company', async ({ page }) => {
    let n = (await page.getByTestId('company-card').all()).length;
    await page.getByTestId('create-button').click();
    await page.getByTestId('modal-name').fill(`testtest ${k}`);
    await page.getByTestId('modal-code').fill('EE');
    await page.getByTestId('modal-activeUsers').fill('1');
    await page.getByTestId('modal-create').click();
    await expect(page.getByTestId('total')).toContainText(String(n + 1));
    await expect(page.getByTestId('company-name').last()).toContainText(`testtest ${k}`)
});

test('Cant create company if not provide input', async ({ page }) => {
    await page.getByTestId('create-button').click();
    await expect(page.getByTestId('modal-create')).toBeDisabled();
});

test('Search for Exist item', async ({ page }) => {
    await search(page, `test-mock-${k}`);
    await expect(page.getByTestId('company-name')).toContainText(`test-mock-${k}`);
});

test('Search for Nonexist item', async ({ page }) => {
    await search(page, 'Nonexistent');
    await expect(page.getByTestId('total')).toContainText('0');
    await expect(page.getByTestId('card-cont')).toContainText('No results found');
});

test('Cant create company with existing name', async ({ page }) => {
    let n = (await page.getByTestId('company-card').all()).length;
    await page.getByTestId('create-button').click();
    await page.getByTestId('modal-name').fill(`test-mock-${k}`);
    await page.getByTestId('modal-code').fill('EE');
    await page.getByTestId('modal-activeUsers').fill('1');
    await page.getByTestId('modal-create').click();
    await expect(page.getByTestId('modal-NameError')).toContainText("Creation failed: duplicate company name")
    await expect(page.getByTestId('total')).toContainText(String(n));
});

async function search(page: Page, title: string) {
    const search = page.getByTestId('search');
    await search.type(title, { delay: 1 })
}
