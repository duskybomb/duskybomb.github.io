---
layout: post
title: Configuring Visual Studio Code Debugger for Python Projects (Module)
date: 2021-09-26 07:35:00
description: an example of a blog post with some code
---
A year back, I switched to VS Code from PyCharm as my daily IDE. PyCharm is highly optimized and feature-rich for Python projects, but it comes at a cost. Initially, I was using the education edition. But now that I had to work on something which could help me pay my bills, I was hunting for alternatives.

Tbh, there weren’t many choices, and vs code lacked out-of-the-box support for python. 
I tried Vim for a month but soon realized that it wouldn’t cut it for me.
Although Vim is absolutely incredible, I had a hard time working on big projects with multitudes of files and configurations.
The learning curve was just too steep for me.
However, I loved Vim bindings.
Now, even my gnome shortcuts are Vim-based (at the time of writing, I am using Zorin OS).

Owing to peer pressure, I started using vscode and haven’t looked back since (I will tell you the reasons some other day).
I use Vim bindings for navigation and simple text manipulation but use Ctrl with native vs code shortcuts.

Cutting the story short, I had to debug a python library with a command-line interface (e.g., [pySceneDetect](https://github.com/Breakthrough/PySceneDetect)). However, I had absolutely no idea what was that weird launch.json file. What settings do I need to use? There were just too many things going on.
But after a lot of googling, searching up, and trying out different settings, I finally found my treasure.

{% highlight json linenos %}
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "<setting-name>",
            "type": "python",
            "request": "launch",
            "program": "<path-to-entry-point>",
            "console": "integratedTerminal",
            "cwd": "<path-from-where-you-want-to-execute-the-file>",
            "args": [
                "<command-line-arguments-as-list>",
                "<arg1>",
                "<arg2>"
            ]
        },
    ]
}
{% endhighlight %}
A reason why I am putting this out there is that I don't remember this configuration. When I switch my system, then I have to spend another 2 hours looking up for it. So, Harshit, thank me later when you read this!

Here is one of the most common configurations I use:

{% highlight json linenos %}
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "package-debugger",
            "type": "python",
            "request": "launch",
            "program": "${workspaceRoot}/package/main.py",
            "console": "integratedTerminal",
            "cwd": "${workspaceRoot}",
            "args": [
                "--config",
                "config-you-df.json",
            ]
        },
    ]
}
{% endhighlight %}

