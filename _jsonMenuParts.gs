// Menuを表示するためのJSONパーツ

// ボタン
const menuButton = `{
  "type": "button",
  "action": {
    "type": "message",
    "label": "ニラバーグ",
    "text": "ニラバーグ"
  },
  "height": "sm",
  "style": "secondary",
  "margin": "md"
}`;

// 
const menuCarousel = `{
  "type": "carousel",
  "contents": []
}`;

const menuBubble = `{
  "type": "bubble",
  "size": "deca",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "MENU",
        "weight": "bold",
        "color": "#1DB446",
        "size": "xs"
      },
      {
        "type": "text",
        "text": "メニュー表",
        "weight": "bold",
        "size": "xl",
        "margin": "md",
        "align": "start"
      },
      {
        "type": "separator",
        "margin": "md"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
        ],
        "spacing": "none",
        "margin": "none"
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
            "text": "番号",
            "size": "xs",
            "color": "#aaaaaa",
            "flex": 0
          },
          {
            "type": "text",
            "text": "2",
            "color": "#aaaaaa",
            "size": "xs",
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
