const cheerio = require('cheerio');

var html = '<table id="enchant_list" class="tpl1"><colgroup><col width="60" /><col width="80" /><col width="130" /><col /><col width="80" /></colgroup><tr><th>#</th><th>구분</th><th>이름</th><th>효과</th><th>자세히</th></tr><tr><td class="num">1</td><td>접미 4<span class="rank_free" title="랭크제한 없이">*</span></td><td class="name">힘든</td><td class="info"><div >손에 착용하는 아이템에 인챈트 가능</div><div class="blue">제련 랭크 1 이상일 때 최대대미지 8 ~ 15 증가</div><div class="blue">요리 랭크 6 이상일 때 솜씨 10 ~ 15 증가</div><div class="blue"> 목공 랭크 1 이상일 때 최대스태미나 30 증가</div><div class="blue">야금술 랭크 1 이상일 때 크리티컬 5 증가</div><div class="blue">최대마나 40 증가</div><div class="red">수리비 3배  증가</div><div>랭크에 제한없이 인챈트 가능</div><div class="red">인챈트 장비를 전용으로 만듦</div></td><td><a class="btn" title="힘든 자세히 보기" href="view.html?e=714">보기</a></td></tr></table>';

var element = cheerio.load(html);

console.log(element('#enchant_list tr td a').last().attr('href'));

var view_html = '<table id="enchant_view" class="tpl1" enc="9486bb462e3844ea4746da34d1c2928213b77b42d052de91"><colgroup><col class="col1" /><col /></colgroup><tr><th class="tit" colspan="2">힘든 인챈트 상세정보</th></tr><tr><th>인챈트 명</th><td name="enchant_name">힘든 (Backbreaking)</td></tr><tr><th>구분 / 랭크</th><td name="rank">접미 4 랭크 (랭크에 제한없이 인챈트 가능)</td></tr><tr><th>효과</th><td id="apply" itemprop="articleBody"><div >손에 착용하는 아이템에 인챈트 가능</div><div class="blue">제련 랭크 1 이상일 때 최대대미지 8 ~ 15 증가</div><div class="blue">요리 랭크 6 이상일 때 솜씨 10 ~ 15 증가</div><div class="blue">목공 랭크 1 이상일 때 최대스태미나 30 증가</div><div class="blue">야금술 랭크 1 이상일 때 크리티컬 5 증가</div><div class="blue">최대마나 40 증가</div><div class="red">수리비 3배  증가</div><div>랭크에 제한없 이 인챈트 가능</div><div class="red">인챈트 장비를 전용으로 만듦</div></td></tr><tr><th>입수 정보</th><td id="get_info" itemprop="articleBody">몽환의 라비 던전 보상(스크롤)<br />필드보스 - 화이트드래곤(스크롤)<br /><br /><s class="red"><b>개편</b> 알비 상급 하드 던전 보상(스크롤)</s><br />※ 알비 상급에서 나오지 않는 정보가 있어 수정하였습니다.(2017.12.19)</td></tr><tr><th>성공 확률<br>(지력 200 이상)</th><td><div><div class="fl">평일 : <span class="bold" style="color:#F47300;">일　반 마법가루</span> - 24%<br>평일 : <span class="bold" style="color:#4793C3;">엘리트 마법가루</span> - 24%<br>평일 : <span class="bold" style="color:#51A044;">고　대 마법가루</span> - 32%<br></div><div class="fl" style="padding-left:60px;">목요일 : <span class="bold" style="color:#F47300;">일　반 마법가루</span> - 25%<br>목요일 : <span class="bold" style="color:#4793C3;">엘리트 마법가루</span> - 26%<br>목요일 : <span class="bold" style="color:#51A044;">고　대 마법가루</span> - 33%<br></div><div class="cb"></div><div class="cb"></div></div></td></tr><tr><th>성공시 풀옵 확률</th><td>1/48 (2.08%)</td></tr><tr><th>인챈트 실패정보</th><td>실　패 : 아이템 소멸<br>대실패 : 아이템 소멸</td></tr><tr><th>인챈트 시뮬레이터</th><td class="ac pd5"><button type="button" onclick="loadSimulator(this)">인챈트 시뮬레이터 시작</button><div class="dn" id="enchant_simulator">시뮬레이터 로딩중..</div></td></tr><tr><th>밑작업표</th><td><a class="link1" href="prepare.html?e=714&ty=2&ra=4">밑작업표 보기</a> <a class="link1" href="prepare.html?e=714&ty=2&ra=4" target="_blank">[새창]</a></td></tr></table>';

var view_element = cheerio.load(view_html);

var infos = view_element('#enchant_view td#apply div');

infos.each(function (i,info) {
    console.log(info.attribs.class);
})