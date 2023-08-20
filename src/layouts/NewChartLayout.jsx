import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DateRangeToolbar from "../components/DateRangeToolbar";
import LeadTimeChart from ".././components/LeadTimeChart";
import Branches from ".././components/Branches";
import Collaborators from "../components/Collaborators";
import MergeSuccessRate from "../components/MergeSuccessRate";
import BarChart from "../components/CommitsBarChart";
import MergedPRCount from "../components/PullRequests/ClosedPrs";
import OpenPullRequests from "../components/PullRequests/OpenPRs";
import ClosedIssues from "../components/Issues/ClosedIssues";
import NewIssues from "../components/Issues/NewIssues";
import Forks from "../components/Forks";
import CommentsPerCodeRatio from "../components/CommentsPerCodeRatio";

const NewChartLayout = () => {
  
  const currRepo = useSelector((state) => state.repo.currRepo);

  return (
// <<<<<<< HEAD
//     <>
//       <div className="w-screen h-full">
//         <div className="flex gap-y-12 p-10">
//           <div className="flex w-full">
//             <div
//               className="grid grid-cols-3 grid-rows-2 gap-x-4 pr-4 text-center"
//               style={{ width: "74%" }}
//             >
//               <div className="flex col-span-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-teal-300 to-sky-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
//                 <Collaborators />
//               </div>
//               <div className="flex col-span-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-purple-400 to-pink-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
//                 <Branches />
//               </div>
//               <div className="flex col-span-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-lime-400 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
//                 <MergeSuccessRate />
//               </div>
//             </div>
//             <div className="w-1/3">
//               <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center">
//                 <div
//                   className="ml-1 w-4/5 rounded-xl shadow-3xl"
//                   style={{ backgroundColor: "#171C2Eff" }}
//                 >
//                   <div className="flex h-28 p-2 items-center justify-center font-bold text-white">
//                     <MergedPRCount />
//                   </div>{" "}
//                 </div>
//                 <div
//                   className="ml-1 w-4/5 rounded-xl shadow-3xl "
//                   style={{
//                     transform: "translateX(-50px)",
//                     backgroundColor: "#171C2Eff",
//                   }}
//                 >
//                   <div className="flex h-28 p-2 items-center justify-center font-bold text-white">
//                     <OpenPullRequests />
//                   </div>
//                 </div>
//                 <div
//                   className="ml-1 w-4/5 rounded-xl shadow-3xl "
//                   style={{ backgroundColor: "#171C2Eff" }}
//                 >
//                   <div className="flex p-2 items-center justify-center h-28 font-bold text-white">
//                     <ClosedIssues />
//                   </div>
//                 </div>
//                 <div
//                   className="ml-1 w-4/5 rounded-xl shadow-3xl "
//                   style={{
//                     transform: "translateX(-50px)",
//                     backgroundColor: "#171C2Eff",
//                   }}
//                 >
//                   <div className="flex h-28 p-2 items-center justify-center font-bold text-white">
//                     <NewIssues />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           className="pl-10 text-center items-center"
//           style={{ transform: "translateY(-150px)" }}
//         >
//           <div
//             className="rounded-xl shadow-3xl text-white"
//             style={{ width: "66%", backgroundColor: "#171C2Eff" }}
//           >
//             <div className="h-56 p-4 font-bold text-white">
//               {" "}
//               Lead Time for Change
//               <LeadTimeChart />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex">
//         <div
//           className="grid grid-cols-2 gap-x-4 gap-y-4 text-center ml-10"
//           style={{ transform: "translateY(-335px)", width: "64%" }}
//         >
//           <div
//             className="flex col-span-1 h-60 p-2 items-center justify-center rounded-xl shadow-3xl text-white"
//             style={{ backgroundColor: "#171C2Eff" }}
//           >
//             Change Failure Rate('CFR')
//           </div>
//           <div
//             className="flex col-span-1 h-60 p-2 justify-center items-center rounded-xl shadow-3xl text-white"
//             style={{ backgroundColor: "#171C2Eff" }}
//           >
//             Issues
//           </div>
//         </div>
//         <div
//           className="grid grid-cols-1 w-96 grid gap-x-4 gap-y-4 text-center"
//           style={{ transform: "translate(20px,-470px)" }}
//         >
//           <div
//             className="flex p-2 justify-center items-center rounded-xl shadow-3xl text-white"
//             style={{
//               height: "375px",
//               width: "90%",
//               backgroundColor: "#171C2Eff",
//             }}
//           >
//             <BarChart fullRepo={currRepo} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// =======
//     <><div className="w-screen h-full">
//           <div className="flex gap-y-12 p-10">
//               <div className="flex w-full" >
//                   <div className="grid grid-cols-3 grid-rows-2 gap-x-4 pr-4 text-center" style={{width: "74%"}}>
//                   <div className="flex col-span-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-teal-300 to-sky-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
//                       <Collaborators fullRepo={currRepo}/>
//                     </div>
//                     <div className="flex col-span-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-purple-400 to-pink-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
//                       <Branches fullRepo={currRepo} />
//                       </div>
//                       <div className="flex col-span-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-lime-400 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
//                       <MergeSuccessRate fullRepo={currRepo}/>
//                       </div>
//                   </div>
//                   <div className="w-1/3">
//                       <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-center">
//                           <div className="ml-1 w-4/5 rounded-xl shadow-3xl" style={{backgroundColor:'#171C2Eff'}}>
    
//                           <div className="flex h-28 p-2 items-center justify-center font-bold text-white"><MergedPRCount fullRepo={currRepo} />
// </div>                          </div>
//                           <div className="ml-1 w-4/5 rounded-xl shadow-3xl " style={{transform: "translateX(-50px)", backgroundColor:'#171C2Eff'}}>
                
//                               <div className="flex h-28 p-2 items-center justify-center font-bold text-white"><OpenPullRequests fullRepo={currRepo}> </OpenPullRequests></div>
//                           </div>
//                           <div className="ml-1 w-4/5 rounded-xl shadow-3xl " style={{backgroundColor:'#171C2Eff'}}>
        
//                               <div className="flex p-2 items-center justify-center h-28 font-bold text-white"  ><ClosedIssues fullRepo = {currRepo}></ClosedIssues></div>
//                           </div>
//                           <div className="ml-1 w-4/5 rounded-xl shadow-3xl " style={{transform: 'translateX(-50px)', backgroundColor:'#171C2Eff' }}>
                
//                               <div className="flex h-28 p-2 items-center justify-center font-bold text-white"><NewIssues fullRepo={currRepo}/></div>
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//           <div className="pl-10 text-center items-center" style={{transform:'translateY(-150px)'}}>
//               <div className="rounded-xl shadow-3xl text-white" style={{width: "66%", backgroundColor:'#171C2Eff'}} >
//               <div className="h-56 p-4 font-bold text-white"> Lead Time for Change<LeadTimeChart repoInfo={repoInfo}/></div>
//               </div>
//           </div>
//       </div><div className="flex">
//               <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-center ml-10" style={{transform: "translateY(-335px)",width: "64%"}}>
//                   <div className="flex col-span-1 h-60 p-2 items-center justify-center rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>Change Failure Rate('CFR')</div>
//                   <div className="flex col-span-1 h-60 p-2 justify-center items-center rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>Issues</div>
//               </div>
//               <div className="grid grid-cols-1 w-96 grid gap-x-4 gap-y-4 text-center" style={{transform: "translate(20px,-470px)" }}>
//                   <div className="flex p-2 justify-center items-center rounded-xl shadow-3xl text-white" style={{height:'375px', width:'90%', backgroundColor:'#171C2Eff'}}><BarChart fullRepo = {currRepo}/></div>
//           </div>
// </div></>
<div className="w-screen h-full overflow-scroll p-10 pb-24 pr-0">
  {/* <div className="flex gap-y-12 p-10"> */}
    {/* <div className="flex w-full" > */}
      <div className="grid grid-cols-9 grid-rows-7 gap-4 pr-4 text-center ">
        <div className="flex col-span-2 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-teal-300 to-sky-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <Collaborators />
        </div>
        <div className="flex col-span-2 col-start-3 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-purple-400 to-pink-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <Branches />
        </div>
        <div className="col-span-5 row-span-2 col-start-1 row-start-2 text-center items-center rounded-xl shadow-3xl text-white h-68 p-4 font-bold" style={{backgroundColor:'#171C2Eff'}}>
          Lead Time for Change<LeadTimeChart />
        </div>
        <div className="flex col-span-2 col-start-5 row-start-1 h-32 p-2 iflex w-full justify-center items-center bg-gradient-to-br from-lime-400 to-green-500 hover:from-pink-500 hover:to-yellow-500 rounded-xl font-bold text-white shadow-2xl">
          <MergeSuccessRate />
        </div>
        <div className="col-start-7 row-start-1 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white" style={{backgroundColor:'#171C2Eff'}}>
          <MergedPRCount />
        </div>
        <div className="col-start-8 row-start-1 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white" style={{backgroundColor:'#171C2Eff'}}>
          <OpenPullRequests /> 
        </div>
        <div className="col-start-7 row-start-2 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white" style={{backgroundColor:'#171C2Eff'}}>
          <ClosedIssues />
        </div>
        <div className="col-start-8 row-start-2 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white" style={{backgroundColor:'#171C2Eff'}}>
          <NewIssues />
        </div>
        <div className="flex row-span-2 col-start-6 row-start-2 rounded-xl shadow-3xl ml-1 h-68 items-center justify-center font-bold text-white bg-gradient-to-br from-yellow-300 to-orange-500 hover:from-pink-500 hover:to-yellow-500 z-10 transition ease-in-out duration-200 hover:w-80 hover:relative hover:right-24" style={{backgroundColor:'#171C2Eff', transition: "ease-in-out 500ms"}}>
          <Forks />
        </div>
        <div className="col-span-2 col-start-7 row-start-3 rounded-xl shadow-3xl ml-1 h-32 p-2 items-center justify-center font-bold text-white bg-gradient-to-br from-rose-400 to-red-700 hover:from-pink-500 hover:to-yellow-500" style={{backgroundColor:'#171C2Eff'}}>
          <CommentsPerCodeRatio />
        </div>
        <div className="col-span-3 row-span-3 col-start-6 row-start-4 ml-1 h-96 p-2 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
          <BarChart fullRepo = {currRepo}/>
        </div>
        <div className="col-span-2 row-span-3 col-start-4 row-start-4 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
          Change Failure Rate (CFR)
        </div>
        <div className="col-span-3 row-span-3 col-start-1 row-start-4 p-2 h-96 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
          Issues
        </div>
        <div className="col-start-4 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
          31
        </div>
        <div className="col-start-5 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
          32
        </div>
        <div className="col-span-3 col-start-1 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
          34
        </div>
        <div className="col-span-3 col-start-6 row-start-7 p-2 h-32 text-center justify-center items-center font-bold rounded-xl shadow-3xl text-white" style={{backgroundColor:'#171C2Eff'}}>
          35
        </div>
      </div>
    {/* </div>   */}
  {/* </div>     */}
</div>
    
)
}

export default NewChartLayout;
