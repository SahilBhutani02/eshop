import { useSelector } from "react-redux"
import AdminProducts from "../Admin/AdminProducts"
import UserProducts from "../User/UserProducts"

const Products:React.FC = () => {

    const userType =useSelector((state:any)=>state.userType)

  return (
    <>
    {
        userType.admin===true?<AdminProducts/>:<UserProducts/>
    }
    </>
  )
}

export default Products