// 登録済みリスト作成のために必要なJSONパーツ

const registerText = `{
    "type": "text",
    "text": "hello, world"
}`;

const registerBubble = `{
    "type": "bubble",
    "size": "deca",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "weight": "bold",
          "color": "#1DB446",
          "size": "sm",
          "text": "REGISTERED"
        },
        {
          "type": "text",
          "text": "登録済み",
          "weight": "bold",
          "size": "xxl",
          "margin": "md"
        },
        {
          "type": "separator",
          "margin": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "xxl",
          "spacing": "sm",
          "contents": [
          ]
        },
        {
          "type": "separator",
          "margin": "xxl"
        },
        {
          "type": "box",
          "layout": "horizontal",
          "margin": "md",
          "contents": [
            {
              "type": "text",
              "text": "登録数",
              "size": "sm",
              "color": "#aaaaaa",
              "flex": 0
            },
            {
              "type": "text",
              "text": "2",
              "color": "#aaaaaa",
              "size": "sm",
              "align": "end"
            }
          ]
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": true
      }
    }
  }`;
