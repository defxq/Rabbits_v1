import reduxLocal from "redux-persist/lib/storage";

const noopStorage = {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve()
};

const staySignedIn = !JSON.parse(localStorage.getItem("forget")) || false;

const storageSelector = () => 
    staySignedIn ? reduxLocal : noopStorage;

export default storageSelector;