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

const originalAppendChild = Node.prototype.appendChild;

Node.prototype.appendChild = function (child) {
  if (child.tagName === "IFRAME") {
    console.log("Iframe detected in appendChild:", child.src);

    child.onload = () => {
      console.log("===================================== DONE");

      debugger;

      child.contentDocument.body.innerHTML = "<h1>TEST</h1>";
    };
  }

  return originalAppendChild.call(this, child);
};
