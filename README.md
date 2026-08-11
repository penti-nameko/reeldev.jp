# Portfolio

個人ポートフォリオサイト — React + TypeScript + k8s + ArgoCD

## 構成

```
portfolio/
├── frontend/          # React + TypeScript (Vite)
├── bff/               # Node.js + Express (BFF / Qiita APIキャッシュ)
├── k8s/
│   ├── base/          # Deployment, Service, Ingress, ConfigMap, Secret
│   └── overlays/
│       └── production/ # 本番レプリカ数・イメージタグ上書き
├── argocd/
│   └── application.yaml
└── .github/workflows/ci.yaml
```

## ローカル開発

```bash
# BFF
cd bff && npm install && npm run dev   # :3001

# Frontend (別ターミナル)
cd frontend && npm install && npm run dev   # :5173
# vite.config.ts で /api → :3001 にプロキシ
```

## 環境変数

| 変数 | 場所 | 説明 |
|---|---|---|
| `QIITA_USER` | ConfigMap | Qiita ユーザー名 |
| `QIITA_TOKEN` | Secret | Qiita API トークン（任意・レート制限緩和） |
| `CORS_ORIGIN` | ConfigMap | 許可するオリジン (例: `https://yourname.dev`) |

## デプロイ（初回）

```bash
# 1. namespace 作成
kubectl create namespace portfolio

# 2. Secret を作成（Git にコミットしないこと）
kubectl -n portfolio create secret generic portfolio-secrets \
  --from-literal=QIITA_TOKEN=your_token_here

# 3. ArgoCD Application を登録
kubectl apply -f argocd/application.yaml

# 4. ArgoCD が k8s/overlays/production を自動適用
# 以降は main ブランチへの push で自動デプロイ
```

## カスタマイズ箇所

| ファイル | 変更内容 |
|---|---|
| `frontend/src/pages/Home.tsx` | ヒーローコピー、技術スタック |
| `frontend/src/pages/Career.tsx` | スキルリスト (SKILLS 配列) |
| `bff/src/routes/careers.ts` | 職歴データ |
| `bff/src/routes/notices.ts` | お知らせデータ |
| `k8s/base/configmap.yaml` | `QIITA_USER`, `CORS_ORIGIN` |
| `k8s/base/ingress.yaml` | ドメイン名 |
| `argocd/application.yaml` | リポジトリURL |

## アーキテクチャ

```
Browser
  │
  │ HTTPS
  ▼
ingress-nginx
  ├─ /api/* ──→ portfolio-bff (Node.js)
  │                  └─ Qiita API (TTL 15分キャッシュ)
  │                  └─ /api/careers  (静的)
  │                  └─ /api/notices  (静的)
  │
  └─ /*    ──→ portfolio-frontend (nginx + React SPA)

ArgoCD が Git リポジトリを監視 → 自動 sync
GitHub Actions が push 時に Docker イメージをビルド & ghcr.io へ push
CI が kustomization.yaml のイメージタグを更新 → ArgoCD が検知 → 自動デプロイ
```
