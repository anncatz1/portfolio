import React, { useState, useEffect } from "react";
const url2 =
  "https://books.googleapis.com/books/v1/users/112221207975517811181/bookshelves/4/volumes?access_token=AIzaSyCcRAMyIH2SBaeyMn2hnq85syLM2GUxgRE";

// const URL =
//   "http://www.googleapis.com/books/v1/user/112221207975517811181/bookshelves/4/volumes?key=AIzaSyCcRAMyIH2SBaeyMn2hnq85syLM2GUxgRE";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const proxyURL = "https://api.allorigins.win/raw?url=";
        const targetURL = url2;
        const response = await fetch(proxyURL + targetURL);

        const data = await response.json();
        setBooks(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Books List:</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {books !== "" &&
          books.map((book) => (
            <li
              key={book.id}
              className="p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 w-60 mx-auto flex flex-col"
            >
              <div className="mb-4 w-40 h-60 mx-auto relative">
                <img
                  src={book.volumeInfo?.imageLinks?.thumbnail}
                  alt={book.volumeInfo?.title || "Book Cover"}
                  className="rounded w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {book.volumeInfo?.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Books;
