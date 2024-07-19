"use strict";(self.webpackChunkworlddot=self.webpackChunkworlddot||[]).push([[369],{54244:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(86010),n=r(67294);const l=e=>{let{className:t,title:r,children:l}=e;return n.createElement("div",{className:(0,a.Z)("px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",t)},n.createElement("div",{className:"p-5"},n.createElement("h5",{className:"mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},r),n.createElement("p",{className:"mb-3 font-normal text-gray-700 dark:text-gray-400"},l)))}},13776:(e,t,r)=>{r.d(t,{Z:()=>a});const a="xpla137jkvee9nvc0ye6m43r336c28cvjl8z0cjtghg5vcj3w0svp4xwqxgkjnj"},22873:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(67294),n=r(88767);const l=e=>{let{children:t}=e;const r=new n.QueryClient;return a.createElement(n.QueryClientProvider,{client:r},t)}},53104:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(30826),n=r(88767);const l=e=>{const t=new a.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,n.useQuery)("get_contract_config",(async()=>await t.wasm.contractQuery(e,{config:{}})),{staleTime:1/0,cacheTime:1/0})}},80928:(e,t,r)=>{r.d(t,{Z:()=>l});var a=r(30826),n=r(88767);const l=()=>{const e=new a.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,n.useQuery)(["latest_block"],(async()=>(await e.tendermint.blockInfo()).block.last_commit.height),{refetchInterval:6e3,staleTime:6e3,cacheTime:6e3})}},85149:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>A,contentTitle:()=>W,default:()=>P,frontMatter:()=>Z,metadata:()=>T,toc:()=>J});var a=r(87462),n=r(67294),l=r(3905),o=r(32624),c=r(52252),s=r(27715),d=r(48764).Buffer;const{encode:i,decode:u,fromWords:m,toWords:g}=s.bech32,k=e=>{const{words:t}=u(e);return d.from(m(t)).toString("hex").toLowerCase()};var b=r(30826),p=r(88767);const f=e=>{const t=new b.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,p.useQuery)(["get_user_balance",e],(async()=>await t.bank.balance(e).then((e=>{let[t]=e;return t.toString()}))),{staleTime:1/0,cacheTime:1/0})},h=e=>{const t=new b.LCDClient({chainID:"cube_47-5",URL:"https://cube-lcd.xpla.dev"});return(0,p.useQuery)(["lastest_dot"],(async()=>await t.wasm.contractQuery(e,{latest_dots:{}})),{refetchInterval:6e3,staleTime:6e3,cacheTime:6e3})};var y=r(86010),x=r(71393);const w=e=>{let{dot:t,color:r,clicked:a,setClicked:l}=e;const o=!("white"===t.backgroundColor||"#D9D9D9"===t.backgroundColor),c=E(t.X,t.Y,a);return n.createElement("div",{className:"relative",onClick:()=>{const e=JSON.parse(a),n=e.find((e=>e.startsWith(`{"X" : ${t.X},"Y" : ${t.Y}`)));if(void 0===n){e.push(`{"X" : ${t.X},"Y" : ${t.Y}, "backgroundColor" : "${r}", "lock" : 0}`);const a=new Set(e);l(JSON.stringify(Array.from(a)))}else{const t=e.indexOf(n);t>-1&&e.splice(t,1),l(JSON.stringify(e))}}},n.createElement("div",{className:(0,y.Z)("aspect-square","dot-popup-container z-0 border-0",o||c?"hover-opacity":"hover-gray"),style:c?{backgroundColor:r}:{backgroundColor:t.backgroundColor}}),n.createElement("div",{className:(0,y.Z)("absolute left-[100%] top-0 w-[250px] h-[150px] bg-black p-4","dot-popup z-10 border-0 text-white flex items-start justify-center flex-col")},"X : ",t.X,", Y : ",t.Y,o&&n.createElement(n.Fragment,null,n.createElement("br",null),"backgroundColor : ",c?r:t.backgroundColor),n.createElement("br",null),t.dotOwner&&n.createElement("div",null,"Owner : ",(0,x.$G)(t.dotOwner)," ",n.createElement("br",null)),t.lock_amount&&n.createElement("div",null,"Lock XPLA : ",t.lock_amount," ",n.createElement("br",null)),t.painted_block&&n.createElement("div",null,"Painted Block : ",t.painted_block," ",n.createElement("br",null))))},E=(e,t,r)=>0!==JSON.parse(r).map((e=>JSON.parse(e))).filter((r=>r.X===e&&r.Y===t)).length;var v=r(80928),N=r(54244);const C=e=>{let{configData:t,connectedWallet:r,contractAddress:a}=e;const l=t.dotcount,[s,d]=(0,n.useState)("[]"),{isLoading:i,data:u}=(0,v.Z)();(0,n.useEffect)((()=>{const e=[];for(let t=1;t<=l;t++){const r=[];for(let e=1;e<=l;e++)r.push({X:e,Y:t,backgroundColor:(e+t)%2==0?"white":"#D9D9D9"});e.push(r)}d(JSON.stringify(e))}),[]);const{data:m}=h(a);(0,n.useEffect)((()=>{if(m&&0!==m.length){const e=D(s);m.map((t=>{e[t[1].y-1][t[1].x-1]={X:t[1].x,Y:t[1].y,backgroundColor:t[1].color,dotOwner:t[1].dot_owner,lock_amount:t[1].lock?t[1].lock.amount:"0",painted_block:t[0],unlocked:t[1].unlocked}})),d(JSON.stringify(e))}}),[m]);const g=r.xplaAddress,{isLoading:p,data:x}=f(g),E="#"+k(g).slice(0,6),[C,Y]=(0,n.useState)("[]"),[L,S]=(0,n.useState)(null),[_,O]=(0,n.useState)(null),{lockAmount:Z,unlockAmount:W}=X(C,s,t.lock_block_height,Number(u));return n.createElement(n.Fragment,null,n.createElement("div",{className:"grid gap-10 grid-cols-2"},n.createElement(N.Z,{title:"Block Info",children:n.createElement(n.Fragment,null,i?n.createElement(o.Z,null):n.createElement("div",null,"XPLA Latest Block : ",u," "),m&&0!==m.length&&n.createElement("div",null,"lastest Changed Block :"," ",Math.max(...m.map((e=>e[0])))))}),n.createElement(N.Z,{title:"User Info",children:n.createElement(n.Fragment,null,n.createElement("div",null,"Your Balance :"," ",p?n.createElement(o.Z,null):n.createElement("span",null,0===x.length?"0XPLA":(Number(x.substring(0,x.length-5))/10**18).toFixed(2)+" XPLA (Fixed : 2)")),n.createElement("div",{className:"flex items-center gap-2"},"Your Color : ",E," ",n.createElement("div",{className:"h-[20px] aspect-square",style:{border:"1px solid black",backgroundColor:E}})))}),n.createElement(N.Z,{title:"World Dot Info",className:"col-span-2",children:n.createElement("div",null,n.createElement("div",null,"Contract Address : ",a),n.createElement("div",null,"Dot Width : ",t.dotcount),n.createElement("div",null,"Lock Block Height : ",t.lock_block_height))})),n.createElement("div",{className:"mt-8 w-full aspect-square border-2 border-black-600 border-solid grid",style:{gridTemplateColumns:`repeat(${l}, minmax(0, 1fr))`}},D(s).map((e=>e.map((e=>n.createElement(w,{key:e.X+e.Y,dot:e,color:E,clicked:C,setClicked:Y})))))),n.createElement("div",{className:(0,y.Z)("mt-8 px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700")},n.createElement("div",{className:"p-5 w-full"},n.createElement("h5",{className:"w-full flex justify-between items-center  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"},n.createElement("span",null,"You clicked :"),n.createElement("button",{className:" cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",onClick:()=>Y("[]")},"Reset Your Click")),n.createElement("p",{className:"mb-3 font-normal text-gray-700 dark:text-gray-400"},n.createElement("p",null,"If you want to lock, you need to pay XPLA.")),JSON.parse(C).map(((e,t)=>{const r=JSON.parse(e);return n.createElement("div",{key:t,className:"my-4"},n.createElement("div",{className:"w-full mb-4",style:{border:"1px solid gray"}}),"X: ",r.X,n.createElement("br",null),"Y : ",r.Y,n.createElement("br",null),"Lock (You need to input only number!) :"," ",n.createElement("input",{onChange:e=>{let t=Number(e.target.value)||0;const a=JSON.parse(C),n=a.find((e=>e.startsWith(`{"X" : ${r.X},"Y" : ${r.Y}`))),l=a.indexOf(n);a[l]=`{"X" : ${r.X},"Y" : ${r.Y}, "backgroundColor" : "${E}", "lock" : ${t}}`,Y(JSON.stringify(a))},value:r.lock}),n.createElement("br",null))})))),n.createElement("button",{className:"mt-8 w-full cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",onClick:async()=>{const e=JSON.parse(C),t=[];for(let r of e){const e=JSON.parse(r),a=0===e.lock?null:{denom:"axpla",amount:e.lock.toString()};t.push({x:e.X,y:e.Y,color:E,dot_owner:g,lock:a,unlocked:null===a})}const n={msgs:[new b.MsgExecuteContract(g,a,{paint:{user:g,dots:t}},Z+W===0?void 0:[new b.Coin("axpla",(Z+W).toString())])]};try{const e=await r.post(n);S(e),Y("[]")}catch(l){l instanceof c.T$?O("User Denied"):O(`Unknown Error: ${l instanceof Error?l.message:String(l)}`)}}},n.createElement("div",null,"You will Pay : ",Z+W," ",n.createElement("span",{className:"text-[#ff0000]"},"aXPLA")," (You will unLock with"," ",W," ",n.createElement("span",{className:"text-[#ff0000]"},"aXPLA")," and Lock new Block with ",Z," ",n.createElement("span",{className:"text-[#ff0000]"},"aXPLA"),")"),"If you want to paint your dot, click this button."),L&&n.createElement(n.Fragment,null,n.createElement("div",{className:"mt-4 block rounded-lg border bg-white p-6 shadow dark:border-neutral-700 dark:bg-neutral-800 "},n.createElement("div",{className:"flex items-center justify-between gap-4"},"Result",n.createElement("a",{href:`https://explorer.xpla.io/testnet/tx/${L.result.txhash}`,target:"_blank",rel:"noreferrer"},L.result.txhash)))),_&&n.createElement(n.Fragment,null,n.createElement("div",{className:"mt-4 block rounded-lg border bg-white p-6 shadow dark:border-neutral-700 dark:bg-neutral-800 "},n.createElement("div",{className:"flex items-center justify-between gap-4"},"Result",n.createElement("span",null,_)))))},D=e=>JSON.parse(e),X=(e,t,r,a)=>{const n=JSON.parse(t),l=JSON.parse(e);let o=0,c=0;for(let s of l){const e=JSON.parse(s);c+=n[e.Y-1][e.X-1].lock_amount&&r+n[e.Y-1][e.X-1].painted_block>a?Number(n[e.Y-1][e.X-1].lock_amount):0,o+=e.lock}return{lockAmount:o,unlockAmount:c}};var Y=r(53104),L=r(13776);const S=()=>{const{isLoading:e,data:t}=(0,Y.Z)(L.Z),r=(0,c.Yk)(),{status:a,availableConnections:l,connect:s,disconnect:d,wallets:i,refetchStates:u}=(0,c.Os)();return(0,n.useEffect)((()=>{a===c.PR.WALLET_CONNECTED&&i.length>0&&setInterval((()=>{u()}),5e4)}),[a]),e?n.createElement(o.Z,null):r?n.createElement(C,{configData:t,connectedWallet:r,contractAddress:L.Z}):n.createElement("div",null,"Connect Your Wallet")};var _=r(85405),O=(r(34341),r(22873));const Z={},W="World Dot",T={unversionedId:"WorldDot",id:"WorldDot",title:"World Dot",description:"I don't know why, but sometimes the transaction creation fails after a certain amount of time. Therefore, it is recommended to divide and execute transactions several times rather than taking many dots at once.",source:"@site/docs/WorldDot.mdx",sourceDirName:".",slug:"/WorldDot",permalink:"/worlddot/docs/WorldDot",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",next:{title:"MyDot",permalink:"/worlddot/docs/MyDot"}},A={},J=[],I={toc:J},$="wrapper";function P(e){let{components:t,...r}=e;return(0,l.kt)($,(0,a.Z)({},I,r,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"world-dot"},"World Dot"),(0,l.kt)("admonition",{type:"danger"},(0,l.kt)("p",{parentName:"admonition"},"I don't know why, but sometimes the transaction creation fails after a certain amount of time. Therefore, it is recommended to divide and execute transactions several times rather than taking many dots at once.")),(0,l.kt)(_.Z,{mdxType:"WalletWrap"},(0,l.kt)(O.Z,{mdxType:"QueryWrap"},(0,l.kt)(S,{mdxType:"Canvas"}))))}P.isMDXComponent=!0}}]);