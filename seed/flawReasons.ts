import booksByCate from "./books-by-cate";
import books from "./books";

(function main() {
    getBooksByCate()
    getBook()
})()

function getBooksByCate() {
    let flawReasons = {}
    let cateIds = Object.keys(booksByCate)
    for (let index = 0; index < cateIds.length; index++) {
        const cateId = cateIds[index];

        for (let index = 0; index < booksByCate[cateId].length; index++) {
            const books = booksByCate[cateId];
            for (let index = 0; index < books.length; index++) {
                const book = books[index].item;
                for (let index = 0; index < book.goods.length; index++) {
                    const good = book.goods[index];
                    for (let index = 0; index < good.flawReasons.length; index++) {
                        const reason = good.flawReasons[index];
                        flawReasons[reason] = 1
                    }
                }
            }
        }

    }
    console.log(flawReasons)
}


function getBook() {
    let flawReasons = {}
    for (let index = 0; index < books.length; index++) {
        const book = books[index].item;
        for (let index = 0; index < book.goods.length; index++) {
            const good = book.goods[index];
            for (let index = 0; index < good.flawReasons.length; index++) {
                const reason = good.flawReasons[index];
                flawReasons[reason] = 1
            }
        }
    }
    console.log(flawReasons)
}

