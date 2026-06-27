fetch("https://api.telegram.org")
    .then(r => console.log("Status:", r.status))
    .catch(err => console.error(err));