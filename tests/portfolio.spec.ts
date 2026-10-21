import { test, expect } from "@playwright/test";

test("apresenta o projeto open source, a foto e os perfis reais sem erros de execução", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Bruno Alaor/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Soluções reais.",
  );
  await expect(
    page.getByAltText("Bruno Alaor, de braços cruzados"),
  ).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(1);
  for (const [name, url] of [
    ["LinkedIn de Bruno Alaor", "https://www.linkedin.com/in/brunoalaor/"],
    ["GitHub de Bruno Alaor", "https://github.com/brunoavila55"],
  ]) {
    const link = page.getByRole("link", { name, exact: true });
    await expect(link).toHaveAttribute("href", url);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await page.waitForTimeout(1500);
  expect(errors).toEqual([]);
});

test("abre os detalhes, mantém o foco no diálogo e permite fechar com Escape", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["Mimic"]) {
    const trigger = page.getByRole("button", {
      name: `Conhecer o projeto ${name}`,
      exact: true,
    });
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { level: 2, name, exact: true }),
    ).toBeVisible();
    await expect(dialog.getByRole("link")).toHaveAttribute(
      "href",
      "https://github.com/brunoavila55/mimic_backup",
    );
    await page.keyboard.press("Shift+Tab");
    expect(
      await page.evaluate(() =>
        document.querySelector("dialog")?.contains(document.activeElement),
      ),
    ).toBeTruthy();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(page.locator("body")).not.toHaveClass(/overlay-open/);
  }
});

test("não cria rolagem horizontal em telas pequenas ou grandes", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      )
      .toBeTruthy();
  }
});

test("navega aos projetos e respeita a preferência por movimento reduzido", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(await page.locator("html").getAttribute("class")).not.toContain(
    "lenis",
  );
  await page.getByRole("link", { name: "Explore os projetos" }).click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(
    page.getByRole("heading", { name: "Menos discurso. Mais construção." }),
  ).toBeInViewport();
});

test("menu móvel leva até a seção escolhida e volta a liberar a página", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "Navegação exclusiva do celular",
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page.getByRole("button", { name: "Fechar menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Navegação móvel" })
    .getByRole("link", { name: "Sobre mim" })
    .click();
  await expect(
    page.getByRole("navigation", { name: "Navegação móvel" }),
  ).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveClass(/overlay-open/);
  await expect(
    page.getByRole("heading", {
      name: "Curioso por natureza. Construtor por escolha.",
    }),
  ).toBeInViewport({ timeout: 8000 });
});

test("copia o contato e comunica o resultado", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copiar endereço de e-mail" }).click();
  await expect(page.getByRole("status")).toHaveText("Copiado!");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "contato@brunoalaor.com.br",
  );
});
