function deepClone(obj){
   let newObj = obj instanceof Array ? [] : {}
   for(let attr in obj){
       if(typeof obj[attr] === 'object' && obj[attr] !==null){
            newObj[attr] = deepClone(obj[attr])
       }else{
           newObj[attr] = obj[attr]
       }
   }
    return newObj
}

export {deepClone}