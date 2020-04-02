1. What information might this feature expose to Web sites or other parties, and for what purposes is that exposure necessary?

Nothing, that I can see.


2. Is this specification exposing the minimum amount of information necessary to power the feature?

Yes. I don't believe it exposes anything more than existing Shadow DOM.


3. How does this specification deal with personal information or personally-identifiable information or information derived thereof?

It doesn't.

4. How does this specification deal with sensitive information?

It doesn't.


5. Does this specification introduce new state for an origin that persists across browsing sessions?

No.

6. What information from the underlying platform, e.g. configuration data, is exposed by this specification to an origin?

Nothing.

7. Does this specification allow an origin access to sensors on a user’s device?

No.

8. What data does this specification expose to an origin? Please also document what data is identical to data exposed by other features, in the same or different contexts.

Should be the same as existing Shadow DOM.


9. Does this specification enable new script execution/loading mechanisms?

It shouldn't, no. As the declarative Shadow DOM `<template>` document is inert, contained scripts should not execute until the shadow is attached and the `<template>` contents are moved inside. At that point, contained scripts *will* execute, but in the same way that ordinary imperatively-created shadow DOM scripts execute. Similarly, contained style rules are applied at that point as well, but they will be encapsulated to the shadow root.


10. Does this specification allow an origin to access other devices?

No.


11. Does this specification allow an origin some measure of control over a user agent’s native UI?

No.


12. What temporary identifiers might this this specification create or expose to the web?

None.


13. How does this specification distinguish between behavior in first-party and third-party contexts?

This feature should not have third-party implications.


14. How does this specification work in the context of a user agent’s Private Browsing or "incognito" mode?

It shouldn't expose any differences when running in private browsing mode.


15. Does this specification have a "Security Considerations" and "Privacy Considerations" section?

It does not. Perhaps I should add one based on the outcome of my TAG review.


16. Does this specification allow downgrading default security characteristics?

No.


17. What should this questionnaire have asked?

I'm not sure. That's why I'm requesting a TAG review. :-)

