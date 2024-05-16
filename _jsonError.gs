// エラーを表示するためのJSON

const errorJSON = `{
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "Error",
        "color": "#ffffff",
        "wrap": true
      }
    ]
  },
  "size": "deca",
  "styles": {
    "header": {
      "backgroundColor": "#000000"
    },
    "body": {
      "backgroundColor": "#FF4949"
    }
  }
}`;

/// <summary>
/// エラー用のコンテンツの作成
/// </summary>
/// <param name="error">エラー内容</param>
/// <returns> resContents: エラーとして送信するコンテンツ</returns>
function returnErrorContent(error){
  let eJSON = JSON.parse(errorJSON);
  eJSON["body"]["contents"][0]["text"] = `Error: ${error}`;
  let resContents = {
    replyToken: event.replyToken,
    messages: [{ type: 'flex', altText: "エラー", contents: eJSON}],
  };
  return resContents;
}