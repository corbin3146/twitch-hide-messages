(async () => {

    if (await hasFilter()){
        console.log("Previous instance of filter found! Skipping Loading of default filter")
    }else{
        chrome.storage.local.set(
            {"filterConfig" : 
            [ //export and import are used because comments are not allowed in an actual JSON file
                {"FishingRequest": {//this part of the configuration of the filter is mostly decorative. It will appear in the console of your browser when applied. It does need to be unique    
                                "FilterType":"startsWith",
                                "FilteredText":{[1]:"!fish"},
                                "FadeOutDurrationSeconds":3
                }},
                {"SongRequestURL": {//this part of the configuration of the filter is mostly decorative. It will appear in the console of your browser when applied. It does need to be unique    
                                "FilterType":"startsWith",
                                "FilteredText":{[1]:"!sr"},
                                "FadeOutDurrationSeconds":3
                }},
                {"FishingCatchLegendary": {//legendary is more specific/important than "FishingCatchLow" therefore we place it before the other filter
                                "FilterType":"includesAll",
                                "FilteredText":{[1]:"gold 🎣",[2]:"Legendary"},
                                "FadeOutDurrationSeconds":-1//negative 1 means it will not be removed
                }},
                {"FishingCatchEpic": {
                                "FilterType":"includesAll",
                                "FilteredText":{[1]:"gold 🎣",[2]:"Epic"},
                                "FadeOutDurrationSeconds":30
                }},
                {"FishingCatchLow": {
                                "FilterType":"includesAll",
                                "FilteredText":{[1]:"gold 🎣"},
                                "FadeOutDurrationSeconds":10
                }},
                {"StreamAvatars":{
                                "FilterType":"includesAny",
                                "FilteredText":{
                                    [1]:"The Battle Royale is starting!",
                                    [2]:"has won the Battle Royale",
                                    [3]:"the jump catch game!",
                                    [4]:"from the slots!"
                                },
                                "FadeOutDurrationSeconds":20
                }},
                {"TakingSongRequests": {
                                "FilterType":"includesAll",
                                "FilteredText":{[1]:"Taking song requests!"},
                                "FadeOutDurrationSeconds":5
                }},
                {"ShillLimiter":{
                                "FilterType":"includesAll",
                                "FilteredText":{[1]:"use code",[2]:"at checkout"},
                                "FadeOutDurrationSeconds":30
                }},
                {"AddBreak":{//visible durring the 3 minute add break
                                "FilterType":"includesAll",
                                "FilteredText":{[1]:"ad break"},
                                "FadeOutDurrationSeconds":180
                }},
                {"SongRequestsSongAdded":{
                                "FilterType":"includesAll",
                                "FilteredText":{[1]:"added", [2]:"playing in"},
                                "FadeOutDurrationSeconds":15
                }},

                
                //filters are evaluated from top to bottom. here are some generic filters to catch the rest
                {"AllCommands":{
                                "FilterType":"regex",
                                "expression":"^!.*",//starts with !
                                "FadeOutDurrationSeconds":20
                }},
                {"BotCatchAll":{
                                "FilterType":"regex",
                                "expression":".",//match anything
                                "username":"bot",//this is a 'includes' filter because twitch does strange things with usernames some of the time
                                //for example "homo" will match any username including "homo"
                                "FadeOutDurrationSeconds":60
                }} 
            ]
        })

        console.log("No previous instance of filter found! Default filter has been loaded")
    }
})();

async function hasFilter() {
  const result = await chrome.storage.local.get("filterConfig");
  return Object.hasOwn(result, "filterConfig");
}
