import { useNavigate } from "react-router"
import BackButton from "../components/BackButton"

const Unauthorized = () => {
  return (
    <div>
        <h2>Unauthorized</h2>
        <p>You do not have permission to enter this page</p>
        <BackButton />
        <br />
    </div>
  )
}
export default Unauthorized