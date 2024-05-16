/// <summary>
/// レシピの作成
/// </summary>
/// <returns> resJSON:作成したレシピのJSON, エラー時はエラーの送信</returns>
function makeRecipeJSON(name) {
  try {
    const sheetIndex = searchMenu(name);
    let resJSON; // 送信するデータをオブジェクトとして作成する

    if (sheetIndex === null) { // メニューに一致するものがなかったら
      resJSON = JSON.parse(errorJSON);
      resJSON["body"]["contents"][0]["text"] = `Error: 「${name}」はメニューに存在しません。`;
    }
    else {
      //--- レシピを取得
      try {
        const sheetRecipe = SHEET.getSheetByName(String(sheetIndex));
        const tmpRecipeList = sheetRecipe.getRange("A:D").getValues();
        var recipeList = [];
        //-- 空白のセルを除去
        tmpRecipeList.forEach((value) => {
          if (value[0] !== null && value[0] !== "") {
            recipeList.push(value);
          }
        })
        console.log(recipeList);

        resJSON = JSON.parse(recipeBubble);
        resJSON['body']['contents'][5]['contents'][1]['text'] = `${sheetIndex}`;
        recipeList.forEach((value, index) => {
          if (index === 0) {
            resJSON['body']['contents'][1]['text'] = `${value[1]}`
            resJSON['body']['contents'][6]['contents'][0]["action"]['text'] = `/l ${value[1]}`;
          }
          else if (index !== 1) {
            let tmp = JSON.parse(recipeBox);
            tmp['contents'][0]['text'] = `${value[0]}`;
            tmp['contents'][1]['text'] = ` ${value[1]} ${value[2]}`;
            resJSON['body']['contents'][3]['contents'].push(tmp);
          }
        });
      } catch (e) {
        console.log("シートが作成されていません。");
        resJSON = JSON.parse(errorJSON);
        resJSON["body"]["contents"][0]["text"] = `Error: 「${name}」のシートが作成されていません。`;
      }
    }

    console.log(JSON.stringify(resJSON, null, 4));
    return resJSON;
  }
  catch (error) { // エラー時の処理
  console.log(error);
    let resJSON = JSON.parse(errorJSON);
    resJSON["body"]["contents"][0]["text"] = `Error: ${error}`;
    return resJSON;
  }
}

/// <summary>
/// レシピの検索
/// </summary>
/// <param name="name">検索するメニュー名</param>
/// <returns> res:存在する場合は番号、存在しない場合はnull</returns>
function searchMenu(name) {
  ///--- メニューの名称一覧を所得
  const sheetMenu = SHEET.getSheetByName("メニュー");
  const tmpMenuList = sheetMenu.getRange("A:J").getValues();
  var menuList = [];
  //-- 空白のセルを除去
  tmpMenuList.forEach((value) => {
    if (value[0] !== null && value[0] !== "") {
      menuList.push(value);
    }
  })
  // console.log(menuList);

  ///--- メニューの検索
  let res = null;
  menuList.forEach((value, index) => {
    if (res === null) {
      value.forEach((v) => {
        if (String(v) === name) {
          res = index;
        }
      })
    }
  })

  // console.log(res);
  return res;
}