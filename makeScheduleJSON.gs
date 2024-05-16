/// <summary>
/// 毎日スケジュールを投稿する
/// </summary>
/// <returns> void </returns>
function everyPushSchedule() {
  var date = new Date();
  date.setDate(date.getDate() + 1);
  var day = date.getDay()
  var contents;
  if (day === 5) {
    contents = {
      to: GROUP_ID,
      messages: [{ type: 'flex', altText: "スケジュール", contents: makeScheduleJSON() }, { type: 'text', text: '上のボタンからスケジュールの更新をお願いします。' }],
    };
  }
  else {
    contents = {
      to: GROUP_ID,
      messages: [{ type: 'flex', altText: "スケジュール", contents: makeScheduleJSON() }],
    };
  }
  push(contents);
}

/// <summary>
/// スケジュールのJSONを返す
/// </summary>
/// <returns> resJSON:作成したスケジュールのJSON, エラー時はエラーの送信</returns>
function makeScheduleJSON(dateOption) {
  try {
    if (dateOption === undefined) dateOption = 1;
    ///--- 今日の日付と曜日の取得
    const date = new Date();
    date.setDate(date.getDate() + dateOption);
    const today = Utilities.formatDate(date, 'JST', 'M月d日');
    const day = ( date.getDay() + 1 ) % 7; //今日の曜日の数字(0~6)を実行ログに出力
    // console.log(today);

    ///--- スケジュールの取得
    const sheetSchedule = SHEET.getSheetByName("_Schedule");
    const scheduleList = sheetSchedule.getRange(1, 1, sheetSchedule.getLastRow(), 9).getValues();
    let memberSchedule = JSON.parse(MEMBER_SCHEDULE);
    // console.log(scheduleList);

    // 今日の曜日のスケジュールを取得
    // 新しいものを使用する。古いものは無視。
    let addedMember = [];
    for (let i = scheduleList.length - 1; i >= 0; i--) {
      var values = scheduleList[i];
      // すでに加えたかどうかを検索
      if (!addedMember.includes(values[1])){
        addedMember.push(values[1]); // 加え済みに加える

        // 内容を分割して入れる
        memberSchedule[values[1]] = String(values[day+2]).split(/,/);

      } else if (addedMember.length === 4 ) break;
    }

    // console.log(memberSchedule);
    // resJSONの作成
    var resJSON = JSON.parse(scheduleBubble);
    resJSON["body"]["contents"][1]["text"] = today + `（${DAY[day]}）`;
    MEMBER.forEach((m,i) =>{
        // 内容を作る
      memberSchedule[m].forEach(v => {
        var text = JSON.parse(scheduleText);
        text["text"] = v;
        if (v === '朝早い' || v === '弁当いる' || v === '弁当いらない' || v === '夜ごはん不要') text["weight"] = 'bold';
        else if(v.includes("起:")){
          text["color"] = "#E53935";  text["weight"] = 'bold';
        } 
        else if (v.includes("出:")){
          text["color"] = "#1E88E5";  text["weight"] = 'bold';
        }
        else if (!QUESTIONS.includes(v)){
          text["color"] = "#2E7D32";  text["weight"] = 'bold';
        }
        resJSON["body"]["contents"][3+i]["contents"][2]["contents"].push(text);

      })
      })
    // console.log(JSON.stringify(resJSON));

    return resJSON;
  }
  catch (error) { // エラー時の処理
    console.log(error);
  }
}