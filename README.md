After cloning, move to the "people" folder and install grunt dependencies with npm command:

$: <b>npm install</b>

and from the command line run the app as follows: 

Either

1. <li>Run with source (unoptimized) files from the "app" folder</li>

$: <b>grunt serve</b>


Or


2. <li>Run with optimized (concated, minimized, pre-cached) from the "dist" folder</li>

$: <b>grunt dist</b>           


("dist" folder and optimized resources are created dynamically with several grunt sub-tasks).
