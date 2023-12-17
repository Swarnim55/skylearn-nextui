export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


function strCompare(str1:string,str2:string)
{
  return str1==str2
}

function stringIsEmpty(strs: string[]): boolean {
  for (const str of strs) {
    if (str.trim() === '') {
      return true;
    }
  }
  return false;
}

export {strCompare}