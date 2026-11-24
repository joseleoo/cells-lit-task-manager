import { test, expect } from '@playwright/test';

const API_URL = 'https://localhost:5001/api/tasks';

async function resetTasks(request) {
  const response = await request.get(API_URL);
  const tasks = await response.json();

  for (const task of tasks) {
    await request.delete(`${API_URL}/${task.id}`);
  }
}

async function seedTask(request, title = 'Playwright seeded task') {
  const response = await request.post(API_URL, { data: { title } });
  expect(response.ok()).toBeTruthy();
  return response.json();
}

test.beforeEach(async ({ request }) => {
  await resetTasks(request);
});

test('loads tasks from the API', async ({ page, request }) => {
  await seedTask(request);
  await page.goto('/');

  await expect(page.locator('task-item')).toHaveCount(1);
  await expect(page.getByText('Playwright seeded task')).toBeVisible();
});

test('creates a task', async ({ page, request }) => {
  await seedTask(request);
  await page.goto('/');

  await page.getByLabel('New task title').fill('E2E created task');
  await page.getByRole('button', { name: 'Add task' }).click();

  await expect(page.getByText('E2E created task')).toBeVisible();

  const response = await request.get(API_URL);
  const tasks = await response.json();
  expect(tasks.some((task) => task.title === 'E2E created task')).toBeTruthy();
});

test('edits a task title', async ({ page, request }) => {
  await seedTask(request);
  await page.goto('/');

  const item = page.locator('task-item');
  await item.getByRole('button', { name: 'Edit' }).click();
  await page.getByLabel('Edit task title').fill('Updated by Playwright');
  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Updated by Playwright')).toBeVisible();

  const response = await request.get(API_URL);
  const tasks = await response.json();
  expect(tasks[0].title).toBe('Updated by Playwright');
});

test('marks a task completed through the API', async ({ request }) => {
  const task = await seedTask(request);
  const response = await request.patch(`${API_URL}/${task.id}/complete`);

  expect(response.ok()).toBeTruthy();
  expect((await response.json()).isCompleted).toBeTruthy();
});

test('marks a task completed and updates the UI', async ({ page, request }) => {
  await seedTask(request);
  await page.goto('/');

  const item = page.locator('task-item');
  await item.getByRole('button', { name: 'Mark complete' }).click();

  await expect(item.getByText('Completed')).toBeVisible();
});

test('marks a task uncompleted and updates the UI', async ({ page, request }) => {
  const task = await seedTask(request);
  await request.patch(`${API_URL}/${task.id}/complete`);
  await page.goto('/');

  const item = page.locator('task-item');
  await expect(item.getByText('Completed')).toBeVisible();

  await item.getByRole('button', { name: 'Mark uncomplete' }).click();

  await expect(item.getByText('Open')).toBeVisible();

  const response = await request.get(`${API_URL}/${task.id}`);
  expect((await response.json()).isCompleted).toBeFalsy();
});

test('deletes a task', async ({ page, request }) => {
  const task = await seedTask(request);
  await page.goto('/');

  await page.locator('task-item').getByRole('button', { name: 'Delete' }).click();

  await expect(page.locator('task-item')).toHaveCount(0);

  const response = await request.get(`${API_URL}/${task.id}`);
  expect(response.status()).toBe(404);
});
