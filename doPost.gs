/// <summary>
/// 受け取ったメッセージに応じて返信する
/// </summary>
/// <returns> void </returns>
function doPost(e) {
  try {
    let data = JSON.parse(e.postData.contents); // LINE から来た json データを JavaScript のオブジェクトに変換する

    let events = data.events;
    for (let i = 0; i < events.length; i++) {
      let event = events[i];
      if (event.type == 'message' && event.message.type == 'text') { //受信したのが普通のテキストメッセージだったとき

        let contents; // 送信するデータをオブジェクトとして作成する

        if (String(event.message.text).includes("/r ")) {  // /rはレシピコマンド
          const name = String(event.message.text).replace("/r ", "");
          if (name === "メニュー" || name === "menu") { // メニュー表の送信
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "メニュー表", contents: makeMenuJSON() }]
            };
          } else {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: `${name}の材料一覧`, contents: makeRecipeJSON(name) }]
            };
          }
        }

        else if (String(event.message.text).includes("/l ")) {  // /lはリストコマンド
          const name = String(event.message.text).replace("/l ", "");
          if (name === "リセット" || name === "reset") {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "買い物リストをリセットしました", contents: resetFoodsList(event.source.userId) }]
            };
          }
          else if (name === "出力" || name === "output") {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "登録済みリスト", contents: makeListJSON(event.source.userId) }]
            };
          }
          else {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "買い物リスト", contents: addFoodsList(event.source.userId, name) }]
            };
          }
        }

        else if (String(event.message.text).includes("/s")) { // スケジュールのJSON
          const name = String(event.message.text).replace("/s ", "");
          if (name === "tomorrow") {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "明日の予定", contents: makeScheduleJSON()}],
            };
          }
          else if (name === "yesterday") {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "昨日の予定", contents: makeScheduleJSON(-1)}],
            };
          }
          else if (name === "today") {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "今日の予定", contents: makeScheduleJSON(0)}],
            };
          }
          else if (name === "week") {
            contents = {
              replyToken: event.replyToken,
              messages: [{ type: 'flex', altText: "今週の予定", contents: importJSON(ALL_SCHEDULE_JSON_ID) }],
            };
          }
        }

        else if (event.source.type === 'group' && event.message.text === '/g') { // groupIDを取得する
          contents = {
            replyToken: event.replyToken,
            messages: [{ type: 'text', text: event.source.groupId }],
          };
        }

        else if (String(event.message.text).includes("/ ")) {  // /は翻訳コマンド
          const name = String(event.message.text).replace("/ ", "");
          let translatedText = LanguageApp.translate(name, 'ja', 'en');
          contents = {
            replyToken: event.replyToken,
            messages: [{ type: 'text', text: translatedText }],
          };
        }
        else if (event.source.type === 'user') { // ユーザーのときは常に翻訳
          let translatedText = LanguageApp.translate(event.message.text, 'ja', 'en');
          contents = {
            replyToken: event.replyToken,
            messages: [{ type: 'text', text: translatedText }],
          };
        }

        reply(contents); // 返信
      }
    }
  } catch (error) { // エラーの送信
    let contents = returnErrorContent(error);
    reply(contents);
  }
}
