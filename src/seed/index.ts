import { FindOneOptions, getRepository, Repository } from 'typeorm'

import bookCategories from './book-category'

import { Category } from '@/entities/category.entity'
import { CategoryType } from '@/shared/enums';
import { CategoryItem } from '@/entities/category-item.entity';
import { Brand, BrandCategory } from '@/entities';

export default async function () {

    for (let index = 0; index < bookCategories.length; index++) {
        const category_level_1 = bookCategories[index];

        const category_level_2 = category_level_1.categories

        for (let index2 = 0; index2 < category_level_2.length; index2++) {
            const level2 = category_level_2[index2]
            const elementChildren = level2.children
            if (elementChildren) {

            }
        }
    }

    for (let index = 0; index < bookCategories.length; index++) {
        const category_level_1 = bookCategories[index]

        const category_level_2 = category_level_1.categories

        console.log(category_level_1.name, index)
        for (let index2 = 0; index2 < category_level_2.length; index2++) {
            const level2 = category_level_2[index2]

            if (index2 == 0) {
                let categoryItem = new CategoryItem({
                    name: level2.parent.name,
                    type: CategoryType.BOOK
                })
                // let categoryItem1 = await getRepository(CategoryItem).findOne({ name: categoryItem.name })
                // if (!categoryItem1) {
                    let categoryItem1 = await getRepository(CategoryItem).save(categoryItem)
                // }
                let reslut = await getRepository(Category).save(new Category({
                    id: level2.parent.id,
                    categoryItem: categoryItem1,
                    type: CategoryType.BOOK,
                    themeColor: level2.parent.themeColor
                }))
            }

            let categoryItem2Instance = new CategoryItem({
                name: level2.name,
                type: CategoryType.BOOK
            })
            // let categoryItem2 = await getRepository(CategoryItem).findOne({ name: categoryItem2Instance.name })
            // if (!categoryItem2) {
               let categoryItem2 = await getRepository(CategoryItem).save(categoryItem2Instance)
            // }
            let level2_parent = await getRepository(Category).findOne({ id: level2.parent.id })
            // let level2_children = await getRepository(CategoryItem).findOne({ id: level2.parent.id })
            getRepository(Category).save(new Category({
                id: level2.id,
                categoryItem: categoryItem2,
                type: CategoryType.BOOK,
                level: 2,
                parent: level2_parent,
                // children: level2_children,
                description: level2.description
            }))

            const elementChildren = level2.children
            if (elementChildren) {
                for (let index3 = 0; index3 < elementChildren.length; index3++) {
                    const level3 = elementChildren[index3];
                    let categoryItem3Instance = new CategoryItem({
                        name: level3.name,
                        type: CategoryType.BOOK
                    })

                    // let categoryItem3 = await getRepository(CategoryItem).findOne({ name: categoryItem3Instance.name })
                    // if (!categoryItem3) {
                        let categoryItem3 = await getRepository(CategoryItem).save(categoryItem3Instance)
                    // }
                    let level3_parent = await getRepository(Category).findOne({ id: level2.id })
                    getRepository(Category).save(new Category({
                        id: level3.id,
                        categoryItem: categoryItem3,
                        type: CategoryType.BOOK,
                        level: 3,
                        parent: level3_parent,
                        description: level3.description
                    }))

                }
            }
        }
    }


    // let brand = new BrandCategory({})
    // getRepository(BrandCategory).save(brand)
    // console.log(brand, 1111)
}