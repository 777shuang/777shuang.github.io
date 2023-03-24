document.querySelector("html").setAttribute("lang" , "ja");
const body = document.body;

body.innerHTML = `
<div class="window">
  <div class="title-bar">
    <div class="title-bar-text"><a href="/logo.html"><IMG src="/assets/777shuang.png" height="16px"></a>777shuangの気分的ページ</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize" onclick="alert('これブラウザだよ?最小化なんてできるわけないじゃん')"></button>
      <button aria-label="Maximize" onclick="Maximize(document.getElementById('titlebar-button'), body)" id="titlebar-button"></button>
      <button aria-label="Close" onclick="window.close()"></button>
    </div>
  </div>
  <div class="window-body">
` + body.innerHTML + `
    <fieldset>
      <legend><strong>Copyright (c) 2022 - 2023 777shuang. All Rights Reserved.</strong></legend>
      このサイトは<a href="https://botoxparty.github.io/XP.css/" id="link" target="_blank">XP.css</a>を使って作られています。<button id="changeCSS-button" onclick="changeCSS()">Win98風にする</button>
      <br>
      <a href="https://sites.google.com/site/happybusy/"><img src="/assets/busy_banner.png" height="64em"></a>
      <a href="https://moe-counter.glitch.me/"><img src="https://count.getloli.com/get/@777shuang" height="64em"></a>
      <br>
      since : 2022/10/16 <strong>|</strong> last : 2023/3/24<br>
    </fieldset>
  </div>
</div>`

function Maximize(button, element)
{
  if(!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.documentElement.webkitRequestFullScreen || document.msFullscreenEnabled))
  { window.alert("フルスクリーンに対応していません"); }
  else
  {
    let reqFullScreen = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullScreen || element.msRequestFullscreen;
    reqFullScreen.call(element);
    button.ariaLabel = "Restore";
    button.onclick = function() { Restore(button, element) };
  }
}
function Restore(button, element)
{
  (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen).call(document);
  button.ariaLabel = "Maximize";
  button.onclick = function() { Maximize(button, element) }
}

function changeCSS()
{
  const xp = document.getElementById("xp") , _98 = document.getElementById("98");
  const button = document.getElementById("changeCSS-button") , link = document.getElementById("link");
  if (xp.disabled == false)
  {
    xp.disabled = true;
    _98.disabled = false;
    button.innerHTML = "WinXP風にする";
    link.href = "https://jdan.github.io/98.css/";
    link.innerText = "98.css";
  }
  else
  {
    xp.disabled = false;
    _98.disabled = true;
    button.innerHTML = "Win98風にする";
    link.href = "https://botoxparty.github.io/XP.css/";
    link.innerText = "XP.css";
  }
}