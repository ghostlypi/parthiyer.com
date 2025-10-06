# Baby's first vybe coding project
<span style="color: grey;">Published: 2025-10-06</span>

<details>
<summary>Description</summary>
My thoughts on how it felt to vybe code my first website!
</details>

Through the experience of vybe coding my website, a few things took me aback. First was how seamless the whole process was.
Yes the prompts were very slow to process, but the quality of the output I received was overall surprisingly good. I was
able to read and understand the HTML and CSS outputted, and I could use the AI prompts to learn how I could make changes to
the style of my website myself. The AI assistant was able to turn me from a technical guy with a vision, into a technical
guy with a website, without me having to spend hours crawling through documentation to understand how on earth CSS works.

The core logic of my site is pretty simple: It's a static HTML website, with some Javascript for switching between
light and dark mode. The blog is a markdown blog, which is rendered to HTML and inserted into template using a python
publishing script. I am aware that many JS frameworks have been invented to allow doing this all in Javascript, but as a 
backend developer, I wanted to use this experience to see if I can make something work with what I know and with
the power of AI.

The biggest surprise was how well gemini-cli (the tool which I chose to use on this endeavour) dealt with 
HTML, and CSS. I wrote almost none of the HTML or CSS myself, and could really just see what it did and make small tweaks
to match my preferred aesthetic. The second feat was the readability of the AI outputted code overall. Even the generated
JS was not too difficult to put together, and the model was able to abstract away complex things like reading and writing
cookies, so I was able to focus on the core logic of the applications (admittedly minimal) JS.

The place where Gemini-CLI couldn't help was with rendering markdown into HTML for my blog. I was doing some web research
to see if it was possible and I concluded that it would be possible to have done it with a Javascript script, replacing
HTML on the page, however I deemed this much more complicated that doing some simple string concatenation in python and
calling it a day. I also found that the JavaScript delivered by Gemini was not up to snuff, using extra cookies and URL
parameters that were unnecessary, cluttering up a relatively simple task of just switching between light and dark modes.

Overall, I'm pretty pleased with how this site turned out. I really like the aesthetic, and I believe that this product is
far better than I could have delivered by myself. While I don't think that vybe coded programs are going to be ready for
mass market products quite yet, I do see this benefiting small businesses who will be able to cobble together their websites
and also for backend programmers like myself to put together a UI for an API or product that we create. It is definitely
going to change where the value add is in the development pipeline.

