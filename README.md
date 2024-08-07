# ArduinoHID-Web
A Web tool that generates Arduino HID scripts from mnemonics.

# Key Features
- Simple and clean GUI.
- Two large windows one for mnemonics and other for arduino HID Scripts.
- Convert Button - Convert mnemonics to Arduino HID Scripts.
- Copy Button - Copy arduino HID code to the clipboard so that it can paste anywhere.
- Reset Button - Clear all text from both windows.
- Save Button - Save arduino HID codes on the system for future use.
- From Button - Upload `.txt` files which contain mnemonics to run.

# OS Support
- Windows 10
- Windows 11
- Kali Linux

# Credits
The mnemoics used in this tool is heavily inspired by [here](https://github.com/hak5) Ducky Script.

# Installation and Setup
1. Download Arduino IDE from [here](https://www.arduino.cc/en/software).
2. Simply install it.
3. Done! All required libraries are pre-installed in Arduino IDE.

# Supported Boards
- Arduino Leonardo
- Arduino Micro
- Arduino Pro Micro

# Mnemonic Table
| Mnemonic | Description                                                                                                                                                                                   | Example                            |
|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| TYPE     | It add text want to type in the code and put the cursor on the same line.                                                                                                                     | TYPE Hello World!                  |
| TYNL     | It add text want to type in the code and put the cursor on the next line.                                                                                                                     | TYNL ArduinoHIDWeb!                |
| WRITE    | It add ASCII characters in the code.                                                                                                                                                          | WRITE *                            |
| WAIT     | It add time in the code.<br>Time is in milliseconds.<br>1000 ms = 1 second.                                                                                                                   | WAIT 1000                          |
| LOOP     | It run commands for a certain number of times.<br>Syntax is LOOP `<number-of-times>` `<commands>`.                                                                                            | LOOP 3<br>TYPE Hello World!<br>END |
| END      | It used to close the LOOP body.                                                                                                                                                               | Just type END                      |

# Supported Mnemonics
## Alphabet Keys
`A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M` `N` `O` 
`P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
## Function Keys
`F1` `F2` `F3` `F4` `F5` `F6` `F7` `F8` `F9` `F10` `F11` `F12`
## Navigation Keys
`LEFT` `UP` `RIGHT` `DOWN` `TAB` `HOME` `END` `PGUP` `PGDN`
## Lock Keys
`CAPS` `NUM` `SCROLL`
## System and GUI Keys
`GUI` `ESC` `PRTSCR` `PAUSE`
## Editing Keys
`INSERT` `DEL` `BKSP` `ENTER`
## Modifier Keys
`CTRL` `SHIFT` `ALT`
## ASCII Characters
`` ` `` `!` `@` `#` `$` `%` `^` `&` `*` `(` `)` `-` `=` `[` `]` `\` `;` 
`'` `,` `.` `/` `SPACE` `~` `_` `+` `{` `}` `|` `:` `"` `<` `>` `?` `0`
`1` `2` `3` `4` `5` `6` `7` `8` `9`

# Install and Run
1. Open the website by click [here](https://wirebits.github.io/ArduinoHID-Web/).
2. Type the mnemonics in the left window.
3. Click on `Convert` button to get corresponding arduino HID script.
4. Click on `Copy` button to copy the aduino HID script to the clipboard.
5. Paste the code in the Arduino IDE.
6. Compile the code.
7. Select correct board and port.
8. Upload the code.
9. Done!

# Examples
## 1. Open Notepad and Type
Mnemonic for Open Notepad and Type

```
WAIT 1000
GUI R
WAIT 1000
TYPE notepad
WAIT 1000
ENTER
WAIT 1000
TYPE This is a test script developed by ArduinoHIDWeb!
```
after Convert, the arduino HID script of the following mnemonic is :

```
#include <Keyboard.h>
void setup()
{
  Keyboard.begin();
  delay(1000);
  Keyboard.press(KEY_LEFT_GUI);
  Keyboard.press('r');
  Keyboard.releaseAll();
  delay(1000);
  Keyboard.print("notepad");
  delay(1000);
  Keyboard.press(KEY_RETURN);
  Keyboard.releaseAll();
  delay(1000);
  Keyboard.print("This is a test script developed by ArduinoHIDWeb!");
  Keyboard.end();
}

void loop()
{
  //Nothing to do here ;)
}
```
Just copy this code and paste it in the Arduino IDE.

## 2. Open CMD as Administartor Mode
Mnemonic for Open CMD as Administartor Mode

```
WAIT 1000
GUI
WAIT 1000
TYPE cmd
WAIT 1000
CTRL SHIFT ENTER
WAIT 1200
ALT Y
```
after Convert, the arduino HID script of the following mnemonic is :

```
#include <Keyboard.h>
void setup()
{
  Keyboard.begin();
  delay(1000);
  Keyboard.press(KEY_LEFT_GUI);
  Keyboard.releaseAll();
  delay(1000);
  Keyboard.print("cmd");
  delay(1000);
  Keyboard.press(KEY_LEFT_CTRL);
  Keyboard.press(KEY_LEFT_SHIFT);
  Keyboard.press(KEY_RETURN);
  Keyboard.releaseAll();
  delay(1200);
  Keyboard.press(KEY_LEFT_ALT);
  Keyboard.press('y');
  Keyboard.releaseAll();
  Keyboard.end();
}

void loop()
{
  //Nothing to do here ;)
}
```
Just copy this code and paste it in the Arduino IDE.

## 3. Create a folder
Mnemonic for Create a folder

```
WAIT 1000
CTRL SHIFT N
WAIT 1200
ENTER
```
after Convert, the arduino HID script of the following mnemonic is :

```
#include <Keyboard.h>
void setup()
{
  Keyboard.begin();
  delay(1000);
  Keyboard.press(KEY_LEFT_CTRL);
  Keyboard.press(KEY_LEFT_SHIFT);
  Keyboard.press('n');
  Keyboard.releaseAll();
  delay(1200);
  Keyboard.press(KEY_RETURN);
  Keyboard.releaseAll();
  Keyboard.end();
}

void loop()
{
  //Nothing to do here ;)
}
```
Just copy this code and paste it in the Arduino IDE.

## 4. Open Notepad and Type 5 Times
Mnemonic for Create a folder

```
WAIT 1000
GUI R
WAIT 1000
TYPE notepad
WAIT 1000
ENTER
WAIT 1000

LOOP 5
TYNL This is a test script developed by ArduinoHIDWeb!
END
```
after Convert, the arduino HID script of the following mnemonic is :

```
#include <Keyboard.h>
void setup()
{
  Keyboard.begin();
  delay(1000);
  Keyboard.press(KEY_LEFT_GUI);
  Keyboard.press('r');
  Keyboard.releaseAll();
  delay(1000);
  Keyboard.print("notepad");
  delay(1000);
  Keyboard.press(KEY_RETURN);
  Keyboard.releaseAll();
  delay(1000);
  for (int i = 0; i <= 5; i++)
  {
   Keyboard.println("This is a test script developed by ArduinoHIDWeb!");
  }
  Keyboard.end();
}

void loop()
{
  //Nothing to do here ;)
}
```
Just copy this code and paste it in the Arduino IDE.
