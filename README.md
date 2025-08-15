# 📚 CNU Flashcards

Sistema interativo de flashcards para estudos do Concurso Nacional Unificado (CNU) com interface moderna e funcionalidades avançadas.

## ✨ Funcionalidades

- 🎴 **Flashcards 3D**: Interface interativa com animações suaves
- 📊 **Dashboard Completo**: Estatísticas de progresso e performance
- 🎯 **Múltiplas Categorias**: Organização por matérias
- 📈 **Acompanhamento de Progresso**: Taxa de acerto e sequências
- 📱 **Design Responsivo**: Otimizado para todos os dispositivos
- ♿ **Acessibilidade**: Suporte a leitores de tela e navegação por teclado

## 🚀 Deploy na Vercel

### Pré-requisitos

- Node.js 18.0.0 ou superior
- Conta na [Vercel](https://vercel.com)
- Git instalado

### Passos para Deploy

1. **Clone o repositório**
   ```bash
   git clone <seu-repositorio>
   cd cnu-flashcards
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Teste localmente**
   ```bash
   npm run dev
   ```

4. **Faça deploy na Vercel**
   
   **Opção A - Via CLI:**
   ```bash
   npm install -g vercel
   vercel
   ```

   **Opção B - Via Dashboard:**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte seu repositório
   - Configure as variáveis se necessário
   - Clique em "Deploy"

## 📁 Estrutura do Projeto

```
cnu-flashcards/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/
│   ├── data/
│   ├── types/
│   └── utils/
├── public/
│   ├── manifest.json
│   └── icons/
├── vercel.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## ⚙️ Configurações Importantes

### Arquivos Essenciais

- **`vercel.json`**: Configurações específicas do Vercel
- **`next.config.js`**: Configurações do Next.js
- **`package.json`**: Dependências e scripts
- **`tailwind.config.js`**: Configurações do Tailwind CSS
- **`tsconfig.json`**: Configurações do TypeScript

### Variáveis de Ambiente

Crie um arquivo `.env.local` se necessário:

```env
NEXT_PUBLIC_APP_NAME=CNU Flashcards
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 📊 Tecnologias Utilizadas

- **Framework**: Next.js 14
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel
- **Lint**: ESLint
- **Formatação**: Prettier (recomendado)

## 🎨 Customização

### Cores do Tema

Edite `tailwind.config.js` para personalizar as cores:

```javascript
theme: {
  extend: {
    colors: {
      primary: {...},
      secondary: {...}
    }
  }
}
```

### Adicionando Novas Categorias

1. Edite o arquivo de dados das categorias
2. Adicione as novas categorias com cards
3. Configure os ícones e cores correspondentes

### Estrutura de uma Categoria

```typescript
{
  id: 1,
  name: "Nome da Matéria",
  icon: "🎯",
  color: "from-blue-500 to-cyan-600",
  cards: [
    {
      id: 1,
      question: "Pergunta aqui?",
      answer: "Resposta detalhada aqui."
    }
  ]
}
```

## 🔧 Troubleshooting

### Problemas Comuns

**Erro de Hidratação:**
- Certifique-se de que não há `Math.random()` ou `Date.now()` no código
- Use `useState` com valores consistentes

**Erro 404 em Fonts:**
- Remova preloads de fontes inexistentes
- Use apenas Google Fonts via CSS imports

**Build Fails:**
- Verifique se todas as dependências estão instaladas
- Execute `npm run type-check` para verificar erros TypeScript

### Logs da Vercel

Para debuggar problemas:

1. Acesse o dashboard da Vercel
2. Vá na aba "Functions"
3. Verifique os logs de build e runtime

## 📈 Otimizações

### Performance

- **Image Optimization**: Configurado no `next.config.js`
- **Code Splitting**: Automático com Next.js
- **Lazy Loading**: Para componentes pesados
- **Compression**: Habilitado para todos os assets

### SEO

- Meta tags configuradas no `layout.tsx`
- Open Graph e Twitter Cards
- Structured data (schema.org)
- Sitemap automático

### Acessibilidade

- **WCAG 2.1 AA** compliance
- Skip links para navegação
- Focus management
- Screen reader support
- Keyboard navigation

## 🚀 Deploy Automático

### GitHub Actions (Opcional)

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📱 PWA (Progressive Web App)

### Configuração Básica

Adicione ao `public/manifest.json`:

```json
{
  "name": "CNU Flashcards",
  "short_name": "CNU Cards",
  "description": "Sistema de flashcards para CNU",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1e40af",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔐 Segurança

### Headers de Segurança

Configurados no `next.config.js`:

- **CSP**: Content Security Policy
- **HSTS**: HTTP Strict Transport Security
- **X-Frame-Options**: Proteção contra clickjacking
- **X-Content-Type-Options**: Prevenção de MIME sniffing

### Boas Práticas

- Sanitização de inputs
- Validação de dados
- Rate limiting (se necessário)
- HTTPS obrigatório

## 📊 Analytics (Opcional)

### Google Analytics

Adicione ao `layout.tsx`:

```typescript
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  )
}
```

### Vercel Analytics

```bash
npm install @vercel/analytics
```

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- 📧 Email: suporte@cnuflashcards.com
- 💬 Discord: [Comunidade CNU](https://discord.gg/cnu)
- 📖 Docs: [Documentação Completa](https://docs.cnuflashcards.com)

## 🎉 Agradecimentos

- Comunidade CNU
- Contribuidores do projeto
- Feedbacks dos usuários

---

**⭐ Se este projeto te ajudou, considera dar uma estrela no GitHub!**