document.querySelector("html").setAttribute("lang" , "ja");

const body = document.body;

body.innerHTML = `
  <div class="window">
    <div class="title-bar">
      <div class="title-bar-text">777shuangの気分的ページ</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" onclick="alert('これブラウザだよ?最小化なんてできるわけないじゃん')"></button>
        <button aria-label="Maximize" onclick="Maximize()" id="titlebar_button"></button>
        <button aria-label="Close" onclick="window.close()"></button>
      </div>
    </div>
` + body.innerHTML + `
    <footer>
      <strong><a href=/index.html>ホームへ戻る</a></strong>
      <br>
      <a href="https://sites.google.com/site/happybusy/"><img src="/assets/busy_banner.png" height="64px"></a>
      <a href="https://moe-counter.glitch.me/"><img src="https://count.getloli.com/get/@777shuang" height="64px"></a>
      <br>
      since : 2022/10/16 <strong>|</strong> last : 2023/3/19<br>
      <strong>Copyright (c) 2022 - 2023 777shuang. All Rights Reserved.</strong>
    </footer>
  </div>
`

function Maximize()
{
  if(!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen || document.msFullscreenEnabled))
  { window.alert("フルスクリーンに対応していません"); }
  else
  {
    let reqFullScreen = body.requestFullscreen || body.mozRequestFullScreen || body.webkitRequestFullScreen || body.msRequestFullscreen;
    reqFullScreen.call(body);
    document.getElementById("titlebar_button").ariaLabel = "Restore";
    document.getElementById("titlebar_button").onclick = Restore;
  }
}

function Restore()
{
  (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
  document.getElementById("titlebar_button").ariaLabel = "Maximize";
  document.getElementById("titlebar_button").onclick = Maximize
}