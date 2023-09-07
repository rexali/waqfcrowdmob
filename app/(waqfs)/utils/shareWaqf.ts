import { shareWaqfData } from "../waqfsSlice";

const shareWaqf = (data: any, dispatch: any) => {
    dispatch(shareWaqfData(data)).unwrap();
}
export {
    shareWaqf
}