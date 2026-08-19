
// Reglar Function
const LogFunc = (name: string): string => {
    return `My Name is ${name}`
}

console.log(LogFunc("Onkar"));


// Generics 
const GenFunc = <T>(args: T) => {
    return typeof args
}

console.log(GenFunc(1))
console.log(GenFunc("Name"))
console.log(GenFunc(false))
console.log(GenFunc(undefined))


function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

console.log(firstElement([1, 2, 3, 4]));

const pair = <A, B>(a: A, b: B): [A, B] => {
    return [a, b];
}
console.log(pair(1, "Hey"));


// genrics in Interface type
 