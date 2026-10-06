require('dotenv').config();
const mongoose = require('mongoose');
const Genre = require('./models/Genre');
const Book = require('./models/Book');

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables.');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas...');

    // Make script idempotent by clearing existing collections
    await Genre.deleteMany({});
    await Book.deleteMany({});
    console.log('Cleared existing Book and Genre collections.');

    // 1. Insert Genres
    const genres = await Genre.insertMany([
      { name: 'Science Fiction', slug: 'science-fiction' },
      { name: 'Fantasy', slug: 'fantasy' },
      { name: 'Mystery & Thriller', slug: 'mystery-thriller' },
      { name: 'Non-Fiction', slug: 'non-fiction' },
      { name: 'Historical Fiction', slug: 'historical-fiction' },
    ]);

    const genreMap = {};
    genres.forEach((g) => {
      genreMap[g.slug] = g._id;
    });

    // 2. Insert Books referencing Genre ObjectIds
    const books = [
      {
        title: 'Dune',
        author: 'Frank Herbert',
        isbn: '9780441172719',
        description: 'Set on the desert planet Arrakis, Dune is the story of Paul Atreides.',
        coverImage: 'https://images.example.com/dune.jpg',
        totalCopies: 10,
        availableCopies: 7,
        genre: genreMap['science-fiction'],
      },
      {
        title: 'Neuromancer',
        author: 'William Gibson',
        isbn: '9780441569595',
        description: 'The matrix is a world within a world, a consensus hallucination.',
        coverImage: 'https://images.example.com/neuromancer.jpg',
        totalCopies: 5,
        availableCopies: 3,
        genre: genreMap['science-fiction'],
      },
      {
        title: 'Foundation',
        author: 'Isaac Asimov',
        isbn: '9780553293357',
        description: 'Hari Seldon creates the Foundation to preserve human civilization.',
        coverImage: 'https://images.example.com/foundation.jpg',
        totalCopies: 8,
        availableCopies: 8,
        genre: genreMap['science-fiction'],
      },
      {
        title: 'Snow Crash',
        author: 'Neal Stephenson',
        isbn: '9780553380958',
        description: 'In reality, Hiro Protagonist delivers pizza for Uncle Enzo’s CosoNostra Pizza Inc.',
        coverImage: 'https://images.example.com/snowcrash.jpg',
        totalCopies: 6,
        availableCopies: 4,
        genre: genreMap['science-fiction'],
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        isbn: '9780547928227',
        description: 'Bilbo Baggins is swept into an epic quest to reclaim the lost Dwarf Kingdom.',
        coverImage: 'https://images.example.com/hobbit.jpg',
        totalCopies: 12,
        availableCopies: 9,
        genre: genreMap['fantasy'],
      },
      {
        title: 'A Game of Thrones',
        author: 'George R.R. Martin',
        isbn: '9780553588484',
        description: 'Summers span decades. Winters can last a lifetime.',
        coverImage: 'https://images.example.com/got.jpg',
        totalCopies: 15,
        availableCopies: 10,
        genre: genreMap['fantasy'],
      },
      {
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        isbn: '9780756404741',
        description: 'The tale of Kvothe, a magically gifted young man who grows to be a notorious wizard.',
        coverImage: 'https://images.example.com/notw.jpg',
        totalCopies: 7,
        availableCopies: 2,
        genre: genreMap['fantasy'],
      },
      {
        title: 'The Way of Kings',
        author: 'Brandon Sanderson',
        isbn: '9780765326355',
        description: 'Roshar is a world of stone and storms.',
        coverImage: 'https://images.example.com/twok.jpg',
        totalCopies: 9,
        availableCopies: 5,
        genre: genreMap['fantasy'],
      },
      {
        title: 'The Da Vinci Code',
        author: 'Dan Brown',
        isbn: '9780307474278',
        description: 'A murder in the Louvre reveals a sinister plot to uncover a secret.',
        coverImage: 'https://images.example.com/davinci.jpg',
        totalCopies: 10,
        availableCopies: 6,
        genre: genreMap['mystery-thriller'],
      },
      {
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        isbn: '9780307588371',
        description: 'On their fifth wedding anniversary, Nick Dunne reports that his wife has disappeared.',
        coverImage: 'https://images.example.com/gonegirl.jpg',
        totalCopies: 8,
        availableCopies: 1,
        genre: genreMap['mystery-thriller'],
      },
      {
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        isbn: '9780307949486',
        description: 'A financial journalist and a hacker investigate a 40-year-old disappearance.',
        coverImage: 'https://images.example.com/dragontattoo.jpg',
        totalCopies: 11,
        availableCopies: 7,
        genre: genreMap['mystery-thriller'],
      },
      {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        isbn: '9780062316097',
        description: 'A survey of the history of humankind from the evolution of archaic human species.',
        coverImage: 'https://images.example.com/sapiens.jpg',
        totalCopies: 14,
        availableCopies: 11,
        genre: genreMap['non-fiction'],
      },
      {
        title: 'Educated',
        author: 'Tara Westover',
        isbn: '9780399590504',
        description: 'A memoir about a young woman who leaves her survivalist family and earns a PhD.',
        coverImage: 'https://images.example.com/educated.jpg',
        totalCopies: 6,
        availableCopies: 0,
        genre: genreMap['non-fiction'],
      },
      {
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        isbn: '9780374533557',
        description: 'An exploration of the two systems that drive the way we think.',
        coverImage: 'https://images.example.com/thinking.jpg',
        totalCopies: 9,
        availableCopies: 5,
        genre: genreMap['non-fiction'],
      },
      {
        title: 'The Book Thief',
        author: 'Markus Zusak',
        isbn: '9780375842207',
        description: 'Set during WWII in Germany, narrated by Death.',
        coverImage: 'https://images.example.com/bookthief.jpg',
        totalCopies: 8,
        availableCopies: 6,
        genre: genreMap['historical-fiction'],
      },
    ];

    await Book.insertMany(books);

    console.log(`Seeded ${genres.length} genres and ${books.length} books successfully.`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
};

seedData();
