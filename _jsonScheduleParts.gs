// スケジュール告知用のJSONパーツ

const scheduleText = `{
                    "type": "text",
                    "text": "hello, world",
                    "wrap": true,
                    "align": "center",
                    "weight": "regular",
                    "margin": "sm",
                    "color": "#000000"
                  }`;

const scheduleBubble = `{
  "type": "bubble",
  "size": "hecto",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "SCHEDULE",
        "weight": "bold",
        "color": "#1DB446",
        "size": "sm"
      },
      {
        "type": "text",
        "text": "12月30日（金）",
        "weight": "bold",
        "size": "xxl",
        "margin": "none"
      },
      {
        "type": "separator"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "お父さん",
            "weight": "bold",
            "align": "center"
          },
          {
            "type": "separator",
            "color": "#696969"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": []
          }
        ],
        "alignItems": "center",
        "paddingTop": "md",
        "paddingBottom": "md",
        "margin": "md"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "お母さん",
            "weight": "bold",
            "align": "center"
          },
          {
            "type": "separator",
            "color": "#696969"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": []
          }
        ],
        "margin": "md",
        "alignItems": "center",
        "paddingTop": "md",
        "paddingBottom": "md"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "weight": "bold",
            "align": "center",
            "text": "けーしょー"
          },
          {
            "type": "separator",
            "color": "#696969"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": []
          }
        ],
        "margin": "md",
        "alignItems": "center",
        "paddingTop": "md",
        "paddingBottom": "md"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "text",
            "text": "しょーおん",
            "weight": "bold",
            "align": "center"
          },
          {
            "type": "separator",
            "color": "#696969"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": []
          }
        ],
        "margin": "md",
        "alignItems": "center",
        "paddingTop": "md",
        "paddingBottom": "md"
      },
      {
        "type": "button",
        "action": {
          "type": "uri",
          "label": "スケジュールの更新",
          "uri": "https://forms.gle/5W3sY5k852fQpw3C6"
        },
        "style": "primary",
        "height": "sm",
        "margin": "lg"
      }
    ]
  },
  "styles": {
    "footer": {
      "separator": true
    }
  }
}`;