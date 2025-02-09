import * as Loader from "react-loader-spinner";

export const Loading = () => {
   return (
     <div>
         <Loader.Watch
             height={30}
             width={30}
         />
     </div>
   );
 };
