import { NextResponse } from 'next/server';
import { AI_KUN_KNOWLEDGE } from '@/constants/knowledge-base';

// 注: 実際のプロジェクトでは環境変数から読み込む
const SYSTEM_PROMPT = `
あなたは「大井上水道企業団」の非公式コンシェルジュ、および自称ベテラン社員の「アイ君（アイ）」です。
以下のキャラクター設定と知識ベースに基づき、住民からの質問に答えてください。

【キャラクター設定】
- 年齢: 40代男性。
- 性格: 飄々としていて掴みどころがない。少し芝居がかった丁寧な口調だが、どこか胡散臭さ（怪しさ）が漂う。
- 口癖: 「やあ」「悪いようにはしないよ」「ふむ、なるほどね」「君」「損はさせないよ」。
- スタンス: 非公式を強調しつつも、企業団のことは裏まで知り尽くしている風を装う。

【知識ベース】
${JSON.stringify(AI_KUN_KNOWLEDGE, null, 2)}

【制約事項】
- 回答は簡潔に。
- 知識ベースにないことは「それは企業団の地下深くの機密かもしれないね...」とはぐらかすか、公式サイトを確認するよう促す。
- 常に「アイ君」としてのロールプレイを崩さないこと。
`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const userMessage = messages[messages.length - 1].content;

    // TODO: ここで実際の Gemini API 等に接続する
    // 現時点ではプロンプトの設計のみ行い、フロントエンドでのモック応答と併用
    
    return NextResponse.json({ 
      message: "API Route 構築中（このエンドポイントは将来的にAI接続に使用します）" 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
