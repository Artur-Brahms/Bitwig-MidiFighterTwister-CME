# Midi Fighter Twister - Custom-Mapping-Edition 
Control Surface Script for Bitwig Studio - Developed by Artur Brahms

## Simplified Control for DJ-TechTools Midi Fighter Twister

- User controls freely mappable via right mouse-click "Learn Controller Assignment..."
- Visual Feedback on Twister´s Knob-LEDs after Mapping
- Bidirectional control of the assigned parameters
- all 128 CC-parameters mappable
- multiple Twister-Devices supported



## Installation

- Download and extract the ZIP archive.
- Put the folder "DJ-TechTools - Midi Fighter Twister - Custom-Mapping-Edition" into the following location on your system:
	- Mac & Linux: ~/Documents/Bitwig Studio/Controller Scripts/
	- Windows: %Userprofile%\Documents\Bitwig Studio\Controller Scripts
	- or the user-defined path that you have set up in Bitwig (Settings => Locations => My Controller Scripts)
	
- Add the Controller (Settings => Controllers => Add)
- Select the Midi Fighter Script (DJ TechTools => Midi Fighter Twister - Custom-Mapping-Edition (by Artur Brahms))
- Set up the MIDI-In/Out ports



 
## Multiply Twister´s
- Twister´s target page (for each device) should be set, before bitwig starts
- Mappings are device-dependent - multimap is possible
- Device-Grouping is currently not integrated in bitwig´s api



## Limitations
- Note-Messages from the twister-device are currently unsupported



## History
- 0.5.0 / 11.Oct.2019 => Initial Release
	- a very basic working idea
###
- 0.5.1 / 14.Oct.2019 => Internal Beta
	- a perfect working idea
###
- 0.5.2 / 15.Oct.2019 => Public Beta-1
	- code rebase and cleanup
	- fix documentation
	- github-support (info/download/wiki)
###
- 0.5.3 / 16.Oct.2019 => Public Beta-2
	- added support for "side-button press" (unused yet)
	- implemented current-page detection (unused yet)
###
- 0.5.4 / 27.Dec.2019 => Public Beta-3
	- fixed: cc0 not assignable
###
- 0.5.5 / 30.Oct.2020 => Release
	- changes to support Bitwig v3.3
###
- 0.6.0 / 24.Oct.2022 => Release
	- support for secondary (shift) encoder values (Shift Encoder Hold/Shift Encoder Toggle)
###


## Licensing

Copyright (c) 2019-2022 by Artur Brahms
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
