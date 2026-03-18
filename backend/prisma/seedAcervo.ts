import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- SEEDING ACERVO CLASSES ---');

  const categories = [
    { label: 'Liderança', slug: 'lideranca' },
    { label: 'Gestão Médica', slug: 'gestao' },
    { label: 'Processos', slug: 'processos' },
  ];

  for (const cat of categories) {
    const exists = await prisma.acervoCategory.findUnique({ where: { slug: cat.slug } });
    if (!exists) {
      await prisma.acervoCategory.create({ data: cat });
      console.log(`Created Category: ${cat.label}`);
    } else {
      console.log(`Category ${cat.label} already exists.`);
    }
  }

  const formats = [
    { label: 'E-Book', slug: 'ebook', icon: 'Smartphone' },
    { label: 'Kindle', slug: 'kindle', icon: 'Book' },
    { label: 'Livro Físico', slug: 'fisico', icon: 'BookOpen' },
    { label: 'Produto Digital', slug: 'produto', icon: 'ShoppingBag' },
  ];

  for (const fmt of formats) {
    const exists = await prisma.acervoFormat.findUnique({ where: { slug: fmt.slug } });
    if (!exists) {
      await prisma.acervoFormat.create({ data: fmt });
      console.log(`Created Format: ${fmt.label}`);
    } else {
      console.log(`Format ${fmt.label} already exists. Updating icon...`);
      await prisma.acervoFormat.update({
        where: { slug: fmt.slug },
        data: { icon: fmt.icon }
      });
    }
  }

  console.log('Seeding Complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
