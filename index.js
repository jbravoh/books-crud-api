const cors = require("cors");
const express = require("express");

const database = {
  books: {
    0: {
      title: "Animal Farm",
      author: "George Orwell",
      price: "£5.17",
      description:
        "A farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality. Thus the stage is set for one of the most telling satiric fables ever penned –a razor-edged fairy tale for grown-ups that records the evolution from revolution against tyranny to a totalitarianism just as terrible. ",
      image: "....",
    },
    1: {
      title: "Queenie",
      author: "Candice Cart-Williams",
      price: "£6.99",
      description:
        "Bridget Jones’s Diary meets Americanah in this disarmingly honest, boldly political, and truly inclusive novel that will speak to anyone who has gone looking for love and found something very different in its place.",
      image: "....",
    },
    3: {
      title: "Between the World and Me",
      author: "Ta-nehisi Coates",
      price: "£0.00",
      description:
        "A 2015 winner of the National Book Award for non-fiction, the renowned journalist and writer pens a profound letter to his son about what it means to be Black in America in the 21st century—a place in which you struggle to overcome the historical trauma of your people while trying to find your own purpose in the world. ",
      image: "....",
    },
    4: {
      title: "We Should All Be Feminists",
      author: "Chimamanda Ngozi Adiche",
      price: "£5.09",
      description:
        "Adapted from her TEDx Talk of the same name, Adiche uses personal experiences and understanding of sexual politics to define what feminism means in the 21st century. ",
      image: "....",
    },
    5: {
      title: "How We Fight for Our Lives",
      author: "Saeed Jones",
      price: "£17.54",
      description:
        "Jones's bestselling memoir is a personal account of growing up in the South as a young gay man who's attempting to find himself while battling rocky relationships with family, friends, and lovers.",
      image: "....",
    },
    6: {
      title: "Black Leopard, Red Wolf",
      author: "Marlon James",
      price: "£4.99",
      description:
        " James' epic fantasy honors African mythology and history. In it, a hunter named Tracker must find a mysterious missing boy with the help of a rag-tag group of mercenaries. The first of a planned trilogy, some are calling it the 'African Game of Thrones.' And Black Panther star Michael B. Jordan just earned the film rights for the book through his production company, Outlier Society. ",
      image: "....",
    },
    7: {
      title: "Well-Read Black Girl ",
      author: "Glory Edim",
      price: "£11.62",
      description:
        "Curated by the founder of the Well-Read Black Girl Book Club comes this collection of essays—all written by Black women writers—about the importance of representation in literature.",
      image: "....",
    },
    8: {
      title: "Salvage the Bones",
      author: "Jesmyn Ward",
      price: "£7.95",
      description:
        "A 2011 National Book Award Winner, Salvage the Bones chronicles a 12-day period in which a poor Mississippi family faces the looming threat of a hurricane. With no mother, a drunken father, a pregnant 14-year-old, and wayward brothers, they have little access to helpful resources—except for love",
      image: "....",
    },
    9: {
      title: "I Know Why the Caged Bird Sings",
      author: "Maya Angelou",
      price: "£5.99",
      description:
        "Written by a legendary writer and civil rights activist, I Know Why the Caged Bird Sings is an poetic memoir that captures Angelou's childhood struggles and the freedoms of her adulthood, which allowed her to find strength amidst despair. ",
      image: "....",
    },
    10: {
      title: "Gingerbread",
      author: "Helen Oyeyemi",
      price: "£10.54",
      description:
        "In a re-imagining of the classic German fairy tale Hansel and Gretel, a woman named Harriet narrates her origin story to her daughter Perdita. She makes a mysterious gingerbread that's incredibly popular in Harriet's magical hometown of Druhástrana. And it's especially loved by her childhood best friend: Gretel.",
      image: "....",
    },
  },
};

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlenconded

// === GET "/books" ===

app.get("/books", (req, res) => {
  res.json({
    status: "success",
    data: database.books,
  });
});

// === GET "/books/:id" ===

app.get("/books/:id", (req, res) => {
  console.log(req.params.id);

  const matchingBooks = database.books[req.params.id];

  if (matchingBooks) {
    res.status(200).json({
      // OK status code
      status: "success",
      data: matchingBooks,
    });
  } else {
    res.status(401).json({
      //"status(400) is a standard response (NOT FOUND) - look at http.cats"
      message: "Couldn't find a book with ID",
    });
  }
});

//  === POST "/books" ===

app.post("/books", (req, res) => {
  console.log(req.body);

  //find the largest key and increment it
  const existingIds = Object.keys(database.books);
  const largestKey = Math.max(...existingIds);

  const newKey = largestKey++;

  database.books[newKey] = req.body;

  res.status(201).json({
    // created status code
    status: "success",
    message: `Created a book profile with the ID of ${newKey}.`,
  });
});

// === DELETE "/books/:id" ===
app.delete("/books/:id", (req, res) => {
  delete database.books[req.params.id]; // double check if this works

  res.status(200).json({
    //OK status code
    status: "success",
    message: `deleted book ${id}.`,
  });
});

// === PUT "/books/:id" ===  (MODIFY ENTIRE RESOURCE - OVERWRITES)
app.put("/books/:id", (req, res) => {
  const idToUpdate = database.books[req.params.id];

  database.books[idToUpdate] = req.body; // line that causes update to take effect

  res.status(200).json({
    //Modified status code
    status: "success",
    message: "Book updated",
  });
});

// === PATCH "/books/:id" === (PARTIAL UPDATE TO RESOURCE)
app.patch("/books/:id", (req, res) => {
  const idToUpdate = database.books[req.params.id];

  database.books[idToUpdate] = {
    ...database.books[idToUpdate],
    ...req.body, // "..." allows you to add data list and not replace it
  };

  res.status(200).json({
    // OK status codes
    message: "Book updated",
  });
});

app.listen(4000, () => {
  // search localhost:4000/books
  console.log("Server is running!");
});
