---
description: 修正内容を全ての主要ブランチ（master, main, review/client-check, feature/site-restructure）に同期してデプロイを実行します。
---

このワークフローを実行すると、現在の変更をコミットし、Vercel等のデプロイ対象となっている全てのブランチに強制的に反映させます。

1. 変更内容をステージングに追加します。
   `git add .`

2. 指定されたメッセージでコミットを作成します（メッセージは適宜変更してください）。
   `git commit -m "feat: [変更内容の要約]"`

3. 全てのブランチに一括で強制 push し、デプロイをトリガーします。
// turbo
4. `git push origin master:master --force; git push origin master:main --force; git push origin master:review/client-check --force; git push origin master:feature/site-restructure --force`

5. 完了後、ビルドが開始されたか確認してください。
