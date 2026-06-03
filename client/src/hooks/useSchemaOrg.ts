import { useEffect } from 'react';

/**
 * Schema.org 構造化データをHTMLのheadに挿入するカスタムフック
 * @param schema - JSON-LD形式のスキーマオブジェクト
 * @param id - スクリプトタグのID（複数のスキーマを管理する場合に使用）
 */
export function useSchemaOrg(schema: Record<string, any>, id: string = 'schema-org') {
  useEffect(() => {
    if (!schema || typeof window === 'undefined') return;

    // 既存のスクリプトタグを削除
    const existingScript = document.getElementById(id);
    if (existingScript) {
      existingScript.remove();
    }

    // 新しいスクリプトタグを作成
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // クリーンアップ
    return () => {
      const script = document.getElementById(id);
      if (script) {
        script.remove();
      }
    };
  }, [schema, id]);
}
