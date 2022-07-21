import moment from 'moment';
import {
    FindOneOptions,
    getConnection,
    getManager,
    getRepository,
    Repository,
    SelectQueryBuilder
} from 'typeorm'

import books from './books'
import booksBycate from './books-by-cate'
import bookSpecs from './book-specs'
import bookCategories from './book-categories'
import clothingCategories from './clothing-categories'
import electronicsCategories from './electronics-categories'

let path = require('path')
var url = require('url')
import {
    CategoryType,
    Condition,
    FlawReasons,
    Gender,
    ImageSize,
    ImageType,
    LogisticsStatus,
    PaymentStatus,
    ProductStatus
} from '@/shared/enums';
import { CategoryItem } from '@/entities/category-item.entity';
import {
    Category,
    Brand,
    Comment,
    Image,
    ProductUnitSpec,
    ProductUnit,
    ProductUnitSpecTmpl,
    Product,
    Customer,
    Order,
    OrderProduct,
    GoodsItem,
    ProductSpecValue
} from '@/entities';
import { ConsoleLogger } from '@nestjs/common';
import { Console } from 'console';

let bookCate

export default async function () {
    try {
        let topBookCate = await getRepository(Category).findOne({
            name: CategoryType.BOOK,
            type: CategoryType.BOOK,
            level: 1
        })
        if (!topBookCate) {
            // id为string的时候(column: bigint) typorm 直接执行update
            // id为number的时候(column: bigint) 会触发重复主键的异常
            // 虽然string不会出发异常,但是id也会重新生成新的
            topBookCate = await getRepository(Category).save(new Category({
                // id: "525369210954405219",
                name: CategoryType.BOOK,
                type: CategoryType.BOOK,
                level: 1
            }))
            console.log(topBookCate)
        }

        // await initBookCategories(topBookCate)
        // await initClothingCate()
        // await initElectronicsCate()
        // await initBookProduct(topBookCate)
        // getConnection()
        //     .createQueryBuilder()
        //     .insert()
        //     .into(Category)
        //     .values([{ id: '135481276969781930', type: 'book', themeColor: '#DD868C' }])
        //     .execute();
        // getRepository(Category).save(new Category({ id: '135481276969781930', 
        //     type: 'book', themeColor: '#DD868C' }))

        // let brand = new BrandCategory({})
        // getRepository(BrandCategory).save(brand)

        // let c1 = new Comment({ id: "1", })
        // let c2 = new Comment({ id: "2", parent: c1 })
        // let c3 = new Comment({ id: "3", parent: c2 })
        // let c4 = new Comment({ id: "4", parent: c3 })
        // let c5 = new Comment({ id: "5", parent: c1 })
        // getManager().save(c1)
        // getManager().save(c2)
        // getManager().save(c3)
        // getManager().save(c4)
        // getManager().save(c5)
    } catch (error) {
        console.log(111111111111111, Object.keys(error))
        console.log(error.query)
        console.log(error.detail)
        console.log(error)
    }
}

async function initBookCategories(topBookCate: Category) {
    for (let index = 0; index < bookCategories.length; index++) {
        const category_level_1 = bookCategories[index]

        const category_level_2 = category_level_1.categories

        for (let index2 = 0; index2 < category_level_2.length; index2++) {
            const level2 = category_level_2[index2]

            if (index2 == 0) {

                let categoryItem = new CategoryItem({
                    name: level2.parent.name,
                    type: CategoryType.BOOK
                })
                // let categoryItem1 = await getRepository(CategoryItem)
                //     .findOne({ name: categoryItem.name })
                // if (!categoryItem1) {
                let categoryItem1 = await getRepository(CategoryItem).findOne({
                    name: level2.parent.name,
                    type: CategoryType.BOOK
                })

                if (!categoryItem1) {
                    categoryItem1 = await getRepository(CategoryItem).save(categoryItem)
                }
                // }
                let cate = new Category({
                    id: level2.parent.id,
                    categoryItem: categoryItem,
                    level: 2,
                    type: CategoryType.BOOK,
                    themeColor: level2.parent.themeColor,
                    parent: topBookCate
                })
                if (!await getRepository(Category).findOne({ id: level2.parent.id })) {
                    await getRepository(Category).save(cate)
                }

            }

            let categoryItem2Instance = new CategoryItem({
                name: level2.name,
                type: CategoryType.BOOK
            })
            let categoryItem2 = await getRepository(CategoryItem).findOne({
                name: level2.name,
                type: CategoryType.BOOK
            })

            if (!categoryItem2) {
                categoryItem2 = await getRepository(CategoryItem).save(categoryItem2Instance)
            }
            // }
            let level2_parent = await getRepository(Category).findOne({ id: level2.parent.id })
            if (!await getRepository(Category).findOne({ id: level2.id })) {
                await getRepository(Category).save(new Category({
                    id: level2.id,
                    categoryItem: categoryItem2,
                    type: CategoryType.BOOK,
                    level: 3,
                    parent: level2_parent,
                    description: level2.description
                }))
            }

            const elementChildren = level2.children
            if (elementChildren) {
                let level3Values = []
                for (let index3 = 0; index3 < elementChildren.length; index3++) {
                    const level3 = elementChildren[index3];
                    let categoryItem3Instance = new CategoryItem({
                        name: level3.name,
                        type: CategoryType.BOOK
                    })

                    let categoryItem3 = await getRepository(CategoryItem).findOne({
                        name: level3.name,
                        type: CategoryType.BOOK
                    })
                    if (!categoryItem3) {
                        categoryItem3 = await getRepository(CategoryItem)
                            .save(categoryItem3Instance)
                    }
                    // }
                    let level3_parent = await getRepository(Category).findOne({ id: level2.id })
                    if (!await getRepository(Category).findOne({ id: level3.id })) {
                        getRepository(Category).save(new Category({
                            id: level3.id,
                            categoryItem: categoryItem3,
                            type: CategoryType.BOOK,
                            level: 4,
                            parent: level3_parent,
                            description: level3.description
                        }))
                    }
                }

            }
        }
    }
}

async function initClothingCate() {
    for (let index = 0; index < clothingCategories.length; index++) {
        const element = clothingCategories[index];
        let leave1 = element

        if (!await getRepository(Category).findOne({ id: "498559369066488260" })) {
            await getRepository(Category).save(new Category({
                id: "498559369066488260",
                name: CategoryType.CLOTHING,
                type: CategoryType.CLOTHING,
                level: 1
            }))
        }
        let parent = await getRepository(Category).findOne({ id: leave1.id, })
        if (!parent) {
            parent = await getRepository(Category).save(new Category({
                id: leave1.id,
                name: leave1.name,
                type: CategoryType.CLOTHING,
                level: 2,
                // parentId: 
            }))
        }

        for (let index = 0; index < element.categories.length; index++) {
            const leave2 = element.categories[index];

            let urlq = url.parse(leave2.image)
            let image = await getRepository(Image).findOne({
                path: leave2.image.split(urlq.search)[0]
            })

            if (!image) {
                await getRepository(Image).save(new Image({
                    filename: leave2.image.split('/').slice(-1)[0],
                    path: leave2.image.split(urlq.search)[0],
                }))
            }
            if (!await getRepository(Category).findOne({ id: leave2.id })) {
                await getRepository(Category).save(new Category({
                    id: leave2.id,
                    name: leave2.name,
                    type: CategoryType.CLOTHING,
                    level: 3,
                    image: image,
                    parent: parent,
                }))
            }
        }
    }
}

async function initElectronicsCate() {
    await getRepository(Category).save(new Category({
        id: "257948286664601251",
        name: CategoryType.ELECTRONICS,
        type: CategoryType.ELECTRONICS,
        level: 1
    }))

    for (let index = 0; index < electronicsCategories.length; index++) {
        const element = electronicsCategories[index];
        let leave1 = element.categories[0].parentCategory

        let parent = await getRepository(Category).save(new Category({
            id: leave1.id,
            name: leave1.name,
            type: CategoryType.ELECTRONICS,
            level: 2,
            themeColor: leave1.themeColor,
            parentId: "257948286664601251"
        }))

        for (let index = 0; index < element.categories.length; index++) {
            const leave2 = element.categories[index];

            let urlq = url.parse(leave2.image)
            let image = await getRepository(Image).findOne({ path: leave2.image.split(urlq.search)[0] })
            if (!image) {
                image = await getRepository(Image).save(new Image({
                    filename: leave2.image.split('/').slice(-1)[0],
                    path: leave2.image.split(urlq.search)[0],
                }))
            }

            await getRepository(Category).save(new Category({
                id: leave2.id,
                name: leave2.name,
                type: CategoryType.ELECTRONICS,
                level: 3,
                image: image,
                description: leave2.description,
                parent: parent
            }))
        }
    }
}

async function initBookProduct(topBookCate: Category) {

    for (let index = 0; index < bookSpecs.length; index++) {
        const spec = bookSpecs[index];
        let productUnitSpec = await getRepository(ProductUnitSpec).findOne({ id: spec.id })
        if (!productUnitSpec) {
            await getRepository(ProductUnitSpec).save(new ProductUnitSpec({
                id: spec.id,
                name: spec.name,
                descriptiveName: spec.descriptiveName,
            }))
        }
    }

    let tmpl = await getRepository(ProductUnitSpecTmpl).findOne({
        name: 'book',
        category: topBookCate
    })
    if (!tmpl) {
        await getRepository(ProductUnitSpecTmpl).save(new ProductUnitSpecTmpl({
            // id: "118620329001940625",
            name: 'book',
            category: topBookCate
        }))
    }

    let cateIds = Object.keys(booksBycate)
    for (let index = 0; index < cateIds.length/**cateIds.length*/; index++) {
        let cateId = cateIds[index];
        let books = booksBycate[cateId]
        for (let index = 0; index < books.length/**books.length*/; index++) {
            const book = books[index].item;

            let productUnit = new ProductUnit({
                // id: book.title,
                name: book.title,
                originalName: book.originalName,
                specTmpl: tmpl
            })
            if (book.images) {
                let fileName = book.images.origin.split('/').slice(-1)[0];
                // let fileId = book.images.origin.split('/').slice(-1)[0].split('.')[0];
                let fileSuffix = fileName.split(".")[1]
                let name = fileName.split(".")[0]
                let originImage = await getRepository(Image).findOne({ path: book.images.origin })

                if (!originImage) {
                    originImage = new Image({
                        filename: fileName,
                        path: book.images.origin,
                        type: ImageType.COVER,
                        size: ImageSize.ORIGIN,
                        imageRatio: book.imageRatio,
                    })
                }
                let smallImage = await getRepository(Image).findOne({ path: book.images.small })
                if (!smallImage) {
                    smallImage = new Image({
                        filename: name + "_small" + fileSuffix,
                        path: book.images.small,
                        type: ImageType.COVER,
                        size: ImageSize.SMALL,
                        imageRatio: book.imageRatio,
                    })
                }
                let mediumImage = await getRepository(Image).findOne({ path: book.images.medium })
                if (!mediumImage) {
                    mediumImage = new Image({
                        filename: name + "_medium" + fileSuffix,
                        path: book.images.medium,
                        type: ImageType.COVER,
                        size: ImageSize.MEDIUM,
                        imageRatio: book.imageRatio,
                    })
                }
                let largeImage = await getRepository(Image).findOne({ path: book.images.medium })
                if (!largeImage) {
                    largeImage = new Image({
                        filename: name + "_large." + fileSuffix,
                        path: book.images.large,
                        type: ImageType.COVER,
                        size: ImageSize.LARGE,
                        imageRatio: book.imageRatio,
                    })
                }

                productUnit.images = [originImage, smallImage, mediumImage, largeImage]
            }


            let product = await getRepository(Product).findOne({ id: book.id })
            if (!product) {
                product = await getRepository(Product).save(new Product({
                    id: book.id,
                    productUnit: productUnit,
                    originalPrice: book.originalPrice,
                    newConditionPrice: book.newConditionPrice,
                }))
            }

            if (book.goods && book.goods.length > 0) {
                // 卖书
                if (book.latestTraders && book.latestTraders.length > 0) {
                    for (let index = 0; index < book.latestTraders.length; index++) {
                        const seller = book.latestTraders[index];

                        if (seller.isAnonymous) continue
                        let customer = seller

                        let existCustomer = await getRepository(Customer).findOne({ id: customer.id })
                        if (!existCustomer) {
                            existCustomer = await getRepository(Customer).save(new Customer({
                                id: customer.id,
                                name: customer.name,
                                avatar: customer.avatar,
                                gender: customer.gender == 2 ?
                                    Gender.MALE : customer.gender == 1 ?
                                        Gender.FEMALE : Gender.UNKNOWN,
                            }))
                        }

                        let goodsItem = await getRepository(GoodsItem).findOne({
                            productId: product.id,
                            seller: existCustomer
                        })
                        if (goodsItem) {
                            continue
                        } else {
                            let goodsItemIndex = Math.floor(Math.random() * book.goods.length)
                            let goodsItem = book.goods[goodsItemIndex]

                            getRepository(GoodsItem).save(new GoodsItem({
                                product: product,
                                seller: existCustomer,
                                condition: Condition[goodsItem.condition.toUpperCase()],
                                price: goodsItem.price,
                                flawReason: goodsItem.flawReasons.map(k => FlawReasons[k.toUpperCase()]),
                            }))
                        }
                    }
                }
            } else if (book.goods && book.goods.length == 0 &&
                book.latestOwners && book.latestOwners.length > 0) {
                // 没有货了，但是提供了买家信息没提供买家信息
                for (let index = 0; index < book.latestOwners[index].length; index++) {
                    book.latestTraders[index];

                    const customer = book.latestTraders[index];
                    let existCustomer = await getRepository(Customer).findOne({ name: customer.name })
                    if (!existCustomer) {
                        existCustomer = await getRepository(Customer).save(new Customer({
                            name: customer.name,
                            avatar: customer.avatar,
                            gender: customer.gender == 2 ?
                                Gender.MALE : customer.gender == 1 ?
                                    Gender.FEMALE : Gender.UNKNOWN,
                        }))
                    }
                    let order = new Order({
                        customer: existCustomer,
                        orderProducts: [new OrderProduct({
                            product: product,
                            condition: Condition.MEDIUM,
                            price: book.price
                        })],
                        paymentStatus: PaymentStatus.PAY_TO_SELLER,
                        finishedAt: moment().startOf("day")
                            .subtract(Math.random() * 100, 'day').toDate()
                    })
                    getRepository(Order).save(order)
                }
            }
            for (let index = 0; index < bookSpecs.length; index++) {

                console.log(bookSpecs, 1111111111);
                const spec = bookSpecs[index];
                let productSpecValue = await getRepository(ProductSpecValue).findOne({
                    product: product,
                    name: spec.name,
                })
                if (!productSpecValue) {
                    console.log(book, 123123123);

                    await getRepository(ProductSpecValue).save(new ProductSpecValue({
                        product: product,
                        name: spec.name,
                        value: book[spec.jsonName]
                    }))
                }
            }
        }
    }
}