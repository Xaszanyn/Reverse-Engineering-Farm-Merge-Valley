PROCESSES

-Original main.js File

-Regex Replace for cases like "serv" + "ices"

```js
// \"([^"`]*)\"\s\+\s\"([^"`]*)\"
.replaceAll(/\"([^"`]*)\"\s\+\s\"([^"`]*)\"/g, (match, first, second) => `"${first + second}"`)
```

-Deobfuscate with decode-main (regex-deobfuscate-main.js)
-Copy for inspection
