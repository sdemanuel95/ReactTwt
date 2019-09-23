class Util {
  removeFromArray(dateToRemove, Array){
    Array.forEach( (item, index) => {
      if(item == dateToRemove) this.documents.Array(index,1);
    });
    return Array;
 }
}
 export default Util;