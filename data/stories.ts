export const stories:Record<string,{intro:string[];takeaway:string}>={
  'tof-slam':{
    intro:[
      'This final-year project brought an entire robot together: a custom mechanical assembly, a scanning time-of-flight sensor, embedded motion control and a desktop mapping workflow. The question was whether a low-cost ToF sensor could form the basis of an indoor SLAM platform.',
      'I designed the chassis and control board around the relationships between sensing and motion. An ESP32 handles acquisition and drive commands, Python provides operator control, and MATLAB combines telemetry into an occupancy map. Building each part around the same physical references made integration a central part of the engineering.'
    ],
    takeaway:'A documented hardware and software platform, with simulation and emulated validation presented alongside the original CAD, firmware and mapping tools.'
  },
  'modified-iron':{
    intro:[
      'During industrial training at MAS Capital, I worked on a pneumatic workstation for garment component pre-heating. The task was to bring controlled movement, contact time and temperature into a practical mechanism that an operator could use on the factory floor.',
      'The design coordinates a guided heated head, a pneumatic cylinder, a dedicated table and accessible process controls. I developed and refined the CAD assemblies, translated the geometry into build documentation, and supported integration and repeated-cycle testing. The prototype photographs show the design moving from the screen into a physical workstation.'
    ],
    takeaway:'A built workstation prototype with coordinated CAD, a 23-item top-level assembly and original fabrication drawings.'
  },
  'flod-hopper':{
    intro:[
      'The FLOD hopper started with an existing extrusion machine and a practical feeding problem: glue pellets could collect near the outlet. The redesign needed to improve the feed path while retaining the machine interface and keeping inspection straightforward.',
      'I measured the mounting envelope and developed configurable hopper bodies, lids and a motor-driven clearing shaft. The CAD model supports several nominal sizes, while the physical build includes a visible level window and accessible drive hardware. Commissioning also revealed a timing issue, which led to a revision of the relay logic rather than another mechanical change.'
    ],
    takeaway:'A configurable mechanical package and physical prototype, with on-machine fit checks and control changes informed by commissioning.'
  },
  'sense-oil':{
    intro:[
      'Sense-Oil explored a retrofit approach to oil-level monitoring on industrial sewing machines. Instead of relying only on manual checks, the prototype uses pressure sensing through the existing drain-port connection to provide an electronic level input.',
      'My work focused on the sensing and alert electronics: an ATmega328P-based control board, C firmware, threshold logic and clear operator feedback through an OLED, LEDs and a buzzer. Separating the sensor, controller and indicator modules helped the installation concept fit around an existing machine.'
    ],
    takeaway:'A developed electronics prototype and retrofit installation concept, documented through original board and enclosure photographs.'
  },
  'pcb-first':{
    intro:[
      'The robot needed a defined electrical assembly, not a growing collection of separate breakout boards. This two-layer PCB consolidates the implemented control architecture into a 100 × 100 mm mechanical envelope.',
      'I organized the ESP32 development module, power conversion, motor interfaces and sensor connections around their roles in the system. The work included coordinating connector access with the chassis and producing a schematic, copper layouts, component data and an interactive BOM so the board could be inspected and assembled.'
    ],
    takeaway:'The robot’s implemented board design, with schematic, manufacturing outputs and an interactive bill of materials.'
  },
  'pcb-advanced':{
    intro:[
      'After the two-layer architecture, I explored a more integrated controller for the same SLAM platform. This revision replaces the plug-in development module with an ESP32-WROOM-32 and brings USB-C programming and onboard regulation into the schematic.',
      'The proposed four-layer stack gives signal routing, power and ground distinct roles. I developed the layout and supporting power architecture, then prepared board renders, per-layer artwork and component documentation. This is a documented design proposal; the portfolio does not present it as a fabricated or tested board.'
    ],
    takeaway:'An inspectable multilayer design proposal with integrated controller, layer artwork, schematic and component documentation.'
  },
  'posture-research':{
    intro:[
      'This university research study investigated magnetic sensing for detecting upper-body posture deviations. The approach considered neodymium magnets and Hall-effect sensors as a compact alternative to camera-based observation.',
      'The study sits at the sensing end of my engineering practice: investigating how a physical change could become a useful electronic signal. It is recorded in my CV. The current archive does not include a standalone prototype gallery or experimental dataset, so the project is presented as a research study.'
    ],
    takeaway:'A CV-documented investigation into Hall-effect sensing and wearable posture detection.'
  }
};
