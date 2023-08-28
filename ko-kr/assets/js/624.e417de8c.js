"use strict";(self.webpackChunkworlddot=self.webpackChunkworlddot||[]).push([[624],{32624:(r,e,t)=>{t.d(e,{Z:()=>N});var a=t(63366),s=t(87462),i=t(67294),o=t(63961),n=t(94780),l=(t(27278),t(48137));t(90602),t(8679);function c(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];return(0,l.O)(e)}var d=function(){var r=c.apply(void 0,arguments),e="animation-"+r.name;return{name:e,styles:"@keyframes "+e+"{"+r.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}};var h=t(98216),m=t(416),v=t(2641),u=t(1588),f=t(34867);function k(r){return(0,f.Z)("MuiCircularProgress",r)}(0,u.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var p=t(85893);const y=["className","color","disableShrink","size","style","thickness","value","variant"];let S,g,Z,w,x=r=>r;const b=44,P=d(S||(S=x`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),C=d(g||(g=x`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),M=(0,v.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[t.variant],e[`color${(0,h.Z)(t.color)}`]]}})((({ownerState:r,theme:e})=>(0,s.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:e.transitions.create("transform")},"inherit"!==r.color&&{color:(e.vars||e).palette[r.color].main})),(({ownerState:r})=>"indeterminate"===r.variant&&c(Z||(Z=x`
      animation: ${0} 1.4s linear infinite;
    `),P))),D=(0,v.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),$=(0,v.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.circle,e[`circle${(0,h.Z)(t.variant)}`],t.disableShrink&&e.circleDisableShrink]}})((({ownerState:r,theme:e})=>(0,s.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:r})=>"indeterminate"===r.variant&&!r.disableShrink&&c(w||(w=x`
      animation: ${0} 1.4s ease-in-out infinite;
    `),C))),N=i.forwardRef((function(r,e){const t=(0,m.Z)({props:r,name:"MuiCircularProgress"}),{className:i,color:l="primary",disableShrink:c=!1,size:d=40,style:v,thickness:u=3.6,value:f=0,variant:S="indeterminate"}=t,g=(0,a.Z)(t,y),Z=(0,s.Z)({},t,{color:l,disableShrink:c,size:d,thickness:u,value:f,variant:S}),w=(r=>{const{classes:e,variant:t,color:a,disableShrink:s}=r,i={root:["root",t,`color${(0,h.Z)(a)}`],svg:["svg"],circle:["circle",`circle${(0,h.Z)(t)}`,s&&"circleDisableShrink"]};return(0,n.Z)(i,k,e)})(Z),x={},P={},C={};if("determinate"===S){const r=2*Math.PI*((b-u)/2);x.strokeDasharray=r.toFixed(3),C["aria-valuenow"]=Math.round(f),x.strokeDashoffset=`${((100-f)/100*r).toFixed(3)}px`,P.transform="rotate(-90deg)"}return(0,p.jsx)(M,(0,s.Z)({className:(0,o.Z)(w.root,i),style:(0,s.Z)({width:d,height:d},P,v),ownerState:Z,ref:e,role:"progressbar"},C,g,{children:(0,p.jsx)(D,{className:w.svg,ownerState:Z,viewBox:"22 22 44 44",children:(0,p.jsx)($,{className:w.circle,style:x,ownerState:Z,cx:b,cy:b,r:(b-u)/2,fill:"none",strokeWidth:u})})}))}))}}]);