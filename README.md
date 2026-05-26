# ![Icon](https://github.com/rdavydov/twitch-hide-messages/blob/main/images/ico19.png?raw=true) Twitch Hide Messages


Browser extension that hides messages that start with "!" on Twitch.

![Demo](https://github.com/rdavydov/twitch-hide-messages/blob/main/twitch-hide-messages-demo.gif?raw=true)

## Features
1. Fade out Twitch chat spam. Other extensions prevent you from seeing the spam which has it's own benefits ofcourse, but this can leave chat feel slower and emptier than it really is.
2. Configurable JSON allows the user to tune how long messages stay on screen before popping out of existance. For now, you will need to open up the files to find it.
3. You can search for and remove messages which:
    A. Contain all provided words/phrases
    b. Contain any of the provided words
    c. Match a provided regex expression
    d. Starting with the provided word/phrase 
    e. Limit filter to only apply to a whitelist of message authors. eg: always remove messages from gato
4. Fade out can be disabled at a per filter basis if there are some messages you trully never need to see, Just set the fade out durration to 0 and the animation will finish instantly
5. For safety reasons and debugging reasons, this extension will not work in mod view
6. Filter can be disabled for incoming messages. Click the exclamation point in the bottom right by the settings cog to toggle.
7. Set a timeout to -1 to make a filter which prevents a message from being removed 

## Planned Features
1. Ability to alter the set of filters from your browser (no file editing)
2. Make these extension alterations persist between sessions
3. convert the filter toggle into a show/hide feature for previously identified/hidden messages
4. Upload this extension to the major extension stores for ease of access


## How to Install

1. Clone this repo
2. Go to your browser's extensions `chrome://extensions`
3. Enable Developer mode
4. Click "Load unpacked" (extension) and select this cloned repo's folder
