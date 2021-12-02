var browserName = (function (agent) {        
    switch (true) {
        case agent.indexOf("edge") > -1: return "MS-Edge";
        case agent.indexOf("edg/") > -1: return "Edge-Chromium)";
        case agent.indexOf("opr") > -1 && !!window.opr: return "Opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome: return "Google-Chrome";
        case agent.indexOf("trident") > -1: return "MS-IE";
        case agent.indexOf("firefox") > -1: return "Mozilla-Firefox";
        case agent.indexOf("safari") > -1: return "Safari";
        default: return "other";
    }
})(window.navigator.userAgent.toLowerCase());

document.getElementsByClassName('browser')[0].innerHTML = browserName


var command = document.querySelector("#command");

command.addEventListener("submit", function(e) {
    e.preventDefault();
    var inputValue = document.getElementsByClassName("command-input")[0].value;
    document.getElementsByClassName("command-input")[0].value = ""
    CheckInput(inputValue)
    console.log(inputValue);
})

function CheckInput(input) {
    let commands = input.trim().split(" ")
    if(commands[0]==="help") {
        document.getElementsByClassName('output')[0].innerHTML = "<span class=\"green\">ls</span> - displays the names of files contained within that directory<br>\
            <span class=\"green\">cat</span> - utility reads files sequentially, writing them to the standard output<br>\
            <span class=\"green\">help</span> - displays the available commands on this terminal<br>"
    }
    else if(commands[0]==="cat") {
        fetch("./files/txt-files/"+commands[1])
            .then(response => {
                if (response.ok) {
                    return response.text();
                  } else {
                    throw new Error('Something went wrong');
                  }
            })
            .then((data) => {
                document.getElementsByClassName('output')[0].innerHTML = data;
              })
            .catch((error) => {
                console.log(error)
                if (commands[1]===undefined){
                    document.getElementsByClassName('output')[0].innerHTML = "Specify a <span class=\"green\">filename</span> to show the contents";
                }
                else {
                    document.getElementsByClassName('output')[0].innerHTML = "No file found named: <span class=\"green\">"+commands[1]+"</span>";
                }
            });
    }
    else if(commands[0]==="ls") {
        document.getElementsByClassName('output')[0].innerHTML = "<span class=\"green\">about-me.txt</span><br>\
        <span class=\"green\">contact-me.txt</span>";
    }
    else {
        document.getElementsByClassName('output')[0].innerHTML = "command not found: <span class=\"green\">" + input + "</span>";
    }
}