var cmds = 0;
var wait = 0;
var error = 0;
const version = '1.1.4';
var CMDreply = '';
var select = document.querySelector('.input');
select.focus();
select.select();

let history = [];

async function input() {
    if (wait == 0) {
        const input = document.querySelector('.input').value;
        if (input == ('cls')) {
            document.querySelector('.input').value = '';
            window.location.href = '';
        }
        else if (input == '') {}
        else {
            reply(input);
            document.querySelector('.input').value = '';
        }
    }
    else {
        document.querySelector('.input').value = '';
    }
}

async function reply(command) {
    if (command == 'help') {
        CMDreply = "Commands include: help, stop, square, echo, print, status, shout, time, date, exit, ver, version, isOdd, isEven & Math. Type 'explain ...' to learn what these features do.";
    }
    else if (command.includes('echo ')) {
        CMDreply = command.replace(/echo /gi, '');
    }
    else if (command.includes('explain ')) {
        var explain = command.replace(/explain /gi, '');
        if (explain == 'echo') {
            CMDreply = "Repeats whatever is typed after 'echo'.";
        }
        else if (explain == 'print') {
            CMDreply = "Prints the terminal";
        }
        else if (explain == 'status') {
            CMDreply = "Displays the system status like 'running perfectly' or 'overheating'.";
        }
        else if (explain == 'help') {
            CMDreply = "Lists all available commands you can use.";
        }
        else if (explain == 'shout') {
            CMDreply = "Outputs your message in ALL CAPS and adds an exclamation mark.";
        }
        else if (explain == 'time') {
            CMDreply = "Shows the current system time.";
        }
        else if (explain == 'date') {
            CMDreply = "Shows the current date.";
        }
        else if (explain == 'exit') {
            CMDreply = "Leaves or closes the terminal.";
        }
        else if (explain == 'ver' || explain == 'version') {
            CMDreply = "Displays the terminal's current version.";
        }
        else if (explain == 'square') {
            CMDreply = "Squares the number typed after 'square'. For example, square 4 → 16.";
        }
        else if (explain == 'isEven') {
            CMDreply = "Returns true if the number is even, false if not.";
        }
        else if (explain == 'isOdd') {
            CMDreply = "Returns true if the number is odd, false if not.";
        }
        else if (explain == 'Math') {
            CMDreply = "Evaluates math expressions. Example: Math 5 * (3 + 2) → 25.";
        }
        else if (explain == 'history') {
            CMDreply = "Shows the list of all previously used commands with timestamps.";
        }
        else if (explain == 'cls history') {
            CMDreply = "Clears the entire command history.";
        }
        else if (explain == 'stop') {
            CMDreply = "Disables terminal.";
        }
        else {
            if (error != 3) {
                error = 1;
                CMDreply = `Error - No explanation found for '${explain}'.`;
            }
        }        
    }
    else if (command == ('print')) {
        document.querySelector('.input').value = '';
        print();
        CMDreply = 'Menu Closed';
    }
    else if (command == ('status')) {
        const random = Math.random();
        if (random <= 9/10) {
            CMDreply = 'System is running perfectly';
        }
        else {
            CMDreply = 'System is overheating, please refresh';
        }
    }
    else if (command.includes('shout ')) {
        var without = (command.replace(/shout /gi, ''));
        CMDreply = without.toUpperCase() + '!';
    }
    else if (command == ('time')) {
        var time = new Date();
        time = time.toLocaleTimeString();
        CMDreply = time
    }
    else if (command == ('date')) {
        var date = new Date();
        date = date.toLocaleDateString();
        CMDreply = date
    }
    else if (command == ('exit')) {
        close();
    }
    else if (command == ('ver') || command == ('version')) {
        CMDreply = version;
    }
    else if (command.includes('square ')) {
        var without = (command.replace(/square /gi, ''));
        if (isNaN(without)) {
            error = 1;
            CMDreply = `Error - '${without}' is not a number`;
        }
        else {
            CMDreply = without ** 2;
        }
    }
    else if (command.includes('isEven ')) {
        var without = (command.replace(/isEven /gi, ''));
        if (isNaN(without)) {
            error = 1;
            CMDreply = `Error - '${without}' is not a number`;
        }
        else {
            if (without % 2 == 0) {
                CMDreply = true;
            }
            else {
                CMDreply = false;
            }
        }
    }
    else if (command.includes('isOdd ')) {
        var without = (command.replace(/isOdd /gi, ''));
        if (isNaN(without)) {
            error = 1;
            CMDreply = `Error - '${without}' is not a number`;
        }
        else {
            if (without % 2 == 0) {
                CMDreply = false;
            }
            else {
                CMDreply = true;
            }
        }
    }
    else if (command.includes('Math ')) {
            var without = command.replace(/Math /gi, '');
            try {
                CMDreply = eval(without);
            }
            catch {
                error = 1;
                CMDreply = `Error - '${without}' is not a valid expression`;
            }  
    }
    else if (command == 'explain' || command == 'explain ') {
        if (error != 3) {
            error = 1;
            CMDreply = "Error - 'explain' must be followed by a command.";
        }
    }
    else if (command == 'history') {
        if (error != 3) {
            if (history.length != 0) {
                CMDreply = history;
            }
            else {
                error = 1;
                CMDreply = `Error - '${command}' is empty`;
            }
        }
    }
    else if (command == 'cls history') {
        if (error != 3) {
            if (history.length != 0) {
                error = 2;
                history = [];
                CMDreply = 'History Cleared Successfully';
            }
            else {
                error = 1;
                CMDreply = `Error - 'history' is already empty`;
            }
        }
    }
    else if (command == 'stop') {
        CMDreply = 'The terminal has stopped';
        console.log('Terminal has stopped');
        await delay(260);
        error = 3;
    }
    else {
        if (error != 3) {
            error = 1;
            CMDreply = "Error - '" + command + "' is not a proper command.";
        }
    }

    if (command.includes('history')) {
        
    }
    else {
        addToHistory(command);
    }

    if (error != 3) {
        printOnPage(command, CMDreply);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function printOnPage(messageThere, messageBack) {
    if (messageBack != '') {
        inputMessage = document.createElement('p');
        inputMessage.classList.add('text-input');
        inputMessage.innerText = 'COMMAND: ' + messageThere;
        replyMessage = document.createElement('p');
        replyMessage.classList.add('reply');
        replyMessage.innerText = 'RESPONSE: ' + messageBack;
        if (cmds >= 0 && cmds < 10) {
            let inputDiv = document.querySelector(`.a${cmds + 1}`); 
            let replyDiv = document.querySelector(`.a${cmds + 1}a`);

            if (error == 1) {
                replyMessage.classList.remove('reply');
                replyMessage.classList.add('error-reply');
            }
            else if (error == 2) {
                replyMessage.classList.remove('reply');
                replyMessage.classList.add('success-reply');
            }

            inputDiv.appendChild(inputMessage);
            wait = 1
            await delay(250);
            wait = 0
            replyDiv.appendChild(replyMessage);
            cmds += 1;
        } else {
            alert('You have reached the Command Limit. Click OK to Refresh the Page');
            window.location.href = '';
        }
        error = 0;
        }
    else {
        
    }
}

function addToHistory(item) {
var time = new Date();
time = time.toLocaleTimeString();
history.push(` '${item}' at ${time}`);
}
