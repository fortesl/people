After cloning, move to the "people" folder and install grunt dependencies with npm command:

$: <b>npm install</b>

and from the command line run the app as follows: 

Either

<ol>
<li>
Run with source (unoptimized) files from the "app" folder

$: <b>grunt serve</b>
</li>

Or

<li>
Run with optimized (concated, minimized, pre-cached) from the "dist" folder

$: <b>grunt dist</b>           
</li>


("dist" folder and optimized resources are created dynamically with several grunt sub-tasks).
