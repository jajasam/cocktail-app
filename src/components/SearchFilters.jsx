import { useEffect, useState } from 'react'

import '../styles/SearchFilters.css'

function SearchFilters() {
    const [filterCategories, setFilterCategories] = useState([
    {
        categoryName: 'Categories',
        param: 'c',
        subFilters: [],
        isVisible: false
    },
    {
        categoryName: 'Alcohols',
        param: 'a',
        subFilters: [],
        isVisible: false
    },
    {
        categoryName: 'Glasses',
        param: 'g',
        subFilters: [],
        isVisible: false
    },
    {
        categoryName: 'Ingredients',
        param: 'i',
        subFilters: [],
        isVisible: false
    }
    ]);

    useEffect(() => {
    //set filters 
    Promise.all(
        filterCategories
        ?.map(filterCategory => 
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?${filterCategory.param}=list`)))
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => setFilterCategories(prev => 
            prev.map((filterCategoryData, i) => ({
                ...filterCategoryData,
                subFilters: data[i].drinks
            }
            )
        )
        ))
        .catch(err => console.error(err))
    }, [])

    function handleFiltersVisibility(categoryToUpdate) {
    // update filters visibility when category is clicked
        setFilterCategories(prev => 
        prev.map(filterCategory => 
        filterCategory.categoryName === categoryToUpdate 
        ? { ...filterCategory, isVisible: !filterCategory.isVisible } 
        : filterCategory
        ));
    }

    const filterCategoriesElem  = filterCategories?.map((category, i) => {
        const { categoryName, isVisible, subFilters } = category;
  
        return <div key={i}>
            <p onClick={() => handleFiltersVisibility(categoryName)}>
                <span>{categoryName}</span>
                <span>⌄</span>
            </p>
            {
                isVisible && 
                subFilters?.map((el, i) => 
                <p key={i}>{Object.values(el)}</p>
                )
            }
        </div>
    })

    return (
        <>
            {
                filterCategoriesElem &&
                filterCategoriesElem
            }
        </>
    )
}

export default SearchFilters