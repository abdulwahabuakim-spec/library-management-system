import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clean
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  // 1. Genres
  const fiction = await prisma.genre.create({
    data: { name: 'Fiction', slug: 'fiction' },
  });

  const science = await prisma.genre.create({
    data: { name: 'Science', slug: 'science' },
  });

  // 2. Books
  await prisma.book.create({
    data: {
      title: 'The Great Library',
      author: 'John Doe',
      isbn: '978-0000000001',
      genreId: fiction.id,
      totalCopies: 10,
      availableCopies: 10,
    },
  });

  await prisma.book.create({
    data: {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '978-0000000002',
      genreId: science.id,
      totalCopies: 5,
      availableCopies: 5,
    },
  });

  // 3. Users
  const hashedPassword = await bcrypt.hash('password123', 10);

  await prisma.user.create({
    data: {
      email: 'admin@library.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      email: 'user@library.com',
      password: hashedPassword,
      role: Role.USER,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });