import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();
  const fiction = await prisma.genre.create({ data: { name: 'Fiction', slug: 'fiction' } });
  const science = await prisma.genre.create({ data: { name: 'Science', slug: 'science' } });
  const history = await prisma.genre.create({ data: { name: 'History', slug: 'history' } });
  const tech = await prisma.genre.create({ data: { name: 'Technology', slug: 'technology' } });
  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', genreId: fiction.id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', genreId: fiction.id },
    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', genreId: science.id },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780199291151', genreId: science.id },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434', genreId: science.id },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393061314', genreId: history.id },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553296983', genreId: history.id },
    { title: 'Team of Rivals', author: 'Doris Kearns Goodwin', isbn: '9780743270755', genreId: history.id },
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', genreId: tech.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '9780201616224', genreId: tech.id },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262033848', genreId: tech.id },
    { title: 'Design Patterns', author: 'Erich Gamma', isbn: '9780201633610', genreId: tech.id },
    { title: 'AI: A Modern Approach', author: 'Stuart Russell', isbn: '9780134610993', genreId: tech.id },
  ];
  for (const b of books) { await prisma.book.create({ data: b }); }
  await prisma.user.createMany({ data: [
    { email: 'patron@example.com', name: 'John Patron', role: Role.PATRON },
    { email: 'librarian@example.com', name: 'Sarah Librarian', role: Role.LIBRARIAN },
  ]});
  console.log('Seeded');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
