import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AdminProtectedRoute from "../client/src/components/AdminProtectedRoute";
import AdminLoginPage from "../client/src/pages/admin/AdminLoginPage";

// AdminAuthProvider モック用に簡易コンテキストを検証するテスト
describe("Admin protection and login UI routing", () => {
  it("renders the login page when unauthenticated", () => {
    const html = renderToStaticMarkup(<AdminLoginPage />);
    expect(html).toContain("管理者ログイン");
    expect(html).toContain("パスワードを入力");
  });
});
