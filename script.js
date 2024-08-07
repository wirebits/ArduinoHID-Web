// JavaScript File for ArduinoHIDWeb
// Author - WireBits

function escapeText(text) {
    return text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function convertMnemonics() {
    var mnemonicsContent = document.getElementById("mnemonicsArea").value;
	
	const alphabet_keys = {
        'A': 'a', 'B': 'b', 'C': 'c', 'D': 'd', 'E': 'e', 'F': 'f', 'G': 'g',
        'H': 'h', 'I': 'i', 'J': 'j', 'K': 'k', 'L': 'l', 'M': 'm', 'N': 'n',
        'O': 'o', 'P': 'p', 'Q': 'q', 'R': 'r', 'S': 's', 'T': 't', 'U': 'u',
        'V': 'v', 'W': 'w', 'X': 'x', 'Y': 'y', 'Z': 'z'
    };

    const other_keys = {
        'F1': 'KEY_F1', 'F2': 'KEY_F2', 'F3': 'KEY_F3', 'F4': 'KEY_F4',
        'F5': 'KEY_F5', 'F6': 'KEY_F6', 'F7': 'KEY_F7', 'F8': 'KEY_F8', 'F9': 'KEY_F9',
        'F10': 'KEY_F10', 'F11': 'KEY_F11', 'F12': 'KEY_F12', 'LEFT': 'KEY_LEFT_ARROW',
        'UP': 'KEY_UP_ARROW', 'RIGHT': 'KEY_RIGHT_ARROW', 'DOWN': 'KEY_DOWN_ARROW',
        'TAB': 'KEY_TAB', 'HOME': 'KEY_HOME', 'END': 'KEY_END', 'PGUP': 'KEY_PAGE_UP',
        'PGDN': 'KEY_PAGE_DOWN', 'CAPS': 'KEY_CAPS_LOCK', 'NUM': 'KEY_NUM_LOCK',
        'SCROLL': 'KEY_SCROLL_LOCK', 'GUI': 'KEY_LEFT_GUI', 'ESC': 'KEY_ESC',
        'PRTSCR': 'KEY_PRINT_SCREEN', 'PAUSE': 'KEY_PAUSE', 'DEL': 'KEY_DELETE',
        'INSERT': 'KEY_INSERT', 'BKSP': 'KEY_BACKSPACE', 'ENTER': 'KEY_RETURN'
    };

    const modifier_keys = {
        'CTRL': 'KEY_LEFT_CTRL', 'SHIFT': 'KEY_LEFT_SHIFT', 'ALT': 'KEY_LEFT_ALT'
    };

    const special_symbol_keys = {
        '`': '96', '!': '33', '@': '64', '#': '35', '$': '36', '%': '37',
        '^': '94', '&': '38', '*': '42', '(': '40', ')': '41', '-': '45', '=': '61', '{': '123',
        '}': '125', '|': '124', ':': '58', '"': '34', '<': '60', '>': '62', '?': '63', '_': '95',
        '+': '43', '[': '91', ']': '93', '\\': '92', ';': '59', "'": '39', ',': '44', '.': '46',
        '/': '47', 'SPACE': '32', '0': '48', '1': '49', '2': '50', '3': '51', '4': '52', '5': '53', '6': '54', '7': '55',
        '8': '56', '9': '57'
    };

    function convertText(text) {
        var result = [];
        var lines = text.split('\n');
        var typeBuffer = '';
        var inLoop = false;
        var loopContent = [];
        var loopCount = 0;
        var setupCode = [];

        result.push('#include <Keyboard.h>');
        result.push('void setup()');
        result.push('{');
        result.push('  Keyboard.begin();');

        lines.forEach((line) => {
            line = line.trim();

            if (line.startsWith('LOOP ')) {
                let parts = line.split(' ');
                loopCount = parseInt(parts[1], 10);
                inLoop = true;
                loopContent = [];
            } else if (line === 'END') {
                if (inLoop) {
                    setupCode.push(`  for (int i = 0; i <= ${loopCount}; i++)`);
					setupCode.push(`  {`);
                    setupCode = setupCode.concat(loopContent.map(line => '   ' + convertLine(line).split('\n').join('\n    ')));
                    setupCode.push('  }');
                    inLoop = false;
                }
            } else if (inLoop) {
                loopContent.push(line);
            } else if (line.startsWith('TYPE ')) {
                typeBuffer = escapeText(line.substring(5).trim());
                if (typeBuffer) {
                    setupCode.push(`  Keyboard.print("${typeBuffer}");`);
                    typeBuffer = '';
                }
            } else if (line.startsWith('TYNL ')) {
                typeBuffer = escapeText(line.substring(5).trim());
                if (typeBuffer) {
                    setupCode.push(`  Keyboard.println("${typeBuffer}");`);
                    typeBuffer = '';
                }
            } else if (line.startsWith('WAIT ')) {
                let delay_time = parseInt(line.split(' ')[1], 10);
                setupCode.push(`  delay(${delay_time});`);
            } else if (line.startsWith('WRITE ')) {
                let ascii_keys = line.split(' ').slice(1);
                let write_code = ascii_keys.map(key => special_symbol_keys[key] ? `  Keyboard.write(${special_symbol_keys[key]});` : '').join('');
                setupCode.push(write_code);
            } else {
                let keys = line.split(' ').map(k => k.toUpperCase());
                let keyCommands = [];
                let modifiers = [];

                keys.forEach(key => {
                    if (modifier_keys[key]) {
                        modifiers.push(modifier_keys[key]);
                    } else if (other_keys[key]) {
                        keyCommands.push(`Keyboard.press(${other_keys[key]})`);
                    } else if (alphabet_keys[key]) {
                        keyCommands.push(`Keyboard.press('${alphabet_keys[key]}')`);
                    } else if (special_symbol_keys[key]) {
                        keyCommands.push(`Keyboard.press(${special_symbol_keys[key]})`);
                    }
                });

                if (modifiers.length > 0) {
                    modifiers.forEach(modifier => setupCode.push(`  Keyboard.press(${modifier});`));
                }

                if (keyCommands.length > 0) {
                    setupCode = setupCode.concat(keyCommands.map(cmd => `  ${cmd};`));
                    setupCode.push('  Keyboard.releaseAll();');
                } else {
                    if (typeBuffer) {
                        setupCode.push(`  Keyboard.print("${typeBuffer}");`);
                        typeBuffer = '';
                    }
                    if (line === 'ENTER') {
                        setupCode.push('  Keyboard.press(KEY_RETURN);');
                        setupCode.push('  Keyboard.releaseAll();');
                    }
                }
            }
        });

        if (typeBuffer) {
            setupCode.push(`  Keyboard.print("${typeBuffer}");`);
        }

        result = result.concat(setupCode);
        result.push('  Keyboard.end();');
        result.push('}');
        result.push('');
        result.push('void loop()');
        result.push('{');
        result.push('  //Nothing to do here ;)');
        result.push('}');

        return result.join('\n');
    }

    function convertLine(line) {
        if (line.startsWith('TYPE ')) {
            return `Keyboard.print("${escapeText(line.substring(5).trim())}");`;
        } else if (line.startsWith('TYNL ')) {
            return `Keyboard.println("${escapeText(line.substring(5).trim())}");`;
        } else if (line.startsWith('WAIT ')) {
            return `delay(${parseInt(line.split(' ')[1], 10)});`;
        } else if (line.startsWith('WRITE ')) {
            let ascii_keys = line.split(' ').slice(1);
            return ascii_keys.map(key => special_symbol_keys[key] ? `Keyboard.write(${special_symbol_keys[key]});` : '').join('');
        } else {
            return '';
        }
    }

    var convertedCode = convertText(mnemonicsContent);
    document.getElementById("arduinoArea").value = convertedCode;
}

function copyarduinoArea() {
    var content = document.getElementById("arduinoArea").value;
    navigator.clipboard.writeText(content);
}

function resetTextArea() {
    document.getElementById("mnemonicsArea").value = '';
    document.getElementById("arduinoArea").value = '';
}

function saveFile() {
    var content = document.getElementById("arduinoArea").value;
    var blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "code.ino";
    link.click();
}

function handleFileSelect(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById('mnemonicsArea').value = event.target.result;
    };
    reader.readAsText(file);
}

function triggerFileInput() {
    document.getElementById('fileInput').click();
}