// =====================================================================================================================
// = Midi Fighter Twister (Dj-TechTools) - Controller-Script for Bitwig
// ---------------------------------------------------------------------------------------------------------------------
// = Custom-Mapping-Edition - Developed by Artur Brahms | 2019-2022
// = Simplified Control for DJ-TechTools Midi Fighter Twister
// =====================================================================================================================

// ---------------------------------------------------------------------------------------------------------------------
// - BASIC SCRIPT-CONFIG
// ---------------------------------------------------------------------------------------------------------------------
var SCRIPT_NAME = "Midi Fighter Twister - Custom-Mapping-Edition";
var SCRIPT_VERSION = "0.6.0";
var SCRIPT_MANUFACTURER = "DJ TechTools";
var SCRIPT_AUTHOR = "Artur Brahms";
var SCRIPT_UID = "dee03aad-c932-48f1-9aee-22b682856f26";



// ---------------------------------------------------------------------------------------------------------------------
// - BASIC CONTROLLER ASSIGNMENT AND MIDI-CONFIG
// ---------------------------------------------------------------------------------------------------------------------

// API
loadAPI (2);

// Deprecate-Fail - Remove this if you want to be able to use deprecated methods without causing script to stop.
host.setShouldFailOnDeprecatedUse (true);

// Define Controller
host.defineController (SCRIPT_MANUFACTURER, SCRIPT_NAME, SCRIPT_VERSION, SCRIPT_UID, SCRIPT_AUTHOR);

// Define MIDI-Ports
host.defineMidiPorts (1, 1);

// Add Device - Platform-Independent
if (host.platformIsWindows ())
	{
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister"], ["Midi Fighter Twister"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #2"], ["Midi Fighter Twister #2"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #3"], ["Midi Fighter Twister #3"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #4"], ["Midi Fighter Twister #4"]);
	}
else if (host.platformIsMac ())
	{
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister"], ["Midi Fighter Twister"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #2"], ["Midi Fighter Twister #2"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #3"], ["Midi Fighter Twister #3"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #4"], ["Midi Fighter Twister #4"]);
	}
else if (host.platformIsLinux ())
	{
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister"], ["Midi Fighter Twister"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #2"], ["Midi Fighter Twister #2"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #3"], ["Midi Fighter Twister #3"]);
	host.addDeviceNameBasedDiscoveryPair (["Midi Fighter Twister #4"], ["Midi Fighter Twister #4"]);
	}



// ---------------------------------------------------------------------------------------------------------------------
// - INIT
// ---------------------------------------------------------------------------------------------------------------------
function init ()
	{
	// Initialize Transport/MIDI
	transport = host.createTransport ();
	midiInputPort0 = host.getMidiInPort (0);
	midiInputPort0.setMidiCallback (onMidi);

	// Console
	println (SCRIPT_NAME + " initialized" + " (Version: " + SCRIPT_VERSION + " / Host-API: " + host.getHostApiVersion () + " / Platform: " + host.getPlatformType () + ")");

	// Show Init-Popup
	host.showPopupNotification (SCRIPT_NAME + " initialized!");

	// Create UserControls
	var controlHolder = initArray (0, 128 * 16);
	userControls = host.createUserControls (128 * 16);

	// Cycle through all Channels
	for (var chanNumber = 0; chanNumber <= 15; chanNumber++)
		{
		for (var ccNumber = 0; ccNumber <= 127; ccNumber++)
			{
			// Build Control-ID
			var controlId = ((chanNumber * 128) + ccNumber);

			// Debug
			//println ("[" + controlId + "]" + chanNumber + "|" + ccNumber + " | Chan-Calc: " + getChannelFromControlIdentifier(controlId) + " | CC-Calc: " + getCCFromControlIdentifier (controlId));

			// Create Control
			var control = userControls.getControl (controlId);
			control.setLabel ("CC" + ccNumber + " (Ch. " + (chanNumber + 1) + ")");
			control.markInterested ();

			// Add Observer
			control.value ().addValueObserver (buildControlObserverFunction (chanNumber, ccNumber, controlHolder));
			}
		}
	}



// ---------------------------------------------------------------------------------------------------------------------
// - ON-MIDI
// ---------------------------------------------------------------------------------------------------------------------
function onMidi (status, data1, data2)
	{
	// Console - Print MIDI
	//println ("MIDI-In: "); printMidi (status, data1, data2);

	// CC-Messages
	if (isChannelController (status))
		{
		// Console - MIDI-In-CC
		println ("[" + (MIDIChannel(status) + 1) + "] MIDI-In-CC:" + data1 + " > " + data2);

		// Check Side-Button-Press
		if (status == "179")
			{
			// Build Side-Buttons Details
			if ((data1 == "1" && data2 == "0") || (data1 == "1" && data2 == "127") || (data1 == "2" && data2 == "127") || (data1 == "2" && data2 == "0") || (data1 == "3" && data2 == "127"))
				{
				let page = 0;
				if (data1 == "1" && data2 == "0") { page = 1; }
				if (data1 == "1" && data2 == "127") { page = 2; }
				if (data1 == "2" && data2 == "127") { page = 3; }
				if (data1 == "3" && data2 == "127") { page = 4; }
				
				// Console - MIDI-In-Side-Next/Previous
				println ("MIDI-In-Side-Next/Previous (Status: " + status + "): " + data1 + " > " + data2 + " [Page: " + page + "]");
				}
			}

		// Check supported CC-Range (CH01)
		else if ((MIDIChannel(status) == 0 || MIDIChannel(status) == 4) && data1 >= 0 && data1 <= 127)
			{
			// Calc Control-ID
			controlId = (MIDIChannel(status)) * 128 + (data1);
			
			// Debug
			//println ("ControlIdentifier: " + controlId + " | Chan: " + getChannelFromControlIdentifier (controlId) + " | CC: " + getCCFromControlIdentifier (controlId) );

			// Set Control
			userControls.getControl ((controlId)).value().set (data2, 128);
			}
		}
	}



// ---------------------------------------------------------------------------------------------------------------------
// - CONTROL-OBSERVER (CALLBACK)
// ---------------------------------------------------------------------------------------------------------------------
function buildControlObserverFunction (channel, ccNumber, controlHolderMain)
	{
	return function (ccValue)
		{
		// Store
		controlHolderMain[ccNumber] = ccValue;

		// Build Midi Fighter Twister-Value (100 > 127)
		ccValueMFT = (ccValue * 127);

		// Send MIDI-CC to Device (CH1)
		//sendMidi (176, (ccNumber), Math.round (ccValueMFT));
		sendChannelController (channel, ccNumber, Math.round (ccValueMFT));

		// Console - MIDI-Out-CC
		println ("["+ (channel + 1) +"] MIDI-Out-CC: " + (ccNumber) + " > " + Math.round (ccValueMFT, 2));
		}
	}



// ---------------------------------------------------------------------------------------------------------------------
// - getChannelFromControlIdentifier
// - Get the MIDI-Channel from an Control-Identifier
// ---------------------------------------------------------------------------------------------------------------------
function getChannelFromControlIdentifier (controlIdentifier)
	{
	return (parseInt (controlIdentifier/128));
	}



// ---------------------------------------------------------------------------------------------------------------------
// - getCCFromControlIdentifier
// - Get the MIDI-CC from an Control-Identifier
// ---------------------------------------------------------------------------------------------------------------------
function getCCFromControlIdentifier (controlIdentifier)
	{
	return (controlIdentifier - (getChannelFromControlIdentifier (controlIdentifier) * 128));
	}
