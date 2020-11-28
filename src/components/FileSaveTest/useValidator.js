import { useCallback, useEffect, useState } from "react"
import * as localForage from 'localforage';

export default function useValidation({
  backendStore 
}) {
    const [validator, setValidator] = useState({
        localStorage:false,
        localForage: false,
        fs: false,
      });
    const [ validationMessage, SetValidatoinMessage] = useState(false)
    
    // useEffect(() => {
    //     keyExists()
    // }, [key, backendStore])

    const keyExists = ({ key }) => {
        switch (backendStore) {
            case 'localStorage':
                if (localStorage.getItem(`${key}_default`) !== null) {
                    setValidator({ ...validator, [backendStore]: true });
                    SetValidatoinMessage("Same Key exists")
                }else {
                    setValidator({ ...validator, [backendStore]: false });
                }
              break;
            case 'localForage':
              try {
                localForage.getItem(`${key}`, (err, value) => {
                 if(value){
                   setValidator({ ...validator, [backendStore]: true });
                   SetValidatoinMessage("Same Key exists")
                 }else if( value === null ) {
                   setValidator({ ...validator, [backendStore]: false });
                   SetValidatoinMessage("")
                 }
               });
            } catch (err) {
                console.log(err);
            } 
              break;
          }
    }
	return { validator, validationMessage, keyExists, setValidator };
}