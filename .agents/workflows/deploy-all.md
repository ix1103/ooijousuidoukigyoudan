---
description: 修正内容を全ての主要ブランチ（master, main, review/client-check, feature/site-restructure）に同期してデプロイを実行します。
---

このワークフローを実行すると、現在の変更をコミットし、Vercel等のデプロイ対象となっている全てのブランチに強制的に反映させます。

1. 変更内容をステージングに追加します。
   `git add .`

2. 指定されたメッセージでコミットを作成します（メッセージは適宜変更してください）。
   `git commit -m "feat: [変更内容の要約]"`

3. 現在のブランチ名を変数に格納し、全てのブランチに一括で強制 push してデプロイをトリガーします。
   （PowerShell / Bash 両対応の形式）
// turbo
4. `$current = $(git branch --show-current); git push origin ${current}:master --force; git push origin ${current}:main --force; git push origin ${current}:review/client-check --force; git push origin ${current}:feature/site-restructure --force`

5. 完了後、ビルドが開始されたか確認してください。
