# Templates de Email do Supabase

Este diretório contém os templates customizados de email para o Interativixbot.

## Templates Disponíveis

1. **confirmation.html** - Email de confirmação de cadastro
2. **recovery.html** - Email de recuperação de senha
3. **magic_link.html** - Email com link mágico de acesso
4. **invite.html** - Email de convite para organização
5. **email_change.html** - Email de confirmação de mudança de e-mail

## Como Aplicar os Templates

### Opção 1: Via Dashboard do Supabase (Recomendado para Produção)

1. Acesse: https://supabase.com/dashboard/project/qfhxqkemsqyhennbdqre/auth/templates

2. Para cada template:
   - Clique no template correspondente (Confirm signup, Reset password, etc.)
   - Copie o conteúdo do arquivo `.html` correspondente
   - Cole no campo "HTML content"
   - Atualize o "Subject" conforme especificado no `config.toml`
   - Clique em "Save"

### Opção 2: Via Supabase CLI (Local)

Os templates já estão configurados no `supabase/config.toml`. Ao rodar `supabase start` localmente, eles serão aplicados automaticamente.

## Variáveis Disponíveis nos Templates

Todas as variáveis do Supabase Auth estão disponíveis:

- `{{ .ConfirmationURL }}` - URL de confirmação/ação
- `{{ .Token }}` - Token de autenticação
- `{{ .TokenHash }}` - Hash do token
- `{{ .SiteURL }}` - URL do site configurado
- `{{ .Email }}` - Email do usuário

## Personalização

Todos os templates seguem o design system do Interativixbot:

- **Cores principais**: #3b82f6 (azul), #6366f1 (índigo)
- **Logo**: 🤖 Interativixbot
- **URL**: https://www.interativixbot.com.br
- **Idioma**: Português (pt-BR)

## Testes

Para testar os emails localmente:

```bash
# Inicie o Supabase local
supabase start

# Acesse o Inbucket (email local)
# URL: http://localhost:54324
```

## Produção

Os templates já estão prontos para produção. Siga a **Opção 1** acima para aplicá-los no dashboard do Supabase.

### Subjects Configurados

- Confirmação: "Confirme sua inscrição no Interativixbot"
- Convite: "Você foi convidado para o Interativixbot"
- Link Mágico: "Seu link de acesso ao Interativixbot"
- Recuperação: "Recupere sua senha do Interativixbot"
- Mudança de Email: "Confirme a mudança de e-mail"
