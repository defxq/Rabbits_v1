import { useNavigate } from "react-router";

const BackButton = () => {
    const navigate = useNavigate();
    const back = () => navigate(-1);
  return (
    <button onClick={back}>Back</button>
  )
}
export default BackButton