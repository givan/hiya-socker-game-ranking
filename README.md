## The problem

A command-line application that will calculate the ranking table for a soccer league.

### Input/output

The input and output will be text. Your solution should parse the provided
`input-sample.txt` file via stdin (pipe or redirect) or by parsing a file passed
by name on the command line. Your solution should output the correct result via
stdout to the console.

The input contains results of games, one per line. See `input-sample.txt` for
details. The output should be ordered from most to least points, following the
format specified in `output-expected.txt`.

You can expect that the input will be well-formed. There is no need to add
special handling for malformed input files.

### The rules

In this league, a draw (tie) is worth 1 point and a win is worth 3 points. A
loss is worth 0 points. If two or more teams have the same number of points,
they should have the same rank and be printed in alphabetical order (as in the
tie for 3rd place in the sample data).

## Pre-requisites:
1/ You will need to install node 12.x. Run the following command to verify what version you have:

```
$ node -v
v12.12.0
```
I'm using 12.12.0 for my development.

2/ Run ```npm install``` in the project root folder to download all dependent node modules.

3/ Run the functional tests to make sure your setup is in a good state:

```
npm test
```

You should see `22 passing (39ms)` in the console.

## Running the app
To run the app, inside the root repo folder, execute the following command (make sure you specify --input before the path of the file since the console app is looking for named params):
```
$ node index.js --input <file path to the txt file>
```

For example, to run the console app with a file in the root directory called i1.txt:

```
$ node index.js --input i1.txt
```

If you run `npm start`, it'll default to the reading the provided sample file stored under test/data/input-sample.txt. The app will dump the path of the file being used for the current execution.