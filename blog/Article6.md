# Making File Transfers Fast in a Day

<span style="color: grey;">Published: 2026-01-08</span>

<details>
<summary>Description</summary>
I made a tool to speed up file transfers.
</details>

I had to do a file transfer from my laptop to my desktop. The directory in 
question contained about 15k of precious Photos which I wanted to keep safe
in a static location. However, when I queued up the SMB transfer only to see
an expected run time of an hour and a half. Many times before, I had accepted
the hour and a half wait to move over a large directory, but today, I was not
in a mood to wait around and wiggle my mouse to keep my computers awake.

Having spent some time on a computer, I decided to see if I could write a
small script to send files over netcat, a linux utility to send data from
one computer to another. This by itself essentially doubled the speed of the
transfer, just by removing a lot of overhead from SMB. However, with faster
file transfers, I could make it even faster, just by compressing the files.

This is the first time I was able to fully saturate my network with a single
large file. I did my research and settled on zstd compression level 3 as a
balance between compression amount and speed. With this done, the next issue
was not one of performance, but rather security. I tried scripting openssl
encryption, but alas ran into one of the limit of netcat. Netcat would try
to listen for data, requiring the receiver to be active before the sender,
however openssl would try and decrypt the empty data from netcat, totally
breaking my script.

Thus I had a decision to make. I could either write the program in C, having
to go to linking hell and fight my way out, or I could go for the easier
option and just make my application in rust, grabbing all my dependencies
from Cargo. With OpenSSL added, I had something that was also acceptably
secure, to the point where I was running out of ideas. But that all changed
when I realized that I was getting less than 1/3 of the performance when
I had a lot of small files present in a directory (something abundant in text
based projects like this blog). The solution: pre-loading files into memory
allowing our stream going to the compression to continue without having to
wait on files to be read from disk.

The key takeaways from this exercise are not really that novel. I'm sure
others have written file transfer tools as fast or faster, however one
key frustration that lead me on this journey was the lack of easy to find
tools that offer this level of performance. I was able to build out a simple
tool within a matter of 8 hours or so, and quadruple my file transfer speed
over traditional tools like smb.