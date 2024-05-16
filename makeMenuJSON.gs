/// <summary>
/// メニュー表の作成
/// </summary>
/// <returns> resJSON:作成したメニュー表のJSON</returns>
function makeMenuJSON() {
  try {
    ///--- メニューの一覧を取得
    const sheetMenu = SHEET.getSheetByName("メニュー");
    const tmpMenuList = sheetMenu.getRange("B:B").getValues();
    var menuList = [];
    //-- 空白のセルを除去
    tmpMenuList.forEach((value) => {
      if (value[0] !== null && value[0] !== "") {
        menuList.push(value[0]);
      }
    })
    // console.log(menuList);


    var resJSON = JSON.parse(menuCarousel); // 戻り値のJSONを用意
    const buttonsMax = 5; // ボタンの数

    menuList.forEach((value, index) => {
      if (index !== 0) {
        // バブルを追加
        const num = Math.floor((index - 1) / buttonsMax);
        if (index % buttonsMax === 1) {
          let t = JSON.parse(menuBubble);
          t['body']['contents'][1]['text'] = `メニュー表 ${num + 1}`;
          t['body']['contents'][5]['contents'][1]['text'] = `${num + 1}`;
          resJSON["contents"].push(t);
        }
        // ボタンを追加
        let m = JSON.parse(menuButton);
        m["action"]["label"] = value;
        m["action"]["text"] = "/r " + value;
        resJSON["contents"][num]["body"]["contents"][3]["contents"].push(m);
      }
    });

    // console.log(resJSON);
    return resJSON;
  }
  catch (error) { // エラー時の処理
    let resJSON = JSON.parse(errorJSON);
    resJSON["body"]["contents"][0]["text"] = `Error: ${error}`;
    return resJSON;
  }
}