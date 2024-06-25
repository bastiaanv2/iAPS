var freeaps_glucoseGetLast;(()=>{var e={6237:e=>{function a(e){return e.date||Date.parse(e.display_time)||Date.parse(e.dateString)}function o(e,a){a||(a=0);var o=Math.pow(10,a);return Math.round(e*o)/o}e.exports=function(e){var t=void 0,r=void 0,l=e.length;const u=a(e[0]);var n=[],s=[],c=[],d=[];if(1==l)return{glucose:t.glucose,noise:0,delta:0,shortAvgDelta:0,longAvgDelta:0,date:u,dura_ISF_minutes:0,dura_ISF_average:t.glucose,slope05:0,slope15:0,slope40:0,dura_p:0,delta_pl:0,delta_pn:0,bg_acceleration:0,a_0:0,a_1:0,a_2:0,r_squ:0};for(var g=0,i=0;i<e.length;i++){var _=e[i];if(_.glucose=_.glucose||_.sgv,_.glucose)if(void 0!==t){if(void 0!==t){if("cal"===_.type){g=i;break}if(_.glucose>38&&_.device===t.device){const e=a(oe=_);var v,h=0;if(void 0===e||void 0===r){console.error("Error: date field not found: cannot calculate avgdelta");continue}if(v=Math.round((r-e)/6e4),h=(t.glucose-oe.glucose)/v*5,console.error("then minutesAgo = "+v+" avgDelta = "+o(h,2)),d.push(h),0<v&&v<2.5)t.glucose=(t.glucose+oe.glucose)/2;else if(2.5<v&&v<17.5)s.push(h),2.5<v&&v<7.5&&n.push(h);else{if(!(17.5<v&&v<42.5))break;c.push(h)}}}}else t=_,r=a(_)}var p=0,f=0,M=0,b=0;s.length>0&&(f=s.reduce((function(e,a){return e+a}))/s.length),p=n.length>0?n.reduce((function(e,a){return e+a}))/n.length:f,c.length>0&&(M=c.reduce((function(e,a){return e+a}))/c.length),d.length>0&&(b=d[0],console.error("most actual available avgDelta = "+o(b,2)));var m=t.glucose,w=m,k=0,F=a(t);for(i=1;i<l;i++){const o=e[i],t=a(o);if(m=Math.min(m,o.glucose),w=Math.max(w,o.glucose),w-m>2||F-t>66e4||u-t>36e5)break;k=(u-(F=t))/6e4}t.glucose;var x=0,S=0,D=0,I=0,A=0,q=0;var y=t.glucose,G=t.glucose,L=0;for(i=1;i<l;i++){const o=e[i],t=a(o);if(Math.round((r-t)/6e4)-L>13)break;if(!(o.glucose>.95*G&&o.glucose<1.05*G))break;y+=o.glucose,G=y/(i+1),L=Math.round((r-t)/6e4)}x=1.05,S=1.15,D=1.4,y=0;var E,j,z=0,B=0,C=0,H=7.5;for(i=0;i<l;i++){if(E=i*B==z*z?0:(i*C-z*y)/(i*B-z*z),(j=(r-a(oe=e[i]))/6e4)>H&&7.5==H&&(x=5*-E,H=17.5),j>H&&17.5==H&&(S=5*-E,H=42.5),j>H&&42.5==H){D=5*-E;break}z+=j,B+=j*j,y+=oe.glucose,oe.glucose*oe.glucose,C+=oe.glucose*j}I=0,A=0,q=0;var J,K=0,N=0,O=0,P=0,Q=0;if(l>3){var R=0,T=0,U=0,V=0,W=0,X=0,Y=0,Z=a(e[0]),$=0,ee=300,ae=50;for(i=0;i<l;i++){var oe,te=(a(oe=e[i])-Z)/1e3/ee;if(-te*ee>2820)break;if(te<$-1.5){(i<3||-te*ee<600)&&(I=-$*ee/60,A=0,q=0,K=0,N=0,O=0,P=0,Q=0);break}$=te;var re=oe.glucose/ae;T+=te,U+=Math.pow(te,2),V+=Math.pow(te,3),W+=Math.pow(te,4),R+=re,X+=te*re,Y+=Math.pow(te,2)*re;var le=i+1,ue=0,ne=0,se=0,ce=0;if(le>=4&&-te*ee>=600&&(ue=W*(U*le-T*T)-V*(V*le-T*U)+U*(V*T-U*U),ne=Y*(U*le-T*T)-X*(V*le-T*U)+R*(V*T-U*U),se=W*(X*le-R*T)-V*(Y*le-R*U)+U*(Y*T-X*U),ce=W*(U*R-T*X)-V*(V*R-T*Y)+U*(V*X-U*Y)),0!=ue){var de=ne/ue;E=se/ue;for(var ge=ce/ue,ie=R/le,_e=0,ve=0,he=0;he<=i;he++){var pe=e[he],fe=a(pe);_e+=Math.pow(pe.glucose/ae-ie,2);var Me=(fe-Z)/1e3/ee,be=de*Math.pow(Me,2)+E*Me+ge;ve+=Math.pow(pe.glucose/ae-be,2)}var me=.64;if(0!=_e&&(me=1-ve/_e),le>3&&me>=N){N=me,I=-te*ee/60;A=-50*(de*Math.pow(-1,2)-1*E),q=ae*(de*Math.pow(1,2)+1*E),K=2*de*ae,O=ge*ae,P=E*ae,Q=de*ae,de*ae,E*ae,ge*ae}}}}return J="glucose: "+o(t.glucose,0)+", noise: 0 , delta: "+o(p,0)+", short_avgdelta:  "+o(f,2)+", long_avgdelta: "+o(M,2)+", cgmFlatMinutes: "+o(k,0)+", date: "+t.date+", dura_ISF_minutes: "+o(L,0)+", dura_ISF_average: "+o(G,2)+", slope05 : "+o(x,2)+", slope15: "+o(S,2)+", slope40: "+o(D,2)+", parabola_fit_correlation: "+o(N,4)+", parabola_fit_minutes: "+o(I,2)+", parabola_fit_last_delta: "+o(A,2)+", parabola_fit_next_delta: "+o(q,2)+", parabola_fit_a0: "+o(O,2)+", parabola_fit_a1: "+o(P,2)+", parabola_fit_a2: "+o(Q,2)+", bg_acceleration: "+o(K,2),{glucose:Math.round(1e4*t.glucose)/1e4,noise:0,delta:Math.round(1e4*p)/1e4,short_avgdelta:Math.round(1e4*f)/1e4,long_avgdelta:Math.round(1e4*M)/1e4,avgdelta:Math.round(1e4*b)/1e4,cgmFlatMinutes:Math.round(1e4*k)/1e4,dura_ISF_minutes:Math.round(1e4*L)/1e4,dura_ISF_average:Math.round(1e4*G)/1e4,slope05:Math.round(1e4*x)/1e4,slope15:Math.round(1e4*S)/1e4,slope40:Math.round(1e4*D)/1e4,dura_p:Math.round(1e4*I)/1e4,delta_pl:Math.round(1e4*A)/1e4,delta_pn:Math.round(1e4*q)/1e4,bg_acceleration:K,r_squ:Math.round(1e4*N)/1e4,a_0:Math.round(1e4*O)/1e4,a_1:Math.round(1e4*P)/1e4,a_2:Math.round(1e4*Q)/1e4,pp_debug:J,date:r,last_cal:g,device:t.device}}}},a={};var o=function o(t){var r=a[t];if(void 0!==r)return r.exports;var l=a[t]={exports:{}};return e[t](l,l.exports,o),l.exports}(6237);freeaps_glucoseGetLast=o})();