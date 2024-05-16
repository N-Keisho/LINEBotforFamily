//reply_importJSON
const LINE_TOKEN = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN");
const GROUP_ID = PropertiesService.getScriptProperties().getProperty("GROUP_ID");
const TEST_GROUP_ID = PropertiesService.getScriptProperties().getProperty("TEST_GROUP_ID");
const LINE_REPLY_URL = 'https://api.line.me/v2/bot/message/reply';
const LINE_PUSH_URL = 'https://api.line.me/v2/bot/message/push';

// makeScheduleJSON
const MEMBER_SCHEDULE = '{"お父さん":[], "お母さん":[], "けーしょー":[], "しょーおん":[]}';
const DAY = ["土", "日", "月", "火", "水", "木", "金"];
const QUESTIONS = ['朝早い', 'ゆっくり起き', '登校・出社', '在宅', 'バイト', 'ゴルフ', 'おでかけ', '休日', 'お弁当いる', 'お弁当いらない', '夜ごはん不要'];

// makeListJson
const FOODS_LIST_TEXT = '{"野菜":{}, "果物":{}, "酒":{}, "肉":{}, "豆腐":{}, "魚":{}, "麺":{}, "冷凍":{}, "その他":{}, "調味料":{}, "menuList":[]}';
const now = new Date();

// doPost
const SHEET = SpreadsheetApp.getActiveSpreadsheet();

// makeAllScheduleJSON
const MEMBER = ["お父さん", "お母さん", "けーしょー", "しょーおん"];
const ALL_SCHEDULE_JSON_ID = PropertiesService.getScriptProperties().getProperty("ALL_SCHEDULE_JSON_ID");