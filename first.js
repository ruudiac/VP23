document.addEventListener("DOMContentLoaded", function () {
    const dateInfo = {
        dateNowET: function () {
            const today = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return today.toLocaleDateString('et-EE', options);
        },
        timeNowET: function () {
            const today = new Date();
            const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return today.toLocaleTimeString('et-EE', options);
        }
    };

    document.getElementById('dateOutput').textContent += dateInfo.dateNowET();
    document.getElementById('timeOutput').textContent += dateInfo.timeNowET();
});