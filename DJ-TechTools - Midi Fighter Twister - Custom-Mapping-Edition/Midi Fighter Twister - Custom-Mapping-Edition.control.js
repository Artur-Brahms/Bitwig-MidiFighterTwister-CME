// =====================================================================================================================
// = Midi Fighter Twister (Dj-TechTools) - Controller-Script for Bitwig
// ---------------------------------------------------------------------------------------------------------------------
// = Custom-Mapping-Edition - Developed by Artur Brahms | Oct-2019
// = Simplified Control for DJ-TechTools Midi Fighter Twister
// =====================================================================================================================

// ---------------------------------------------------------------------------------------------------------------------
// - BASIC SCRIPT-CONFIG
// ---------------------------------------------------------------------------------------------------------------------
var SCRIPT_NAME = "Midi Fighter Twister - Custom-Mapping-Edition";
var SCRIPT_VERSION = "0.5.2";
var SCRIPT_MANUFACTURER = "DJ TechTools";
var SCRIPT_AUTHOR = "Artur Brahms";
var SCRIPT_UID = "d1sc0affei4ee-abde-48f1-9aee-22b682856f26";

// Midi Fighter Twister - Support up to 4 Devices / Pages a 16 Parameters
var CC_LO = 1;
var CC_HI = 128;



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
	var controlHolder = initArray (0, 128);
	userControls = host.createUserControls (CC_HI - CC_LO + 1);
	for (var ccNumber = (CC_LO-1); ccNumber <= (CC_HI-1); ccNumber++)
		{
		// Get Control
		var control = userControls.getControl (ccNumber);
		control.setLabel ("CC" + (ccNumber+1));
		control.markInterested ();

		// Add Observer
		control.value ().addValueObserver (buildControlObserverFunction (ccNumber, controlHolder));
		}
	}



// ---------------------------------------------------------------------------------------------------------------------
// - ON-MIDI
// ---------------------------------------------------------------------------------------------------------------------
function onMidi (status, data1, data2)
	{
	// Console - Print MIDI
	// println ("MIDI-In: "); printMidi (status, data1, data2);

	// CC-Messages
	if (isChannelController (status))
		{
		// Console - MIDI-In-CC
		println ("MIDI-In-CC :" + data1 + " > " + data2);

		// Check supported CC-Range
		if (data1 >= CC_LO && data1 <= CC_HI)
			{
			// Set Control
			userControls.getControl ((data1-1)).value().set (data2, 128);
			}
		}
	}



// ---------------------------------------------------------------------------------------------------------------------
// - CONTROL-OBSERVER (FUNCTION)
// ---------------------------------------------------------------------------------------------------------------------
function buildControlObserverFunction (ccNumber, controlHolder)
	{
	return function (ccValue)
		{
		// Store
		controlHolder[ccNumber] = ccValue;

		// Build Midi Fighter Twister-Value (100 > 127)
		ccValueMFT = (ccValue * 127);

		// Send MIDI-CC to Device
		sendMidi (176, (ccNumber+1), ccValueMFT);

		// Console - MIDI-Out-CC
		println ("MIDI-CC-Out: " + (ccNumber+1) + " > " + Math.round (ccValueMFT, 2));
		}
	}
