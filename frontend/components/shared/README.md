# Componentes de Formulário Compartilhados

Estes componentes unificam todos os formulários do site Jania Mesquita, permitindo alterações centralizadas de estilo e comportamento.

## Componentes Disponíveis

### FormInput
Campo de entrada de texto, email ou telefone.

```tsx
import { FormInput } from './shared';

<FormInput
  label="Nome Completo"
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
  placeholder="Seu nome"
  variant="underline" // ou "bordered"
/>
```

### FormTextarea
Campo de texto multilinhas.

```tsx
import { FormTextarea } from './shared';

<FormTextarea
  label="Mensagem"
  name="message"
  value={formData.message}
  onChange={handleChange}
  rows={4}
  placeholder="Sua mensagem"
  variant="underline" // ou "bordered"
/>
```

### FormSelect
Campo de seleção dropdown.

```tsx
import { FormSelect } from './shared';

const options = [
  { value: '50-100k', label: 'R$ 50k - 100k' },
  { value: '100-300k', label: 'R$ 100k - 300k' }
];

<FormSelect
  label="Faturamento"
  name="revenue"
  value={formData.revenue}
  onChange={handleChange}
  options={options}
  required
  placeholder="Selecione..."
  variant="underline" // ou "bordered"
/>
```

### FormButton
Botão de envio com estilo padronizado.

```tsx
import { FormButton } from './shared';

<FormButton 
  type="submit"
  variant="primary" // ou "secondary"
  fullWidth={true}
  showArrow={true}
>
  Enviar Formulário
</FormButton>
```

### FormSuccessMessage
Mensagem de sucesso após envio do formulário.

```tsx
import { FormSuccessMessage } from './shared';

<FormSuccessMessage
  title="Solicitação Recebida!"
  message="Nossa equipe entrará em contato em até 48h úteis."
  email={formData.email}
  onReset={() => setSubmitted(false)}
  resetButtonText="Enviar nova solicitação"
/>
```

## Variantes de Estilo

### underline (padrão)
- Campos com borda inferior apenas
- Fundo transparente
- Estilo minimalista
- Usado em DiagnosticoForm, PalestrasPage

### bordered
- Campos com borda completa
- Borda arredondada (7px)
- Usado em Footer, ContatoPage

## Como Alterar Estilos Globalmente

Para modificar todos os formulários do site, edite os arquivos em `/components/shared/`:

- **Cores**: Altere as cores nos arquivos individuais (ex: `text-[#385443]`)
- **Espaçamento**: Modifique padding/margin nos componentes
- **Bordas**: Ajuste border-radius nos componentes
- **Transições**: Modifique `transition-colors` e durações

## Exemplo de Uso Completo

```tsx
import { useState } from 'react';
import { FormInput, FormSelect, FormTextarea, FormButton, FormSuccessMessage } from './shared';

export function MeuFormulario() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envio
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <FormInput
            label="E-mail"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <FormTextarea
            label="Mensagem"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          
          <FormButton type="submit">
            Enviar
          </FormButton>
        </form>
      ) : (
        <FormSuccessMessage
          message="Mensagem enviada com sucesso!"
          email={formData.email}
          onReset={() => setSubmitted(false)}
        />
      )}
    </>
  );
}
```

## Próximos Passos

Para completar a unificação, atualize estes componentes:

- [ ] `/components/Footer.tsx`
- [ ] `/components/FooterRefined.tsx`
- [ ] `/pages/ContatoPage.tsx`
- [ ] `/pages/PalestrasPage.tsx`
- [ ] `/pages/BlogPage.tsx` (newsletter)
