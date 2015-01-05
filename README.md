#Separator

Log separators to your console and what-not

```
ns = require('separator');

ns.separator('=').log(); // logs a string of ='s to the console => ==========...


ns.separator('+=', 13).log(); // logs to the console, exactly => +=+=+=+=+=+=+

// Make it thicker,
ns.separator('-', 6, 5).log();  // => ------
                                //    ------
                                //    ------


ns.separator('-', 6).get();     // generates the string => '------'
```
