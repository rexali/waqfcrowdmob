import { approveWaqfData} from "../waqfsSlice"

const approveWaqf= (data: any, dispatch: any)=>{
    dispatch(approveWaqfData(data)).unwrap();
}

export{
    approveWaqf
}