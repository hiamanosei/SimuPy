export interface CodeExercise {
  title: string;
  instruction: string;
  starterCode: string;
  prePopulatedInputs?: string[];
  solution: string;
  hints: string[];
  isPractice?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'guided' | 'practice' | 'independent';
  topic: string;
  objectives: string[];
  steps: {
    type: 'explain' | 'guided' | 'practice' | 'challenge';
    title: string;
    content?: string;
    exercise?: CodeExercise;
  }[];
}

export interface BugChallenge {
  id: string;
  title: string;
  description: string;
  buggyCode: string;
  bugLine: number;
  bugDescription: string;
  hint: string;
  fixedCode: string;
  errorType: string;
  errorExplanation: string;
}

export const lessons: Lesson[] = [
  {
    id: 'variables-intro',
    title: 'Introduction to Variables',
    description: 'Learn how to create and use variables to store data in Python.',
    difficulty: 'guided',
    topic: 'Variables & Data Types',
    objectives: [
      'Understand what a variable is',
      'Learn to create variables with meaningful names',
      'Practice using different data types'
    ],
    steps: [
      {
        type: 'explain',
        title: 'What is a Variable?',
        content: `A variable is like a labeled box that stores data in your program. You give it a name (label) and put something inside (value).

**Creating a Variable:**
To create a variable, you give it a name and use = to store a value:

\`\`\`python
name = "Alice"
age = 12
\`\`\`

**Rules for Variable Names:**
- Can contain letters, numbers, and underscores
- Must start with a letter or underscore
- Case-sensitive (Name and name are different!)

**Data Types:**
- **String** (text): Must have quotes around it → "Hello"
- **Integer** (whole number): No quotes needed → 42
- **Float** (decimal): No quotes needed → 3.14

**Example:**
\`\`\`python
my_name = "Sarah"    # String - has quotes
my_age = 13          # Integer - no quotes
my_height = 1.5      # Float - no quotes
\`\`\`

**Remember:**
- = means "store this value" (not "equals")
- Text always needs quotes ""
- Numbers don't need quotes`
      },
      {
        type: 'guided',
        title: 'Exercise 1: Create Your First Variable',
        exercise: {
          title: 'Create a variable for your name',
          instruction: 'Follow the comments below. Type the code to create a variable called "my_name" and store your name in it (as a string with quotes). Then print it.',
          starterCode: `# EXERCISE: Create a variable called my_name
# Store your name as a string (remember the quotes!)
# Type your code below:



# Now print the variable to see it
# Type: print(my_name)


`,
          solution: `# EXERCISE: Create a variable called my_name
my_name = "Alex"

# Now print the variable to see it
print(my_name)`,
          hints: [
            'Type: my_name = "YourName"',
            'Remember: strings need quotes around them',
            'Type: print(my_name) to display it'
          ]
        }
      },
      {
        type: 'guided',
        title: 'Exercise 2: Create a Number Variable',
        exercise: {
          title: 'Create a variable for your age',
          instruction: 'Now create a variable called "my_age" and store your age. Then print a message with it. Numbers don\'t need quotes!',
          starterCode: `# EXERCISE: Create a variable called my_age
# Store your age (no quotes needed for numbers!)
# Type your code below:



# Now print a message with your age
# Example: print("I am", my_age, "years old")


`,
          solution: `my_age = 12
print("I am", my_age, "years old")`,
          hints: [
            'Type: my_age = 12 (use your real age)',
            'Numbers don\'t need quotes!',
            'Type: print("I am", my_age, "years old")'
          ]
        }
      },
      {
        type: 'practice',
        title: 'Practice 1: Multiple Variables',
        exercise: {
          title: 'Create variables about yourself',
          instruction: 'Create 3 variables about yourself: your favorite color (string), your age (number), and your school name (string). Print all of them.',
          starterCode: `# PRACTICE: Create 3 variables about yourself

# 1. Create a variable for your favorite color
# Remember: colors are strings, so use quotes!



# 2. Create a variable for your age
# Remember: ages are numbers, no quotes!



# 3. Create a variable for your school name
# School names are strings, use quotes!



# Now print all three variables
# Example: print("My favorite color is", favorite_color)


`,
          solution: `favorite_color = "blue"
my_age = 12
school_name = "Central School"

print("My favorite color is", favorite_color)
print("I am", my_age, "years old")
print("I go to", school_name)`,
          hints: [
            'Strings (text) need quotes: "blue"',
            'Numbers don\'t need quotes: 12',
            'Use print() to display each variable'
          ],
          isPractice: true
        }
      },
      {
        type: 'practice',
        title: 'Practice 2: Variable Math',
        exercise: {
          title: 'Use variables in calculations',
          instruction: 'Create variables for the price of two items. Then calculate and print the total cost.',
          starterCode: `# PRACTICE: Variable Math

# Create two variables for prices
# Let's say item1 costs 5 and item2 costs 3
# Type the code below:


item1_price = 
item2_price = 

# Calculate the total by adding them together
# total = item1_price + item2_price


# Print the result
# print("Total cost:", total)


`,
          solution: `item1_price = 5
item2_price = 3

total = item1_price + item2_price

print("Total cost:", total)`,
          hints: [
            'item1_price = 5 (no quotes for numbers)',
            'total = item1_price + item2_price',
            'Use print() to show the result'
          ],
          isPractice: true
        }
      },
      {
        type: 'challenge',
        title: 'Challenge: Personal Profile',
        exercise: {
          title: 'Create your personal profile',
          instruction: 'Create at least 5 variables about yourself (name, age, favorite food, hobby, etc.) and print them nicely formatted.',
          starterCode: `# CHALLENGE: Create Your Personal Profile
# Create at least 5 variables about yourself

# Variable 1: Your name (string)


# Variable 2: Your age (number)


# Variable 3: Your favorite food (string)


# Variable 4: Your hobby (string)


# Variable 5: Your favorite number (number)


# Now print your profile nicely formatted
# Use multiple print statements


`,
          solution: `name = "Alex"
age = 12
favorite_food = "pizza"
hobby = "reading"
favorite_number = 7

print("=== My Profile ===")
print("Name:", name)
print("Age:", age)
print("Favorite Food:", favorite_food)
print("Hobby:", hobby)
print("Favorite Number:", favorite_number)`,
          hints: [
            'Create variables with meaningful names',
            'Strings need quotes, numbers don\'t',
            'Use print() with commas to combine text and variables'
          ],
          isPractice: true
        }
      }
    ]
  },
  {
    id: 'input-function',
    title: 'Getting User Input',
    description: 'Learn how to get input from the user using the input() function.',
    difficulty: 'guided',
    topic: 'Input & Output',
    objectives: [
      'Use the input() function to get user data',
      'Convert string input to numbers using int()',
      'Create interactive programs'
    ],
    steps: [
      {
        type: 'explain',
        title: 'The input() Function',
        content: `The input() function lets your program ask the user for information.

**Basic Usage:**
\`\`\`python
name = input("What is your name? ")
print("Hello,", name)
\`\`\`

**How it works:**
1. The program displays the question: "What is your name? "
2. User types their answer and presses Enter
3. The answer is stored in the variable 'name'

**IMPORTANT: input() always returns a STRING!**

Even if the user types a number, Python sees it as text. To do math, you must convert it:

\`\`\`python
# This won't work for math:
age = input("How old are you? ")  # Returns "12" (text)

# This works:
age = int(input("How old are you? "))  # Returns 12 (number)
\`\`\`

**Conversion Functions:**
- **int()** → converts to integer (whole number)
- **float()** → converts to decimal number
- **str()** → converts to string (text)

**Example:**
\`\`\`python
age = int(input("How old are you? "))
next_year = age + 1
print("Next year you will be", next_year)
\`\`\``
      },
      {
        type: 'guided',
        title: 'Exercise 1: Basic Input',
        exercise: {
          title: 'Ask for the user\'s name',
          instruction: 'Write code to ask for the user\'s name using input() and then print a greeting. Use input("What is your name? ") to get the name.',
          starterCode: `# EXERCISE: Ask for the user's name

# Use input() to ask for the user's name
# Store it in a variable called 'name'
# Type your code below:


name = input( )

# Now print a greeting using the name
# Example: print("Hello,", name)


`,
          prePopulatedInputs: ["Sarah"],
          solution: `name = input("What is your name? ")
print("Hello,", name)`,
          hints: [
            'Type: name = input("What is your name? ")',
            'The question goes inside the parentheses and quotes',
            'Then type: print("Hello,", name)'
          ]
        }
      },
      {
        type: 'guided',
        title: 'Exercise 2: Converting to Numbers',
        exercise: {
          title: 'Get a number and do math',
          instruction: 'Ask for the user\'s age using int(input(...)) and calculate how old they will be next year. Type the code yourself!',
          starterCode: `# EXERCISE: Get age as a number

# Use int(input(...)) to get the user's age
# This converts the input to a number so we can do math
# Type your code below:


age = int(input( ))

# Calculate age next year
# next_year = age + 1


# Print the result
# print("Next year you will be", next_year)


`,
          prePopulatedInputs: ["12"],
          solution: `age = int(input("How old are you? "))
next_year = age + 1
print("Next year you will be", next_year)`,
          hints: [
            'Type: age = int(input("How old are you? "))',
            'int() converts text to a number',
            'Type: next_year = age + 1'
          ]
        }
      },
      {
        type: 'practice',
        title: 'Practice 1: Personalized Greeting',
        exercise: {
          title: 'Ask for name and favorite color',
          instruction: 'Write a program that asks for the user\'s name AND their favorite color, then prints both.',
          starterCode: `# PRACTICE: Ask for name and favorite color

# Ask for the user's name (use input)
# Store it in a variable


# Ask for their favorite color (use input)
# Store it in another variable


# Print both in a nice message
# Example: print(name, "likes", color, "the best!")


`,
          prePopulatedInputs: ["Emma", "purple"],
          solution: `name = input("What is your name? ")
color = input("What is your favorite color? ")
print(name, "likes", color, "the best!")`,
          hints: [
            'Use input() twice, store in two different variables',
            'Each input should have its own question',
            'Use print() with commas to combine everything'
          ],
          isPractice: true
        }
      },
      {
        type: 'practice',
        title: 'Practice 2: Simple Calculator',
        exercise: {
          title: 'Build a calculator',
          instruction: 'Ask for two numbers (use int(input(...))) and print their sum.',
          starterCode: `# PRACTICE: Simple Calculator

# Ask for the first number
# Remember to use int() to convert to a number!


# Ask for the second number
# Don't forget int() here too!


# Add them together
# total = first + second


# Print the result


`,
          prePopulatedInputs: ["8", "5"],
          solution: `first = int(input("Enter first number: "))
second = int(input("Enter second number: "))
total = first + second
print("The sum is:", total)`,
          hints: [
            'Use int(input("Enter first number: "))',
            'Add the two numbers with +',
            'Print the result'
          ],
          isPractice: true
        }
      },
      {
        type: 'challenge',
        title: 'Challenge: Age Calculator',
        exercise: {
          title: 'Calculate birth year',
          instruction: 'Ask for the user\'s age and calculate what year they were born. Assume the current year is 2024.',
          starterCode: `# CHALLENGE: Age Calculator

# Ask for the user's age
# Don't forget int()!


# Calculate birth year
# birth_year = 2024 - age


# Print the birth year


# BONUS: Calculate what year they'll turn 100!


`,
          prePopulatedInputs: ["12"],
          solution: `age = int(input("How old are you? "))
birth_year = 2024 - age
print("You were born in", birth_year)

year_100 = birth_year + 100
print("You will turn 100 in the year", year_100)`,
          hints: [
            'Use int(input(...)) for the age',
            'birth_year = 2024 - age',
            'year_100 = birth_year + 100'
          ],
          isPractice: true
        }
      }
    ]
  },
  {
    id: 'if-statements',
    title: 'Making Decisions with if Statements',
    description: 'Learn how to make your program make decisions using if, elif, and else.',
    difficulty: 'practice',
    topic: 'Selection',
    objectives: [
      'Write if statements to check conditions',
      'Use comparison operators (>, <, ==, !=)',
      'Create programs with multiple decision paths'
    ],
    steps: [
      {
        type: 'explain',
        title: 'Making Decisions with if',
        content: `Programs can make decisions using if statements. This is called "selection" or "branching".

**Basic if statement:**
\`\`\`python
age = 15
if age >= 13:
    print("You are a teenager!")
\`\`\`

**if-else:**
\`\`\`python
if age >= 18:
    print("You can vote!")
else:
    print("You are too young to vote.")
\`\`\`

**if-elif-else (multiple conditions):**
\`\`\`python
if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")
\`\`\`

**Comparison Operators:**
- **==** equals (TWO equal signs!)
- **!=** not equals
- **>** greater than
- **<** less than
- **>=** greater than or equal to
- **<=** less than or equal to

**IMPORTANT:**
- Use **==** for comparison, **=** for assignment
- Code inside if/else must be **indented** (4 spaces)
- Only ONE block runs (the first true one)`
      },
      {
        type: 'guided',
        title: 'Exercise 1: Basic if Statement',
        exercise: {
          title: 'Check if someone can vote',
          instruction: 'Write code that asks for age and checks if the person can vote (age >= 18). Use if and else.',
          starterCode: `# EXERCISE: Voting age checker

# Ask for the user's age (use int())
# Type your code below:


age = int(input("How old are you? "))

# Write an if statement to check if age >= 18
# If yes, print "You can vote!"
# If no, print "You are too young to vote."
# Type your code below:


if age >= 18:
    
else:
    
`,
          prePopulatedInputs: ["20"],
          solution: `age = int(input("How old are you? "))

if age >= 18:
    print("You can vote!")
else:
    print("You are too young to vote.")`,
          hints: [
            'if age >= 18:',
            'print("You can vote!") must be indented',
            'else: and print() for the other case'
          ]
        }
      },
      {
        type: 'guided',
        title: 'Exercise 2: Multiple Conditions',
        exercise: {
          title: 'Grade calculator',
          instruction: 'Write code to give grades based on score: >=90 is A, >=80 is B, >=70 is C, else is F.',
          starterCode: `# EXERCISE: Grade Calculator

# Ask for a score (0-100)
score = int(input("Enter your score: "))

# Write if-elif-else to give grades
# >= 90: A
# >= 80: B
# >= 70: C
# else: F

# Type your code below:
if score >= 90:
    
elif score >= 80:
    
elif score >= 70:
    
else:
    
`,
          prePopulatedInputs: ["85"],
          solution: `score = int(input("Enter your score: "))

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F")`,
          hints: [
            'if score >= 90: print("Grade: A")',
            'elif score >= 80: print("Grade: B")',
            'Remember to indent the print statements!'
          ]
        }
      },
      {
        type: 'practice',
        title: 'Practice 1: Even or Odd',
        exercise: {
          title: 'Check if a number is even or odd',
          instruction: 'Ask for a number and tell if it\'s even or odd. Use % (modulo) to check: if number % 2 == 0, it\'s even.',
          starterCode: `# PRACTICE: Even or Odd

# Ask for a number (use int())


# Check if even or odd
# number % 2 gives the remainder when divided by 2
# If remainder is 0, the number is even

# Type your code below:


`,
          prePopulatedInputs: ["7"],
          solution: `number = int(input("Enter a number: "))

if number % 2 == 0:
    print(number, "is even!")
else:
    print(number, "is odd!")`,
          hints: [
            'Use int(input(...)) to get the number',
            'if number % 2 == 0: means "if divisible by 2"',
            'Use else: for odd numbers'
          ],
          isPractice: true
        }
      },
      {
        type: 'practice',
        title: 'Practice 2: Password Checker',
        exercise: {
          title: 'Create a password checker',
          instruction: 'Ask for a password and check if it matches "python123". Use == to compare strings.',
          starterCode: `# PRACTICE: Password Checker

# The correct password
secret = "python123"

# Ask the user for the password (use input)


# Check if the password matches
# Use == to compare
# If correct, print "Access granted!"
# If wrong, print "Wrong password!"

# Type your code below:


`,
          prePopulatedInputs: ["python123"],
          solution: `secret = "python123"
password = input("Enter the password: ")

if password == secret:
    print("Access granted!")
else:
    print("Wrong password!")`,
          hints: [
            'password = input("Enter the password: ")',
            'if password == secret:',
            'String comparison is case-sensitive!'
          ],
          isPractice: true
        }
      },
      {
        type: 'challenge',
        title: 'Challenge: Temperature Advisor',
        exercise: {
          title: 'Give clothing advice based on temperature',
          instruction: 'Ask for temperature and give advice: <10="Wear a coat", 10-20="Wear a jacket", >20="T-shirt is fine"',
          starterCode: `# CHALLENGE: Temperature Advisor

# Ask for the temperature (use int())


# Give clothing advice:
# Below 10: "It's cold! Wear a coat."
# 10 to 20: "It's cool. Wear a jacket."
# Above 20: "It's warm! A t-shirt is fine."

# Type your code below:


`,
          prePopulatedInputs: ["15"],
          solution: `temp = int(input("What is the temperature? "))

if temp < 10:
    print("It's cold! Wear a coat.")
elif temp <= 20:
    print("It's cool. Wear a jacket.")
else:
    print("It's warm! A t-shirt is fine.")`,
          hints: [
            'Use int(input(...)) for temperature',
            'if temp < 10: for cold',
            'elif temp <= 20: for cool',
            'else: for warm'
          ],
          isPractice: true
        }
      }
    ]
  },
  {
    id: 'for-loops',
    title: 'Repeating with for Loops',
    description: 'Learn how to repeat code using for loops and the range() function.',
    difficulty: 'practice',
    topic: 'Iteration',
    objectives: [
      'Use for loops to repeat code',
      'Understand the range() function',
      'Create patterns with loops'
    ],
    steps: [
      {
        type: 'explain',
        title: 'for Loops: Repeating Code',
        content: `A for loop repeats a block of code multiple times.

**Basic for loop:**
\`\`\`python
for i in range(5):
    print(i)
\`\`\`
This prints: 0, 1, 2, 3, 4

**How range() works:**
- **range(5)** → 0, 1, 2, 3, 4 (starts at 0, stops before 5)
- **range(1, 6)** → 1, 2, 3, 4, 5 (start at 1, stop before 6)
- **range(0, 10, 2)** → 0, 2, 4, 6, 8 (step by 2)

**IMPORTANT:**
- The loop variable (i) takes each value in turn
- Code inside the loop must be **indented** (4 spaces)
- range(stop) goes from 0 to stop-1
- range(start, stop) goes from start to stop-1

**Example - Counting:**
\`\`\`python
for i in range(1, 6):
    print("Count:", i)
\`\`\`
Prints:
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5`
      },
      {
        type: 'guided',
        title: 'Exercise 1: Basic Loop',
        exercise: {
          title: 'Print numbers 1 to 5',
          instruction: 'Write a for loop that prints numbers 1 to 5. Use range(1, 6).',
          starterCode: `# EXERCISE: Print numbers 1 to 5

# Write a for loop using range(1, 6)
# Remember: the code inside the loop must be indented!

# Type your code below:
for i in range(1, 6):
    # Print i here (remember to indent!)
    
    
`,
          solution: `for i in range(1, 6):
    print(i)`,
          hints: [
            'Type: print(i) inside the loop',
            'Remember: indent 4 spaces',
            'range(1, 6) gives 1, 2, 3, 4, 5'
          ]
        }
      },
      {
        type: 'guided',
        title: 'Exercise 2: Print Multiple Times',
        exercise: {
          title: 'Print "Hello" 3 times',
          instruction: 'Write a for loop that prints "Hello" exactly 3 times. Use range(3).',
          starterCode: `# EXERCISE: Print "Hello" 3 times

# Use range(3) to repeat 3 times
# The variable name can be i, or you can use _ if you don't need it

# Type your code below:


`,
          solution: `for i in range(3):
    print("Hello")`,
          hints: [
            'for i in range(3):',
            'print("Hello") must be indented',
            'range(3) repeats 3 times'
          ]
        }
      },
      {
        type: 'practice',
        title: 'Practice 1: Counted Messages',
        exercise: {
          title: 'Print numbered messages',
          instruction: 'Write a loop that prints your name 5 times with numbers: "1 - Alex", "2 - Alex", etc.',
          starterCode: `# PRACTICE: Numbered messages

# Create a variable for your name
name = "Your name here"

# Write a for loop from 1 to 6
# Print the number and name together
# Example: print(i, "-", name)

# Type your code below:


`,
          solution: `name = "Alex"

for i in range(1, 6):
    print(i, "-", name)`,
          hints: [
            'for i in range(1, 6):',
            'print(i, "-", name)',
            'Change "Your name here" to your actual name'
          ],
          isPractice: true
        }
      },
      {
        type: 'practice',
        title: 'Practice 2: Multiplication Table',
        exercise: {
          title: 'Print the 5 times table',
          instruction: 'Write a loop that prints the 5 times table (5x1 to 5x10). Calculate each result inside the loop.',
          starterCode: `# PRACTICE: 5 Times Table

# Write a for loop from 1 to 11
# Calculate result = 5 * i
# Print: "5 x", i, "=", result

# Type your code below:


`,
          solution: `for i in range(1, 11):
    result = 5 * i
    print("5 x", i, "=", result)`,
          hints: [
            'for i in range(1, 11):',
            'result = 5 * i',
            'print("5 x", i, "=", result)'
          ],
          isPractice: true
        }
      },
      {
        type: 'challenge',
        title: 'Challenge: Sum of Numbers',
        exercise: {
          title: 'Calculate the sum of 1 to 10',
          instruction: 'Use a loop to add up all numbers from 1 to 10. Start with total = 0 and add each number.',
          starterCode: `# CHALLENGE: Sum of 1 to 10

# Start with total = 0
total = 0

# Write a for loop from 1 to 11
# Add each number to the total: total = total + i

# Type your code below:


# Print the final total


`,
          solution: `total = 0

for i in range(1, 11):
    total = total + i

print("The sum is:", total)`,
          hints: [
            'for i in range(1, 11):',
            'total = total + i adds each number',
            'Print total AFTER the loop'
          ],
          isPractice: true
        }
      }
    ]
  },
  {
    id: 'while-loops',
    title: 'Conditional Loops with while',
    description: 'Learn how to create loops that continue while a condition is true.',
    difficulty: 'practice',
    topic: 'Iteration',
    objectives: [
      'Write while loops with conditions',
      'Understand infinite loops and how to avoid them',
      'Create interactive programs with loops'
    ],
    steps: [
      {
        type: 'explain',
        title: 'while Loops: Loop Until False',
        content: `A while loop keeps running as long as a condition is TRUE.

**Basic while loop:**
\`\`\`python
count = 1
while count <= 5:
    print(count)
    count = count + 1
\`\`\`

**How it works:**
1. Start: count = 1
2. Check: Is count <= 5? Yes → Run loop body
3. count becomes 2
4. Check again, continue until count = 6
5. Check: Is 6 <= 5? No → Stop loop

**WARNING: Infinite Loops!**
If you forget to update the condition, the loop runs forever:
\`\`\`python
# DON'T DO THIS!
count = 1
while count <= 5:
    print(count)
    # Forgot: count = count + 1  ← INFINITE LOOP!
\`\`\`

**When to use:**
- **for loop**: When you know how many times
- **while loop**: When you don't know (e.g., "keep asking until correct")`
      },
      {
        type: 'guided',
        title: 'Exercise 1: Basic while Loop',
        exercise: {
          title: 'Count from 1 to 5',
          instruction: 'Write a while loop that counts from 1 to 5. Remember to update the count variable!',
          starterCode: `# EXERCISE: while loop counting

# Start count at 1
count = 1

# Write while loop that runs while count <= 5
# Don't forget to add 1 to count each time!

# Type your code below:
while count <= 5:
    # Print count (indent this!)
    
    
    # Add 1 to count (indent this!)
    # count = count + 1
    
    
`,
          solution: `count = 1

while count <= 5:
    print(count)
    count = count + 1`,
          hints: [
            'print(count) must be indented',
            'count = count + 1 must be indented',
            'This updates count so the loop eventually stops'
          ]
        }
      },
      {
        type: 'guided',
        title: 'Exercise 2: Countdown',
        exercise: {
          title: 'Countdown from 10',
          instruction: 'Write a while loop that counts down from 10 to 1, then prints "Blast off!"',
          starterCode: `# EXERCISE: Countdown

# Start count at 10
count = 10

# Write while loop that runs while count >= 1
# Print count, then subtract 1

# Type your code below:
while count >= 1:
    # Print count
    
    
    
    
    
# After the loop, print "Blast off!"

`,
          solution: `count = 10

while count >= 1:
    print(count)
    count = count - 1

print("Blast off!")`,
          hints: [
            'print(count) inside the loop',
            'count = count - 1 to decrease',
            'print("Blast off!") OUTSIDE the loop'
          ]
        }
      },
      {
        type: 'challenge',
        title: 'Challenge: Guess the Number',
        exercise: {
          title: 'Keep guessing until correct',
          instruction: 'Write a program that keeps asking for guesses until the user guesses 7. Use while guess != 7.',
          starterCode: `# CHALLENGE: Guess the Number

# The secret number
secret = 7

# Start with a wrong guess
guess = 0

# Write while loop that runs while guess != secret
# Inside: ask for a guess with int(input(...))
# Check if correct or wrong

# Type your code below:
while guess != secret:
    # Ask for a guess
    
    
    # Check if correct
    
    
# Print "You got it!" after the loop

`,
          prePopulatedInputs: ["3", "5", "7"],
          solution: `secret = 7
guess = 0

while guess != secret:
    guess = int(input("Guess the number: "))
    if guess == secret:
        print("Correct!")
    else:
        print("Wrong! Try again!")`,
          hints: [
            'guess = int(input("Guess the number: "))',
            'if guess == secret: print("Correct!")',
            'else: print("Wrong!")'
          ],
          isPractice: true
        }
      }
    ]
  },
  {
    id: 'lists-intro',
    title: 'Working with Lists',
    description: 'Learn how to create and use lists to store multiple values.',
    difficulty: 'practice',
    topic: 'Data Structures',
    objectives: [
      'Create and access lists',
      'Use list methods like append() and remove()',
      'Loop through list items'
    ],
    steps: [
      {
        type: 'explain',
        title: 'Lists: Storing Multiple Values',
        content: `A list stores multiple items in one variable.

**Creating lists:**
\`\`\`python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
\`\`\`

**Accessing items (index starts at 0!):**
\`\`\`python
fruits = ["apple", "banana", "orange"]
print(fruits[0])  # apple (first item)
print(fruits[1])  # banana (second item)
print(fruits[2])  # orange (third item)
\`\`\`

**List methods:**
\`\`\`python
fruits = ["apple", "banana"]

fruits.append("orange")  # Add to end
# fruits is now ["apple", "banana", "orange"]

len(fruits)  # Returns 3 (number of items)
\`\`\`

**Looping through lists:**
\`\`\`python
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)
\`\`\`

**Remember:**
- Index starts at 0
- fruits[0] is FIRST item
- fruits[-1] is LAST item`
      },
      {
        type: 'guided',
        title: 'Exercise 1: Create and Access Lists',
        exercise: {
          title: 'Create a list and print items',
          instruction: 'Create a list of 3 colors, then print each one using its index [0], [1], [2].',
          starterCode: `# EXERCISE: Create and Access Lists

# Create a list called colors with 3 colors
# Use square brackets: ["color1", "color2", "color3"]
# Type your code below:
colors = [ , , ]

# Print the first color (index 0)
print(colors[ ])

# Print the second color (index 1)
print(colors[ ])

# Print the third color (index 2)
print(colors[ ])
`,
          solution: `colors = ["red", "blue", "green"]

print(colors[0])
print(colors[1])
print(colors[2])`,
          hints: [
            'colors = ["red", "blue", "green"]',
            'print(colors[0]) for first',
            'Remember: index starts at 0!'
          ]
        }
      },
      {
        type: 'guided',
        title: 'Exercise 2: Add to a List',
        exercise: {
          title: 'Use append() to add items',
          instruction: 'Create an empty list, then use append() to add 3 items.',
          starterCode: `# EXERCISE: Using append()

# Create an empty list (just square brackets)
my_list = []

# Use append() to add 3 items
# my_list.append("item")

# Type your code below:


# Print the list to see all items

`,
          solution: `my_list = []

my_list.append("apple")
my_list.append("banana")
my_list.append("orange")

print(my_list)`,
          hints: [
            'my_list.append("apple") adds "apple"',
            'Call append() multiple times',
            'print(my_list) shows all items'
          ]
        }
      },
      {
        type: 'practice',
        title: 'Practice: Loop Through List',
        exercise: {
          title: 'Loop through a list',
          instruction: 'Create a list of 4 animals, then use a for loop to print each one.',
          starterCode: `# PRACTICE: Loop Through List

# Create a list of 4 animals
animals = ["dog", "cat", "bird", "fish"]

# Write a for loop to print each animal
# for animal in animals:
#     print(animal)

# Type your code below:


`,
          solution: `animals = ["dog", "cat", "bird", "fish"]

for animal in animals:
    print(animal)`,
          hints: [
            'for animal in animals:',
            'print(animal) must be indented',
            'The loop variable "animal" takes each value'
          ],
          isPractice: true
        }
      },
      {
        type: 'challenge',
        title: 'Challenge: Shopping List',
        exercise: {
          title: 'Build a shopping list program',
          instruction: 'Start with an empty list. Ask the user for 3 items using input(), append each one, then print the list.',
          starterCode: `# CHALLENGE: Shopping List

# Create an empty list
shopping_list = []

# Ask for 3 items using input()
# Append each item to the list

# Item 1
item = input("Enter item 1: ")
shopping_list.append(item)

# Item 2 (you type!)


# Item 3 (you type!)


# Print the complete list


`,
          prePopulatedInputs: ["milk", "bread", "eggs"],
          solution: `shopping_list = []

item = input("Enter item 1: ")
shopping_list.append(item)

item = input("Enter item 2: ")
shopping_list.append(item)

item = input("Enter item 3: ")
shopping_list.append(item)

print("Shopping list:", shopping_list)`,
          hints: [
            'item = input("Enter item: ")',
            'shopping_list.append(item)',
            'Repeat for each item'
          ],
          isPractice: true
        }
      }
    ]
  },
  {
    id: 'functions-intro',
    title: 'Creating Functions',
    description: 'Learn how to create reusable code with functions.',
    difficulty: 'independent',
    topic: 'Functions',
    objectives: [
      'Define functions with def',
      'Use parameters to pass data to functions',
      'Return values from functions'
    ],
    steps: [
      {
        type: 'explain',
        title: 'Functions: Reusable Code Blocks',
        content: `A function is a reusable block of code that performs a specific task.

**Defining a function:**
\`\`\`python
def greet(name):
    print("Hello,", name)
\`\`\`

**Calling a function:**
\`\`\`python
greet("Alice")  # Prints: Hello, Alice
greet("Bob")    # Prints: Hello, Bob
\`\`\`

**Parameters and Return:**
\`\`\`python
def add(a, b):
    result = a + b
    return result

total = add(5, 3)  # total = 8
\`\`\`

**Key points:**
- **def** defines a function
- Parameters are inputs (in parentheses)
- **return** sends a value back
- Call with function_name()

**print vs return:**
- **print()** displays something
- **return** gives a value back to use later`
      },
      {
        type: 'guided',
        title: 'Exercise 1: Basic Function',
        exercise: {
          title: 'Create a greeting function',
          instruction: 'Write a function called "greet" that takes a name parameter and prints "Hello, [name]!". Then call it with your name.',
          starterCode: `# EXERCISE: Create a Function

# Define a function called greet
# It takes one parameter called name
# Type your code below:
def greet(    ):
    # Print a greeting (indent this!)
    print("Hello,", name, "!")
    
# Call the function with a name
greet(" ")

`,
          solution: `def greet(name):
    print("Hello,", name, "!")

greet("Alex")`,
          hints: [
            'def greet(name):',
            'print("Hello,", name, "!")',
            'greet("Alex") to call it'
          ]
        }
      },
      {
        type: 'guided',
        title: 'Exercise 2: Return Values',
        exercise: {
          title: 'Create a function that returns a value',
          instruction: 'Write a function called "double" that takes a number and returns double that number.',
          starterCode: `# EXERCISE: Return Values

# Define a function called double
# It takes one parameter called number
# Return number * 2
# Type your code below:
def double(    ):
    return    
    
# Test the function
result = double(5)
print("Double of 5 is:", result)

`,
          solution: `def double(number):
    return number * 2

result = double(5)
print("Double of 5 is:", result)`,
          hints: [
            'def double(number):',
            'return number * 2',
            'The function gives back the result'
          ]
        }
      },
      {
        type: 'practice',
        title: 'Practice: Math Functions',
        exercise: {
          title: 'Create math functions',
          instruction: 'Write functions for add, subtract, and multiply. Each takes two parameters and returns the result.',
          starterCode: `# PRACTICE: Math Functions

# Define add function
def add(a, b):
    return a + b

# Define subtract function (you write this!)
def subtract(a, b):
    
    
# Define multiply function (you write this!)
def multiply(a, b):
    
    
# Test all functions
print("5 + 3 =", add(5, 3))
print("10 - 4 =", subtract(10, 4))
print("6 * 7 =", multiply(6, 7))

`,
          solution: `def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

print("5 + 3 =", add(5, 3))
print("10 - 4 =", subtract(10, 4))
print("6 * 7 =", multiply(6, 7))`,
          hints: [
            'return a - b for subtract',
            'return a * b for multiply',
            'Make sure to indent the return statement'
          ],
          isPractice: true
        }
      },
      {
        type: 'challenge',
        title: 'Challenge: Temperature Converter',
        exercise: {
          title: 'Create a temperature converter function',
          instruction: 'Write a function celsius_to_fahrenheit that converts Celsius to Fahrenheit. Formula: F = C × 9/5 + 32',
          starterCode: `# CHALLENGE: Temperature Converter

# Define celsius_to_fahrenheit function
# Formula: fahrenheit = celsius * 9 / 5 + 32
# Return the result
def celsius_to_fahrenheit(celsius):
    
    
    
    
# Test with different temperatures
print("0°C =", celsius_to_fahrenheit(0), "°F")
print("100°C =", celsius_to_fahrenheit(100), "°F")
print("25°C =", celsius_to_fahrenheit(25), "°F")

`,
          solution: `def celsius_to_fahrenheit(celsius):
    fahrenheit = celsius * 9 / 5 + 32
    return fahrenheit

print("0°C =", celsius_to_fahrenheit(0), "°F")
print("100°C =", celsius_to_fahrenheit(100), "°F")
print("25°C =", celsius_to_fahrenheit(25), "°F")`,
          hints: [
            'fahrenheit = celsius * 9 / 5 + 32',
            'return fahrenheit',
            'Test with the provided print statements'
          ],
          isPractice: true
        }
      }
    ]
  },
  {
    id: 'final-challenge',
    title: 'Final Challenge: Quiz Game',
    description: 'Combine everything you\'ve learned to create a complete quiz game!',
    difficulty: 'independent',
    topic: 'Project',
    objectives: [
      'Apply variables, input, conditions, and loops',
      'Use functions to organize code',
      'Create an interactive program'
    ],
    steps: [
      {
        type: 'explain',
        title: 'Putting It All Together',
        content: `Now you'll use everything you've learned to build a complete program!

**Concepts to use:**
- Variables (to store data)
- input() (to get user answers)
- if/elif/else (to check answers)
- Loops (to ask multiple questions)
- Functions (to organize code)
- Lists (to store questions/scores)

**Quiz Game Features:**
1. Welcome message
2. Multiple questions
3. Check if answers are correct
4. Keep track of score
5. Show final results

**Tips:**
1. Plan before coding
2. Test each part
3. Add comments
4. Handle different cases`
      },
      {
        type: 'practice',
        title: 'Build Your Quiz Game',
        exercise: {
          title: 'Create a 5-question quiz',
          instruction: 'Build a complete quiz game with at least 5 questions. Ask questions, check answers, track score, and show results.',
          starterCode: `# FINAL CHALLENGE: Quiz Game

# Welcome message
print("Welcome to the Quiz Game!")
print("=" * 30)

# Initialize score
score = 0

# Question 1 - Write the code!
# Ask a question using input()
# Check if answer is correct using if
# Add 1 to score if correct
# Type your code below:


# Question 2 - Write the code!



# Question 3 - Write the code!



# Question 4 - Write the code!



# Question 5 - Write the code!



# Show final score
print("=" * 30)
print("Your final score:", score, "out of 5")

`,
          prePopulatedInputs: ["12", "Paris", "7", "Mercury", "blue"],
          solution: `print("Welcome to the Quiz Game!")
print("=" * 30)

score = 0

answer = input("What is 5 + 7? ")
if answer == "12":
    print("Correct!")
    score = score + 1
else:
    print("Wrong!")

answer = input("Capital of France? ")
if answer.lower() == "paris":
    print("Correct!")
    score = score + 1
else:
    print("Wrong!")

answer = int(input("How many days in a week? "))
if answer == 7:
    print("Correct!")
    score = score + 1
else:
    print("Wrong!")

answer = input("Closest planet to the Sun? ")
if answer.lower() == "mercury":
    print("Correct!")
    score = score + 1
else:
    print("Wrong!")

answer = input("What color is the sky? ")
if answer.lower() == "blue":
    print("Correct!")
    score = score + 1
else:
    print("Wrong!")

print("=" * 30)
print("Your final score:", score, "out of 5")`,
          hints: [
            'Use input() for questions',
            'Use if answer == "correct": to check',
            'score = score + 1 to add points'
          ],
          isPractice: true
        }
      }
    ]
  }
];

export const bugChallenges: BugChallenge[] = [
  {
    id: 'bug-1',
    title: 'Missing Quotes',
    description: 'This code tries to print a greeting but has an error. Fix it!',
    buggyCode: `name = Alice
print("Hello", name)`,
    bugLine: 1,
    bugDescription: 'String values need quotes around them',
    hint: 'Look at how text values are written in Python',
    fixedCode: `name = "Alice"
print("Hello", name)`,
    errorType: 'SyntaxError',
    errorExplanation: 'Python thinks Alice is a variable name, not text. Put quotes around it: "Alice"'
  },
  {
    id: 'bug-2',
    title: 'Math with Strings',
    description: 'This program crashes when calculating age. Find the bug!',
    buggyCode: `age = input("How old are you? ")
print("Next year you will be", age + 1)`,
    bugLine: 2,
    bugDescription: 'input() returns a string, not a number',
    hint: 'How do you convert text to a number?',
    fixedCode: `age = int(input("How old are you? "))
print("Next year you will be", age + 1)`,
    errorType: 'TypeError',
    errorExplanation: 'input() returns text. You can\'t do math with text! Use int() to convert to a number.'
  },
  {
    id: 'bug-3',
    title: 'Infinite Loop',
    description: 'This program never stops running. What\'s wrong?',
    buggyCode: `count = 1
while count <= 5:
    print("Count:", count)
print("Done!")`,
    bugLine: 3,
    bugDescription: 'The loop variable is never updated',
    hint: 'What needs to happen for the while condition to become False?',
    fixedCode: `count = 1
while count <= 5:
    print("Count:", count)
    count = count + 1
print("Done!")`,
    errorType: 'LogicError',
    errorExplanation: 'count never changes, so the condition is always True. Add count = count + 1 inside the loop!'
  },
  {
    id: 'bug-4',
    title: 'Wrong Comparison',
    description: 'This password checker doesn\'t work correctly.',
    buggyCode: `password = input("Enter password: ")
if password = "secret":
    print("Access granted!")
else:
    print("Wrong password!")`,
    bugLine: 2,
    bugDescription: 'Used = instead of == for comparison',
    hint: '= is for storing values. What compares two values?',
    fixedCode: `password = input("Enter password: ")
if password == "secret":
    print("Access granted!")
else:
    print("Wrong password!")`,
    errorType: 'SyntaxError',
    errorExplanation: '= is for assignment, == is for comparison. Use == to check if two values are equal!'
  },
  {
    id: 'bug-5',
    title: 'Indentation Error',
    description: 'This loop gives an error. Check the structure!',
    buggyCode: `for i in range(1, 6):
print(i)
print("Done!")`,
    bugLine: 2,
    bugDescription: 'Code inside the loop must be indented',
    hint: 'How do you show which code is inside a loop?',
    fixedCode: `for i in range(1, 6):
    print(i)
print("Done!")`,
    errorType: 'IndentationError',
    errorExplanation: 'Code inside the loop must be indented (4 spaces). print(i) needs to be inside the loop.'
  },
  {
    id: 'bug-6',
    title: 'List Index Error',
    description: 'This crashes when printing the third fruit.',
    buggyCode: `fruits = ["apple", "banana", "orange"]
print("The third fruit is:", fruits[3])`,
    bugLine: 2,
    bugDescription: 'List indices start at 0, not 1',
    hint: 'If there are 3 items, what are the valid indices: 0, 1, 2?',
    fixedCode: `fruits = ["apple", "banana", "orange"]
print("The third fruit is:", fruits[2])`,
    errorType: 'IndexError',
    errorExplanation: 'Lists start at index 0. fruits[0] is first, fruits[1] is second, fruits[2] is third!'
  }
];

export const topics = [
  { id: 'variables', name: 'Variables & Data Types', icon: '📦', description: 'Store data' },
  { id: 'input-output', name: 'Input & Output', icon: '🔄', description: 'Get and display data' },
  { id: 'selection', name: 'Selection', icon: '🔀', description: 'Make decisions' },
  { id: 'iteration', name: 'Iteration', icon: '🔁', description: 'Repeat code' },
  { id: 'data-structures', name: 'Data Structures', icon: '📊', description: 'Organize data' },
  { id: 'functions', name: 'Functions', icon: '⚡', description: 'Reuse code' }
];
