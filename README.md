# Phoenix: Lab 2 Website

**Live site:** https://emalikellie2580-cmd.github.io/team-website/

## Team
| Name               | Registration no.  | GitHub username      |
|------------------  |------------------ |--------------------- |
| Kelly Emali        | COM/0027/26       | Emalikellie2580-cmd  |
| Brenda Chepskirui  | COM/3448/26       | Brendachepkirui      |

## Who drove each part
- Part 0, 2, 4, 5: Kelly Emali (part 6 done together)
- Part 1, 3: Brenda Chepkirui

## Personalisation
- Our colours: light mode uses a soft off-white background('#f6f7f4'), dark slate text ('#1c2430').
- Projects we added: Added "Interactive quiz app" (under the JavaScript category) and "Team Git workflow" (under a new "Git" category, complete with a matching filter button in 'projects.html').
- Extension challenge(s) completed: E3 (Search the projects with live input filtering) and E4 (Save a draft message).

## Reflection
1. By using a <div> affects the users with visual impairments by reducing accessibility.
It would also remove the keyboard support meaning users who use enter could have difficulty.
2. In absence of defer the browser executes the JavaScript as soon as it encounters the <script> tag while parsing the HTML.
If the script tries to access elements that have not yet been created in the DOM, it may cause errors or fail to work correctly. The defer attribute ensures the script runs only after the HTML has been fully parsed.
3. If project titles were typed in by visitors, the visitor could enter HTML or JavaScript code that would be interpreted and executed by the browser hence leading to Cross-Site Scripting (XSS) attacks, allowing malicious users to inject harmful content into the page. Alternatively textContent displays the text safely without executing any code.
4. Client-side JavaScript validation can be bypassed by disabling JavaScript or sending data directly to the server. Because users can manipulate or submit invalid data the server must perform its own validation to ensure the data is correct and secure. Server-side validation protects the application from malicious or incorrect input.
5. Browser storage such as localStorage is tied to a specific origin which consists of the protocol, domain and port. Home and Contact pages share the same origin when served through Live Server hence they can access the same stored theme setting. A file opened directly from the file system (file://) has a different origin hence it can't share the same stored data.
6. The navigation bar, header, or footer is often duplicated across multiple HTML pages. This duplication makes maintenance harder because any change must be updated in every file increasing the risk of inconsistencies. It can be avoided by using reusable components, templates, or JavaScript to load shared content from a single source.

# Should the alt repeat the person's name when the name is already in the heading right below it?
1. Answer is no. The alt text should communicate that information and not simply repeat nearby content.