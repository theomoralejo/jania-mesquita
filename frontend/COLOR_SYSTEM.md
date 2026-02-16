# Sistema de Cores - Jania Mesquita Website

## 📋 Hierarquia de Cores Definitiva

### Backgrounds (Do mais escuro ao mais claro)
```css
--color-bg-darkest: #2d2520   /* Footer, seções mais escuras */
--color-bg-dark: #3d3028       /* Navigation, cards escuros */
--color-bg-medium: #4a3d32     /* Background principal do site */
--color-bg-light: #5a4a3a      /* Hover states, elementos elevados */
--color-bg-lighter: #6b5d52    /* Backgrounds mais claros */
```

### Textos (Do mais claro ao mais escuro)
```css
--color-text-h1: #faf8f5       /* Títulos H1 - máximo contraste */
--color-text-h2: #faf8f5       /* Títulos H2 de seção - máximo contraste */
--color-text-h3: #f5ede1       /* Subtítulos H3 - alto contraste */
--color-text-h4: #e8dcc8       /* Títulos H4, títulos menores */
--color-text-body: #e8dcc8     /* Texto de corpo, parágrafos */
--color-text-secondary: #c9b59a /* Informações secundárias */
--color-text-muted: #9d8a72    /* Texto menos importante, labels */
```

### Bordas (Transparências)
```css
--color-border-subtle: rgba(250, 248, 245, 0.08)
--color-border-light: rgba(250, 248, 245, 0.12)
--color-border-medium: rgba(250, 248, 245, 0.18)
--color-border-strong: rgba(250, 248, 245, 0.25)
```

### Acentos
```css
--color-accent-cream: #f5ede1  /* Botões primários, destaques */
--color-accent-gold: #d4af77   /* Elementos especiais (não usado atualmente) */
```

## 🎨 Guia de Uso por Elemento

### Tipografia
| Elemento | Cor | Uso |
|----------|-----|-----|
| H1 | `#faf8f5` | Títulos principais de hero sections |
| H2 | `#faf8f5` | Títulos de seções principais |
| H3 | `#f5ede1` | Subtítulos importantes |
| H4 | `#e8dcc8` | Títulos menores, labels destacados |
| Parágrafo (p) | `#e8dcc8` | Todo texto de corpo |
| Texto secundário | `#c9b59a` | Informações complementares |
| Texto muted | `#9d8a72` | Placeholders, copyright, info menos importante |

### Badges/Labels
```tsx
<span className="text-label">TEXTO EM MAIÚSCULAS</span>
```
- Cor: `#faf8f5`
- Font-size: `0.625rem` (10px)
- Letter-spacing: `0.2em`
- Text-transform: `uppercase`
- Font-weight: `300`

### Botões
**Primário:**
```tsx
className="bg-[#f5ede1] text-[#2d2520]"
```

**Secundário:**
```tsx
className="border-[rgba(250,248,245,0.25)] text-[#faf8f5]"
```

### Cards
**Background:**
```tsx
className="bg-[#5a4a3a]/30 border border-[rgba(250,248,245,0.12)]"
```

**Hover:**
```tsx
hover:bg-[#5a4a3a]/40 hover:border-[rgba(250,248,245,0.18)]
```

### Formulários
**Inputs:**
```tsx
className="bg-[#5a4a3a]/40 border border-[rgba(250,248,245,0.18)] text-[#faf8f5]"
```

**Placeholders:**
```tsx
placeholder:text-[#9d8a72]
```

**Labels:**
```tsx
className="text-sm font-light" style={{ color: '#e8dcc8' }}
```

## ✅ Checklist de Consistência

### Para cada seção, verificar:
- [ ] H1/H2 usam `#faf8f5`
- [ ] H3 usa `#f5ede1`
- [ ] H4 e labels destacados usam `#e8dcc8`
- [ ] Parágrafos usam `#e8dcc8`
- [ ] Texto secundário usa `#c9b59a`
- [ ] Texto muted usa `#9d8a72`
- [ ] Badges usam classe `text-label`
- [ ] Bordas usam `rgba(250,248,245,0.X)`
- [ ] Backgrounds seguem a escala de `#2d2520` a `#6b5d52`

## 🔍 Exemplos de Uso Correto

### Hero Section
```tsx
<h1>Título Principal</h1> {/* Automático: #faf8f5 */}
<p className="text-xl">Subtítulo</p> {/* Automático: #e8dcc8 */}
```

### Card com Hierarquia
```tsx
<div className="bg-[#5a4a3a]/30 border border-[rgba(250,248,245,0.12)]">
  <h3>Título do Card</h3> {/* Automático: #f5ede1 */}
  <p>Descrição do card</p> {/* Automático: #e8dcc8 */}
  <span className="text-sm" style={{ color: '#c9b59a' }}>Info secundária</span>
</div>
```

### Pricing Card (Destacado)
```tsx
<div className="bg-[#f5ede1] text-[#2d2520]">
  <h3 className="text-[#2d2520]">Premium</h3>
  <p className="text-[#2d2520]/80">Descrição</p>
  <span className="text-[#2d2520]/60">Info muted</span>
</div>
```

## 🚫 Erros Comuns a Evitar

❌ **NÃO usar cores hard-coded aleatórias:**
```tsx
<h2 className="text-white">  {/* ERRADO */}
<h2 className="text-gray-300">  {/* ERRADO */}
```

✅ **USAR as cores do sistema ou deixar automático:**
```tsx
<h2>Título</h2>  {/* CORRETO - usa var(--color-text-h2) */}
```

❌ **NÃO misturar opacidades inconsistentes:**
```tsx
border-white/10  {/* EVITAR */}
border-white/23  {/* EVITAR */}
```

✅ **USAR as variáveis de borda definidas:**
```tsx
border-[rgba(250,248,245,0.12)]  {/* CORRETO */}
border-[rgba(250,248,245,0.18)]  {/* CORRETO */}
```

## 📱 Responsividade

As cores permanecem as mesmas em todos os breakpoints. A hierarquia visual é mantida através de:
- Font-sizes responsivos
- Espaçamentos ajustados
- Mesmas cores em todos os dispositivos

## 🎯 Contraste WCAG

Todas as combinações principais passam em WCAG AA:
- `#faf8f5` em `#4a3d32` - ✅ AAA
- `#f5ede1` em `#4a3d32` - ✅ AAA
- `#e8dcc8` em `#4a3d32` - ✅ AA
- `#c9b59a` em `#2d2520` - ✅ AA

---

**Última atualização:** Dezembro 2025
**Autor:** Sistema de Design Jania Mesquita
