import { deleteWaqfData } from "../waqfsSlice"

const deleteWaqf= (data: any, dispatch: any)=>{
    dispatch(deleteWaqfData(data)).unwrap();
}

export{
    deleteWaqf
}