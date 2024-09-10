// const original = document.createElement;

// document.createElement = function (tag, options) {
//   const element = original.call(document, tag, options);

//   if (tag.toLowerCase() === "iframe") {
//     debugger;
//     console.log("==========================================================================================");
//     console.log(element);
//     console.log(element.src);
//     console.log("==========================================================================================");
//   }

//   return element;
// };

/////////////////////////////////////////

// const originalAppendChild = Node.prototype.appendChild;

// Node.prototype.appendChild = function (child) {
//   if (
//     child.tagName == "IFRAME" &&
//     child.src == "https://1187013846746005515.discordsays.com/main.7f118811729d37ef16fc.js"
//   ) {
//     Node.prototype.appendChild = originalAppendChild;

//     child.onload = () => {
//       debugger;
//       console.log(child);
//       console.log(child.contentDocument.querySelector(`script[src="main.7f118811729d37ef16fc.js"]`).text);
//       child.contentDocument.querySelector(`script[src="main.7f118811729d37ef16fc.js"]`).remove();
//       let script = child.contentDocument.createElement("script");
//       script.defer = true;
//       script.src =
//         "https://raw.githubusercontent.com/Xaszanyn/Reverse-Engineering-Farm-Merge-Valley/main/main-injected.js";
//       child.contentDocument.head.appendChild(script);
//       // child.contentWindow.document.querySelector(`script[src="main.7f118811729d37ef16fc.js"]`).src =
//       //   "https://raw.githubusercontent.com/Xaszanyn/Reverse-Engineering-Farm-Merge-Valley/main/main-injected.js";
//     };
//   }

//   return originalAppendChild.call(this, child);
// };

////////////////////////////

const originalAppendChild = Node.prototype.appendChild;

Node.prototype.appendChild = function (child) {
  console.log("*");
  if (
    child.tagName == "IFRAME" &&
    child.src !=
      "https://1187013846746005515.discordsays.com/?instance_id=i-1282870718551560203-gc-511608152291147787-530156005024333824&channel_id=530156005024333824&location_id=gc-511608152291147787-530156005024333824&launch_id=1282870718551560203&guild_id=511608152291147787&frame_id=0f9ad811-5466-4fee-ab00-bec9c1dd5eda&platform=desktop"
  ) {
    debugger;
    child.contentDocument.addEventListener("DOMContentLoaded", function () {
      console.log("==============================================================================================");
      console.log(child);
      console.log(child.contentDocument.querySelector(`script[src="main.7f118811729d37ef16fc.js"]`).text);
      debugger;

      child.contentDocument.querySelector(`script[src="main.7f118811729d37ef16fc.js"]`).remove();
      let script = child.contentDocument.createElement("script");
      script.defer = true;
      script.src =
        "https://raw.githubusercontent.com/Xaszanyn/Reverse-Engineering-Farm-Merge-Valley/main/main-injected.js";
      child.contentDocument.head.appendChild(script);
      // child.contentWindow.document.querySelector(`script[src="main.7f118811729d37ef16fc.js"]`).src =
      //   "https://raw.githubusercontent.com/Xaszanyn/Reverse-Engineering-Farm-Merge-Valley/main/main-injected.js";
    });
  }

  return originalAppendChild.call(this, child);
};

// EN SON BURADA KALDIN

// YUKARDAKİ KODU DENİYOSUN TAMPERMONKEY YERİNE ELLE KOYUYON ANTİ DEBUGGER AÇIK

// İFRAMEIN SCRİPT ÇALIŞMADAN ÖNCEKİ STATETİNE ULAŞAMIYORSUN
// İFRAME ÜZERİNE DOMCONTENT VEYA ONLOAD YEMİYOR
// İFRAME CONTENT PROPERTYLERİ EXİST DEĞİL

// Bİ YOLUNU BULUP O STATEYE ERİŞMEN LAZIM SONRASINDA DOSYA DEĞİŞİMİ BÖYLELİKLE SCRİPT İNSERTİONUNUN ÇALIŞIP
// ÇALIŞMADIĞINI TEST EDECEĞİZ ÇALIŞTIĞINI DOĞRULARSAK TAMPERMONKEY ÜZERİNDEN ERİŞİM SAĞLAYABİLİRİZ.

// BİRAZ BAKTIM DOMCONTENT İŞİ YATTI GİBİ ÇÜNKÜ DEFERLER ONDAN ÖNCE ÇALIŞIYORMUŞ

// KENDİ SCRİPT DOSYANI İFRAMENİN İÇİNE KOYUP KALEYİ İÇERDEN FETHETMEYE ÇALIŞ

// HADİ ASLANIM HADİ KOÇUM
// SİKTİRGİT İŞİNİ YAP LAN
