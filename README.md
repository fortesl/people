After cloning, move to the "people" folder and install grunt dependencies with npm command:

$: <b>npm install</b>

and from the command line run the app as follows: 

Either

1. <u>Run with source (unoptimized) files from the "app" folder</u>

$: <b>grunt serve</b>


Or


2. <u>Run with optimized (concated, minimized, pre-cached) from the "dist" folder</u>

$: <b>grunt dist</b>           


("dist" folder and optimized resources are created dynamically with several grunt sub-tasks).
