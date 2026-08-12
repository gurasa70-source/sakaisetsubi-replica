import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AdminProtectedRoute from "../client/src/components/AdminProtectedRoute";
import { AdminAuthProvider } from "../client/src/contexts/AdminAuthContext";

describe("Admin routes authentication protection", () => {
  it("renders login page via AdminProtectedRoute when unauthenticated", () => {
    // 未認証状態でAdminProtectedRouteを通すとAdminLoginPageが表示されることを確認
    const html = renderToStaticMarkup(
      <AdminAuthProvider>
        <AdminProtectedRoute>
          <div data-testid="protected-content">Secret Admin Dashboard</div>
        </AdminProtectedRoute>
      </AdminAuthProvider>
    );

    expect(html).not.toContain("Secret Admin Dashboard");
    expect(html).toContain("管理者ログイン");
  });
});
