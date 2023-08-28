"use strict";(self.webpackChunkworlddot=self.webpackChunkworlddot||[]).push([[739],{54244:(e,t,l)=>{l.d(t,{Z:()=>n});var r=l(86010),a=l(67294);const n=e=>{let{className:t,title:l,children:n}=e;return a.createElement("div",{className:(0,r.Z)("px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",t)},a.createElement("div",{className:"p-5"},a.createElement("h5",{className:"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},l),a.createElement("p",{className:"mb-3 font-normal text-gray-700 dark:text-gray-400"},n)))}},13776:(e,t,l)=>{l.d(t,{Z:()=>r});const r="xpla137jkvee9nvc0ye6m43r336c28cvjl8z0cjtghg5vcj3w0svp4xwqxgkjnj"},22873:(e,t,l)=>{l.d(t,{Z:()=>n});var r=l(67294),a=l(88767);const n=e=>{let{children:t}=e;const l=new a.QueryClient;return r.createElement(a.QueryClientProvider,{client:l},t)}},53104:(e,t,l)=>{l.d(t,{Z:()=>n});var r=l(30826),a=l(88767);const n=e=>{const t=new r.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,a.useQuery)("get_contract_config",(async()=>await t.wasm.contractQuery(e,{config:{}})),{staleTime:1/0,cacheTime:1/0})}},80928:(e,t,l)=>{l.d(t,{Z:()=>n});var r=l(30826),a=l(88767);const n=()=>{const e=new r.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,a.useQuery)(["latest_block"],(async()=>(await e.tendermint.blockInfo()).block.last_commit.height),{refetchInterval:6e3,staleTime:6e3,cacheTime:6e3})}},56799:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>D,contentTitle:()=>v,default:()=>M,frontMatter:()=>h,metadata:()=>E,toc:()=>C});var r=l(87462),a=l(67294),n=l(3905),c=l(32624),o=l(52252),d=l(30826),s=l(88767);const m=(e,t)=>{const l=new d.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,s.useQuery)(["user_lock_data"],(async()=>await l.wasm.contractQuery(e,{user_dots:{user:t}})),{staleTime:1/0,cacheTime:1/0})};var i=l(53104),u=l(80928),k=l(54244),y=l(86010),g=l(13776);const b=e=>{let{contractAddress:t,connectedWallet:l,contractConfig:r,latestBlock:n}=e;const{isLoading:o,data:d}=m(t,l.xplaAddress);return o?a.createElement(c.Z,null):a.createElement("div",{className:(0,y.Z)("mt-8 px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700")},a.createElement("div",{className:"p-5 w-full"},a.createElement("h5",{className:"w-full flex justify-between items-center  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},a.createElement("span",null,"Your Lock Info :")),d.map((e=>a.createElement(w,{key:e.x+e.y,contractConfig:r,contractAddress:t,connectedWallet:l,latestBlock:n,datum:e}))),0===d.length&&a.createElement("div",null,"You don't have any dot yet.")))},p=()=>{const e=(0,o.Yk)(),{isLoading:t,data:l}=(0,u.Z)(),{isLoading:r,data:n}=(0,i.Z)(g.Z);return!e||t?a.createElement(c.Z,null):a.createElement(a.Fragment,null,a.createElement(k.Z,{title:"Block Info",children:a.createElement(a.Fragment,null,a.createElement("div",null,"Latest Block : ",l),!r&&a.createElement("div",null,"Lock Block Height : ",n.lock_block_height))}),a.createElement("br",null),a.createElement(b,{contractConfig:n,contractAddress:g.Z,connectedWallet:e,latestBlock:l}))},w=e=>{let{contractAddress:t,connectedWallet:l,contractConfig:r,latestBlock:n,datum:c}=e;return a.createElement(a.Fragment,null,a.createElement("div",{className:"flex w-full justify-between"},a.createElement("div",{className:"w-full"},a.createElement("div",{className:"w-full my-4",style:{border:"1px solid gray"}}),"dot - X : ",c.x," ",a.createElement("br",null),"dot - Y : ",c.y," ",a.createElement("br",null),"color : ",c.color," ",a.createElement("br",null),c.lock?a.createElement(a.Fragment,null,"Lock Amount : ",c.lock?.amount," ",a.createElement("br",null)):a.createElement(a.Fragment,null,"No Lock",a.createElement("br",null)))))};var x=l(85405),f=(l(34341),l(22873));const h={},v="MyDot",E={unversionedId:"MyDot",id:"MyDot",title:"MyDot",description:"",source:"@site/docs/MyDot.mdx",sourceDirName:".",slug:"/MyDot",permalink:"/worlddot/ko-kr/docs/MyDot",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"World Dot",permalink:"/worlddot/ko-kr/docs/WorldDot"},next:{title:"Claim",permalink:"/worlddot/ko-kr/docs/Claim"}},D={},C=[],Z={toc:C},L="wrapper";function M(e){let{components:t,...l}=e;return(0,n.kt)(L,(0,r.Z)({},Z,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"mydot"},"MyDot"),(0,n.kt)(x.Z,{mdxType:"WalletWrap"},(0,n.kt)(f.Z,{mdxType:"QueryWrap"},(0,n.kt)(p,{mdxType:"MyDot"}))))}M.isMDXComponent=!0}}]);