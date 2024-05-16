// Recipeを表示するためのJSONパーツ

const recipeBox = `{
    "type": "box",
    "layout": "horizontal",
    "contents": [
      {
        "type": "text",
        "text": "Energy Drink",
        "size": "md",
        "color": "#555555",
        "flex": 0
      },
      {
        "type": "text",
        "text": "$2.99",
        "size": "md",
        "color": "#111111",
        "align": "end"
      }
    ]
  }`;

// const recipeSeparator = `{
//   "type": "separator",
//   "margin": "xxl"
// }`;


const recipeBubble = `{
    "type": "bubble",
    "size": "kilo",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "RECIPE",
          "weight": "bold",
          "color": "#1DB446",
          "size": "sm"
        },
        {
          "type": "text",
          "text": "Brown Store",
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
              "text": "番号",
              "size": "md",
              "color": "#aaaaaa",
              "flex": 0
            },
            {
              "type": "text",
              "text": "#743289384279",
              "color": "#aaaaaa",
              "size": "md",
              "align": "end"
            }
          ]
        },
        {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": "買い物リストに追加",
                "text": "hello"
              },
              "height": "sm",
              "style": "primary"
            }
          ],
          "spacing": "none",
          "margin": "none",
          "borderWidth": "none",
          "cornerRadius": "none",
          "offsetTop": "sm",
          "offsetBottom": "none",
          "offsetStart": "none",
          "offsetEnd": "none",
          "paddingAll": "sm"
        }
      ]
    },
    "styles": {
      "footer": {
        "separator": true
      }
    }
  }`