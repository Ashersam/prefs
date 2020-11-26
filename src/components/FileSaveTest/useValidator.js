import { useCallback, useEffect, useState } from "react"
import * as localForage from 'localforage';

export default function useValidation({ 
  key, 
  backendStore 
}) {
    const [validator, setValidator] = useState({
        localStorage:false,
        localForage: false,
        fs: false,
      });
    const [ validationMessage, SetValidatoinMessage] = useState(false)
    
    useEffect(() => {
        keyExists()
    }, [key, backendStore])

    const keyExists = useCallback(() => {
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
                 localForage.getItem(`${key}`, (err, value) => {
                   console.log(value)
                  if(value){
                    setValidator({ ...validator, [backendStore]: true });
                    SetValidatoinMessage("Same Key exists")
                    console.log(backendStore, validator)
                  }else if( value=== null ) {
                    setValidator({ ...validator, [backendStore]: false });
                    SetValidatoinMessage("")
                  }
                });
              break;
          }
    },[key, backendStore] )
	return { validator, validationMessage, keyExists, setValidator };
}