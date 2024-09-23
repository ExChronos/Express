interface printedItems {
    name: string;
    isbn: string;
    pagesCount: number;
    hasHardCover: boolean;
}

class Book implements printedItems {
    name: string;
    isbn: string;
    pagesCount: number;
    hasHardCover = true;
}

class Comics implements printedItems {
    name: string;
    isbn: string;
    pagesCount: number;
    hasHardCover = false;
}

