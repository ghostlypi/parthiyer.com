# Asahi Linux Year End Review
<span style="color: grey;">Published: 2025-10-28</span>

<details>
<summary>Description</summary>
My thoughts after 2 years daily driving Asahi Linux
</details>

I have now been daily driving Asahi Linux on my M1 Pro Macbook Pro for 2 years, nearly half the time I've owned this device.
This is a testament to the constant and continuing improvements to the Operating system and it's functionality as it quickly
grew from an impractical exercise in reverse engineering the M1 and 2 Apple Silicon Chips into a more stable, usable Operating
System with all the modern niceties of Linux. I will discuss the more qualitative improvements that have been made through my
use of the device, features I would like to see, and how available this is to developers.

The biggest change over these past 2 years is the improvements in Battery Life during operations and sleep. While the Operating
System does not support anything more than s2idle, the practical Battery Life of the device is easily 6-8 hours of active
developer use with background Chat and Email apps, Web browsing, Audio/Video Streaming, and also IDE use. I found that during
compile, the battery life was significantly reduced, sitting at around 3-4 hours, however, this appears to be on par with MacOS.
The big downside is with sleep of course, but the device has gone from a 12 hour battery life in sleep to more like 24, making
closing the lid for an hour or 2 feasible and allowing my session to persist over the course of a day.

On the Graphics, side, the mere existence of both a fully compliant OpenGL and Vulkan driver is an accomplishment. On the 
MacOS side, OpenGL is only supported to version 4.3, leaving several key features unimplemented in an almost 9 year old API.
Vulkan support is only available through MoltenVK, which again, has a MacOS compatability mode, rather than full support
of the API. Yes, the graphics stack is still wanting for optimization, however it works well enough to enable even light
gaming, and some local machine learning through llama.cpp.

Now for my wishlist:
1) s3sleep would be a game changer for sleep battery life, allowing the processor to suspend to RAM or even disk would
significantly improve sleep performance.
2) DisplayPort alt mode over USB would allow better tie in to the Apple Display Ecosystem
3) Fingerprint Reader Support would make logging in and authenticating much less tedious
4) USB 4/Thunderbolt support would be really nice for faster data transfer speeds

I know that these features take time to implement, especially without a multi-trillion dollar corporation behind your back,
but I am hopeful that at least one of these features will land within the next year or so. It is also worth mentioning a
lack of support for newer chips, which have undergone significant reengineering and will require significant changes to existing
drivers and schedulers to implement full support for.

In terms of the systems usability, it works for 99% of the development use cases, and gives a lot of the benefits of having a linux
package manager. Most open source apps are ready bundled for arm, and work seamlessly on Asahi Linux. The proprietary side is
quite different, with most companies asleep at the wheel when it comes to linux as a whole, with very few supporting arm at all.
I have to give honorable mentions to Microsoft and Jetbrains for having VS Code and the Jetbrains Suite available on arm linux.
This makes developing for the platform much easier as it enables developers to work and compile on arm linux with more ease.
I also must shout out the whole Asahi Linux Team for their commitment to the operating system and the arm linux ecosystem.
They have fundamentally changed the whole paradigm around Audio on linux laptops, Graphics Drivers on Apple Silicon, and
the "it just works" experience on linux. This project has benefited the whole ecosystem.
