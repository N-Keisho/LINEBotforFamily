/// <summary>
/// 買い物リストの作成
/// </summary>
/// <param name="uerID">event.source.userId</param>
/// <returns> resJSON:買い物リストのJSON、エラーも返す</returns>
function makeListJSON(uerID) {
  try {
    const DataBase = SHEET.getSheetByName("_DataBase");
    const foodsLists = DataBase.getRange(1, 1, DataBase.getLastRow(), 2).getValues();

    // DataBaseに登録されていたら取り出して、登録されていなかったら追加
    var foodsList = JSON.parse(FOODS_LIST_TEXT);  // 食材リスト

    // 登録されているかどうか確認
    foodsLists.forEach((value, i) => {
      if (String(value[0]) === uerID) {
        foodsList = JSON.parse(value[1]);
      }
    })
    if (foodsList["menuList"].length === 0) { // "menuList"に何もない場合
      let resJSON = JSON.parse(errorJSON);
      resJSON["body"]["contents"][0]["text"] = `何も登録されていません`;
      resJSON["body"]["contents"][0]["color"] = `#000000`;
      resJSON["styles"]["body"]["backgroundColor"] = `#ffffff`;
      return resJSON;
    }

    resJSON = JSON.parse(listBubble);
    // 作成日時の代入
    const japanTime = new Date(now.getTime()).toLocaleString('sv');
    resJSON['body']['contents'][4]['contents'][1]['text'] = `${japanTime}`;
    Object.keys(foodsList).forEach(key => {
      if (Object.keys(foodsList[key]).length !== 0 && key !== "menuList") {
        let sep1 = JSON.parse(listSeparator1);
        let sep2 = JSON.parse(listSeparator2);
        sep2['text'] = `${key}`;
        resJSON['body']['contents'][2]['contents'].push(sep1);
        resJSON['body']['contents'][2]['contents'].push(sep2);
        Object.keys(foodsList[key]).forEach(k => {
          let box = JSON.parse(listBox);
          box['contents'][0]['text'] = `${k}`;
          box['contents'][1]['text'] = `${foodsList[key][k][0]} ${foodsList[key][k][1]}`;
          resJSON['body']['contents'][2]['contents'].push(box);
        });
      }
    })

    return resJSON;
  }catch (error) { // エラー時の処理
    console.log(error);
    let resJSON = JSON.parse(errorJSON);
    resJSON["body"]["contents"][0]["text"] = `Error: ${error}`;
    return resJSON;
  }
}


/// <summary>
/// 買い物リストを初期化
/// </summary>
/// <param name="uerID">event.source.userId</param>
/// <returns> resJSON:リセット完了のお知らせ、エラーも返す</returns>
function resetFoodsList(uerID) {
  try {
    const DataBase = SHEET.getSheetByName("_DataBase");
    const foodsLists = DataBase.getRange(1, 1, DataBase.getLastRow(), 2).getValues();

    // DataBaseに登録されていたら取り出して、登録されていなかったら追加
    var foodsList = JSON.parse(FOODS_LIST_TEXT);  // 食材リスト
    var index = null;

    // 登録されているかどうか確認
    foodsLists.forEach((value, i) => {
      if (String(value[0]) === uerID) {
        index = i;
      }
    })
    if (index === null) { // ない場合
      index = DataBase.getLastRow();
      DataBase.appendRow([uerID, JSON.stringify(foodsList)]);
    }
    // console.log(foodsList);
    DataBase.getRange(index + 1, 2).setValue(JSON.stringify(foodsList));

    // console.log(resJSON);
    let resJSON = JSON.parse(errorJSON);
    resJSON["body"]["contents"][0]["text"] = `買い物リストをリセットしました`;
    resJSON["body"]["contents"][0]["color"] = `#000000`;
    resJSON["styles"]["body"]["backgroundColor"] = `#ffffff`;
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
/// 買い物リストに追加
/// </summary>
/// <param name="uerID">event.source.userId</param>
/// <param name="name">メニュー名</param>
/// <returns> resJSON:登録済みリストのJSONを返す、エラーも返す</returns>
function addFoodsList(uerID, name) {
  try {
    const DataBase = SHEET.getSheetByName("_DataBase");
    const foodsLists = DataBase.getRange(1, 1, DataBase.getLastRow(), 2).getValues();

    // DataBaseに登録されていたら取り出して、登録されていなかったら追加
    var foodsList = null;  // 食材リスト
    var index;

    // 登録されているかどうか確認
    foodsLists.forEach((value, i) => {
      if (String(value[0]) === uerID) {
        foodsList = JSON.parse(value[1]);
        index = i;
      }
    })
    if (foodsList === null) { // ない場合
      index = DataBase.getLastRow();
      foodsList = JSON.parse(FOODS_LIST_TEXT);
      DataBase.appendRow([uerID, JSON.stringify(foodsList)]);
    }
    // console.log(foodsList);

    const sheetIndex = searchMenu(name);
    let resJSON; // 送信するデータをオブジェクトとして作成する

    if (sheetIndex === null) { // メニューに一致するものがなかったら
      console.log("メニューに存在しません");
      resJSON = JSON.parse(errorJSON);
      resJSON["body"]["contents"][0]["text"] = `Error: 「${name}」はメニューに存在しません。`;
    }
    else {
      //--- レシピを取得
      try {
        const sheetRecipe = SHEET.getSheetByName(String(sheetIndex));
        const tmpRecipeList = sheetRecipe.getRange("A:D").getValues();
        var recipeList = []; // 食材リスト
        //-- 空白のセルを除去
        tmpRecipeList.forEach((value) => {
          if (value[0] !== null && value[0] !== "") {
            recipeList.push(value);
          }
        })
        // console.log(recipeList);

        // 登録済みリストの表示
        resJSON = JSON.parse(registerBubble);
        recipeList.forEach((value, index) => {
          if (index === 0) {
            // menuListに追加
            // console.log(String(value[1]));
            foodsList["menuList"].push(String(value[1]));
            resJSON['body']['contents'][5]['contents'][1]['text'] = `${foodsList["menuList"].length}`;
            foodsList["menuList"].forEach(menu => {
              let t = JSON.parse(registerText);
              t['text'] = `・ ${menu}`;
              resJSON['body']['contents'][3]['contents'].push(t);
            });
          }
          else if (index !== 1) {
            // 項目がなかったら項目ごと追加
            if (foodsList[value[3]][value[0]] === undefined)
              foodsList[value[3]][value[0]] = [parseFloat(value[1]), value[2]];
            // 項目があったら加算のみ
            else foodsList[value[3]][value[0]][0] += parseFloat(value[1]);
          }
        });

        // console.log(JSON.stringify(foodsList))
        DataBase.getRange(index + 1, 2).setValue(JSON.stringify(foodsList));

      } catch (e) {
        console.log(e);
        resJSON = JSON.parse(errorJSON);
        resJSON["body"]["contents"][0]["text"] = `Error: 「${name}」のシートが作成されていません。`;
      }
    }

    // console.log(resJSON);
    return resJSON;
  }
  catch (error) { // エラー時の処理
    console.log(error);
    let resJSON = JSON.parse(errorJSON);
    resJSON["body"]["contents"][0]["text"] = `Error: ${error}`;
    return resJSON;
  }
}