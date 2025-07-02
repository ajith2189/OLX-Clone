import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";

const Context = createContext(null);
export const ItemsContext = () => useContext(Context); //customHook 

export const ItemsContextProvider = ({ children }) => {
  //state variable to store all the products in the DB
  const [items, setItems] = useState(null); 

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      try {
        // firestore collection names are case-sensitive
        // the above code will only give the reference to the collection and not the data
        const productsCollection = collection(fireStore, "products"); 

        // now opening the collection and taking the snapshot of it
        const productSnapshot = await getDocs(productsCollection); 

        // this part will open each of the files from the collection and add to a list with proper id and data separately
        const productsList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); 

        // fetch the data but not stored so this state is used to do that
        setItems(productsList); 
      } catch (error) {
        console.log(error, "error fetching products");
      }
    };

    fetchItemsFromFireStore();
  }, []);

  return (
    <>
      <Context.Provider value={{ items, setItems }}>
        {children}
      </Context.Provider>
    </>
  );
};
