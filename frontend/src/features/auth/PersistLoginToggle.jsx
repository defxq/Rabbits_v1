import { useEffect, useState } from "react";

const PersistLoginToggle = () => {
    const [check, setCheck] = useState(true);

    const handleCheck = () => {
        setCheck(prev => !prev);
    };

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(check));
    }, [check]);

  return (
    <div>
        <input
            type="checkbox"
            id="forget"
            checked={check}
            onChange={handleCheck}
        />
        <label htmlFor="forget">Keep me Signed-In</label>
    </div>
  )
}
export default PersistLoginToggle;