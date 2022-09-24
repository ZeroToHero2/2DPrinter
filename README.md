## 2DPrinter 
Develop a system in JavaScript that helps controlling a laser logo printer machine (you can also see it as a part of 3D printer).
The machine can be used to engrave some figures (logos) on a metal or wood
surface. The system controls the machines laser head. The surface has a grid
layout and its size is fixed. There are 11x11 dots.
##Implementation Details
The laser head can move one grid unit up, down, left and right. By controlling these movements the machine can actually engrave a logo on the surface.
Your system must implement 3 main user commands. It must accept commands from the standard input and write all the output to the standard
output.

- LOGO logo1 DDRRUL

The LOGO command tells the system what movements of the laser head
comprises a logo. After keyword LOGO the user needs to enter a name of
the logo as a string with no spaces (in the above example it is logo1) and
then the ordered movements of the laser head. To this end, characters D, U,
L, and R are used for down, up, left, and right movements, respectively. For
the above example, the head moves down, down, right, right, up and then
2
left. The user may enter as many logo definitions as needed using the LOGO
command. You can assume that the user does not use any logo name twice.
The above LOGO command outputs the following message.

- logo1 defined

- ENGRAVE logo1 3 8
The ENGRAVE command controls the laser head to engrave a logo. It
expects first the name of the logo. This logo must be defined earlier via
LOGO command. Next, it expects the x and y-coordinates of the grid
dot where the laser head should start engraving. While the first number
is the x-coordinate that designates the row of the grid dot, the second one
is the y-coordinate designating the column of the dot. The top left-most
grid dot is (1,1) and the bottom rightmost one is (11,11). For example,
the above command engraves the logo logo1 starting from the (3,8) dot
on the surface. After the ENGRAVE command, the system must output
the textual representation of the grid surface that shows the engraved logo.
Below are the engraved logo logo1 and its textual representation as the
output of above command. Note that in the output, you must use the -
character for horizontal engraved lines, | character for vertical engraved lines,
and . character for grid dots. The symbol is used to designate the space
character.

- SAME logo1 logo2
The SAME command checks whether two logos have the same shape irrespective of their orientation. It expects the names of two logos that have
been defined earlier via LOGO command. When comparing two logos we
are just considering their shapes neither their absolute positions on the surface nor their orientation, i.e., we may turn a logo engraved surface 90◦
, 180◦ and 270◦ clockwise (or counter-clockwise) when comparing with another logo. The command outputs Yes if the two logos match or No otherwise.
Consider the following two commands that define logo2 and engrave it.

- LOGO logo2 URDUDDLL
logo2 defined
- ENGRAVE logo2 10 3
