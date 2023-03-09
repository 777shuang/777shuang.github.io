var beforestr = `
<nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-3 p-0">
  <div class="container-fluid">
    <a href=https://777shuang.github.io/logo.html><img class="navbar-brand" src="https://777shuang.github.io/777shuang.png" width="64px"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="https://777shuang.github.io/index.html">ホーム</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="https://scrapbox.io/777shuang/">西方見聞録</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="https://sites.google.com/view/777shuang/%E3%83%9B%E3%83%BC%E3%83%A0">ぶろぐ</a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;
var afterstr = `<footer>
since : 2022/10/16<br>
last : 2023/3/9<br>
<strong>Copyright (c) 2022 - 2023 777shuang. All Rights Reserved.</strong>
</footer>`
document.getElementById("main").insertAdjacentHTML("beforebegin",beforestr);
document.getElementById("main").insertAdjacentHTML("afterend",afterstr);
