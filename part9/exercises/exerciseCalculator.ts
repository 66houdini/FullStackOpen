// interface InputValues {
//     target: number,
//     info: number[]
// }

// const parseVal = (args: string[]): InputValues => {
    
//     return {
//         target: Number(args[2]),
//         info: args.slice(3).map(arg => Number(arg))
//     }
// }


interface Results {
    periodLength: number;
    trainingDay: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}


export const calculateExercises = (info: number[], target:number): Results => {
    const sum: number = info.reduce((acc, num) => acc+ num, 0)
    const success = true? info.filter(num => num!==0).length >= target : false
    let ratingDesc = null;
    if (sum < 7 ){
        ratingDesc = "You can do better";
    } else if (sum > 7 && sum < 14) {
        ratingDesc = "keep up the good work";
    } else {
        ratingDesc = "going well"
    }
    return {
        periodLength: info.length,
        trainingDay: info.filter(num => num!==0).length,
        success: success,
        rating:2,
        ratingDescription: ratingDesc,
        target: target,
        average: sum/ info.length
    }
}

// try {
//     const {target, info} = parseVal(process.argv)
//     console.log(calculateExercises(info, target))
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.'
//     if (error instanceof Error) {
//       errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
//   }
