function showDelayedNotification() {
    const delay = prompt('Enter delay in milliseconds:');

    setTimeout(() => {
        alert('This is a delayed notification!');
    }, delay);
}
