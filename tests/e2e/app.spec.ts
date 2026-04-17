import { expect, test } from "@playwright/test";

test.describe("Campus Impact Hub MY", () => {
  test("supports demo student save flow and locale switching", async ({ page }) => {
    await page.goto("/en");
    await expect(
      page.getByRole("heading", {
        name: /A sharper way for university students/i,
      }),
    ).toBeVisible();

    await page.goto("/sign-in?redirectTo=%2Fen%2Fsaved");
    await page.getByRole("button", { name: /Enter student mode/i }).click();
    await expect(page).toHaveURL(/\/en\/saved$/);

    await page.goto("/en/opportunities");
    await page.getByRole("button", { name: /^Save$/ }).first().click();
    await page.goto("/en/saved");
    await expect(page.getByRole("heading", { name: /Saved opportunities/i })).toBeVisible();
    await expect(page.getByText(/Khazanah Spark Scholarship 2026|MDEC AI Product Internship/i)).toBeVisible();

    await page.getByRole("button", { name: "Bahasa Melayu" }).click();
    await expect(page).toHaveURL(/\/ms\/saved$/);
  });

  test("supports demo admin opportunity creation", async ({ page }) => {
    const slug = `playwright-demo-${Date.now()}`;

    await page.goto(`/sign-in?redirectTo=${encodeURIComponent("/en/admin/opportunities")}`);
    await page.getByRole("button", { name: /Enter admin mode/i }).click();
    await expect(page).toHaveURL(/\/en\/admin\/opportunities/);

    await page.getByLabel("Slug").fill(slug);
    await page.getByLabel("Title (EN)").fill("Playwright Demo Opportunity");
    await page.getByLabel("Title (MS)").fill("Peluang Demo Playwright");
    await page
      .getByLabel("Summary (EN)")
      .fill("Testing the admin create flow through the browser.");
    await page
      .getByLabel("Summary (MS)")
      .fill("Menguji aliran cipta admin melalui pelayar.");
    await page
      .getByLabel("Description (EN)")
      .fill("This opportunity is created during an automated end-to-end test.");
    await page
      .getByLabel("Description (MS)")
      .fill("Peluang ini dicipta semasa ujian hujung ke hujung automatik.");
    await page.getByLabel("Eligibility (EN), one per line").fill("Open to all students");
    await page
      .getByLabel("Eligibility (MS), one per line")
      .fill("Terbuka kepada semua pelajar");
    await page.getByLabel("Location").fill("Remote");
    await page.getByLabel("Deadline").fill("2026-12-01T10:00");
    await page
      .getByLabel("External URL")
      .fill("https://example.com/playwright-demo-opportunity");

    await page.getByRole("button", { name: /Save opportunity/i }).click();
    await expect(page).toHaveURL(new RegExp(`edit=${slug}`));
    await expect(page.getByText("Playwright Demo Opportunity")).toBeVisible();
  });
});
