import { backend, getInitialValue } from "./backend";
import { WriteToFile } from "./writefile";
import * as localForage from 'localforage';
import { includes } from "lodash";

export function tolocalStorageCreate (
    res, values, tag, validator, key, keyExists
) {
  keyExists()
    switch (res.type) {
        case 'localStorage':
            backend(`${key}_default`, values)
            backend(`__tag_${tag}`, key)
          break;
        case 'localForage':
          if(validator.localForage===false){
            localForage.setItem(`${key}`, values, (err) => {
              localForage.getItem(`${key}`, (err, value) => {
                keyExists()
              })
            });
          }
            localForage.getItem(key, (err, value) => {
              if(value === null){
                localForage.getItem(`__tag_${tag}`, (err, value) => {
                  if(value!==null) {
                    let exists= value.includes(key)
                      if (exists === false) {
                        let _key = value
                        _key.push(key)
                        localForage.setItem(`__tag_${tag}`, _key, (err) => {
                        console.log(err)
                        });
                        _key = []
                      }
                  }else {
                    localForage.setItem(`__tag_${tag}`, [key], (err) => {
                      console.log(err)
                    });
                  }
                })
              }
            })
          break;
          case 'fs':
            WriteToFile(`${key}_default`, JSON.stringify(values), res.name)
            break;
      }
  };

  export function updateLocalStorage (
    res, values, validator, key
) {
    switch (res.type) {
        case 'localStorage':
            backend(`${key}_default`, values)
          break;
        case 'localForage':
            localForage.setItem(`${key}`, values, (err) => {
              localForage.getItem(`${key}`, (err, value) => {
              })
            });
          break;
          case 'fs':
            WriteToFile(`${key}_default`, JSON.stringify(values), res.name)
            break;
      }
  };

  export function deleteLocalStorage (
    res, validator, key , tag
) {
    switch (res.type) {
        case 'localStorage':
          console.log(res, validator, key)
            localStorage.removeItem(`${key}_default`);
          break;
        case 'localForage':
            localForage.removeItem(key).then(function() {
              console.log(key,'is cleared!');
              // localForage.getItem(`__tag_${tag}`, (err, value) => {
              //   if(value!==null) {
              //     let _key = value
              //     _key.splice(_key.indexOf(key), 1)
              //     console.log(_key)
              //     localForage.setItem(`__tag_${tag}`, _key, (err) => {
              //     console.log(err)
              //     });
              //   }
              // })
          }).catch(function(err) {
              console.log(err);
          });
          break;
      }
  };