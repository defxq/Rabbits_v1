import { useEffect, useState } from "react";
// this was redundant so i dont use this anymore
const PersistLoginToggle = () => {
    const [check, setCheck] = useState(false);

    const handleCheck = () => {
        setCheck(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem("forget", JSON.stringify(check));
    }, [check]);

  return (
    <div>
        <input
            type="checkbox"
            id="forget"
            checked={!check}
            onChange={handleCheck}
        />
        <label htmlFor="forget">Keep me Signed-In</label>
    </div>
  )
}
export default PersistLoginToggle;