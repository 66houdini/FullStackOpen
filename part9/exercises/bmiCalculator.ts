// interface Values {
//     weight: number,
//     height: number,
// }

// const parseValues = (args: string[]): Values => {
//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//           weight: Number(args[2]),
//           height: Number(args[3])
//         }
//       } else {
//         throw new Error('Provided values were not numbers!');
//       }
// }


export const bmiCalculator = (weight: number, height: number ) => {
    const result = weight /(height* height);
    if (result <= 18.5) {
        return `Underweight`
    } else if (result >= 18.5 && result <= 24.9){
       return  `Normal(healthy weight)`
    } else if (result >= 25 && result <= 29.9){
        return `Overweight`
    } else {
        return "obese"
    }}

// try {
//     const {weight, height} = parseValues(process.argv)
//     console.log(bmiCalculator(weight, height))
// }catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }
