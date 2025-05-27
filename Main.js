//voice assistant logic

var button=document.querySelector(".button");
var text=document.querySelector(".text");
var recognition=new webkitSpeechRecognition();
recognition.lang="en-US";
recognition.continuous=false;
recognition.interimResults=false;

//when button clicked start listing
button.addEventListener("click",function(){
    recognition.start();
});

//recoginition end,stop listening
recognition.addEventListener("end",function(){
    recognition.stop();
})

//display the result and speak a response

recognition.addEventListener("result", function(event) {
    var query = event.results[0][0].transcript;
    text.value = query;
    var response = "";

    var lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("hello")) {
        response = "Hello, how are you?";
    } else if (lowerQuery.includes("time")) {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        response = "The time is " + hours + ":" + minutes + " " + ampm;
    } else if (lowerQuery.includes("date")) {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1; // months are zero indexed
        var year = date.getFullYear();
        response = "The date is " + day + "/" + month + "/" + year;
    } else if (lowerQuery.includes("weather")) {
        response = "The weather is sunny and warm";
    } else if (lowerQuery.includes("joke")) {
        response = "What do you call a fish that wears a bowtie? Sofishticated."; // dummy response
    } else {
        response = "Sorry, I am unable to answer this.";
    }

    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);

});

