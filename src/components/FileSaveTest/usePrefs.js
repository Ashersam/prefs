import { useCallback, useEffect, useState } from 'react';
import { getInitialValue } from '../../core/backend';
import { deleteStorage, storageCreate } from '../../core/tolocaStorage';
import useValidation from './useValidator';

const isFunction = async(backendfn) => {
  try {
    if (backendfn instanceof Function) {
      return backendfn
    }
  } catch (error) {
      return error
    }
}
 
export default function usePrefs({ 
  backendfn,
}) {
  const { 
    validator, 
    validationMessage, 
    keyExists,
  } = useValidation({ 
      backendStore: backendfn.type
    })

    const [ storage, setStorage ] = useState("")
    const [ customStore, setCustomStore ] = useState("")

    useEffect(() => {
      storeConfig()
    }, [backendfn])
    
    const storeConfig = useCallback(() => {
      isFunction(backendfn).then((res) => {
        if(res){
        //   setCustomStore(res)
          // custom(res, key, values)
          const customfun =  res
          // Do custom function configuration here
        }
        else{
          setStorage(backendfn)
          // tolocalStorageCreate(backendfn, values, tag, validator, key, keyExists)
        }
      })
    },[backendfn])

    const custom = ({
        key,
        values
    }) => {
        backendfn(key, JSON.stringify(values))
    }

    const readItem = ({
      key
    }) => {
        const initialValue = getInitialValue(key)
        return initialValue
    }

    const setItem = ({
        key, 
        values,
        tag
    }) => {
        console.log(validator)
        try {
            const _storageCreate =  storageCreate(backendfn, values, tag, validator, key, keyExists)
            return _storageCreate
        } 
        catch (error) {
            throw error
        }
    }
    
    const deleteItem = ({
        key,
        tag
    }) => {
        
        try {
            const _deleteStorage =  deleteStorage(backendfn, validator, key, tag, keyExists)
            return _deleteStorage
        } 
        catch (error) {
            throw error
        }
    }

  return {
    state: { 
      validator,
      validationMessage,
    },
    action: {
      readItem,
      setItem,
      deleteItem,
      custom,
    }
  };
}
