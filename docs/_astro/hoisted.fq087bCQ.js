import"./hoisted.RJw2xY92.js";const n=localStorage.getItem("arg_logged_in"),e=localStorage.getItem("arg_username");if(n==="true"&&e){document.getElementById("not-logged-in").style.display="none",document.getElementById("inbox-content").style.display="block",document.getElementById("inbox-user").textContent={lyu:"signal_屿",shenci:"地下三尺"}[e]||e,o(e);const t=JSON.parse(localStorage.getItem("arg_progress")||"{}");t.discoveredClues||(t.discoveredClues=[]),t.discoveredClues.includes("inbox_visited")||(t.discoveredClues.push("inbox_visited"),t.explorationProgress=(t.explorationProgress||0)+5,localStorage.setItem("arg_progress",JSON.stringify(t))),e==="lyu"&&!t.discoveredClues.includes("shenci_credentials")&&(t.discoveredClues.push("shenci_credentials"),t.explorationProgress=(t.explorationProgress||0)+5,localStorage.setItem("arg_progress",JSON.stringify(t)))}function o(t){const s=document.getElementById("inbox-messages");t==="shenci"?s.innerHTML=`
        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>signal_屿</strong>
            <span class="text-muted">2026-05-24 凌晨 2:05</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            大半夜的别折腾了，早点睡。装备明天再检查也来得及。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            对了，你说把数据整理好了放在账号里——我去看了，但没找到你说的那个<strong>资料区</strong>。你是不是又把东西藏在什么奇怪的地方了？
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            路上注意安全。贺兰山那边蝮蛇多，把蛇药带上。
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>signal_屿</strong>
            <span class="text-muted">2026-05-23 22:30</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            神农架那个石阵的分析我看了。1500°C的熔化痕迹……如果排除火山和陨石，那只有一种可能：<strong>人为高温处理</strong>。但谁会跑到深山里用1500°C烧一块石头？
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            篝火残骸这个细节很重要。我去的几个目击点也有<strong>一模一样的情况</strong>——新得不像超过一周的火堆。而且每次都刚好在点位附近。
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px; border-left: 3px solid var(--color-accent); padding-left: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>signal_屿</strong>
            <span class="text-muted">2026-05-20 17:15</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            你说的那个加密笔记我找到了——但你设的密码也太"你"了。贺兰山拼音加出生年？稍微了解你一点的人都能猜到……
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            不过话说回来，你上次提到在你主页上留了一份<strong>只有登录你账号才能看到的"备忘录"</strong>。我登上去翻了半天，确实找到了——那个私密草稿里的<strong>绿色字符串</strong>是什么东西？看起来像是某种编码。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            你是不是又在玩你那些编码把戏？至少给点提示，别每次都让我猜。
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>signal_屿</strong>
            <span class="text-muted">2026-05-18 21:40</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            秦岭那个摩崖石刻我也去验证了——坐标没错，但现场确实<strong>什么都没有</strong>。别说石刻了，那面崖壁光滑得不像自然形成的。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            我越来越觉得这个站的信息源有问题。不是信息采集失误的问题——是有人<strong>故意在发布虚假坐标</strong>。但动机是什么？
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>signal_屿</strong>
            <span class="text-muted">2026-05-15 14:22</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            我把目击点坐标发你了。47个点，热力图三个聚集区全在北纬30-45。你上次说你探过的古迹也在这个纬度带——我刚才拉了一下数据，<strong>重合率超过70%</strong>。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            这不可能只是巧合。要么有人在利用这些坐标做某些事，要么发布这些信息的"人"本身就有问题。
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>signal_屿</strong>
            <span class="text-muted">2026-05-12 20:08</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            看了你的装备清单，基本没问题。不过建议多带一组备用电池——GPS在低温下掉电快。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            另外，我之前扫频的时候发现一个规律：<strong>信号出现的时间总是和站内推送新点位的时间高度吻合</strong>。回头我把对比数据发你。
          </p>
        </div>
      `:s.innerHTML=`
        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>地下三尺</strong>
            <span class="text-muted">2026-05-24 凌晨 1:23</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            明天一早就出发了。睡不着，又把装备检查了一遍。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            我把之前聊的那些数据整理好了，放在我账号的资料区了。你登录进去就能看到——账号和密码之前告诉过你，就在那条消息里。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            等我回来咱们碰一下。有些事我想当面跟你说。
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>地下三尺</strong>
            <span class="text-muted">2026-05-23 23:47</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            神农架那个点我去过了。石阵是<strong>自然形成</strong>的，不是人工。但那块祭坛石上的熔化痕迹——<strong>1500°C以上</strong>才能造成。没有火山，没有陨石坑。你觉得是什么？
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            另外，我到的时候发现现场有很新的篝火残骸。不是游客留下的——太偏僻了，普通游客不会去那里。
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px; border-left: 3px solid var(--color-accent); padding-left: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>地下三尺</strong>
            <span class="text-muted">2026-05-21 22:10</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            我把我探访过的所有点位整理成了一个加密笔记，放在我的账号里了。
            如果哪天我失联了，用这个密码打开：
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 4px; background: #fef9e7; padding: 8px;">
            "我的账号是 <b>shenci</b>，密码由两部分组成——<b>我第一个正经探访的遗址名字全拼</b>（小写），加上<b>我出生年份的最后两位</b>。你都知道的，在站里搜一搜我的老帖应该也能找到。"
          </p>
          <p style="font-size: 0.85rem; margin-bottom: 4px;">
            这个加密笔记里的东西暂时<strong>不要外传</strong>。有些发现我现在还不确定意味着什么。
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>地下三尺</strong>
            <span class="text-muted">2026-05-18 19:33</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            导航站今天又给我推了一个点位——秦岭某处的摩崖石刻。但是那个坐标我太熟悉了，去年去过。
            那里<strong>根本没有任何石刻</strong>。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            这已经是第三个对不上号的了。不知道是他们信息采集的问题还是什么。你有遇到过类似的情况吗？
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>地下三尺</strong>
            <span class="text-muted">2026-05-15 21:05</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            我把导航站推荐的"冷门秘境"坐标都标在地图上了。你猜怎么着——这些点位几乎全落在<strong>离最近村落至少五公里</strong>的地方。一个两个还好说，十几个都这样就有点巧了。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            加上你之前说的，你那些目击点的坐标也都很偏……不知道。可能我想多了。你把你的数据也发我看看？
          </p>
        </div>

        <div class="card" style="margin-bottom: 12px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <strong>地下三尺</strong>
            <span class="text-muted">2026-05-12 18:22</span>
          </div>
          <p style="font-size: 0.9rem; margin-bottom: 4px;">
            下周末准备去贺兰山看那批岩画。我在社区发了篇准备帖，有空的话帮我看看装备清单有没有漏的。
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0;">
            最近去了好几个站里推的点，有些发现挺有意思的。回头见面聊。
          </p>
        </div>
      `}
