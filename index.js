const { Telegraf, Markup, Extra } = require("telegraf");
const fs = require("fs");
const tokin = "1269759800:AAF_Ouhl-gRXfqiDaAc1g62EmVPjlLizIVs";

const bot = new Telegraf(tokin);
let javob =""
let writeJSON = (fileName, data) => {
  try {
    return fs.writeFile(fileName, JSON.stringify(data), err => {
      if (err) throw err;
    });
  } catch (error) {
    console.log("Faylni o'qishda xatolik");
  }
};

let readJSON = (fileName, cb) => {
  try {
    fs.readFile(fileName, { encoding: "utf8" }, async (err, data) => {
      if (err) throw err;
      const object = JSON.parse(data);
      return cb && cb(null, object);
    });
  } catch (error) {
    console.log("Faylni o'qishda xatolik");
  }
};

const button = Markup.keyboard([
  ["Testni tekshirish"],
  ["Admin 📞", "Bot haqida 📄"],
  ["Admin sifatida kirish 📲", "Botdagi obunachilar"]
]).resize();

const adminButton = Markup.keyboard([
  ["Test javoblarini bazaga kiritish"],
  ["Admin 📞", "Bot haqida 📄"],
  ["Admin bo'limi 👨🏻‍💻"]
]).resize();

let arr = [];
let testData = [];
/******************************************************************************************************************************************************************************************* */

/* Start bo'limi */

bot.command("start", msg => {
  msg.reply("Botga xush kelibsiz", Extra.markup(button));
  if (arr.find(({ chatId }) => chatId == msg.chat.id) == undefined) {
    arr.push({
      chatId: msg.chat.id
    });
    writeJSON("data.json", arr);
  } else {
    msg.replyWithHTML(
      "<b>Qayta tashrif buyurganingizdan minnatdormiz!😊☘️</b>"
    );
  }
});

/* Start bo'limi */

/******************************************************************************************************************************************************************************************* */

/* Admin bo'limi */

bot.hears("Admin 📞", msg => {
  msg.replyWithHTML(
    "<b>" +
      msg.chat.first_name +
      "</b> bot foliyati yuzasidan taklif yoki savollaringiz 📩 bo'lsa adminga 👨🏻‍💻 murojat qilishingiz mumkin.!",
    Extra.markup(
      Markup.inlineKeyboard([
        {
          text: "🧑‍💻Admin bilan bog'lanish ",
          url: "https://t.me/uzbek_coder0415"
        }
      ])
    )
  );
});

/* Admin bo'limi */

/******************************************************************************************************************************************************************************************* */

/*Testni tekshirish bo'limi */

let messageId = 0;
let adminid = 1971351367;
let admin2 = 1932285743;
bot.hears("Admin sifatida kirish 📲", msg => {
  if (msg.chat.id == adminid || msg.chat.id == admin2) {
    if (msg.chat.id == adminid) {
      msg.replyWithHTML(
        "<b>Assalomu alaykum <i>Dilshodbek</i> admin bo'limiga xush kelibsiz </b>",
        Extra.markup(adminButton)
      );
    } else {
      msg.replyWithHTML(
        "<b>Assalomu alaykum <i>Azizbek</i> admin bo'limiga xush kelibsiz </b>",
        Extra.markup(adminButton)
      );
    }
  } else {
    msg.replyWithHTML(
      msg.chat.first_name + " <b>siz adminlar ro'yxatida topilmadingiz.</b>"
    );
  }
});

let b = false;
bot.hears("Admin bo'limi 👨🏻‍💻", msg => {
  if (msg.chat.id == adminid || msg.chat.id == admin2) {
    msg.reply("Yangilik yozing....");
    b = true;
  }
});

let t = false;
bot.hears("Test javoblarini bazaga kiritish", msg => {
  msg.reply(
    "test javoblarini quyidagi formada yuboring\n [Test kodi]|[Test Javoblari]\n1024|abcdefg......"
  );

  t = true;
});

let ch = false;
bot.hears("Testni tekshirish", msg => {
  msg.reply(
    "test javoblarini quyidagi formada yuboring\n [Test kodi]|[Test Javoblari]\n1024|abcdefg......"
  );

  ch = true;
});

try {
  readJSON("testData.json", (err, data) => {
    if (err) throw err;
    testData = data;
  });
} catch (e) {
  if (e) throw e;
}

bot.hears("Bot haqida 📄", msg => {
  msg.replyWithHTML(
    "<b>Bot haqida qisqacha:\n <i>🔹 Turli fanlarda o'z bilimingizni tekshirish \n🔹 Kun savollarini yechish\n🔹 Savol javoblarini guruhda muhokama qilish\n🔹 Dunyo, fan va texnika yangiliklaridan xabardor bo'lishinigz mumkin</i>\n Muhokama uchun |<a href='https://t.me/fizika_matematika_dtm_testlari'>KANALIMIZ</a>|<a href='https://t.me/joinchat/W3qDavFDsXozYTli'>GURUHIMIZ</a>|</b>",
    Extra.markup(
      Markup.inlineKeyboard([
        {
          text: "Kanalimiz ✅",
          url: "https://t.me/fizika_matematika_dtm_testlari"
        },
        { text: "Guruhimiz 👥", url: "https://t.me/joinchat/W3qDavFDsXozYTli" }
      ])
    )
  );
});

bot.hears("Botdagi obunachilar", msg => {
  msg.replyWithHTML("<b>Obunachilar soni👥:</b> " + arr.length + " ta");
});
bot.on("message", msg => {
  if (b) {
    b = false;
    if (msg.chat.id == adminid || msg.chat.id == admin2) {
      arr.map(e => {
        msg.tg.forwardMessage(e.chatId, msg.chat.id, msg.message.message_id);
      });
    }
  }
  if (bll2) {
    javob = msg.message.text;
  }
  //##############
  if (t) {
    let [test, javoblar] = msg.message.text.split("|");
    testData.push({
      testCode: test,
      answer: javoblar,
      testLength: javoblar.length
    });

    msg.reply("Test javoblari bazaga qo'shildi");
    writeJSON("testData.json", testData);

    t = false;
    return;
  }
  if (ch) {
    let [code, answer] = msg.message.text.split("|");
    if (testData.find(({ testCode }) => testCode == code)) {
      let test = testData.find(({ testCode }) => testCode == code);
      if (answer.length != test.testLength) {
        msg.reply("Kiritilgan javoblarning kiritilishida xatolik bor!");
        return;
      } else {
        let rt = "Natijalar:\n\n";
        let l = 0;
        for (let i = 0; i < answer.length; i++) {
          if (answer[i] == test.answer[i]) {
            rt = rt + `${i + 1}. ${answer[i]}✅\n` + " ";
            l = l + 1;
          } else {
            rt = rt + `${i + 1}. ${answer[i]}❓-${test.answer[i]}\n` + " ";
          }
          if ((i + 1) % 3 == 0) rt = rt + "";
        }

        rt =
          rt +
          "\nJami testlar soni: " +
          test.testLength +
          "\nTo'g'ri javoblar soni: " +
          l +
          "\nNoto'g'ri javoblar soni: " +
          (test.testLength - l);
        msg.reply(rt);
        msg.tg.sendMessage(
          adminid,
          msg.chat.first_name + " ning natijalari \n<b>" + rt + "</b>",
          Extra.HTML(true)
        );
        msg.tg.sendMessage(
          admin2,
          msg.chat.first_name + " ning natijalari \n<b>" + rt + "</b>",
          Extra.HTML(true)
        );
      }
    } else {
      msg.reply("Bundan test Kodiga ega test mavjud emas!");
      return;
    }
  }
});
let bll2 = false;
bot.hears("Test javoblari✅", msg => {
  msg.reply("Javoblarni yozing....");

  bll2 = true;
});

/*Testni tekshirish bo'limi */

/******************************************************************************************************************************************************************************************* */
setInterval(() => {
  require("node-fetch")(
    "https://glitch.com/edit/#!/fishy-lateral-conkerberry.glitch.me"
  )
    .then(res => {})
    .catch(err => {});
}, 180000);

bot.launch({ polling: true });
