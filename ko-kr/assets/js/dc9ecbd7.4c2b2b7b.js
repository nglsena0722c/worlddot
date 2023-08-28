"use strict";(self.webpackChunkworlddot=self.webpackChunkworlddot||[]).push([[129],{54244:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(86010),l=r(67294);const n=e=>{let{className:t,title:r,children:n}=e;return l.createElement("div",{className:(0,a.Z)("px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",t)},l.createElement("div",{className:"p-5"},l.createElement("h5",{className:"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},r),l.createElement("p",{className:"mb-3 font-normal text-gray-700 dark:text-gray-400"},n)))}},13776:(e,t,r)=>{r.d(t,{Z:()=>a});const a="xpla137jkvee9nvc0ye6m43r336c28cvjl8z0cjtghg5vcj3w0svp4xwqxgkjnj"},22873:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(67294),l=r(88767);const n=e=>{let{children:t}=e;const r=new l.QueryClient;return a.createElement(l.QueryClientProvider,{client:r},t)}},53104:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(30826),l=r(88767);const n=e=>{const t=new a.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,l.useQuery)("get_contract_config",(async()=>await t.wasm.contractQuery(e,{config:{}})),{staleTime:1/0,cacheTime:1/0})}},80928:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(30826),l=r(88767);const n=()=>{const e=new a.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,l.useQuery)(["latest_block"],(async()=>(await e.tendermint.blockInfo()).block.last_commit.height),{refetchInterval:6e3,staleTime:6e3,cacheTime:6e3})}},17498:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>C,contentTitle:()=>v,default:()=>L,frontMatter:()=>p,metadata:()=>E,toc:()=>N});var a=r(87462),l=r(67294),n=r(3905),c=r(32624),o=r(52252),s=r(30826),d=r(88767);const i=(e,t)=>{const r=new s.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,d.useQuery)(["user_lock_data"],(async()=>await r.wasm.contractQuery(e,{user_lock_data:{user:t}})),{staleTime:1/0,cacheTime:1/0})};var m=r(53104),u=r(80928),g=r(54244),k=r(86010),b=r(13776);const h=e=>{let{contractAddress:t,connectedWallet:r,contractConfig:a,latestBlock:n}=e;const{isSuccess:o,status:s,data:d}=i(t,r.xplaAddress);return o?l.createElement("div",{className:(0,k.Z)("mt-8 px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700")},l.createElement("div",{className:"p-5 w-full"},l.createElement("h5",{className:"w-full flex justify-between items-center  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},l.createElement("span",null,"Your Lock Info :")),d?.map((e=>l.createElement(y,{key:e[1].x+e[1].y+e[1].lock.amount,contractConfig:a,contractAddress:t,connectedWallet:r,latestBlock:n,datum:e}))))):"error"===s?l.createElement("div",{className:(0,k.Z)(" px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700")},l.createElement("div",{className:"p-5 w-full"},l.createElement("h5",{className:"w-full flex justify-between items-center  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},l.createElement("span",null,"Your Lock Info :")),l.createElement("div",null,"You don't have any locked dot yet."))):l.createElement(c.Z,null)},x=()=>{const e=(0,o.Yk)(),{isLoading:t,data:r}=(0,u.Z)(),{isLoading:a,data:n}=(0,m.Z)(b.Z);return!e||t?l.createElement(c.Z,null):l.createElement(l.Fragment,null,l.createElement(g.Z,{title:"Block Info",children:l.createElement(l.Fragment,null,l.createElement("div",null,"Latest Block : ",r),!a&&l.createElement("div",null,"Lock Block Height : ",n.lock_block_height))}),l.createElement("br",null),l.createElement(h,{contractConfig:n,contractAddress:b.Z,connectedWallet:e,latestBlock:r}))},y=e=>{let{contractAddress:t,connectedWallet:r,contractConfig:a,latestBlock:n,datum:c}=e;const[d,i]=(0,l.useState)(null),[m,u]=(0,l.useState)(null);return l.createElement(l.Fragment,null,l.createElement("div",{className:"flex w-full justify-between"},l.createElement("div",{className:"w-full relative "},l.createElement("div",{className:"w-full my-4",style:{border:"1px solid gray"}}),!c[1].unlocked&&Number(n)<a.lock_block_height+Number(c[0])&&l.createElement("div",{className:"text-[#ff0000]"},`You can't claim this dot. You need to wait ${a.lock_block_height-(Number(n)-c[0])} block.`),"Lock Block Height :",1===c[0]?"Your dot is unlocked.":c[0],l.createElement("br",null),"dot - X : ",c[1].x," ",l.createElement("br",null),"dot - Y : ",c[1].y," ",l.createElement("br",null),"color : ",c[1].color," ",l.createElement("br",null),"Lock Amount : ",c[1].lock.amount," ",l.createElement("br",null),l.createElement("button",{className:"absolute right-0 top-8 cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",onClick:async()=>{const e={msgs:[new s.MsgExecuteContract(r.xplaAddress,t,{claim_lock_amount:{user:r.xplaAddress,block_height:Number(c[0])}},void 0)]};try{const t=await r.post(e);i(t)}catch(a){a instanceof o.T$?u("User Denied"):u(`Unknown Error: ${a instanceof Error?a.message:String(a)}`)}}},"claim"))),d&&l.createElement("div",{className:"mt-4 block rounded-lg border bg-white p-6 shadow dark:border-neutral-700 dark:bg-neutral-800 "},l.createElement("div",{className:"flex items-center justify-between gap-4"},"Result",l.createElement("a",{href:`https://explorer.xpla.io/testnet/tx/${d.result.txhash}`,target:"_blank",rel:"noreferrer"},d.result.txhash),l.createElement("span",null,m))))};var f=r(85405),w=(r(34341),r(22873));const p={},v="Claim",E={unversionedId:"Claim",id:"Claim",title:"Claim",description:"",source:"@site/docs/Claim.mdx",sourceDirName:".",slug:"/Claim",permalink:"/worlddot/ko-kr/docs/Claim",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"MyDot",permalink:"/worlddot/ko-kr/docs/MyDot"},next:{title:"Galery - NFT Maker (Coming Soon)",permalink:"/worlddot/ko-kr/docs/Galery - NFT Maker"}},C={},N=[],_={toc:N},Z="wrapper";function L(e){let{components:t,...r}=e;return(0,n.kt)(Z,(0,a.Z)({},_,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"claim"},"Claim"),(0,n.kt)(f.Z,{mdxType:"WalletWrap"},(0,n.kt)(w.Z,{mdxType:"QueryWrap"},(0,n.kt)(x,{mdxType:"Claim"}))))}L.isMDXComponent=!0}}]);