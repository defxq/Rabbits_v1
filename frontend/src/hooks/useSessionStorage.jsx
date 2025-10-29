import { useEffect, useState } from "react";

const useSessionStorage = (key, initValue) => {
    const [value, setValue] = useState(JSON.parse(sessionStorage.getItem(key)) || initValue);

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

  return [value, setValue];
}
export default useSessionStorage;