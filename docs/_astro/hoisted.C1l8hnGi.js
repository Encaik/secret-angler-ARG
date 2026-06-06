import"./hoisted.D0TBFe3_.js";import"./console.C6gIykV2.js";const f=window.__BASE__||"/";function p(){return window.__endingEngine}function m(){const e=p();if(e){const o=e.evaluateEnding(),d=(JSON.parse(localStorage.getItem("arg_progress")||"{}").discoveredPages||[]).some(r=>r.includes("/hidden/dead-drop"));return{score:o.score,hasDeadDrop:d,shenciSaved:e.isShenciSaved(o.score)}}return{score:0,hasDeadDrop:!1,shenciSaved:!1}}function b(e,o){const n=p();if(n)return n.evaluateEnding().ending;let t;return e>=18?t=4:e>=12?t=3:e>=7?t=2:t=1,o&&e>=12&&t<4&&(t=4),t}function u(e,o,n,t){const d=document.getElementById("phone-result");if(!d)return;const r=e<7,l=e>=7&&e<12;let s="";if(t==="ticket")s=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#1677ff;font-weight:bold;margin-bottom:12px;">🚄 铁路12306</div>
          <div style="font-size:0.68rem;color:#666;margin-bottom:10px;text-align:left;line-height:1.7;">
            你关掉了证据页面，打开了12306。<br/><br/>
            贺兰山 → 银川。2026年6月7日。硬座。¥112.00。<br/><br/>
            沈辞的笔记里写过"只查外围，不深入深山禁区"。你没听他的。
          </div>
          <div style="background:#e6f4ff;padding:8px;border-radius:4px;font-size:0.65rem;color:#555;margin-bottom:8px;">
            订单号：E84903216<br/>
            状态：<span style="color:#1677ff;">已出票</span>
          </div>
        </div>`;else if(r)s=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#c0392b;font-weight:bold;margin-bottom:12px;">📞 110 报警电话</div>
          <div style="background:#111;color:#4a4;padding:6px 10px;border-radius:4px;font-size:0.62rem;text-align:left;margin-bottom:10px;line-height:1.6;">
            [通话录音 2026-06-05]<br/>
            接警员：110，请讲。<br/>
            你：我要举报一个犯罪组织……但我手头的证据不够完整。<br/>
            接警员：请提供具体地点和证据材料。<br/>
            你：……我只有一些零散的截图和代号。没有具体坐标。<br/>
            接警员：没有具体地点和实质性证据，我们无法立案。建议你先收集更多材料。<br/>
            <span style="color:#888;">[通话结束 · 时长 01:47]</span>
          </div>
          <div style="font-size:0.65rem;color:#999;">你手上的东西不足以让警方介入。你只能自己去——或者永远不去。</div>
        </div>`;else if(l&&!o)s=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#c0392b;font-weight:bold;margin-bottom:12px;">📞 110 报警电话</div>
          <div style="background:#111;color:#4a4;padding:6px 10px;border-radius:4px;font-size:0.62rem;text-align:left;margin-bottom:10px;line-height:1.6;">
            [通话录音 2026-06-05]<br/>
            接警员：110，请讲。<br/>
            你：我要举报鄂西一个废弃矿洞里关着人。坐标31.12，111.45。我手上有内部文件和通讯记录。<br/>
            接警员：请保持电话通畅，我为你转接刑侦支队。<br/><br/>
            [加密举报平台 · 2026-06-05]<br/>
            举报编号：HB-2026-0605-0047<br/>
            状态：<span style="color:#f0a030;">已受理 · 证据核查中</span><br/>
            预计完成取证：6-10个工作日<br/><br/>
            <span style="color:#c0392b;">6月8日，外院医生飞抵基地。甲辰003配型确认。</span>
          </div>
          <div style="font-size:0.65rem;color:#999;">警方最终突袭了基地。另外三人获救。沈辞没赶上。</div>
        </div>`;else{const i=e>=18;s=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#c0392b;font-weight:bold;margin-bottom:12px;">📞 ${i?"公安部专案组热线":"省公安厅网安总队"}</div>
          <div style="background:#111;color:#4a4;padding:6px 10px;border-radius:4px;font-size:0.62rem;text-align:left;margin-bottom:10px;line-height:1.6;">
            [举报平台 · 加密通道 · 2026-06-05]<br/>
            举报编号：${i?"GA-2026-0605-0012":"HB-2026-0605-0047"}<br/>
            提交材料：${i?"完整证据链（含资金流水、基地坐标、医疗合作名单、全部钓鱼站点数据）+ 郑义自动举报脚本已同步接收":"暗网交易记录 + 基地坐标 + 作案流程文件"}<br/><br/>
            ${i?'状态：<span style="color:#4a4;">已立案 · 专案组成立 · 即刻出警</span><br/>证据链完整。坐标精确到十米级。受害者身份全部核实。6月5日当晚突袭。':'状态：<span style="color:#4a4;">已立案 · 即刻出警</span><br/>坐标明确，证据充分。6月5日当晚跨省联合行动。'}<br/><br/>
            <span style="color:#4a4;">抵达时间：6月5日 23:40。甲辰003（沈辞）尚在体检区，未进入手术排程。</span>
          </div>
          <div style="font-size:0.65rem;color:#999;">${i?"全链覆灭。全部受害者获救。":"基地被捣毁。全部受害者获救。部分涉案人员在逃。"}</div>
        </div>`}s+=`
      <div style="margin-top:14px;">
        <button id="ending-proceed-btn" style="padding:8px 24px;background:#333;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">
          继续
        </button>
      </div>`,d.innerHTML=s,document.getElementById("ending-proceed-btn")?.addEventListener("click",()=>{const i=JSON.parse(localStorage.getItem("arg_progress")||"{}");i.ending=n,i.evidenceScore=e,localStorage.setItem("arg_progress",JSON.stringify(i)),window.location.href=f+"ending/"+n+"/"})}function v(e){const{score:o,hasDeadDrop:n,shenciSaved:t}=m(),d=b(o,n),r=e==="ticket"?1:d,l=e==="ticket"?!1:t;document.getElementById("phone-dialer").style.display="none",document.getElementById("phone-result").style.display="block",u(e==="ticket"?1:o,l,r,e)}document.addEventListener("DOMContentLoaded",()=>{const e=document.getElementById("phone-modal");document.getElementById("open-phone-btn")?.addEventListener("click",()=>{e&&(e.style.display="flex")}),e?.addEventListener("click",n=>{n.target===e&&(e.style.display="none")}),document.querySelectorAll(".phone-action-btn").forEach(n=>{n.addEventListener("click",()=>{const t=n.dataset.action;v(t)})})});const g={"/trigger/rift":{id:"E1",weight:2,name:"多站钓鱼方案矩阵"},"/trigger/stargate":{id:"E2",weight:2,name:"信号伪造技术方案"},"/trigger/base":{id:"E3",weight:3,name:"基地设施蓝图"},"/hidden/panlongxia":{id:"E4",weight:3,name:"暗网交易市场记录"},"/hidden/board":{id:"E5",weight:2,name:"内部通讯记录"},"/hidden/operation":{id:"E6",weight:2,name:"作案流程手册"},"/hidden/locations":{id:"E7",weight:3,name:"基地精确坐标"},"/hidden/dead-drop":{id:"E8",weight:4,name:"叛变成员举报脚本"}};function h(){const e=JSON.parse(localStorage.getItem("arg_progress")||"{}"),o=e.discoveredPages||[];let n=0;const t=[],d=[];for(const[i,a]of Object.entries(g))o.some(c=>c===i||c===i+"/"||c.replace(/\/$/,"")===i)?(n+=a.weight,t.push(a.name)):d.push(a.name);let r;n>=18?r=4:n>=12?r=3:n>=7?r=2:r=1,o.some(i=>i.includes("/hidden/dead-drop"))&&n>=12&&r!==4&&(r=4),n<7&&e.playerTargeted&&(r=1);const s=Object.values(g).reduce((i,a)=>i+a.weight,0);return{ending:r,score:n,maxScore:s,collected:t,missing:d}}function y(e){return`${window.__BASE__||"/"}ending/${e}/`}function E(e){return e>=12}typeof window<"u"&&(window.__endingEngine={EVIDENCE_MAP:g,evaluateEnding:h,getEndingUrl:y,isShenciSaved:E});
