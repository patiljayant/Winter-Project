export const loadState = () => {
    const initialState = {
        isLoggedIn : false, 
        products:[],
        user : {},
        searchedProducts : [],
        searchValue : '',
        similarProducts : []
    }
    try{
        const serializedState = localStorage.getItem('state');
        if(serializedState === null){
            return initialState
        }    
        return JSON.parse(serializedState);
    }
    catch(err){
        return initialState;
    }
    
};

export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }
    catch(err){

    }
}