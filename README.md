# abe-game

## 開発環境の構築

### LINE 公式アカウントの作成

テスト用の Messaging API チャネルを作成する

LINE 公式アカウント機能を設定する

- グループトーク・複数人トークへの参加を許可する：無効
- 応答メッセージ：無効
- あいさつメッセージ：無効

チャネルアクセストークン（長期）を発行する

.env にチャネルアクセストークンとチャネルシークレットを設定する

### Docker の起動

Docker をインストールしていない場合、インストール

Docker 起動
※初回起動の場合は構築に時間がかかるので注意

```bash
$ docker-compose up
```

Angular: http://localhost:4200/

Strapi: http://localhost:1337/admin/

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

### Messaging API の Webhook 設定

Webhook URL に ngrok で発行された Strapi の https の URL を設定する
`{URL}/api/line/webhook`

Webhook の利用を有効にする

LINE 公式アカウントを友達登録し、`lineUser`に登録されること
