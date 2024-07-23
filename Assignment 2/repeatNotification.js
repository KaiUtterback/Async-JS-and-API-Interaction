let notificationInterval;

function startRepeatedNotifications() {
    clearInterval(notificationInterval);

    notificationInterval = setInterval(() => {
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'notification';
        notificationDiv.innerText = 'This is a repeated notification. Click to dismiss.';
        notificationDiv.onclick = () => {
            notificationDiv.remove();
        };
        document.getElementById('notifications').appendChild(notificationDiv);
    }, 5000);
}
