const InitialState=({
    selectCategory:'New',
    name:'',
    
})

export default function actionReducer(state=InitialState, action) {
    switch (action.type)
    {
        case 'selectCategoryAction':{

            return{
            ...state,
            selectCategory:action.payload}
        }

        default: 
            return {
                state
            }
        
    }

}