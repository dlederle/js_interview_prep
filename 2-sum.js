//Given an unsorted array and value s, find all pairs within the array that add up to S

function twoSum(arr, s) {
  const retArr = [];
  arr.map((el) => {
    if(arr.includes(s-el)) {
      const response = [el, s-el];
      retArr.push(response);
    }
  });
  return retArr;
}

console.log(twoSum([2, 2, 1, 1], 4));
