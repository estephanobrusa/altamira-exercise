import { useState, useEffect } from 'react';
import { BookResponse } from '../../../models/book';

export interface Book {
    isbn: string;
    title: string;
    author: string;
    year: number;
    publisher: string;

}
const useGetBooks = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Book[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    const getBooks = async () => {
        try {
            const response = await fetch('https://raw.githubusercontent.com/topac/assignment/master/books.5000.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json() as BookResponse[];
            const newData: Book[] = result.map((book) => {
                return {
                    isbn: book.Isbn || "",
                    title: book.Title || "",
                    author: book.Author || "",
                    publisher: book.Publisher || "",
                    year: book.Year || 0
                }
            })
            setData(newData);
            setIsLoading(false);
        } catch (error) {
            setIsError(!!error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    return { isLoading, data, isError };
};

export default useGetBooks;