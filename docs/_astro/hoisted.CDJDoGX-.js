import"./hoisted.D0TBFe3_.js";import"./console.C6gIykV2.js";const b=window.__BASE__||"/";function f(){return window.__endingEngine}function m(){const e=f();if(e){const n=e.evaluateEnding(),r=(JSON.parse(localStorage.getItem("arg_progress")||"{}").discoveredPages||[]).some(l=>l.includes("/hidden/dead-drop")),o=[...n.collected];return r&&n.score>=12&&o.push("举报脚本已触发（郑义·深观）"),{score:n.score,collected:o,hasDeadDrop:r}}return{score:0,collected:[],hasDeadDrop:!1}}function u(e,n){const t=f();if(t)return t.evaluateEnding().ending;let i;return e>=18?i=4:e>=12?i=3:e>=7?i=2:i=1,n&&e>=12&&i<4&&(i=4),i}function p(e,n,t){const i=document.getElementById("phone-result");if(!i)return;let r="";const o=e<7,l=e>=7&&e<12,a=e>=12&&e<18;o?r=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#1677ff;font-weight:bold;margin-bottom:12px;">🚄 铁路12306</div>
          <div style="font-size:0.7rem;color:#666;margin-bottom:8px;text-align:left;line-height:1.6;">
            你凝视着屏幕上的证据碎片——坐标、代号、残缺的日志。<br/><br/>
            你只知道这些事情不对劲，但不知道具体发生了什么、发生在哪里、谁该为此负责。<br/><br/>
            你不知道该举报什么。你甚至不知道该给警察看什么。<br/><br/>
            沉默了很久之后，你打开了12306。
          </div>
          <div style="background:#e6f4ff;padding:8px;border-radius:4px;font-size:0.68rem;color:#555;margin-bottom:8px;">
            贺兰山 → 银川<br/>
            2026年6月7日 · 硬座 · ¥112.00<br/>
            <span style="color:#1677ff;">已出票</span>
          </div>
          <div style="font-size:0.65rem;color:#999;">沈辞的笔记里写过："只查外围，不深入深山禁区。" 你没听他的。</div>
        </div>`:l?r=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#c0392b;font-weight:bold;margin-bottom:12px;">📞 110 报警电话</div>
          <div style="background:#111;color:#4a4;padding:6px 10px;border-radius:4px;font-size:0.62rem;text-align:left;margin-bottom:10px;line-height:1.6;">
            [通话录音 2026-06-05]<br/>
            接警员：110，请问有什么需要帮助的？<br/>
            你：我要举报……一个组织，他们可能跟失踪案有关。<br/>
            接警员：请说明具体情况和地点。<br/>
            你：地点我不太确定，在鄂西……一个废弃矿场。坐标大概是31.12，111.45。<br/>
            接警员：你手上有哪些证据？<br/>
            你：我有一些截图和内部文件……但不太完整。我还在收集。<br/>
            接警员：好的，我们会记录在案。如果证据充分，会有专人与你联系。<br/>
            <span style="color:#888;">[通话结束 · 时长 02:14]</span>
          </div>
          <div style="font-size:0.65rem;color:#999;">信息碎片不足以让警方立即行动。你决定自己去救人。</div>
        </div>`:a?r=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#c0392b;font-weight:bold;margin-bottom:12px;">📞 省公安厅网安总队</div>
          <div style="background:#111;color:#4a4;padding:6px 10px;border-radius:4px;font-size:0.62rem;text-align:left;margin-bottom:10px;line-height:1.6;">
            [举报平台 · 加密通道 · 2026-06-05]<br/>
            举报编号：HB-2026-0605-0047<br/>
            已提交证据：<br/>
            ${n.map(d=>"✓ "+d).join("<br/>")}<br/><br/>
            状态：<span style="color:#f0a030;">已受理 · 调查中</span><br/>
            备注：关键嫌疑人在逃。首座与监院身份尚未确认。建议继续收集证据。
          </div>
          <div style="font-size:0.65rem;color:#999;">警方突袭基地，救出部分受害者。但首座和监院逃脱了。</div>
        </div>`:r=`
        <div style="text-align:center;">
          <div style="font-size:0.8rem;color:#c0392b;font-weight:bold;margin-bottom:12px;">📞 公安部专案组热线</div>
          <div style="background:#111;color:#4a4;padding:6px 10px;border-radius:4px;font-size:0.62rem;text-align:left;margin-bottom:10px;line-height:1.6;">
            [举报平台 · 加密通道 · 2026-06-05]<br/>
            举报编号：GA-2026-0605-0012<br/>
            已提交证据：<br/>
            ${n.map(d=>"✓ "+d).join("<br/>")}<br/><br/>
            附加：郑义（深观）自动举报脚本完整证据包已同步接收。<br/>
            状态：<span style="color:#4a4;">已立案 · 专案组成立</span><br/>
            备注：证据链完整。坐标精确到十米级。受害者身份已核实。资金流已追踪。
          </div>
          <div style="font-size:0.65rem;color:#999;">警方精准突袭。七名受害者全部获救。团伙成员一网打尽。</div>
        </div>`,r+=`
      <div style="margin-top:16px;">
        <button id="ending-proceed-btn" style="padding:8px 24px;background:#333;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.75rem;">
          ${o?"出发":"继续"}
        </button>
      </div>`,i.innerHTML=r,document.getElementById("ending-proceed-btn")?.addEventListener("click",()=>{const d=JSON.parse(localStorage.getItem("arg_progress")||"{}");d.ending=t,d.evidenceScore=e,localStorage.setItem("arg_progress",JSON.stringify(d)),window.location.href=b+"ending/"+t+"/"})}function h(e){const{score:n,collected:t,hasDeadDrop:i}=m(),r=u(n,i),o=e==="ticket"?1:r;document.getElementById("phone-dialer").style.display="none",document.getElementById("phone-result").style.display="block",e==="ticket"?p(1,t,1):p(n,t,o)}document.addEventListener("DOMContentLoaded",()=>{const{collected:e}=m(),n=document.getElementById("phone-evidence-list");n&&(e.length===0?n.innerHTML='<span style="color:#999;">尚未收集到任何证据。</span>':n.innerHTML='<div style="font-weight:bold;margin-bottom:4px;">已收集的证据：</div>'+e.map(t=>"📄 "+t).join("<br/>")),document.querySelectorAll(".phone-action-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.action;h(i)})})});const g={"/trigger/rift":{id:"E1",weight:2,name:"多站钓鱼方案矩阵"},"/trigger/stargate":{id:"E2",weight:2,name:"信号伪造技术方案"},"/trigger/base":{id:"E3",weight:3,name:"基地设施蓝图"},"/hidden/panlongxia":{id:"E4",weight:3,name:"暗网交易市场记录"},"/hidden/board":{id:"E5",weight:2,name:"内部通讯记录"},"/hidden/operation":{id:"E6",weight:2,name:"作案流程手册"},"/hidden/locations":{id:"E7",weight:3,name:"基地精确坐标"},"/hidden/dead-drop":{id:"E8",weight:4,name:"叛变成员举报脚本"}};function v(){const e=JSON.parse(localStorage.getItem("arg_progress")||"{}"),n=e.discoveredPages||[];let t=0;const i=[],r=[];for(const[d,s]of Object.entries(g))n.some(c=>c===d||c===d+"/"||c.replace(/\/$/,"")===d)?(t+=s.weight,i.push(s.name)):r.push(s.name);let o;t>=18?o=4:t>=12?o=3:t>=7?o=2:o=1,n.some(d=>d.includes("/hidden/dead-drop"))&&t>=12&&o!==4&&(o=4),t<7&&e.playerTargeted&&(o=1);const a=Object.values(g).reduce((d,s)=>d+s.weight,0);return{ending:o,score:t,maxScore:a,collected:i,missing:r}}function y(e){return`${window.__BASE__||"/"}ending/${e}/`}typeof window<"u"&&(window.__endingEngine={EVIDENCE_MAP:g,evaluateEnding:v,getEndingUrl:y});
