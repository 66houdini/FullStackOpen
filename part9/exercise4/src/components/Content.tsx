interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => {
        switch (part.kind) {
          case "normal":
          case "group":
            return (
              <p key={index}>
               <strong>{part.name} {part.exerciseCount}</strong> 
                <br />
                project exercises {part.groupProjectCount}
              </p>
            );
          case "submission":
            return (
              <p key={index}>
                {part.name} {part.exerciseCount} {part.description}
              </p>
            );
          case "special":
            return (
              <p key={index}>
                
                  <strong>{part.name} {part.exerciseCount}</strong>
                  <br />
                Description: {part.description}
                <br />
                {("requirements" in part) && (
                  <>required skills: {part.requirements.join(", ")}</>
                )}
              </p>
            );
            case "basic":
              return (
                <p key={index}>
                  <strong>{part.name} {part.exerciseCount}</strong>
                  <br />
                  {part.description}
                </p>
              );
            case "background":
              return (
                <p key={index}>
                  <strong>{part.name} {part.exerciseCount}</strong>
                  <br />
                  {part.description}
                  <br />
                  submit to: {part.backgroundMaterial}
                </p>
              );
          default:
            return assertNever(part);
            throw new Error(`Unhandled discriminated union member: ${JSON.stringify(part)}`)
            // return (
            //   <div key={index}>
            //     <p><strong>{part.name} {part.exerciseCount}</strong></p>
            //     {part.description}
            //   </div>
            // )
        }
      })}
    </div>
  );
};

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export default Content;



// interface ContentProps {
//   // name: string;
//   // exerciseCount: number;
//   courseParts: CoursePart[]
// }

// const Content = (props: ContentProps) => {
//  return (
//     <div>
//         {props.courseParts.map((part, index) => (
//             <p key={index}>{part.name} {part.exerciseCount}</p>
//         ))}
//     </div>
//  )
// };

// export default Content;
