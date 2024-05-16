/// <summary>
/// スケジュールのJSONを更新する
/// </summary>
/// <returns> void </returns>
function updateAllScheduleJSON() {
  Utilities.sleep(1000);  //自動実行時用。ほかの関数が書き込み終わるまで待つ
  var file = DriveApp.getFileById(ALL_SCHEDULE_JSON_ID);
  file.setContent(JSON.stringify(makeAllScheduleJSON()));
}

/// <summary>
/// 今週のスケジュールのJSONを返す
/// </summary>
/// <returns> resJSON:作成したスケジュールのJSON, エラー時はエラーの送信</returns>
function makeAllScheduleJSON() {
  try {
    ///--- スケジュールの取得
    const sheetSchedule = SHEET.getSheetByName("_Schedule");
    const scheduleList = sheetSchedule.getRange(1, 1, sheetSchedule.getLastRow(), 9).getValues();
    let memberAllSchedule = [];
    DAY.forEach(v => {
      memberAllSchedule.push(JSON.parse(MEMBER_SCHEDULE));
    })
    // console.log(memberAllSchedule);

    // 今週のスケジュールを取得
    // 新しいものを使用する。古いものは無視。
    let addedMember = [];
    for (let index = scheduleList.length - 1; index >= 0; index--) {
      var values = scheduleList[index];
      // すでに加えたかどうかを検索
      if (!addedMember.includes(values[1])) {
        addedMember.push(values[1]); // 加え済みに加える
        values.forEach((v, i) => { // 各曜日に対して行う
          if (i !== 0 && i !== 1) {
            // 内容を分割していれる
            memberAllSchedule[i - 2][values[1]] = String(v).split(/,/);
          }
        })

      } else if (addedMember.length === 4) break;
    }
    // console.log(memberAllSchedule);

    ///--- 今日の日付と曜日の取得
    const date = new Date();
    // date.setDate(date.getDate() + 1);
    const dayNum = (date.getDay() + 1) % 7;

    // resJSONの作成
    var resJSON = JSON.parse(allScheduleBubble);

    if (dayNum === 6) {
      DAY.forEach((day, index) => {
        const d = new Date();
        d.setDate(d.getDate() - dayNum + index + 7);
        resJSON["body"]["contents"][index + 2]["contents"][1]["text"] = `${Utilities.formatDate(d, 'JST', 'M月d日')}(${day})`;
        MEMBER.forEach((m, i) => {
          memberAllSchedule[index][m].forEach(v => {
            var text = JSON.parse(allScheduleText);
            text["text"] = `${v}`;
            if (v === '朝早い' || v === '弁当いる' || v === '弁当いらない' || v === '夜ごはん不要') text["weight"] = 'bold';
            else if (v.includes("起:")) {
              text["color"] = "#E53935"; text["weight"] = 'bold';
            }
            else if (v.includes("出:")) {
              text["color"] = "#1E88E5"; text["weight"] = 'bold';
            }
            else if (!QUESTIONS.includes(v)) {
              text["color"] = "#2E7D32"; text["weight"] = 'bold';
            }
            resJSON["body"]["contents"][index + 2]["contents"][i + 2]["contents"][2]["contents"].push(text);
          })
        })
      })
    } else {
      DAY.forEach((day, index) => {
        const d = new Date();
        d.setDate(d.getDate() - dayNum + index);
        resJSON["body"]["contents"][index + 2]["contents"][1]["text"] = `${Utilities.formatDate(d, 'JST', 'M月d日')}(${day})`;
        MEMBER.forEach((m, i) => {
          memberAllSchedule[index][m].forEach(v => {
            var text = JSON.parse(allScheduleText);
            text["text"] = `${v}`;
            if (v === '朝早い' || v === '弁当いる' || v === '弁当いらない' || v === '夜ごはん不要') text["weight"] = 'bold';
            else if (v.includes("起:")) {
              text["color"] = "#E53935"; text["weight"] = 'bold';
            }
            else if (v.includes("出:")) {
              text["color"] = "#1E88E5"; text["weight"] = 'bold';
            }
            else if (!QUESTIONS.includes(v)) {
              text["color"] = "#2E7D32"; text["weight"] = 'bold';
            }
            resJSON["body"]["contents"][index + 2]["contents"][i + 2]["contents"][2]["contents"].push(text);
          })
        })
      })
    }

    // console.log(JSON.stringify(resJSON));

    return resJSON;
  }
  catch (error) { // エラー時の処理
    console.log(error);
  }
}
