/// <summary>
/// 返信を行う
/// </summary>
/// <param name="messages">送信する内容</param>
/// <returns> void </returns>
/// messages: [{ type: 'text', text:  translatedText }]
function reply(contents) {
  let channelAccessToken = LINE_TOKEN;
  let replyUrl = LINE_REPLY_URL; // LINE にデータを送り返すときに使う URL
  let options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + channelAccessToken
    },
    payload: JSON.stringify(contents) // 送るデータを JSON 形式に変換する
  };
  UrlFetchApp.fetch(replyUrl, options);
}

/// <summary>
/// プッシュを行う
/// </summary>
/// <param name="messages">送信する内容</param>
/// <returns> void </returns>
// contents = {
//             to: uerId;
//             messages: [{ type: 'text', text: event.source.groupId }],
//           };
function push(contents) {
  let channelAccessToken = LINE_TOKEN;
  let replyUrl = LINE_PUSH_URL; // LINE にデータを送り返すときに使う URL
  let options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + channelAccessToken
    },
    payload: JSON.stringify(contents) // 送るデータを JSON 形式に変換する
  };
  UrlFetchApp.fetch(replyUrl, options);
}

/// <summary>
/// ドライブにあるJSONの読み込み
/// </summary>
/// <param name="filePath> fileID </param>
/// <returns> resJSON : JSONファイル </returns>
function importJSON(fileID) {
  const file = DriveApp.getFileById(fileID);
  const copy = file.getBlob().getDataAsString();
  const resJSON = JSON.parse(copy);

  return resJSON;
}