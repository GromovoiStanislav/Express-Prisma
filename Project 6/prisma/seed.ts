import {db} from "../src/utils/db.server";

type Author = {
    firstName: string;
    lastName: string;
};

type Book = {
    title: string;
    isFiction: boolean;
    datePublished: Date;
};

async function seed() {

    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    firstName: author.firstName,
                    lastName: author.lastName,
                },
            });
        })
    );

    // const authors = getAuthors()
    // for (const author of authors) {
    //     const a = await db.author.create({
    //         data: {
    //             firstName: author.firstName,
    //             lastName: author.lastName,
    //         },
    //     });
    //     console.log(`Created author with id: ${a.id}`)
    // }


    const author = await db.author.findFirst({
        where: {
            firstName: "Yuval Noah",
        },
    });
    if (!author) {
        return
    }


    await Promise.all(
        getBooks().map((book) => {
            const {title, isFiction, datePublished} = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    datePublished,
                    authorId: author.id,
                },
            });
        })
    );

    // const books = getBooks()
    // for (const book of books) {
    //     const {title, isFiction, datePublished} = book;
    //     const b = await db.book.create({
    //         data: {
    //             title,
    //             isFiction,
    //             datePublished,
    //             authorId: author?.id
    //         },
    //     });
    //     console.log(`Created book with id: ${b.id}`)
    // }

}

seed();

function getAuthors(): Array<Author> {
    return [
        {
            firstName: "John",
            lastName: "Doe",
        },
        {
            firstName: "William",
            lastName: "Shakespeare",
        },
        {
            firstName: "Yuval Noah",
            lastName: "Harari",
        },
    ];
}

function getBooks(): Array<Book> {
    return [
        {
            title: "Sapiens",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "Homo Deus",
            isFiction: false,
            datePublished: new Date(),
        },
        {
            title: "The Ugly Duckling",
            isFiction: true,
            datePublished: new Date(),
        },
    ];
}
