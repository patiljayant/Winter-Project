const rootReducer = (state, action) => {

    if(action.type ==='FETCH_PRODUCTS'){
        return { ...state,
                 products : action.products}
    }

    if(action.type === 'ADD_TO_CART'){  
        return { ...state,
               user : action.user };
    }

    if(action.type === 'UPDATE_CART'){
        return {
            ...state,
            user : action.user
        }
    }

    if(action.type === 'SUBSTRACT_ITEM'){  
        return {
            ...state,
            user : action.user
        }
    }

    if(action.type === 'ADD_ITEM'){
        return {
            ...state,
            user : action.user
        }
    }

    if(action.type === 'LOGIN_STATUS'){
        return {
            ...state,
            isLoggedIn : action.status.isLoggedIn,
            user : action.status.details
        }
    }
    
    if(action.type === 'SORT_HIGH_TO_LOW'){
        const products = state.products.map(product => {return product});
        products.sort((a,b) => (b.price - (b.price * b.discount/100)) - (a.price - (a.price * a.discount/100)));

        return{
            ...state,
            products: products
        }
    }

    if(action.type === 'SORT_LOW_TO_HIGH'){
        const products = state.products.map(product => {return product});
        products.sort((a,b) => (a.price - (a.price * a.discount/100)) - (b.price - (b.price * b.discount/100)));

        return{
            ...state,
            products: products
        }
    }

    if(action.type === 'SORT_BY_RATING'){
        const products = state.products.map(product => {
            if(product.rating.length){
                product.tr = 0;
                for(var i=0;i<product.rating.length;i++){
                    product.tr += product.rating[i];
                }
            }

            else  
                product.tr = 0;

            return product    
        })

        products.sort((a,b) => b.tr - a.tr);
        return{
            ...state,
            products : products
        }
    }

    
    if(action.type === 'SEARCH_VALUE'){
        console.log(action.value)
        return{
            ...state,
            searchValue : action.value
        }
    }

    if(action.type === 'SEARCH'){
        var searchedProducts = state.products.map(product => {

            if((product.name.toLowerCase().search(action.value.toLowerCase())) >= 0){
                return product;
            }

            for(var i=0;i<product.tags.length;i++){
                if((product.tags[i].toLowerCase().search(action.value.toLowerCase())) >= 0){
                    return product;
                }
            }
        })

        searchedProducts = searchedProducts.filter(product => product !== undefined)

        return {
            ...state,
            searchedProducts : searchedProducts
        }
    }

    if(action.type === 'SORT_SEARCH_HIGH_TO_LOW'){
        const products = state.searchedProducts.map(product => {return product});
        products.sort((a,b) => (b.price - (b.price * b.discount/100)) - (a.price - (a.price * a.discount/100)));

        return{
            ...state,
            searchedProducts: products
        }
    }

    if(action.type === 'SORT_SEARCH_LOW_TO_HIGH'){
        const products = state.searchedProducts.map(product => {return product});
        products.sort((a,b) => (a.price - (a.price * a.discount/100)) - (b.price - (b.price * b.discount/100)));

        return{
            ...state,
            searchedProducts: products
        }
    }

    if(action.type === 'SORT_SEARCH_BY_RATING'){
        const products = state.searchedProducts.map(product => {
            if(product.rating.length){
                product.tr = 0;
                for(var i=0;i<product.rating.length;i++){
                    product.tr += product.rating[i];
                }
            }

            else  
                product.tr = 0;

            return product    
        })

        products.sort((a,b) => b.tr - a.tr);
        return{
            ...state,
            searchedProducts : products
        }
    }
    
    if(action.type === 'FIND_SIMILAR_PRODUCTS'){
        const p = state.products.filter(p => p._id === action.id);
        const product = p[0];
        var copy = state.products.filter(p => p._id !== action.id);
        var foundSimilarProducts = [];
        product.tags.forEach(tag => {
            const len = copy.length;
            for(var i=0;i<len;i++){
                if(copy[i] !== undefined){
                    let len2 = copy[i].tags.length
                    for(var j = 0;j<len2;j++) {
                        if(copy[i].tags[j].toLowerCase().search(tag.toLowerCase()) >=0){
                            foundSimilarProducts.push(copy[i])
                            copy = copy.map(c =>{
                                if(c !== undefined){
                                    if(c._id !== copy[i]._id)
                                        return c;
                                }        
                            })
                            break;
                        }
                    }
                }    
            }
        });
        return{
            ...state,
            similarProducts : foundSimilarProducts
        }
    }

    return state;
}

export default rootReducer;