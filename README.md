   # Library Management System

   ## Schema Decisions

   ### Why Book references Genre rather than embedding it
   PostgreSQL is relational. If we embedded genre name inside every Book, we would duplicate data. With a foreign key Book.genreId -> Genre.id using @relation, genre data lives in one place (Genre table). This is normalization: single source of truth, no duplication, renaming a genre is one update, and Prisma gives typed relation via include: { genre: true }.

   ### Prisma vs Document Database
   In MongoDB I would embed Genre inside Book for speed. In Prisma/Postgres I must define relations, foreign keys, and run migrations upfront. schema.prisma is the single source of truth that keeps DB schema, TypeScript types, and client in sync.
