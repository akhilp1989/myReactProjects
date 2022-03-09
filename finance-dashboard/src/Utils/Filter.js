class Filter  {

    getFilteredData = (arr,searchText)=>{
        const searchTerm = searchText.toLowerCase();
        let newArr = [];
        if(!searchTerm) return arr;
        else{
            //debugger;
            newArr = arr.filter(item =>{
                return Object.keys(item).some(key=>{
                    const kvp = item[key];
                    if(typeof(kvp)=== 'object'){
                        return this.searchObject(kvp,searchTerm);
                    }
                    else if(typeof(kvp) == 'string'){
                        return kvp.toLowerCase().includes(searchTerm);
                    }
                })
            })
        }
        return newArr;
    }
    searchObject = (obj,searchKey)=>{
       // console.log('1,',obj);
        return Object.keys(obj).some(key=>{
           //console.log('2=',key,obj[key])
            if(isNaN(obj[key])){
                return obj[key].toLowerCase().includes(searchKey)
            }
            else{
                return obj[key] === Math.floor(searchKey);
            }
        })
    }
  
}
export let utils = new Filter()