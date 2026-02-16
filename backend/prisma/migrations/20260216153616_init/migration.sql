-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "blog_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "blog_posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "blog_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "acervo_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "acervo_formats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "acervo_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fullContent" TEXT,
    "image" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "hotmartLink" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    "formatId" TEXT NOT NULL,
    CONSTRAINT "acervo_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "acervo_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "acervo_products_formatId_fkey" FOREIGN KEY ("formatId") REFERENCES "acervo_formats" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "acervo_tags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "acervo_tags_productId_fkey" FOREIGN KEY ("productId") REFERENCES "acervo_products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "acervo_features" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "acervo_features_productId_fkey" FOREIGN KEY ("productId") REFERENCES "acervo_products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "acervo_benefits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "acervo_benefits_productId_fkey" FOREIGN KEY ("productId") REFERENCES "acervo_products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "palestra_vertentes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "palestra_formatos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "palestra_estatisticas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "depoimentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "event" TEXT,
    "quote" TEXT NOT NULL,
    "image" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "media_featured" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "outlet" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "link" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "media_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "outlet" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "media_books" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "media_press" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "outlet" TEXT NOT NULL,
    "mentions" INTEGER NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "galeria_fotos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "social_proof_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "formulario_contato" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "formulario_diagnostico" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "clinic" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "mainChallenge" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "formulario_mentoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "clinic" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "formulario_palestras" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "eventType" TEXT,
    "attendees" TEXT,
    "date" TEXT,
    "message" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "formulario_newsletter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "formulario_avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "revenue" TEXT NOT NULL,
    "employees" TEXT NOT NULL,
    "operationTime" TEXT NOT NULL,
    "quizAnswers" JSONB NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "maturityLevel" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_slug_key" ON "blog_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_categoryId_idx" ON "blog_posts"("categoryId");

-- CreateIndex
CREATE INDEX "blog_posts_featured_idx" ON "blog_posts"("featured");

-- CreateIndex
CREATE INDEX "blog_posts_published_idx" ON "blog_posts"("published");

-- CreateIndex
CREATE UNIQUE INDEX "acervo_categories_slug_key" ON "acervo_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "acervo_formats_slug_key" ON "acervo_formats"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "acervo_products_slug_key" ON "acervo_products"("slug");

-- CreateIndex
CREATE INDEX "acervo_products_slug_idx" ON "acervo_products"("slug");

-- CreateIndex
CREATE INDEX "acervo_products_categoryId_idx" ON "acervo_products"("categoryId");

-- CreateIndex
CREATE INDEX "acervo_products_formatId_idx" ON "acervo_products"("formatId");

-- CreateIndex
CREATE INDEX "acervo_products_published_idx" ON "acervo_products"("published");

-- CreateIndex
CREATE INDEX "depoimentos_published_idx" ON "depoimentos"("published");

-- CreateIndex
CREATE INDEX "formulario_contato_createdAt_idx" ON "formulario_contato"("createdAt");

-- CreateIndex
CREATE INDEX "formulario_contato_read_idx" ON "formulario_contato"("read");

-- CreateIndex
CREATE INDEX "formulario_diagnostico_createdAt_idx" ON "formulario_diagnostico"("createdAt");

-- CreateIndex
CREATE INDEX "formulario_diagnostico_read_idx" ON "formulario_diagnostico"("read");

-- CreateIndex
CREATE INDEX "formulario_mentoria_createdAt_idx" ON "formulario_mentoria"("createdAt");

-- CreateIndex
CREATE INDEX "formulario_mentoria_read_idx" ON "formulario_mentoria"("read");

-- CreateIndex
CREATE INDEX "formulario_palestras_createdAt_idx" ON "formulario_palestras"("createdAt");

-- CreateIndex
CREATE INDEX "formulario_palestras_read_idx" ON "formulario_palestras"("read");

-- CreateIndex
CREATE INDEX "formulario_newsletter_active_idx" ON "formulario_newsletter"("active");

-- CreateIndex
CREATE UNIQUE INDEX "formulario_newsletter_email_key" ON "formulario_newsletter"("email");

-- CreateIndex
CREATE INDEX "formulario_avaliacao_createdAt_idx" ON "formulario_avaliacao"("createdAt");

-- CreateIndex
CREATE INDEX "formulario_avaliacao_read_idx" ON "formulario_avaliacao"("read");
