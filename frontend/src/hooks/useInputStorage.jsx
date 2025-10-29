import useSessionStorage from "./useSessionStorage";

const useInputStorage = (key, initValue) => {
    const [value, setValue] = useSessionStorage(key, initValue);

    const resetValue = () => setValue(initValue);

    const objAttribs = {
        value,
        onChange: (e) => setValue(e.target.value)
    };
    
  return [value, resetValue, objAttribs];
}
export default useInputStorage;