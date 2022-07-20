# abe-game

## 開発環境の構築

### ngrok で https の発行

#### ngrok が未インストール、もしくは Authtoken が未設定の場合

ngrok のインストール

```bash
$ brew install ngrok
```

[ngrok](https://dashboard.ngrok.com/signup)に Sign Up

[Authtoken を取得](https://dashboard.ngrok.com/get-started/your-authtoken)

Authtokne の設定

```bash
$ ngrok config add-authtoken {Authtoken}
```

#### ngrok がインストール済み、Authtoken が設定済みの場合

`/.ngrok2/ngrok.yml`を開き、トンネルを作成

```yml
tunnels:
  angular:
    addr: 4200
    proto: http
  strapi:
    addr: 1337
    proto: http
```

トンネルの起動

```bash
$ ngrok start angular strapi --region jp
```

### LINE 公式アカウントの作成

テスト用の Messaging API チャネルを作成する

LINE 公式アカウント機能を設定する

- グループトーク・複数人トークへの参加を許可する：無効
- 応答メッセージ：無効
- あいさつメッセージ：無効

チャネルアクセストークン（長期）を発行する

Webhook URL に ngrok で発行された Strapi の https の URL を設定する
`{URL}/api/line/webhook`

Webhook の利用を有効にする

### LIFF アプリの作成

LINE Developers の AbeGame-LIFF の[LIFF]タブから LIFF アプリを作成する

- サイズ：Full
- エンドポイント URL：ngrok で発行された Angular の https の URL を設定`{URL}/scan-qr`
- Scope：openid
- Scan QR：オン

### 環境変数の設定

Strapi の`.env.examlpe`をコピーし`.env`を作成し以下を設定

- CHANNEL_ACCESS_TOKEN：Messaging API のチャネルアクセストークン
- CHANNEL_SECRET：Messsaging API のチャネルシークレット

Angular の`/src/environments/environment.ts`に以下を設定

- LIFF_ID：LIFF アプリの LIFF ID
- API_URL：ngrok で発行した Strapi の https の URL`{URL}/api`
- API_TOKEN：以下手順で発行した API Token
  - Strapi 管理画面の Settings > API Tokens
  - 以下を設定し発行された Token をコピーする
    - Name：任意
    - Token Type：Full access
- CHANNEL_ID：Messaging API のチャネル ID

### Docker の起動

Docker をインストールしていない場合、インストール

Docker 起動
※初回起動の場合は構築に時間がかかるので注意

```bash
$ docker-compose up
```

Angular: http://localhost:4200/

Strapi: http://localhost:1337/admin/

### 動作確認

- Strapi 管理画面の Settings > USERS & PERMISSIONS PLUGIN > Roles > Public > Line > webhook をチェックし保存する
- LINE 公式アカウントを友達登録し、`lineUser`に登録されること
- LINE Developer の LIFF の LIFF URL を LINE 公式アカウントとのトークに流し、その URL にアクセス後 QR コードリーダーが起動すること
