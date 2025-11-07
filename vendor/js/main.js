const quoteText = document.querySelector('.quote'),
    quoteBtn = document.querySelector('button'),
    authorName = document.querySelector('.name'),
    speechBtn = document.querySelector('.speech'),
    copyBtn = document.querySelector('.copy'),
    copyMessage = document.querySelector('.message'),
    synth = speechSynthesis;

// Add Rondom Quote & Author
function randomQuote(){
    quoteBtn.classList.add('loading');
    quoteBtn.innerText = 'Loading...';
    fetch('https://api.quotable.io/random').then(response =>
    response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author || 'No Author';
        quoteBtn.classList.remove('loading');
        quoteBtn.innerText = 'New Quote';
        console.log(result);
    });
}
quoteBtn.addEventListener('click', randomQuote);

// Listening to sentences
speechBtn.addEventListener('click', () => {
    if(!quoteBtn.classList.contains('loading')) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove('active') :
            speechBtn.classList.add('active');
        }, 10);
    }
})

// Message Copied
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(quoteText.innerText);
    copyMessage.classList.add('show');
    setTimeout(() => {
        copyMessage.classList.remove('show');
    }, 1500)
})