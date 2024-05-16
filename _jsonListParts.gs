// 食材リストを作るためのJSONパーツ

const listBox = `{
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "text",
        "text": "白菜",
        "size": "md",
        "color": "#555555",
        "flex": 0
      },
      {
        "type": "text",
        "text": " 0.25 玉",
        "size": "md",
        "color": "#111111",
        "align": "end"
      }
    ]
  }`;

const listSeparator1 = `{
    "type": "separator",
    "margin": "sm"
}`;

const listSeparator2 = `{
    "type": "text",
    "text": "野菜",
    "weight": "bold",
    "color": "#1DB446",
    "size": "sm",
    "align": "center"
}`;

const listBubble = `{
    "type": "bubble",
    "size": "kilo",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "LIST",
          "weight": "bold",
          "color": "#1DB446",
          "size": "sm"
        },
        {
          "type": "text",
          "text": "買い物リスト",
          "weight": "bold",
          "size": "xxl",
          "margin": "md"
        },
        {
          "type": "box",
          "layout": "vertical",
          "margin": "md",
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
              "text": "作成日時",
              "size": "md",
              "color": "#aaaaaa",
              "flex": 0
            },
            {
              "type": "text",
              "text": "2",
              "color": "#aaaaaa",
              "size": "md",
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