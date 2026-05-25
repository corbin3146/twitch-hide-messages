// TODO: appendChild a button that toggles hiding

// The issue you're experiencing is likely because the mutation observer is only observing the chat log element that existed when the page was first loaded. If you switch to another stream, a new chat log element is created and the observer is not aware of it.

// To fix this, you can modify the code to observe the entire document instead of just the chat log element.When a mutation occurs, you can check if it's a chat message and then check if it starts with an exclamation point. If it does, you can remove the message.

// This code observes the entire document body and checks for mutations in the subtree. When a chat message is added, it checks if it starts with an exclamation point and removes it if it does. It also logs the removed message to the console with Twitch's font and colors.


// Waits for the full page (images, scripts, etc.) to load
function waitForElement(selector) {
    return new Promise(resolve => {
        // Check if it already exists
        const element = document.querySelector(selector);
        if (element) {
            return resolve(element);
        }

        // Otherwise, watch for it to be added
        const observer = new MutationObserver(mutations => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                observer.disconnect(); // Stop watching
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
waitForElement('[data-a-target="chat-settings"]').then((btn) => {
    main();
});

function main(){
    // Write a message to the console
    console.log('%c😵 Twitch Hide Messages: Extension loaded.', 'color: #9147ff; font-size: 1.1em; font-family: sans-serif;');

    // Find the chat settings button
    // not const because it changes when you switch channels
    let chatSettingsButton = document.querySelector('[data-a-target="chat-settings"]');
    console.log(chatSettingsButton)
    console.log(chatSettingsButton.parentElement)
    // Create a new toggle button
const toggleButton = document.createElement('button');
    toggleButton.innerHTML = '❗';
    toggleButton.title = 'Show messages with "!"';
    // toggleButton.style.backgroundColor = '#9147ff';
    toggleButton.style.color = '#ffffff';
    toggleButton.style.fontFamily = 'sans-serif';
    toggleButton.style.fontSize = '1em';
    toggleButton.style.fontWeight = 'bold';
    // toggleButton.style.border = '1px solid #000';
    toggleButton.style.borderRadius = '5px';
    // toggleButton.style.padding = '5px 10px';
    toggleButton.style.marginRight = '5px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.classList.add('toggle-btn-enabled');

    // Append the toggle button to the chat settings button's parent element
    chatSettingsButton.parentElement.insertBefore(toggleButton, chatSettingsButton);

    // Add a click event listener to the toggle button
    toggleButton.addEventListener('click', () => {
        if (toggleButton.classList.contains('toggle-btn-enabled')) {
            toggleButton.classList.remove('toggle-btn-enabled');
            toggleButton.innerHTML = '❕';
            toggleButton.title = 'Hide messages with "!"';
            console.log('%c👀 Messages with "!" are no longer hidden', 'color: #9147ff; font-size: 1.1em; font-family: sans-serif');
            const hidden_messages = document.querySelectorAll('[twitch-hide-messages]');
            //console.log(hidden_messages)
            // hidden_messages.forEach(Message => {
            //     console.log(Message)
            //     Message.style.setProperty('display', 'block', 'important');
            //     Message.style.setProperty('opacity', '1', 'important');
            //     //console.log(window.getComputedStyle(Message).display)
            // })
            observer.disconnect();
        } else {
            toggleButton.classList.add('toggle-btn-enabled');
            toggleButton.innerHTML = '❗';
            toggleButton.title = 'Show messages with "!"';
            console.log('%c😵 Messages with "!" are now hidden', 'color: #9147ff; font-size: 1.1em; font-family: sans-serif');
            // const hidden_messages = document.querySelectorAll('[twitch-hide-messages]');
            // hidden_messages.forEach(Message => {
            //     Message.style.setProperty('display', 'none', 'important');
            // })
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });

    toggleButton.addEventListener('mouseover', () => {
        toggleButton.style.backgroundColor = 'var(--color-background-interactable-hover)';
    });

    toggleButton.addEventListener('mouseout', () => {
        toggleButton.style.backgroundColor = 'transparent';
    });

    // Create a new MutationObserver
    const observer = new MutationObserver(mutations => {
        // Loop over each mutation
        mutations.forEach(mutation => {
            // Check if nodes were added to the chat log
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Loop over each added node
                mutation.addedNodes.forEach(node => {
                    // Check if the added node is a chat message with the "chat-line__message" class
                    // console.log("activity detected node class list:", node.classList)
                    if (node instanceof HTMLDivElement && node.querySelector('[data-a-target="chat-message-text"]') !== null) {
                        //console.log("activity detected node:", node)
                        const messageTextSpan = node.querySelector('[data-a-target="chat-message-text"]');
                        const authorTextSpan = node.querySelector('[data-a-target="chat-message-username"]');
                        // Check if the message starts with an exclamation point
                        const HasRestrictedContents = CheckForFilteredContents(messageTextSpan.innerText.trim())//returns -1 or the fade time in ms
                        
                        if (messageTextSpan && HasRestrictedContents>=0) {
                            // console.log('%c➖ ' + node.innerText.trim(), 'color: #9147ff; font-size: 1.1em; font-family: sans-serif');
                            // Hide the message container
                            console.log("HasRestrictedContents:",HasRestrictedContents)
                            node.animate([
                                { opacity: 1 }, // Start state
                                { opacity: 0.25, display : 'none'}  // End state partialy visible then pop
                                ], {
                                duration: HasRestrictedContents,
                                easing: 'ease-out', 
                                fill: 'forwards'
                                });
                            node.setAttribute('twitch-hide-messages', 'hidden_message');
                            
                        }
                    }
                });
            }
            if (!document.body.contains(toggleButton)) {
                console.log('%c😟 Twitch Hide Messages button is lost. Restoring..', 'color: #9147ff; font-size: 1.1em; font-family: sans-serif');
                // Re-append the toggle button to the chat settings button's parent element
                chatSettingsButton = document.querySelector('[data-a-target="chat-settings"]');
                chatSettingsButton.parentElement.insertBefore(toggleButton, chatSettingsButton);
            }
        });
    });

    // Observe the chat log for changes
    observer.observe(document.body, { childList: true, subtree: true });
}


function CheckForFilteredContents(text){
    //console.log("Message [",text,"] is being searched")
    // chrome.storage.sync.get(['userFilter'], function(result) {
    //     const filter = result.userFilter ?? ""; 
    //     console.log("Current filter is: ", filter);
    // });

    const Regex = '^!.*'
    if (text.startsWith('!fish')){
        return 2 * 1000
    }else if (text.startsWith('!sr')){
        return 2 * 1000
    } else if (text.includes('Gold! You now have')){
        return 60 * 1000
    } else if (text.includes('has won the Battle Royale')){
        return 60 * 1000
    } else if (text.includes('The Battle Royale is starting!')){
        return 10 * 1000
    } else if (text.includes('Taking song requests!')){
        return 5 * 1000
    } else if (text.includes('use code Axlebro at checkout')){
        return 60 * 1000
    } else if (text.includes('the jump catch game!')){
        return 5 * 1000
    } else if (text.includes('The Battle Royale is starting!')){
        return 60 * 1000
    } else if (text.includes('Taking an ad break!')){
        return 180 * 1000
    } else if (text.includes('The Battle Royale is starting!')){
        return 60 * 1000
    } else if (text.includes('The Battle Royale is starting!')){
        return 60 * 1000
    } else if (text.includes('from the slots!')){
        return 60 * 1000
    } else if (text.includes('added (playing in')){
        return 20 * 1000
     }else if (text.search(Regex) != -1){//search returns -1 or the index of what you are searching for
         return 5 * 1000
    }else return -1
}