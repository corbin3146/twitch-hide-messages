# ![Icon](https://github.com/rdavydov/twitch-hide-messages/blob/main/images/ico19.png?raw=true) Twitch Hide Messages

Browser extension that hides messages using configurable filters on Twitch.

<!--![Demo](https://github.com/rdavydov/twitch-hide-messages/blob/main/twitch-hide-messages-demo.gif?raw=true)-->

## Features
1. Fade out Twitch chat spam. Unlike other extensions which prevent you from seeing the spam, this one alows you to compromise. Fully hiding the spam has it's own benefits of course, but this can leave chat feel slower and emptier than it really is.
2. Configurable JSON format filters can be edited by the user in settings
3. You can search for and remove messages which:
    - Contain all provided words/phrases
    - Contain any of the provided words
    - Match a provided regex expression
    - Starting with the provided word/phrase 
    - Limit filter to only apply to a whitelist of message authors. eg: this filter only applies to gato
4. Fade out can be disabled at a per filter basis if there are some messages you trully never need to see, Just set the fade out durration to 0 and the animation will finish instantly
5. For safety reasons and debugging reasons, this extension can be disabled for mod view and or regular view depending on preference. check the settings
6. Filter can be disabled for incoming messages. Click the exclamation point in the bottom right by the settings cog to toggle.
7. Set a timeout to -1 to make a filter which prevents a message from being removed 

## Planned Features
1. convert the filter toggle into a show/hide feature for previously identified/hidden messages
2. Upload this extension to the major extension stores for ease of access
3. If there is interest, I may also add the ability to flag messages with a user defined border or background. EG: the background of messages from gato are caution yellow

## What are these different branches in the git repo?
1. Main - code has been tested as thouroughly as one developer can manage on both a chromium based browser
2. Nightly - Code is stable and has been used for atleast 1 stream before adding to nightly
3. feature/something - this is a WIP that I am actively working on.  

## How to Install

1. get the code
    - Either clone this repo
    - or download and extract the code from github
2. Go to your browser's extensions 
3. Enable Developer mode
4. Click "Load unpacked" (extension) and select this cloned/extracted repo's folder

## Feedback
- Please open an issue on github for requests and bugs
- if something is broken, please include what you did in what order, what browser you have, and any details I would need to recreate the issue.
- Features do not strictly need to be related to spam management. If somebody wanted a popup durring a raid that has their intro listed... i can probably do that.
