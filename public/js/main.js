// This file can be used for additional client-side functionality
// Currently, all the functionality is embedded in the chat.ejs file for simplicity
// But you can separate it here for better organization in the future

// Example function to handle notifications
function showNotification(message) {
    // Check if browser supports notifications
    if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification");
        return;
    }

    // Check if permission is granted
    if (Notification.permission === "granted") {
        const notification = new Notification("SimpleChat", {
            body: message
        });
        return;
    }

    // Otherwise, ask for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                const notification = new Notification("SimpleChat", {
                    body: message
                });
            }
        });
    }
}

// You can add more functionality here as needed