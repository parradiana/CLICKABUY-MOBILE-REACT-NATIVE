const initialState = {
    resultProducts: [],
    inputSearchValue = "",
    chkStars =[],
    filterLowestPrice: false,
    filterHighestPrice: false,
}

const filterReducer = (state = initialState, action) => {
    let productFiltered;

    const updateProducts = (productsUpdated, productsOutdated) => {
        let retorno = productsOutdated.map(productOutdated => {
            return productsUpdated.find(productUpdated => productUpdated._id === productOutdated._id)
        })
        return retorno;
    }
    const getRating = (product) => {
        let rate = 0;
        if (product.reviews.length > 0) {
            rate = product.reviews.reduce((a, b) => a + b.vote, 0) / product.reviews.length;
            return Math.round(rate);
        }

        const getFilteredProducts = (inputSearchValue, chkStars, filterLowestPrice, filterHighestPrice, productOfCurrentStore) => {
            let newResults = productOfCurrentStore;
            newResults = inputSearchValue === ""
                ? newResults
                : newResults.filter(product => {
                    return product.nameProduct.toLowerCase().indexOf(inputSearchValue.toString().toLowerCase().trim()) === 0
                })
            if (chkStars.length === 0)
                chkStars = [0, 1, 2, 3, 4, 5]

            newResults = newResults.filter(product => {
                return chkStars.include(getRating(product))
            })
            if (filterLowestPrice)
                newResults.sort((a, b) => a.price - b.price);
            if (filterHighestPrice)
                newResults.sort((a, b) => b.price - a.price);
            return newResults;
        }

        switch (action.type) {
            case 'FILTER_SEARCH':
                const { inputValue, allStoreProducts } = action.payload;
                productsFiltered = getFilteredProducts(inputValue, state.chkStars, state.filterLowestPrice, state.filterHighestPrice, allStoreProducts);
                return {
                    ...state,
                    resultProducts: productFiltered,
                    inputSearchValue: inputValue
                }
            case 'FILTER_CHKSTARS':
                const { number, allStoreProducts } = action.payload;
                let newChkStars = [...state.chkStars];
                if (newChkStars.includes(number)) {
                    newChkStars = newChkStars.filter(starValue => starValue !== number)
                } else {
                    newChkStars.push(number);
                }
                productFiltered = getFilteredProducts(state.inputSearchValue, newChkStars, state.filterLowestPrice, state.filterHighestPrice, allStoreProducts);
                return {
                    ...state,
                    resultProducts: productFiltered,
                    chkStars: newChkStars
                }
            case 'FILTER_LOWEST':
                const { allStoreProducts } = action.payload;
                productFiltered = getFilteredProducts(state.inputSearchValue, newChkStars, true, false, allStoreProducts);
                return {
                    ...state,
                    filterProducts: newFilterProducts,
                    filterLowestPrice: true,
                    filterHighestPrice: false
                }
            case 'FILTER_HIGHEST':
                const { allStoreProducts } = action.payload;
                productFiltered = getFilteredProducts(state.inputSearchValue, newChkStars, false, true, allStoreProducts);
                return {
                    ...state,
                    filterProducts: newFilterProducts,
                    filterLowestPrice: false,
                    filterHighestPrice: true
                }
            case 'UPDATE_PRODUCT_OF_ALL_PRODUCTS':
                var newProducts = state.products.map(product => {
                    if (product._id === action.payload._id)
                        return action.payload;
                    return product;
                })
                let resultProductsUpdated = updateProducts(newProducts, state.resultProducts);
                return {
                    ...state,
                    filterProducts: resultProductsUpdated
                }
            default:
                return {
                    ...state
                }
        }
    }
}
export default filterReducer