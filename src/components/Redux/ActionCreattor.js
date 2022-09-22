const InitialState=({
    selectCategory:'New',
    name:'',
    usersData:{},
    themeWhite:false
    
})

export default function actionReducer(state=InitialState, action) {
    switch (action.type)
    {
        case 'selectCategoryAction':{

            return{
            ...state,
            selectCategory:action.payload}
        }

        case 'usersDataAction':{
            return{
                ...state,
                usersData:action.payload
            }
        }

        case 'Themes':{
            return{
                ...state,
                themeWhite:action.payload
            }
        }

        default: 
            return {
                state
            }
        
    }

}